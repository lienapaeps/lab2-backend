const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema ({
    farmId: {
        type: String
    },
    owner: [ {
        id: {
            type: Schema.Types.ObjectId,
            // required: true
        },
        name: {
            type: String,
            // required: true
        }
    }],
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
        // required: true
    },
})

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;