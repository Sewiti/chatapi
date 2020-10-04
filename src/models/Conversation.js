const mongoose = require('mongoose');
const usersLimit = 30;


const ConversationSchema = mongoose.Schema({
    members: {
        type: [{
            user: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Users',
                required: true
            },
            status: {
                type: String,
                enum: ['creator', 'member', 'invited', 'banned'],
                default: 'invited',
                required: true
            },
            joinedAt: {
                type: Date,
                default: null
            }
        }],
        validate: [(array) => { return array.length <= usersLimit; }, `{PATH} exceeds the limit of ${usersLimit}`],
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


module.exports = mongoose.model('Conversations', ConversationSchema);
