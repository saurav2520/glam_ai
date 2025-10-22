@echo off
echo 🚀 Starting Glam.ai Development Environment...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo MONGODB_URI=mongodb://localhost:27017/glamai
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
        echo AI_SERVICE_URL=http://localhost:8000
        echo PORT=5000
    ) > .env
    echo ✅ .env file created
)

echo 🐳 Starting services with Docker Compose...
docker-compose up -d

echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

echo 🌱 Seeding database...
docker-compose exec backend npm run seed

echo 🎉 Glam.ai is ready!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo 🤖 AI Service: http://localhost:8000
echo.
echo To stop all services: docker-compose down
echo To view logs: docker-compose logs -f
pause
