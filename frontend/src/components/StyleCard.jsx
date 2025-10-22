import React from 'react';
import { Clock, Star, TrendingUp } from 'lucide-react';

const StyleCard = ({ style }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getMaintenanceColor = (maintenance) => {
    switch (maintenance) {
      case 'Low':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'High':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-secondary-600 bg-secondary-100';
    }
  };

  return (
    <div className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="style-card-container h-48">
        <img
          src={style.imageUrl}
          alt={style.name}
          className="style-card-image hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback placeholder if image fails to load */}
        <div className="hidden w-full h-full items-center justify-center bg-gray-200 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">{style.name}</div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(style.difficulty)}`}>
            {style.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Type */}
        <div className="mb-3">
          <h4 className="text-lg font-semibold text-secondary-900 mb-1">
            {style.name}
          </h4>
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
            {style.type === 'hairstyle' ? 'Hairstyle' : 'Beard Style'}
          </span>
        </div>

        {/* Description */}
        <p className="text-secondary-600 text-sm leading-relaxed mb-4">
          {style.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-secondary-400" />
            <span className="text-xs text-secondary-500">
              {style.maintenance} Maintenance
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-secondary-400" />
            <span className="text-xs text-secondary-500">
              {style.difficulty} to Style
            </span>
          </div>
        </div>

        {/* Face Shape Compatibility */}
        <div className="mt-4 pt-4 border-t border-secondary-200">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-primary-500" />
            <span className="text-xs font-medium text-secondary-700">
              Perfect for {style.suitedFaceShapes.join(', ')} face shapes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleCard;
