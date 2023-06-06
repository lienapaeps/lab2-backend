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

cropsSchema.pre('save', function(next) {
    const currentDate = new Date();
    const plantingDate = this.plantingDate;
    const harvestDate = this.harvestDate;
  
    if (plantingDate && harvestDate) {
      const totalDuration = harvestDate - plantingDate;
      const progress = Math.min(Math.max(currentDate - plantingDate, 0), totalDuration);
      const percentage = (progress / totalDuration) * 100;
  
      // Rond het percentage af op het dichtstbijzijnde gehele getal
      this.growthStage = Math.round(percentage);
    } else {
      this.growthStage = 0;
    }
  
    next();
  });
   
const Crop = mongoose.model('Crop', cropsSchema);

module.exports = Crop;