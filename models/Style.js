const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['hairstyle', 'beard-style'],
    required: true
  },
  suitedFaceShapes: [{
    type: String,
    enum: ['Oval', 'Square', 'Round', 'Heart', 'Oblong', 'Diamond'],
    required: true
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  maintenance: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
}, {
  timestamps: true
});

// Index for efficient queries
styleSchema.index({ suitedFaceShapes: 1, type: 1 });

module.exports = mongoose.model('Style', styleSchema);
