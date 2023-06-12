const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    plantingDate: {
        type: Date,
        default: null
    },
    harvestDate: {
        type: Date,
        default: null
    },
    fieldId: {
        type: String
    },
    growthStage: {
        type: Number,
        default: 0
    }
})
   
const Crop = mongoose.model('Crop', cropsSchema);

module.exports = Crop;