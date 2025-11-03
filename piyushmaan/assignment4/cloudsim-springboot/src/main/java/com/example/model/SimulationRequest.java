package com.example.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimulationRequest {

    @Min(value = 1, message = "Number of VMs must be at least 1.")
    private int numVMs;

    @Min(value = 1, message = "Number of Cloudlets must be at least 1.")
    private int numCloudlets;

    @Min(value = 1, message = "Number of Hosts must be at least 1.")
    private int numHosts;

    @NotNull(message = "Hosts configuration cannot be null.")
    private List<HostRequest> hosts;

    @Min(value = 1, message = "VM MIPS must be at least 1.")
    private int vmMips;

    @Min(value = 1, message = "Number of VM PEs must be at least 1.")
    private int vmPes;

    @Min(value = 1, message = "VM RAM must be at least 1 MB.")
    private int vmRam;

    @Min(value = 1, message = "VM Bandwidth must be at least 1 MB.")
    private int vmBw;

    @Min(value = 1, message = "VM Storage must be at least 1 MB.")
    private int vmSize;

    @NotBlank(message = "Algorithm cannot be empty.")
    private String algorithm;

    @NotNull(message = "Cloudlet configuration cannot be null.")
    private List<CloudletRequest> cloudlets;
}
