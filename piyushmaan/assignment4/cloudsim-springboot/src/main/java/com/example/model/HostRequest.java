package com.example.model;

import java.util.List;

public class HostRequest {
    private int ram;
    private int bw;
    private long storage;
    private List<Integer> pesMips;

    // Getters and setters
    public int getRam() {
        return ram;
    }

    public void setRam(int ram) {
        this.ram = ram;
    }

    public int getBw() {
        return bw;
    }

    public void setBw(int bw) {
        this.bw = bw;
    }

    public long getStorage() {
        return storage;
    }

    public void setStorage(long storage) {
        this.storage = storage;
    }

    public List<Integer> getPesMips() {
        return pesMips;
    }

    public void setPesMips(List<Integer> pesMips) {
        this.pesMips = pesMips;
    }
}