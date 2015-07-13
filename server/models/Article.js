var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  created:  { type: Date, required: true },
  modified: { type: Date, required: true }
});

module.exports = ArticleSchema;
