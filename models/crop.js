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
        default: null
    }
})

cropsSchema.virtual('growthStage').get(function () {
    const currentDate = new Date();
    const plantingDate = this.plantingDate;
    const harvestDate = this.harvestDate;
  
    if (!plantingDate || !harvestDate) {
      return 0; // Als plantingDate of harvestDate niet is ingesteld, is de groeifase 0%
    }
  
    const totalDuration = harvestDate - plantingDate;
    const progress = Math.min(Math.max(currentDate - plantingDate, 0), totalDuration);
    const percentage = (progress / totalDuration) * 100;
  
    return Math.round(percentage); // Afgerond percentage van de groeifase
  });

  cropsSchema.set('toJSON', { virtuals: true });

const Crop = mongoose.model('Crop', cropsSchema);

module.exports = Crop;