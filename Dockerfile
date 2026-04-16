# Stage 1: Build Frontend with Node.js
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Stage 2: Build Backend with Maven
FROM maven:3.9-eclipse-temurin-17 AS backend-builder
WORKDIR /app
COPY pom.xml .
COPY src src
COPY --from=frontend-builder /app/frontend/dist src/main/resources/static
RUN mvn clean install -DskipTests

# Stage 3: Run with Java
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/hello-happy-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
