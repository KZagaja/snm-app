const mongoose = require('mongoose');

const appSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    secret: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const App = mongoose.model('App', appSchema);

module.exports = App;
