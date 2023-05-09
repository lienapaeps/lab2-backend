const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Farm = require('./farm');

const fieldSchema = new Schema ({
    farmId: {
        type: Object,
        ref: Farm
    },
    name: {
        type: String,
        required: true
    },
    owners: {
        type: Array,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    crops: {
        type: Array,
        required: true
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

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;