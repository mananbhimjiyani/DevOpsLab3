package com.example.algorithms;

import org.cloudbus.cloudsim.Cloudlet;
import org.cloudbus.cloudsim.DatacenterBroker;
import org.cloudbus.cloudsim.Vm;

import java.util.Comparator;
import java.util.List;

public class SJFAlgorithm {
    public void runAlgorithm(DatacenterBroker broker, List<Vm> vmlist, List<Cloudlet> cloudletList) {
        if (vmlist.isEmpty() || cloudletList.isEmpty()) {
            System.out.println("No VMs or Cloudlets available for scheduling.");
            return;
        }

        // Sort cloudlets by length (execution time)
        cloudletList.sort(Comparator.comparingLong(Cloudlet::getCloudletLength));

        int[] vmLoad = new int[vmlist.size()]; // Track loads for VMs

        System.out.println("Running Shortest Job First (SJF) Algorithm...");
        for (Cloudlet cloudlet : cloudletList) {
            // Find the least loaded VM
            int minLoadIndex = 0;
            for (int i = 1; i < vmlist.size(); i++) {
                if (vmLoad[i] < vmLoad[minLoadIndex]) {
                    minLoadIndex = i;
                }
            }
            Vm selectedVm = vmlist.get(minLoadIndex);
            broker.bindCloudletToVm(cloudlet.getCloudletId(), selectedVm.getId());
            vmLoad[minLoadIndex] += cloudlet.getCloudletLength();

            System.out.println("Cloudlet " + cloudlet.getCloudletId() + " assigned to VM " + selectedVm.getId());
        }
    }
}
