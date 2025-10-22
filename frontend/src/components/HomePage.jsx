import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ResultsDisplay from './ResultsDisplay';
import { Sparkles, Camera } from 'lucide-react';

const HomePage = () => {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisResults(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-primary-100 p-3 rounded-full">
            <Camera className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          Discover Your Perfect Style
        </h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Upload a clear, front-facing photo and let our AI analyze your face shape 
          to recommend the perfect hairstyles and beard styles that complement your features.
        </p>
      </div>

      {/* Main Content */}
      {!analysisResults ? (
        <div className="card p-8">
          <ImageUploader 
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            isAnalyzing={isAnalyzing}
          />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Results Header */}
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">
              Analysis Complete!
            </h2>
            <p className="text-lg text-secondary-600">
              Your face shape: <span className="font-semibold text-primary-600">{analysisResults.face_shape}</span>
            </p>
          </div>

          {/* Results Display */}
          <ResultsDisplay results={analysisResults} />

          {/* Try Again Button */}
          <div className="text-center">
            <button
              onClick={() => setAnalysisResults(null)}
              className="btn-secondary"
            >
              Analyze Another Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
