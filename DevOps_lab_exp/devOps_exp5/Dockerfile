# Step 1: Use official Java runtime
FROM openjdk:17-jdk-slim

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy JAR file
COPY target/*.jar app.jar

# Step 4: Run JAR
ENTRYPOINT ["java", "-jar", "app.jar"]

# Expose port
EXPOSE 8080
