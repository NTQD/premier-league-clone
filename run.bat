@echo off
echo === Starting Docker Compose ===
docker compose up -d

echo === Waiting for 5 seconds... ===
timeout /t 5 /nobreak >nul

echo === Starting Frontend (npm run dev) ===
start cmd /k "npm run dev"

echo === Starting Backend (Maven Spring Boot) ===
cd /d "./backend"
start cmd /k "mvn spring-boot:run"