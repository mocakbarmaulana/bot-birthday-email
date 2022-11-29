const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

UserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
})

module.exports = mongoose.model('User', UserSchema);