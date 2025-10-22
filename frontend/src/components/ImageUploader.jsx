import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Camera, X, Loader2 } from 'lucide-react';

// Get the API base URL
const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return '';
  } else {
    return 'http://localhost:5000';
  }
};

const API_BASE_URL = getApiBaseUrl();

const ImageUploader = ({ onAnalysisStart, onAnalysisComplete, isAnalyzing }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    setError('');
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)');
      return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    onAnalysisStart();
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post(`${API_BASE_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onAnalysisComplete(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error analyzing image. Please try again.');
      onAnalysisComplete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">
          Upload Your Photo
        </h3>
        <p className="text-secondary-600">
          For best results, use a clear, front-facing photo with good lighting
        </p>
      </div>

      {/* File Upload Area */}
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary-400 bg-primary-50' 
              : 'border-secondary-300 hover:border-primary-400 hover:bg-primary-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <Camera className="h-12 w-12 text-secondary-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-secondary-900">
                Drop your image here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-secondary-500 mt-1">
                Supports JPG, PNG up to 5MB
              </p>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        /* Preview and Analysis */
        <div className="space-y-4">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
            <button
              onClick={removeFile}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-secondary-100"
            >
              <X className="h-4 w-4 text-secondary-600" />
            </button>
          </div>
          
          <div className="text-center">
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="btn-primary px-8 py-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 mr-2" />
                  Analyze Photo
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Tips for Best Results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a clear, front-facing photo</li>
          <li>• Ensure good lighting and no shadows</li>
          <li>• Remove glasses, hats, or other accessories</li>
          <li>• Keep a neutral expression</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;

