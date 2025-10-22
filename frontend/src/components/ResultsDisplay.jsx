import React from 'react';
import StyleCard from './StyleCard';
import { Scissors,Smile} from 'lucide-react';

const ResultsDisplay = ({ results }) => {
  const { face_shape, recommendations } = results;
  const { hairstyles, beardStyles } = recommendations;

  return (
    <div className="space-y-12">
      {/* Hairstyles Section */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Scissors className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900">
            Recommended Hairstyles
          </h3>
        </div>
        
        {hairstyles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hairstyles.map((style) => (
              <StyleCard key={style._id} style={style} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary-500">
            No hairstyle recommendations available for {face_shape} face shape.
          </div>
        )}
      </div>

      {/* Beard Styles Section */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Smile className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900">
            Recommended Beard Styles
          </h3>
        </div>
        
        {beardStyles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beardStyles.map((style) => (
              <StyleCard key={style._id} style={style} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary-500">
            No beard style recommendations available for {face_shape} face shape.
          </div>
        )}
      </div>

      {/* Face Shape Info */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
        <h4 className="text-lg font-semibold text-primary-900 mb-3">
          About Your {face_shape} Face Shape
        </h4>
        <p className="text-secondary-700 leading-relaxed">
          {getFaceShapeDescription(face_shape)}
        </p>
      </div>
    </div>
  );
};

const getFaceShapeDescription = (faceShape) => {
  const descriptions = {
    'Oval': 'Your oval face shape is considered the most versatile and balanced. You can pull off almost any hairstyle and beard style with confidence. The proportions are harmonious, giving you many styling options.',
    'Square': 'Your square face shape features strong, angular features with a broad forehead and jawline. Hairstyles that add height and soften the angles work best. Beard styles can help balance the strong jawline.',
    'Round': 'Your round face shape has soft, curved lines with similar width and length. Hairstyles that add height and create angles work well. Beard styles can help add definition and structure.',
    'Heart': 'Your heart-shaped face has a wider forehead and narrower chin. Hairstyles that add volume at the sides and reduce height work best. Beard styles can help balance the chin area.',
    'Oblong': 'Your oblong face shape is longer than it is wide. Hairstyles that add width and reduce length work well. Beard styles can help add fullness to the lower face.',
    'Diamond': 'Your diamond face shape has angular features with a narrow forehead and chin. Hairstyles that add width at the top and bottom work best. Beard styles can help balance the chin area.'
  };
  
  return descriptions[faceShape] || 'Your face shape has unique characteristics that can be enhanced with the right styling choices.';
};

export default ResultsDisplay;

