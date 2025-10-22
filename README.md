# Glam.ai - AI-Powered Grooming Advisor

A modern web application that provides personalized hairstyle and beard style recommendations based on AI-powered face shape analysis.

## 🚀 Features

- **AI Face Shape Analysis**: Upload a photo and get instant face shape detection
- **Personalized Recommendations**: Receive curated hairstyle and beard style suggestions
- **User Authentication**: Secure signup/login with JWT tokens
- **Modern UI/UX**: Clean, responsive design built with React and Tailwind CSS
- **Real-time Analysis**: Fast processing with Python AI service

## 🏗️ Architecture

The application consists of three main components:

1. **Backend (Node.js/Express)**: RESTful API with user authentication and image processing
2. **AI Service (Python/Flask)**: Face shape analysis using MediaPipe and OpenCV
3. **Frontend (React)**: Modern web interface with drag-and-drop image upload

## 🛠️ Technology Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- Axios for HTTP requests

### AI Service
- Python 3.9+
- Flask web framework
- MediaPipe for facial landmark detection
- OpenCV for image processing
- NumPy for calculations

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API communication
- Lucide React for icons

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- MongoDB (local or cloud)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd glamai
```

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update environment variables in .env
MONGODB_URI=mongodb://localhost:27017/glamai
JWT_SECRET=your-super-secret-jwt-key
AI_SERVICE_URL=http://localhost:8000

# Start the server
npm run dev
```

### 3. AI Service Setup

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the service
python app.py
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Database Setup

```bash
# From the root directory
npm run seed
```

## 🐳 Docker Quick Start (Recommended)

### Start All Services with Docker Compose

```bash
# Navigate to project directory
cd glamai

# Start all services (MongoDB, AI Service, Backend, Frontend)
docker-compose up -d

# Check if all services are running
docker-compose ps

# View service logs
docker-compose logs

# Stop all services
docker-compose down
```

### Using the Start Script (Windows)

```bash
# Run the automated start script
.\start-dev.bat
```

This script will:
- Check if Docker is running
- Create necessary .env file
- Start all services with Docker Compose
- Seed the database automatically
- Show URLs for each service

## 📊 Database Management & Data Checking

### Check Service Status

```bash
# View all running services
docker-compose ps

# Check specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs ai-service
docker-compose logs mongodb

# Restart services if needed
docker-compose restart
```

### MongoDB Database Operations

#### Connect to MongoDB Shell
```bash
# Connect to MongoDB container
docker-compose exec mongodb mongosh glamai

# Or run commands directly
docker-compose exec mongodb mongosh glamai --eval "command_here"
```

#### Check Database Overview
```bash
# Database statistics
docker-compose exec mongodb mongosh glamai --eval "db.stats()"

# List all collections
docker-compose exec mongodb mongosh glamai --eval "show collections"

# Count total documents
docker-compose exec mongodb mongosh glamai --eval "db.users.countDocuments()"
docker-compose exec mongodb mongosh glamai --eval "db.styles.countDocuments()"
```

#### User Management
```bash
# View all users
docker-compose exec mongodb mongosh glamai --eval "db.users.find().pretty()"

# View specific user
docker-compose exec mongodb mongosh glamai --eval "db.users.findOne({email: 'test@example.com'})"

# View recent users (newest first)
docker-compose exec mongodb mongosh glamai --eval "db.users.find().sort({createdAt: -1}).limit(5).pretty()"

# Count total users
docker-compose exec mongodb mongosh glamai --eval "db.users.countDocuments()"

# Find users by email pattern
docker-compose exec mongodb mongosh glamai --eval "db.users.find({email: /test/}).pretty()"
```

#### Delete Users
```bash
# Delete a specific user by email
docker-compose exec mongodb mongosh glamai --eval "db.users.deleteOne({email: 'test@example.com'})"

# Delete multiple users by email pattern
docker-compose exec mongodb mongosh glamai --eval "db.users.deleteMany({email: /test/})"

# Delete user by ID (replace OBJECT_ID_HERE with actual ID)
docker-compose exec mongodb mongosh glamai --eval "db.users.deleteOne({_id: ObjectId('OBJECT_ID_HERE')})"

# Delete all users (WARNING: This deletes everything!)
docker-compose exec mongodb mongosh glamai --eval "db.users.deleteMany({})"
```

#### Safe User Deletion Process
```bash
# Step 1: View users before deletion
docker-compose exec mongodb mongosh glamai --eval "db.users.find().pretty()"

# Step 2: Identify specific user to delete
docker-compose exec mongodb mongosh glamai --eval "db.users.findOne({email: 'test@example.com'})"

# Step 3: Delete the user
docker-compose exec mongodb mongosh glamai --eval "db.users.deleteOne({email: 'test@example.com'})"

# Step 4: Verify deletion
docker-compose exec mongodb mongosh glamai --eval "db.users.find({email: 'test@example.com'})"
```

#### Style Management
```bash
# View all styles
docker-compose exec mongodb mongosh glamai --eval "db.styles.find().pretty()"

# View only hairstyles
docker-compose exec mongodb mongosh glamai --eval "db.styles.find({type: 'hairstyle'}).pretty()"

# View only beard styles
docker-compose exec mongodb mongosh glamai --eval "db.styles.find({type: 'beard-style'}).pretty()"

# Count styles by type
docker-compose exec mongodb mongosh glamai --eval "db.styles.aggregate([{\$group: {_id: '\$type', count: {\$sum: 1}}}])"

# Find styles for specific face shape
docker-compose exec mongodb mongosh glamai --eval "db.styles.find({suitedFaceShapes: 'Oval'}).pretty()"

# View styles with limited fields
docker-compose exec mongodb mongosh glamai --eval "db.styles.find({}, {name: 1, type: 1, difficulty: 1, _id: 0}).pretty()"
```

