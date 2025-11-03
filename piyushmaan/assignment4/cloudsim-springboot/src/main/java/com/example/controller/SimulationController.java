package com.example.controller;

import com.example.model.SimulationRequest;
import com.example.model.SimulationResponse;
import com.example.service.SimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulation")
public class SimulationController{

    @Autowired
    private SimulationService simulationService;

    @PostMapping("/run")
    public SimulationResponse runSimulation(@RequestBody SimulationRequest request) {
        return simulationService.runCloudSim(request);
    }
}