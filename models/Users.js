var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new mongoose.Schema({
  name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  email: String,
  role: Number,
  status: Boolean,
  Created: { type: Date, default: Date.now },
  Updated: { type: Date, default: Date.now }
});

UsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', UsersSchema);
