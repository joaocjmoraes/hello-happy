# Stage 1: Build with Maven
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw
COPY src src
RUN ./mvnw clean install -DskipTests

# Stage 2: Run with Java
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/hello-happy-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
