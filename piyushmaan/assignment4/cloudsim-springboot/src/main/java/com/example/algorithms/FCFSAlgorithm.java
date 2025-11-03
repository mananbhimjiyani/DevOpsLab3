package com.example.algorithms;

import org.cloudbus.cloudsim.DatacenterBroker;
import org.cloudbus.cloudsim.Vm;
import org.cloudbus.cloudsim.Cloudlet;

import java.util.List;

public class FCFSAlgorithm {
    public void runAlgorithm(DatacenterBroker broker, List<Vm> vmlist, List<Cloudlet> cloudletList) {
        if (vmlist.isEmpty() || cloudletList.isEmpty()) {
            System.out.println("No VMs or Cloudlets available for scheduling.");
            return;
        }

        System.out.println("Running FCFS Algorithm...");
        for (int i = 0; i < cloudletList.size(); i++) {
            Cloudlet cloudlet = cloudletList.get(i);
            Vm vm = vmlist.get(i % vmlist.size()); // Sequential allocation
            broker.bindCloudletToVm(cloudlet.getCloudletId(), vm.getId());
            System.out.println("Cloudlet " + cloudlet.getCloudletId() + " assigned to VM " + vm.getId());
        }
    }
}
