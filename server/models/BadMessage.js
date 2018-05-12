var mongoose = require('mongoose');
var BadMessageSchema = new mongoose.Schema({
  from: String,
  content: String
}, {
  timestamps: true
});

mongoose.model('BadMessage', BadMessageSchema);
module.exports = mongoose.model('BadMessage');