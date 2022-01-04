const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = new mongoose.Schema({
  idx: { type: Number, unique: true },
  content: { type: String },
});
