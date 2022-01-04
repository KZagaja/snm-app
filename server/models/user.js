const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  // Basic info
  idx: { type: Number, unique: true },
  nickname: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  recoverPasswordHash: { type: String },
  avatar: { type: String },
  registeredAt: { type: Date },
  isActive: { type: Boolean, default: false },
  timezone: { type: String, default: 'Europe/Warsaw' },
  accountLevel: { type: Number, default: 0 },
  //Level - 0 - user
  //Level - 1 - player
  //Level - 1.5 - chimu
  //Level - 2 - mod
  //Level - 3 - game master
  //Level - 4 - engineers
  //Level - 5 - H@

  // Additional info
  profileFields: {
    kp: { type: String },
    settlement: { type: String },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    otherInfo: { type: String },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userHistoryLog: [
    {
      author: { type: String },
      authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String },
      createdAt: { type: Date },
    },
  ],
});

userSchema.plugin(AutoIncrement, { inc_field: 'idx' });

userSchema.virtual('name').get(function () {
  return this.nickname;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
