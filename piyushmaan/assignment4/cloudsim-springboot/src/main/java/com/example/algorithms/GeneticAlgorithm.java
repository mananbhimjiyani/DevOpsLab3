package com.example.algorithms;

import org.cloudbus.cloudsim.DatacenterBroker;
import org.cloudbus.cloudsim.Cloudlet;
import org.cloudbus.cloudsim.Vm;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

class Chromosome {
    private final int[] allocation;
    private double fitness;

    public Chromosome(int cloudletCount, int vmCount) {
        allocation = new int[cloudletCount];
        Random random = new Random();
        for (int i = 0; i < cloudletCount; i++) {
            allocation[i] = random.nextInt(vmCount);
        }
    }

    public int[] getAllocation() {
        return allocation;
    }

    public double getFitness() {
        return fitness;
    }

    public void setFitness(double fitness) {
        this.fitness = fitness;
    }

    public void mutate(int vmCount) {
        Random random = new Random();
        int index = random.nextInt(allocation.length);
        allocation[index] = random.nextInt(vmCount);
        System.out.println("Mutation applied at index " + index);
    }

    public void crossover(Chromosome partner) {
        Random random = new Random();
        int crossoverPoint = 1 + random.nextInt(allocation.length - 1); // Ensure valid crossover
        for (int i = crossoverPoint; i < allocation.length; i++) {
            int temp = allocation[i];
            allocation[i] = partner.allocation[i];
            partner.allocation[i] = temp;
        }
    }
}

public class GeneticAlgorithm {
    private final int populationSize = 10;
    private final int generations = 100;
    private final double mutationRate = 0.1;
    private List<Chromosome> population;
    private List<Cloudlet> cloudletList;
    private List<Vm> vmList;
    private final Random random = new Random();

    public void runAlgorithm(DatacenterBroker broker, List<Vm> vmlist, List<Cloudlet> cloudletList) {
        this.vmList = vmlist;
        this.cloudletList = cloudletList;

        initializePopulation();

        for (int gen = 0; gen < generations; gen++) {
            calculateFitness();
            List<Chromosome> newPopulation = select();
            population = newPopulation;
            if (gen < generations - 1) {
                mutate();
            }
            System.out.println("Generation: " + gen + " Best Fitness: " + getBestSolution().getFitness());
        }

        Chromosome bestSolution = getBestSolution();
        for (int i = 0; i < bestSolution.getAllocation().length; i++) {
            broker.bindCloudletToVm(cloudletList.get(i).getCloudletId(), bestSolution.getAllocation()[i]);
        }
        System.out.println("Running Genetic Algorithm...");
    }

    private void initializePopulation() {
        population = new ArrayList<>();
        for (int i = 0; i < populationSize; i++) {
            population.add(new Chromosome(cloudletList.size(), vmList.size()));
        }
    }

    private void calculateFitness() {
        for (Chromosome chromosome : population) {
            double fitness = evaluateFitness(chromosome);
            chromosome.setFitness(fitness);
        }
    }

    private double evaluateFitness(Chromosome chromosome) {
        double makespan = 0;
        int[] allocation = chromosome.getAllocation();
        for (int vmId = 0; vmId < vmList.size(); vmId++) {
            double vmTime = 0;
            for (int i = 0; i < allocation.length; i++) {
                if (allocation[i] == vmId) {
                    vmTime += cloudletList.get(i).getCloudletLength();
                }
            }
            makespan = Math.max(makespan, vmTime);
        }
        return (1.0 / makespan) * 1000; // Scaled fitness
    }

    private List<Chromosome> select() {
        List<Chromosome> newPopulation = new ArrayList<>();
        for (int i = 0; i < populationSize; i++) {
            Chromosome parent1 = rouletteWheelSelection();
            Chromosome parent2 = rouletteWheelSelection();
            parent1.crossover(parent2);
            newPopulation.add(parent1);
        }
        return newPopulation;
    }

    private Chromosome rouletteWheelSelection() {
        double totalFitness = population.stream().mapToDouble(Chromosome::getFitness).sum();
        double randValue = random.nextDouble() * totalFitness;
        double cumulativeFitness = 0.0;

        for (Chromosome chromosome : population) {
            cumulativeFitness += chromosome.getFitness();
            if (cumulativeFitness >= randValue) {
                return chromosome;
            }
        }
        return population.get(0); // Fallback
    }

    private void mutate() {
        for (Chromosome chromosome : population) {
            if (Math.random() < mutationRate) {
                chromosome.mutate(vmList.size());
            }
        }
    }

    private Chromosome getBestSolution() {
        return population.stream().max((c1, c2) -> Double.compare(c1.getFitness(), c2.getFitness())).orElse(null);
    }
}
