var mongoose = require('mongoose');

var HoroscopeSchema = new mongoose.Schema({
  temple: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple' },
  horoscopeno: { type: String, required: true },
  horoscope_th: String,
  horoscope_en: String,
  horoscope_chn: String,
  viewers: { type: Number, default: 0 },
  qrcode: Buffer,
  horoscope_photo: String,
  createid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  created: { type: Date, default: Date.now },
  updateid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Horoscope', HoroscopeSchema);
