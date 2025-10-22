const mongoose = require('mongoose');
const Style = require('../models/Style');
require('dotenv').config();

const styles = [
  // Hairstyles
  {
    name: "Classic Pompadour",
    description: "A timeless style that adds height and volume, perfect for creating a strong, confident look. The swept-back style works well with most face shapes and can be styled formally or casually.",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Square", "Heart"],
    difficulty: "Medium",
    maintenance: "High"
  },
  {
    name: "Textured Crop",
    description: "A modern, low-maintenance cut that adds texture and movement. Perfect for active lifestyles and works well with most face shapes.",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Round", "Square", "Heart", "Oblong", "Diamond"],
    difficulty: "Easy",
    maintenance: "Low"
  },
  {
    name: "Side Part",
    description: "A classic, professional look that's versatile and timeless. The side part adds structure and can be styled in various ways.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Square", "Heart", "Diamond"],
    difficulty: "Easy",
    maintenance: "Medium"
  },
  {
    name: "Quiff",
    description: "A bold, voluminous style that creates height and adds personality. Perfect for those who want to make a statement.",
    imageUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Square", "Heart"],
    difficulty: "Medium",
    maintenance: "High"
  },
  {
    name: "Buzz Cut",
    description: "A clean, minimal cut that's extremely low maintenance. Perfect for those who prefer simplicity and functionality.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"],
    difficulty: "Easy",
    maintenance: "Low"
  },
  {
    name: "Slick Back",
    description: "A sophisticated, polished look that's perfect for formal occasions. Creates a sleek, professional appearance.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Square", "Heart"],
    difficulty: "Medium",
    maintenance: "Medium"
  },
  {
    name: "Messy Top",
    description: "A casual, textured style that's perfect for everyday wear. Easy to maintain and gives a relaxed, approachable look.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Round", "Square", "Heart", "Oblong", "Diamond"],
    difficulty: "Easy",
    maintenance: "Low"
  },
  {
    name: "Fade",
    description: "A modern cut that transitions from short to long, creating a clean, sharp look. Very versatile and popular.",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    type: "hairstyle",
    suitedFaceShapes: ["Oval", "Round", "Square", "Heart", "Oblong", "Diamond"],
    difficulty: "Medium",
    maintenance: "Medium"
  },

  // Beard Styles
  {
    name: "Full Beard",
    description: "A classic, masculine look that adds character and can help balance longer face shapes. Requires regular grooming and maintenance.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Round", "Heart"],
    difficulty: "Medium",
    maintenance: "High"
  },
  {
    name: "Stubble",
    description: "A low-maintenance style that adds definition without being overwhelming. Perfect for those who want a rugged look with minimal effort.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"],
    difficulty: "Easy",
    maintenance: "Low"
  },
  {
    name: "Goatee",
    description: "A focused style that draws attention to the chin area. Great for adding definition and can help balance various face shapes.",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Square", "Heart", "Diamond"],
    difficulty: "Medium",
    maintenance: "Medium"
  },
  {
    name: "Van Dyke",
    description: "A sophisticated style combining a mustache and goatee. Perfect for those who want a distinguished, artistic look.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Square", "Heart", "Diamond"],
    difficulty: "Hard",
    maintenance: "High"
  },
  {
    name: "Chin Strap",
    description: "A thin line of beard that follows the jawline. Great for adding definition and can help create the illusion of a stronger jaw.",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Square", "Heart"],
    difficulty: "Medium",
    maintenance: "Medium"
  },
  {
    name: "Clean Shaven",
    description: "A timeless, professional look that's always in style. Perfect for those who prefer a clean, polished appearance.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"],
    difficulty: "Easy",
    maintenance: "Low"
  },
  {
    name: "Bandholz",
    description: "A natural, untrimmed beard that grows freely. Perfect for those who embrace a wild, natural look.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Round", "Heart"],
    difficulty: "Easy",
    maintenance: "Low"
  },
  {
    name: "Corporate Beard",
    description: "A well-groomed, professional beard that's trimmed and shaped. Perfect for business environments while maintaining character.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    type: "beard-style",
    suitedFaceShapes: ["Oval", "Square", "Heart", "Diamond"],
    difficulty: "Medium",
    maintenance: "High"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing styles
    await Style.deleteMany({});
    console.log('Cleared existing styles');

    // Insert new styles
    const insertedStyles = await Style.insertMany(styles);
    console.log(`Successfully inserted ${insertedStyles.length} styles`);

    // Display summary
    const hairstyles = insertedStyles.filter(s => s.type === 'hairstyle');
    const beardStyles = insertedStyles.filter(s => s.type === 'beard-style');
    
    console.log(`\nSummary:`);
    console.log(`- Hairstyles: ${hairstyles.length}`);
    console.log(`- Beard Styles: ${beardStyles.length}`);
    console.log(`- Total: ${insertedStyles.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
