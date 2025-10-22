#!/bin/bash

echo "🚀 Starting Glam.ai Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/glamai
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
AI_SERVICE_URL=http://localhost:8000
PORT=5000
EOF
    echo "✅ .env file created"
fi

echo "🐳 Starting services with Docker Compose..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "🌱 Seeding database..."
docker-compose exec backend npm run seed

echo "🎉 Glam.ai is ready!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "🤖 AI Service: http://localhost:8000"
echo ""
echo "To stop all services: docker-compose down"
echo "To view logs: docker-compose logs -f"
