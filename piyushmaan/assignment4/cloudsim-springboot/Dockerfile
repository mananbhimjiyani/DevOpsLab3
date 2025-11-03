# Build stage
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy CloudSim JAR into the project's lib/ directory
COPY lib/cloudsim-4.0.jar ./lib/

# Copy project files
COPY pom.xml .
COPY src ./src

# Build the application (JAR will include system-scoped dependencies)
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built JAR and CloudSim JAR
COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/lib/cloudsim-4.0.jar ./lib/

# Run with explicit classpath inclusion
CMD ["java", "-Dloader.path=./lib/", "-jar", "app.jar"]