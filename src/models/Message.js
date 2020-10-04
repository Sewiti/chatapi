const mongoose = require('mongoose');


const MessageSchema = mongoose.Schema({
    conversation: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Conversations',
        required: true
    },
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'imageUrl'],
        default: 'text',
        required: true
    }
},
{
    timestamps: { sentAt: 'created_at' }
});


module.exports = mongoose.model('Messages', MessageSchema);
