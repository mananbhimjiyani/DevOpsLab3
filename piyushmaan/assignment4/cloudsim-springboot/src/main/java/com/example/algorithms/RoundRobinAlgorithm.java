package com.example.algorithms;

import org.cloudbus.cloudsim.DatacenterBroker;
import org.cloudbus.cloudsim.Vm;
import org.cloudbus.cloudsim.Cloudlet;

import java.util.List;

public class RoundRobinAlgorithm {
    public void runAlgorithm(DatacenterBroker broker, List<Vm> vmlist, List<Cloudlet> cloudletList) {
        if (vmlist.isEmpty() || cloudletList.isEmpty()) {
            System.out.println("No VMs or Cloudlets available for scheduling.");
            return;
        }

        System.out.println("Running Round Robin Algorithm...");
        int vmIndex = 0;
        for (Cloudlet cloudlet : cloudletList) {
            Vm vm = vmlist.get(vmIndex);
            broker.bindCloudletToVm(cloudlet.getCloudletId(), vm.getId());
            System.out.println("Cloudlet " + cloudlet.getCloudletId() + " assigned to VM " + vm.getId());
            vmIndex = (vmIndex + 1) % vmlist.size(); // Circular allocation
        }
    }
}
