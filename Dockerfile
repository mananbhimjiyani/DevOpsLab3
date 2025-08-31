# Start from a lightweight Java base image
FROM openjdk:21-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled .jar file from your project's target directory
# This is created when you run the maven package command
COPY target/kubernets-0.0.1-SNAPSHOT.jar app.jar

# Tell Docker that the container will listen on port 8080
EXPOSE 8080

# This command runs your application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]