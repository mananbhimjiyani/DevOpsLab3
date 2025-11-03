# Use a slim Java base image to keep the size small
FROM openjdk:21-slim

# Set a working directory inside the container
WORKDIR /app

# Copy your compiled .jar file into the container
COPY target/Maven-DevOps-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that your application runs on (8090)
EXPOSE 8090

# The command to execute when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]