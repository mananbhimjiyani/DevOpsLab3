package com.example.service;

import com.example.model.*;
import com.example.util.ChartGenerator;
import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.provisioners.*;
import org.springframework.stereotype.Service;

import java.util.*;

import com.example.algorithms.*;

@Service
public class SimulationService {

    public SimulationResponse runCloudSim(SimulationRequest request) {
        long startTime = System.currentTimeMillis();
        List<String> logs = new ArrayList<>();
        Map<String, String> cloudletExecution = new HashMap<>();
        List<String> failedAllocations = new ArrayList<>();

        try {
            logs.add("Received SimulationRequest: " + request.toString());

            if (request.getNumVMs() <= 0 || request.getNumCloudlets() <= 0 || request.getNumHosts() <= 0) {
                logs.add("Invalid input. Number of VMs, Cloudlets, and Hosts must be greater than zero.");
                return new SimulationResponse("Failed", Collections.emptyList(), request.getAlgorithm(), 0,
                        cloudletExecution, failedAllocations, logs);
            }

            CloudSim.init(1, Calendar.getInstance(), false);
            logs.add("CloudSim initialized successfully.");

            // Create Datacenter and Broker
            logs.add("Creating Datacenter...");
            Datacenter datacenter0 = createDatacenter("Datacenter_0", request, logs);
            if (datacenter0 == null) {
                throw new RuntimeException("Datacenter creation failed.");
            }

            logs.add("Creating Broker...");
            DatacenterBroker broker = createBroker(logs);
            if (broker == null) {
                throw new RuntimeException("Broker creation failed.");
            }

            // Create VMs and Cloudlets
            logs.add("Creating VMs...");
            List<Vm> vmList = createVMs(broker.getId(), request, logs);
            logs.add(vmList.size() + " VMs created successfully.");

            logs.add("Creating Cloudlets...");
            List<Cloudlet> cloudletList = createCloudlets(broker.getId(), request, vmList, logs, failedAllocations);
            logs.add(cloudletList.size() + " Cloudlets created successfully.");

            broker.submitVmList(vmList);
            broker.submitCloudletList(cloudletList);
            logs.add("VMs and Cloudlets submitted to Broker.");

            // Choose Algorithm
            logs.add("Selected Algorithm: " + request.getAlgorithm());
            switch (request.getAlgorithm().toLowerCase()) {
                case "roundrobin":
                    new RoundRobinAlgorithm().runAlgorithm(broker, vmList, cloudletList);
                    logs.add("Round Robin algorithm executed.");
                    break;
                case "fcfs":
                    new FCFSAlgorithm().runAlgorithm(broker, vmList, cloudletList);
                    logs.add("FCFS algorithm executed.");
                    break;
                case "ant":
                    new ACOAlgorithm().runAlgorithm(broker, vmList, cloudletList);
                    logs.add("ACO algorithm executed.");
                    break;
                case "genetic":
                    new GeneticAlgorithm().runAlgorithm(broker, vmList, cloudletList);
                    logs.add("Genetic algorithm executed.");
                    break;
                case "sjf":
                    new SJFAlgorithm().runAlgorithm(broker, vmList, cloudletList);
                    logs.add("SJF algorithm executed.");
                    break;
                default:
                    throw new RuntimeException("Invalid algorithm specified: " + request.getAlgorithm());
            }

            logs.add("Starting CloudSim simulation...");
            CloudSim.startSimulation();

            // Track Cloudlet Execution
            logs.add("Tracking Cloudlet execution results...");
            for (Cloudlet cloudlet : cloudletList) {
                if (cloudlet.getStatus() == Cloudlet.SUCCESS) {
                    double executionTime = cloudlet.getActualCPUTime();
                    cloudletExecution.put("Cloudlet " + cloudlet.getCloudletId(),
                            "VM " + cloudlet.getVmId() + " (Execution Time: " + executionTime + " ms)");
                    logs.add("Cloudlet " + cloudlet.getCloudletId() +
                            " executed on VM " + cloudlet.getVmId() +
                            " with Execution Time: " + executionTime + " ms");
                } else {
                    failedAllocations.add("Cloudlet " + cloudlet.getCloudletId() + " failed to execute.");
                    logs.add("Cloudlet " + cloudlet.getCloudletId() + " failed.");
                }
            }

            long elapsedTime = System.currentTimeMillis() - startTime;
            logs.add("Total simulation time: " + elapsedTime + " ms.");

            CloudSim.stopSimulation();
            logs.add("CloudSim simulation completed.");

            return new SimulationResponse("Success", List.of("Simulation completed using " + request.getAlgorithm()),
                    request.getAlgorithm(), elapsedTime, cloudletExecution, failedAllocations, logs);

        } catch (Exception e) {
            logs.add("Simulation failed with exception: " + e.getMessage());
            return new SimulationResponse("Failed", Collections.emptyList(), request.getAlgorithm(), 0,
                    cloudletExecution, failedAllocations, logs);
        }
    }

