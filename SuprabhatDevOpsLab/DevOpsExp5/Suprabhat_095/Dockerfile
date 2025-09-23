# Use Java 21 JDK
FROM openjdk:21-jdk

WORKDIR /app

# Copy Spring Boot JAR
COPY target/Suprabhat_095-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
