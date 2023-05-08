const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema ({
    farmId: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
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
    polygon: {
        type: Array,
        required: true
    }
})

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;