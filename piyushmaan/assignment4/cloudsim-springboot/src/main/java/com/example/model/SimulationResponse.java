package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimulationResponse {

    private String status;
    private List<String> messages;
    private String algorithm;
    private long elapsedTime;
    private Map<String, String> cloudletExecution;
    private List<String> failedAllocations;
    private List<String> logs;
}
