# Use Maven + JDK to build the Spring Boot app
FROM maven:3.9.3-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml first and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src
COPY pom.xml .

# Build jar without running tests
RUN mvn clean package -DskipTests

# Use lightweight OpenJDK runtime to run the app
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built jar from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
