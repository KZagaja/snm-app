const mongoose = require('mongoose');

const userDeviceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    userAgent: { type: String },
    device: { type: String },
    ipAddress: { type: String },
    geolocation: { type: mongoose.Schema.Types.Mixed },
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

const UserDevice = mongoose.model('UserDevice', userDeviceSchema);

module.exports = UserDevice;
