const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    displayName: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,  
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            // Only required if the user is not authenticated via Google
            return !this.googleId;
        }
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
    
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('User', UserSchema)