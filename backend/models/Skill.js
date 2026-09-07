const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  offering: { type: String, required: true },
  seeking: { type: String, required: true }
}, {
  timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
