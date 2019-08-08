const mongoose = require('mongoose');
serviceSchema = new mongoose.Schema({
  timeCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  userName: { type: String, maxlength: 100, required: true, trim: true },
  category: {
    type: String,
    enum: ['all industries', 'advertising marketing', 'agriculture fishing and forestry', 'tourism travel', 'technology', 'retail, fashion', 'real estate', 'ngo', 'manufacturing', 'logistics transportation', 'law enforcement security', 'law', 'internet and telecommunications', 'advertising marketing', 'mining, oil and metals', 'healthcare', 'entertainment', 'education', 'digital media  communications', 'construction', 'banking, finance and insurance', 'automotive and aviation', 'art and design'],
    maxlenght: 50,
    minlength: 10,
    required: true,
    trim: true,
    default: 'all industries'
  },

  role: {
    type: String,
    maxlength: 50,
    minlength: 5,
    required: true,
    trim: true
  },
  serviceTitle: {
    type: String,
    maxlength: 20,
    minlength: 10,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 200,
    minlength: 10,
    required: true,
    trim: true
  },
  published: {
    type: Boolean,
    enum: [true, false],
    default: false
  }
});
module.exports=serviceSchema;