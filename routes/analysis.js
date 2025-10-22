const express = require('express');
const multer = require('multer');
const axios = require('axios');
const auth = require('../middleware/auth');
const Style = require('../models/Style');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Main analysis endpoint
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Convert image buffer to base64 for AI service
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');
    const mimeType = req.file.mimetype;

    // Send image to AI service for face shape analysis
    const aiResponse = await axios.post(process.env.AI_SERVICE_URL + '/analyze-face', {
      image: base64Image,
      mime_type: mimeType
    }, {
      timeout: 60000 // 30 second timeout
    });

    const { face_shape } = aiResponse.data;

    if (!face_shape) {
      return res.status(400).json({ message: 'Could not detect face shape from image' });
    }

    // Get style recommendations based on face shape
    const hairstyles = await Style.find({
      type: 'hairstyle',
      suitedFaceShapes: face_shape
    }).limit(6);

    const beardStyles = await Style.find({
      type: 'beard-style',
      suitedFaceShapes: face_shape
    }).limit(6);

    res.json({
      face_shape,
      recommendations: {
        hairstyles,
        beardStyles
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        message: 'AI service is currently unavailable. Please try again later.' 
      });
    }
    
    if (error.response?.data?.message) {
      return res.status(400).json({ message: error.response.data.message });
    }
    
    res.status(500).json({ message: 'Error analyzing image' });
  }
});

// Get all styles (for debugging/development)
router.get('/styles', auth, async (req, res) => {
  try {
    const styles = await Style.find({});
    res.json(styles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching styles' });
  }
});

module.exports = router;
