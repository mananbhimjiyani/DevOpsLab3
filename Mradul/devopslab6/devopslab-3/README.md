# Maven Spring Boot Project

This is a **Spring Boot Maven Project** configured to build via **Jenkins CI/CD** pipeline using the Maven Wrapper (`mvnw`). The entire setup is containerized with **Docker** and integrates GitHub for version control.

---

## 📁 Project Structure

Project3/
└── Anushree/
├── mvnw
├── mvnw.cmd
├── pom.xml
├── src/
│ ├── main/java/com/sit/Anushree
│ └── test/java/com/sit/Anushree
└── Jenkinsfile


## Tech Stack

- **Java 21**
- **Spring Boot 3.5.3**
- **Maven 3.9.9**
- **Jenkins (via Docker)**
- **Git & GitHub**
- **Mockito + JUnit 5 for Testing**

---


###  Requirements

- Java 21+
- Maven (optional, uses `mvnw`)
- Docker Desktop (for Jenkins)
- Git

---

## Build and Test

### Local (without Jenkins)
```bash
cd Project3/Anushree
chmod +x mvnw    # Run once if not executable
./mvnw clean install
Run Tests

./mvnw test

CI/CD with Jenkins (Dockerized)

Step 1: Start Jenkins in Docker

docker run -d --name jenkins-maven \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

Step 2: Install Tools in Jenkins

Inside Jenkins:

Install Pipeline, Git, and Maven Integration plugins

Configure Maven tool under Manage Jenkins > Global Tool Configuration

Step 3: Jenkinsfile
Your Jenkinsfile should look like:

pipeline {
    agent any

    stages {
        stage('Set Permission') {
            steps {
                dir('Project3/Anushree') {
                    sh 'chmod +x mvnw'
                }
            }
        }

        stage('Build') {
            steps {
                dir('Project3/Anushree') {
                    sh './mvnw clean install'
                }
            }
        }
    }
}
Ensure mvnw is committed with executable permissions or run chmod +x mvnw manually inside the container once.

Common Issues
Permission denied: ./mvnw
Fix:

chmod +x mvnw
git add mvnw
git commit -m "Fix executable permission"
git push origin main
Still not working on Jenkins? Run inside Jenkins container:

docker exec -it jenkins-maven /bin/bash
cd /var/jenkins_home/workspace/Maven-Jenkins-Project3/Project3/Anushree
chmod +x mvnw

Artifact Output
After successful build:

target/Anushree-0.0.1-SNAPSHOT.jar
You can deploy this .jar to a server, Docker container, or cloud platform.
