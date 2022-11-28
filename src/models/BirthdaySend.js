const moongose = require('mongoose');

const BirthdaySendSchema = new moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    sent: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = moongose.model('BirthdaySend', BirthdaySendSchema);