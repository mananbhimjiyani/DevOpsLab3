# ☁️ Cloud Algorithm Simulator - Backend

The **Cloud Algorithm Simulator - Backend** is a microservices-based system built with **Spring Boot** that integrates **CloudSim** to simulate and analyze various **cloud scheduling algorithms**. It optimizes cloud resource allocation by evaluating different task scheduling strategies.

---

## 📚 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Understanding CloudSim](#understanding-cloudsim)
5. [Simulation Parameter Terms](#simulation-parameter-terms)
6. [Response Terms Explained](#response-terms-explained)
7. [Supported Scheduling Algorithms](#supported-scheduling-algorithms)
8. [Installation & Setup](#installation--setup)
9. [Authors](#authors)
10. [License](#license)


---

## Features

✅ **Cloud Simulation with CloudSim** – Simulates cloud scheduling and resource allocation.  
✅ **Microservices-Based Architecture** – Uses **Spring Boot** and **CloudSim** for high scalability.  
✅ **Multi-Algorithm Support** – Execute different scheduling strategies dynamically.  
✅ **REST API** – Provides endpoints for simulation requests and retrieving results.  
✅ **CI/CD Integration** – Automated builds and deployments using **Jenkins**.  
✅ **Docker Support** – Containerized for consistent deployment.

---

## Tech Stack

- **Backend:** Spring Boot (Java)
- **Cloud Simulation:** CloudSim
- **Microservices:** REST API
- **Containerization:** Docker
- **CI/CD:** Jenkins
- **Cloud:** AWS EC2
- **Version Control:** Git & GitHub

---

## Project Structure

```plaintext  
Cloud_Algorithm_Simulator_Backend/  
├── cloudsim-sprinboot/src/  
│   ├── main/  
│   │   ├── java/com/example/  
│   │   │   ├── algorithm/            # Algorithm Implementations
│   │   │   ├── cloudsim-sprinboot/   # Main Spring Boot Application
│   │   │   ├── controller/           # API Controllers  
│   │   │   ├── model/                # Data Models   
│   │   │   ├── service/              # Business Logic  and Core CloudSim Execution  
│   │   │   ├── util/                 # Utility Class 
│   │   ├── resources/  
│   │   │   ├── application.yml       # Spring Boot Configuration  
│   │   │   ├── logback.xml           # Logging Configuration  
├── cloudsim-sprinboot/lib/  
│   ├── lib         
│   │   ├── cloudsim-4.0.jar          # External Jar for Cloudsim
│   ├── Dockerfile                    # Docker Configuration  
│   ├── pom.xml                       # Maven Dependencies   
├── .gitignore  
├── Jenkinsfile                       # Jenkins Pipeline  
├── README.md                         # Project Documentation  

```  

---

## Understanding CloudSim

**CloudSim** is a **Java-based simulation toolkit** for modeling, simulating, and analyzing cloud computing systems. It is widely used to evaluate **task scheduling, VM provisioning, and resource allocation strategies**. This project is using Cloudsim 4.0 which is present inside lib folder.

### ✅ Why CloudSim?

- **Realistic Cloud Modeling** – Simulates data centers, virtual machines, and workloads.
- **Algorithm Testing** – Evaluates different **scheduling algorithms** before deployment.
- **Performance Optimization** – Helps optimize cloud resource utilization.

---

## Simulation Parameter Terms

These parameters define the **simulation environment**:

- **numVMs** – Number of **Virtual Machines (VMs)** created for execution.
- **numCloudlets** – Total number of **tasks (Cloudlets)** to be scheduled.
- **numHosts** – Number of **physical hosts** in the data center.
- **hosts** – List of available hosts, each with **processing power, RAM, bandwidth, and storage**.
- **pesMips** – Processing power per CPU core (**MIPS**).
- **ram** – Available **RAM (MB)** per host.
- **bw** – Network **bandwidth (Mbps)** assigned per host.
- **storage** – Disk **storage (MB)** for a host.
- **vmMips** – Processing power per VM (**MIPS**).
- **vmPes** – Number of **CPU cores** per VM.
- **vmRam** – RAM (MB) allocated per VM.
- **vmBw** – Bandwidth (Mbps) per VM.
- **vmSize** – Storage (MB) per VM.
- **algorithm** – **Task scheduling algorithm** (e.g., Round Robin, FCFS).
- **cloudlets** – List of computational tasks with execution parameters:
    - **length** – Instruction count of the task.
    - **pes** – Number of **cores required**.
    - **fileSize** – Size of input data.
    - **outputSize** – Size of result data.

---

## Response Terms Explained

- **status** – Indicates if the simulation was successful.
- **messages** – Logs the **execution status** and chosen algorithm.
- **algorithm** – The scheduling strategy used (e.g., **roundrobin**).
- **elapsedTime** – Total **execution time (ms)** of the simulation.
- **cloudletExecution** – Map of **Cloudlet → VM allocation** with execution times.
- **failedAllocations** – List of **failed cloudlets** that couldn't execute.
- **logs** – Detailed **execution logs** from CloudSim.

---

## Supported Scheduling Algorithms

### **1. Round Robin (RR)**
**How it works:**
- Tasks are **distributed cyclically** across all available VMs.
- Ensures **equal workload** across VMs.

**Pros:**  
✔️ Fair allocation of tasks.  
✔️ Prevents overload on a single VM.

**Cons:**  
❌ Doesn’t consider task size or execution time.

---

### **2. First Come First Serve (FCFS)**
**How it works:**
- Tasks are **executed in the order of arrival**.
- No task preemption occurs.

**Pros:**  
✔️ Simple to implement.  
✔️ Ensures fairness in execution.

**Cons:**  
❌ Longer tasks may delay shorter tasks (poor load balancing).

---

### **3. Ant Colony Optimization (ACO)**
**How it works:**
- Uses **swarm intelligence** to find the **optimal task scheduling path**.
- Inspired by **real-world ant foraging behavior**.
- Tasks are assigned to VMs based on **pheromone levels** (indicating previous successful allocations).

**Pros:**  
✔️ Efficient for large-scale cloud systems.  
✔️ Optimized task scheduling based on past executions.

**Cons:**  
❌ Requires high computation time.

---

### **4. Genetic Algorithm (GA)**
**How it works:**
- Mimics **natural selection** to **evolve** an optimal scheduling strategy.
- Uses **selection, crossover, and mutation** to optimize scheduling.

**Pros:**  
✔️ Provides near-optimal scheduling.  
✔️ Can handle complex scheduling problems.

**Cons:**  
❌ High computation overhead.

---

### **5. Shortest Job First (SJF)**
**How it works:**
- Tasks with the **smallest execution time** are scheduled first.
- Minimizes overall execution time.

**Pros:**  
✔️ Reduces waiting time.  
✔️ Faster task execution.

**Cons:**  
❌ Long-running tasks may experience **starvation**.

## Installation & Setup

### 1️⃣ Clone the Repository

```bash  
git clone https://github.com/Abhishek-2502/Cloud_Algorithm_Simulator_Backend.git  
cd Cloud_Algorithm_Simulator_Backend  
```  

### 2️⃣ Build and Run Manually

```bash  
mvn clean package  
mvn spring-boot:run  
```  

### 3️⃣ Run with Docker

To run the application inside a **Docker container**, follow these steps:

#### 📌 **Build the Docker Image**

```bash  
docker build -t cloudsim-backend .  
```  

#### 🚀 **Run the Container**

```bash  
docker run -d -p 8080:8080 cloudsim-backend  
```  

This will start the backend in a **detached mode (-d)** and expose it on **port 8080**.

---

## Authors

- **Abhishek Rajput** - [GitHub](https://github.com/Abhishek-2502)

---

## License

Licensed under the **MIT License**.
