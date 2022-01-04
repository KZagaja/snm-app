const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    appId: { type: mongoose.Schema.ObjectId, ref: 'App', required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    userAgent: { type: String },
    device: { type: String },
    ipAddress: { type: String },
    geolocation: { type: mongoose.Schema.Types.Mixed },
    active: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
