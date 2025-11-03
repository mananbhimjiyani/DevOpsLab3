package com.example.model;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CloudletRequest {

    @Min(value = 1, message = "Cloudlet length must be at least 1.")
    private int length;

    @Min(value = 1, message = "Number of PEs must be at least 1.")
    private int pes;

    @Min(value = 1, message = "File size must be at least 1.")
    private int fileSize;

    @Min(value = 1, message = "Output size must be at least 1.")
    private int outputSize;
}