#### Database Maintenance
```bash
# Seed database with sample data
docker-compose exec backend npm run seed

# Clear all data (WARNING: This will delete everything)
docker-compose exec mongodb mongosh glamai --eval "db.users.deleteMany({})"
docker-compose exec mongodb mongosh glamai --eval "db.styles.deleteMany({})"

# Backup database
docker-compose exec mongodb mongodump --db glamai --out /backup

# Restore database
docker-compose exec mongodb mongorestore --db glamai /backup/glamai
```

### API Testing

#### Test Authentication Endpoints
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"password123"}'

# Get current user (requires token)
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/auth/me
```

#### Test Analysis Endpoints
```bash
# Get all styles (requires authentication)
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/analyze/styles

# Health check
curl http://localhost:5000/health
curl http://localhost:8000/health
```

### Frontend Development

#### Build and Deploy
```bash
# Build frontend for production
docker-compose exec frontend npm run build

# Rebuild frontend container
docker-compose build frontend

# Restart frontend service
docker-compose restart frontend
```

#### Development Mode
```bash
# Start frontend in development mode (with hot reload)
cd frontend
npm run dev
```

### Troubleshooting Commands

#### Check Service Health
```bash
# Test backend connectivity
curl http://localhost:5000/health

# Test AI service connectivity
curl http://localhost:8000/health

# Test frontend accessibility
curl http://localhost:3000

# Check MongoDB connectivity
docker-compose exec mongodb mongosh glamai --eval "db.runCommand('ping')"
```

#### View Detailed Logs
```bash
# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# View last N lines
docker-compose logs --tail 50 backend
```

#### Reset Everything
```bash
# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Rebuild and start fresh
docker-compose up -d --build

# Seed database again
docker-compose exec backend npm run seed
```

## 🤖 ML/AI Service Troubleshooting

### Face Shape Detection Issues

If the ML service is not correctly detecting face shapes, try these steps:

#### 1. Check AI Service Status
```bash
# Test AI service health
curl http://localhost:8000/health

# Check AI service logs
docker-compose logs ai-service

# Restart AI service
docker-compose restart ai-service
```

#### 2. Rebuild AI Service with Latest Code
```bash
# Rebuild the AI service container
docker-compose build ai-service

# Restart the service
docker-compose restart ai-service
```

#### 3. Check Image Quality Requirements
- **Clear, front-facing photo** (not side profile)
- **Good lighting** (no shadows or glare)
- **High resolution** (at least 300x300 pixels)
- **No accessories** (glasses, hats, masks)
- **Neutral expression** (not smiling or frowning)

#### 4. Debug Face Detection
```bash
# Check AI service logs for detection details
docker-compose logs -f ai-service

# Look for debug information:
# - "Face detected with X landmarks"
# - "Debug - Ratios: H/W=X.XXX, Jaw=X.XXX, Cheek=X.XXX, Forehead=X.XXX"
# - "Face shape detected: [SHAPE]"
```

#### 5. Test with Different Images
- Try multiple photos of the same person
- Ensure photos are taken from different angles
- Check if the issue is consistent across images

#### 6. Reset AI Service Completely
```bash
# Stop and remove AI service
docker-compose stop ai-service
docker-compose rm ai-service

# Rebuild and start fresh
docker-compose build ai-service
docker-compose up -d ai-service
```

### Common Face Shape Detection Problems

| Problem | Solution |
|---------|----------|
| Always returns "Oval" | Check image quality and face detection confidence |
| Incorrect classification | Verify photo meets requirements above |
| "No face detected" error | Ensure clear, front-facing photo with good lighting |
| Service timeout | Check container resources and restart service |

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **AI Service**: http://localhost:8000

## 📱 Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Upload Photo**: Drag and drop or browse for a clear, front-facing photo
3. **Get Analysis**: AI analyzes your face shape
4. **View Recommendations**: See personalized hairstyle and beard style suggestions
5. **Explore Styles**: Each recommendation includes difficulty, maintenance, and compatibility info

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/glamai
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
AI_SERVICE_URL=http://localhost:8000
PORT=5000
```

### MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `glamai`
3. Update the `MONGODB_URI` in your `.env` file

## 🐳 Docker Deployment

### AI Service

```bash
cd ai-service
docker build -t glamai-ai .
docker run -p 8000:8000 glamai-ai
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Analysis
- `POST /api/analyze` - Analyze uploaded image (protected)
- `GET /api/analyze/styles` - Get all styles (protected)

### AI Service
- `POST /analyze-face` - Face shape analysis
- `GET /health` - Health check

## 🧪 Testing

### Backend
```bash
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
glamai/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication middleware
│   ├── scripts/         # Database seeding
│   └── server.js        # Main server file
├── ai-service/
│   ├── app.py           # Flask application
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile      # Docker configuration
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   └── main.jsx     # App entry point
│   ├── package.json     # Frontend dependencies
│   └── tailwind.config.js
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MediaPipe for facial landmark detection
- Unsplash for sample images
- Tailwind CSS for the beautiful design system
- React and Node.js communities for excellent tooling

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Glam.ai** - Discover your perfect style with AI-powered recommendations! ✨
