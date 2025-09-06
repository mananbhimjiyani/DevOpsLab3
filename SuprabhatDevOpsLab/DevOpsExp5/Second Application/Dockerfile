# Use Java 21 JDK (matches your compiled JAR)
FROM openjdk:21-jdk

# Set working directory inside container
WORKDIR /app

# Copy the JAR file into the container
COPY target/Suprabhat_095-0.0.1-SNAPSHOT.jar app.jar

# Expose a different port to avoid conflicts
EXPOSE 8081

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
