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

cropsSchema.pre('update', function() {
    const currentDate = new Date();
    const plantingDate = this.getUpdate().$set.plantingDate;
    const harvestDate = this.getUpdate().$set.harvestDate;
  
    if (plantingDate && harvestDate) {
      const totalDuration = harvestDate - plantingDate;
      const progress = Math.min(Math.max(currentDate - plantingDate, 0), totalDuration);
      const percentage = (progress / totalDuration) * 100;
  
      // Rond het percentage af op het dichtstbijzijnde gehele getal
      this.setUpdate({ $set: { growthStage: Math.round(percentage) } });
    } else {
      this.setUpdate({ $set: { growthStage: 0 } });
    }
  });
  
  

const Crop = mongoose.model('Crop', cropsSchema);

module.exports = Crop;