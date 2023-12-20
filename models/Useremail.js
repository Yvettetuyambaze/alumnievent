const {roles} = require('../utils/constants')
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
 
});

//Hash the plain text password before saving
UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      // deciding roles
      if(this.email === process.env.ADMIN_EMAIL){
        this.role = roles.admin
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Usermail = mongoose.model("Useremail", UserSchema);

module.exports = Usermail;
