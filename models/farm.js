const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    streetnumber: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        "latitude": {
            type: Number,
            required: true
        },
        "longitude": {
            type: Number,
            required: true
        }
    },
    polygon: [
        {
            "latitude": {
                type: Number,
                required: true
            },
            "longitude": {
                type: Number,
                required: true
            }
        }
    ]
})

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;