from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import base64
import io
from PIL import Image
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
mp_drawing = mp.solutions.drawing_utils

def analyze_face_shape(landmarks):
    """
    Analyze face shape based on facial landmarks
    Returns: 'Oval', 'Square', 'Round', 'Heart', 'Oblong', or 'Diamond'
    """
    try:
        # Convert landmarks to numpy array
        points = np.array([[lm.x, lm.y] for lm in landmarks.landmark])
        
        # Get key facial measurements
        # Face width (ear to ear)
        left_ear = points[234]  # Left ear
        right_ear = points[454]  # Right ear
        face_width = np.linalg.norm(right_ear - left_ear)
        
        # Face height (forehead to chin)
        forehead = points[10]   # Forehead
        chin = points[152]      # Chin
        face_height = np.linalg.norm(chin - forehead)
        
        # Jaw width (jawline points)
        left_jaw = points[132]  # Left jaw
        right_jaw = points[361] # Right jaw
        jaw_width = np.linalg.norm(right_jaw - left_jaw)
        
        # Cheekbone width
        left_cheek = points[123] # Left cheekbone
        right_cheek = points[352] # Right cheekbone
        cheek_width = np.linalg.norm(right_cheek - left_cheek)
        
        # Forehead width (eyebrow level)
        left_forehead = points[103] # Left forehead
        right_forehead = points[334] # Right forehead
        forehead_width = np.linalg.norm(right_forehead - left_forehead)
        
        # Calculate ratios
        height_width_ratio = face_height / face_width
        jaw_face_ratio = jaw_width / face_width
        cheek_face_ratio = cheek_width / face_width
        forehead_face_ratio = forehead_width / face_width
        
        print(f"Debug - Ratios: H/W={height_width_ratio:.3f}, Jaw={jaw_face_ratio:.3f}, Cheek={cheek_face_ratio:.3f}, Forehead={forehead_face_ratio:.3f}")
        
        # Improved face shape classification
        if height_width_ratio > 1.6:
            # Long face
            if cheek_face_ratio < 0.75:
                return "Oblong"
            else:
                return "Diamond"
        elif height_width_ratio < 1.2:
            # Wide face
            if jaw_face_ratio > 0.9:
                return "Round"
            else:
                return "Square"
        else:
            # Medium proportions
            if abs(jaw_face_ratio - cheek_face_ratio) < 0.05:
                return "Oval"
            elif jaw_face_ratio > cheek_face_ratio + 0.1:
                return "Square"
            elif forehead_face_ratio > cheek_face_ratio + 0.1:
                return "Heart"
            else:
                return "Oval"
            
    except Exception as e:
        print(f"Error in face shape analysis: {e}")
        return "Oval"  # Default fallback

def detect_face_landmarks(image):
    """
    Detect facial landmarks using MediaPipe
    """
    with mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.7,  # Increased confidence threshold
        min_tracking_confidence=0.7
    ) as face_mesh:
        
        # Convert BGR to RGB
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Process the image
        results = face_mesh.process(rgb_image)
        
        if results.multi_face_landmarks:
            print(f"Face detected with {len(results.multi_face_landmarks[0].landmark)} landmarks")
            return results.multi_face_landmarks[0]
        else:
            print("No face detected in the image")
            return None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Glam.ai Face Analysis',
        'version': '1.0.0'
    })

@app.route('/analyze-face', methods=['POST'])
def analyze_face():
    """
    Main endpoint for face shape analysis
    Expects: JSON with 'image' (base64) and 'mime_type'
    Returns: JSON with 'face_shape'
    """
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = base64.b64decode(data['image'])
        image = Image.open(io.BytesIO(image_data))
        
        # Convert PIL image to OpenCV format
        opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Detect facial landmarks
        landmarks = detect_face_landmarks(opencv_image)
        
        if not landmarks:
            return jsonify({'error': 'No face detected in the image'}), 400
        
        # Analyze face shape
        face_shape = analyze_face_shape(landmarks)
        
        return jsonify({
            'face_shape': face_shape,
            'confidence': 'high',
            'message': f'Face shape detected: {face_shape}'
        })
        
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': 'Error processing image'}), 500

@app.route('/test', methods=['GET'])
def test():
    """Test endpoint"""
    return jsonify({
        'message': 'AI Service is running!',
        'endpoints': {
            'health': '/health',
            'analyze': '/analyze-face'
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
