const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    imageUrl: {
        type: String,
        default: null
    },
    displayName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: '',
        max: 300
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['user', 'admin', 'banned'],
        default: 'user',
        required: true
    },
    activeAt: {
        type: Date,
        default: Date.now,
        required: true
    }
},
{
    timestamps: { createdAt: 'created_at' }
});


module.exports = mongoose.model('Users', UserSchema);
