const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Farm = require('./farm');

const fieldSchema = new Schema ({
    farmId: {
        type: Object,
        ref: Farm
    },
    owner: {
        type: Array,
        maxlength: 3
    },
    available: {
        type: Boolean
    },
    name: {
        type: String,
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
    // polygon: [
    //     {
    //         "lat": {
    //             type: Number,
    //             required: true
    //         },
    //         "lng": {
    //             type: Number,
    //             required: true
    //         }
    //     }
    // ]
})

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;