    // Method to create Datacenter
    private Datacenter createDatacenter(String name, SimulationRequest request, List<String> logs) {
        try {
            List<Host> hostList = new ArrayList<>();
            logs.add("Creating " + request.getNumHosts() + " hosts.");

            for (int i = 0; i < request.getNumHosts(); i++) {
                List<Pe> peList = new ArrayList<>();
                List<Integer> pesMips = request.getHosts().get(i).getPesMips();

                for (int j = 0; j < pesMips.size(); j++) {
                    peList.add(new Pe(j, new PeProvisionerSimple(pesMips.get(j))));
                    logs.add("Host " + i + ": Created PE " + j + " with MIPS " + pesMips.get(j));
                }

                Host host = new Host(i,
                        new RamProvisionerSimple(request.getHosts().get(i).getRam()),
                        new BwProvisionerSimple(request.getHosts().get(i).getBw()),
                        request.getHosts().get(i).getStorage(),
                        peList,
                        new VmSchedulerTimeShared(peList));

                hostList.add(host);
                logs.add("Created Host " + i + " with " + peList.size() + " PEs.");
            }

            DatacenterCharacteristics characteristics = new DatacenterCharacteristics(
                    "x86", "Linux", "Xen", hostList, 10.0, 3.0, 0.05, 0.001, 0.0);

            return new Datacenter(name, characteristics, new VmAllocationPolicySimple(hostList),
                    new LinkedList<>(), 0);
        } catch (Exception e) {
            logs.add("Failed to create Datacenter: " + e.getMessage());
            return null;
        }
    }

    // Method to create Broker
    private DatacenterBroker createBroker(List<String> logs) {
        try {
            return new DatacenterBroker("Broker");
        } catch (Exception e) {
            logs.add("Failed to create Broker: " + e.getMessage());
            return null;
        }
    }

    // Method to create VMs
    private List<Vm> createVMs(int brokerId, SimulationRequest request, List<String> logs) {
        List<Vm> list = new ArrayList<>();
        for (int i = 0; i < request.getNumVMs(); i++) {
            Vm vm = new Vm(i, brokerId, request.getVmMips(), request.getVmPes(), request.getVmRam(),
                    request.getVmBw(), request.getVmSize(),
                    "Xen", new CloudletSchedulerTimeShared());
            logs.add("Created VM " + i + " with MIPS: " + request.getVmMips() + ", PEs: " + request.getVmPes());
            list.add(vm);
        }
        return list;
    }

    // Method to create Cloudlets
    private List<Cloudlet> createCloudlets(int brokerId, SimulationRequest request, List<Vm> vmList, List<String> logs, List<String> failedAllocations) {
        List<Cloudlet> list = new ArrayList<>();
        for (int i = 0; i < request.getNumCloudlets(); i++) {
            CloudletRequest cloudletRequest = request.getCloudlets().get(i);
            Cloudlet cloudlet = new Cloudlet(i, cloudletRequest.getLength(), cloudletRequest.getPes(),
                    cloudletRequest.getFileSize(), cloudletRequest.getOutputSize(),
                    new UtilizationModelFull(), new UtilizationModelFull(), new UtilizationModelFull());
            cloudlet.setUserId(brokerId);
            list.add(cloudlet);
            logs.add("Created Cloudlet " + i + " with Length: " + cloudletRequest.getLength() + ", Cores: " + cloudletRequest.getPes());
        }
        return list;
    }
}
