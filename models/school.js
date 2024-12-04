const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    latitude: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= -90 && value <= 90,
            message: 'Latitude must be between -90 and 90.',
        },
    },
    longitude: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= -180 && value <= 180,
            message: 'Longitude must be between -180 and 180.',
        },
    },
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;