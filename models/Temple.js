var mongoose = require('mongoose');

var TempleSchema = new mongoose.Schema({
  templeName: { type: String, required: true },
  templeExplain: { type: String, required: true },
  address: { type: String, required: true },
  tambol: { type: String, required: true },
  district: { type: String, required: true },
  province: { type: String, required: true },
  postcode: String,
  phone: String,
  contactsName: { type: String, required: true },
  contactsPhone: { type: String, required: true },
  contactsEmail: String,
  status: Boolean,
  photo: Buffer,
  temple_photo: String,
  createid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  created: { type: Date, default: Date.now },
  updateid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Temple', TempleSchema);
