const Crop = require("../../../models/crop")
const Field = require("../../../models/field")

const getAll = (req, res) => {
    Crop.find()
        .then(docs => {
            res.json({
                "status": "success",
                "message": "Gewassen gevonden",
                "data": {
                    "crops": docs
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Gewassen niet gevonden",
                "error": err
            })
        })
}

const create = (req, res) => {
    const cropsData = req.body.crops;

    // Maak een array aan om de promises voor het opslaan van gewassen en bijwerken van velden bij te houden
    const promises = [];

    cropsData.forEach(cropData => {
        let crop = new Crop();
        crop.name = cropData.name;
        crop.fieldId = cropData.fieldId;

        const cropPromise = crop.save()
            .then(savedCrop => {
                // Zoek het veld op basis van fieldId en update de crops array
                return Field.findById(cropData.fieldId)
                    .then(field => {
                        field.crops.push({
                            _id: savedCrop._id,
                            name: savedCrop.name
                        });
                        return field.save();
                    });
            });

        promises.push(cropPromise);
    });

    Promise.all(promises)
        .then(() => {
            res.json({
                "status": "success",
                "message": "Gewassen zijn toegevoegd en velden zijn bijgewerkt",
                "data": {
                    "crops": cropsData
                }
            });
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Gewassen konden niet worden toegevoegd of velden konden niet worden bijgewerkt",
                "error": err
            });
        });
};

const update = (req, res) => {
    const fieldId = req.params.id; 
    const cropsData = req.body.crops; 
  
    // Zoek het veld op basis van het veldId
    Field.findById(fieldId)
      .then(field => {
        cropsData.forEach(cropData => {
          const cropId = cropData._id;
          const cropName = cropData.name;
  
          // Zoek het gewas in de crops array van het veld op basis van het cropId
          const crop = field.crops.find(c => c._id.toString() === cropId);
  
          if (crop) {
            // Als het gewas is gevonden, update de naam van het gewas
            crop.name = cropName;
  
            // Controleer of het gewas ook gepland is
            const plannedCrop = field.plannedCrops.find(pc => pc._id.toString() === cropId);
  
            if (plannedCrop) {
              plannedCrop.name = cropName;
            }
          }
        });
  
        return field.save();
      })
      .then(updatedField => {
        res.json({
          status: "success",
          message: "Gewassen en geplande gewassen zijn bijgewerkt",
          data: {
            field: updatedField
          }
        });
      })
      .catch(err => {
        res.json({
          status: "error",
          message: "Gewassen en geplande gewassen konden niet worden bijgewerkt",
          error: err
        });
      });
  };

  const updateDate = (req, res) => {
    let cropId = req.params.id;
    let plantingDate = new Date(req.body.plantingDate);
  
    Crop.findById(cropId)
      .then(crop => {
        if (!crop) {
          return res.status(404).json({ error: 'Crop not found' });
        }
  
        crop.plantingDate = plantingDate;
  
        const minGrowthDays = 30;
        const maxGrowthDays = 90;
        const estimatedGrowthDays = Math.floor(Math.random() * (maxGrowthDays - minGrowthDays + 1)) + minGrowthDays;
  
        // Bereken harvestDate op basis van plantingDate en geschatte groeitijd
        let harvestDate = new Date(plantingDate);
        harvestDate.setDate(plantingDate.getDate() + estimatedGrowthDays);
  
        crop.harvestDate = harvestDate;
  
        // Start de interval-functie om de growthStage periodiek bij te werken
        const updateInterval = setInterval(() => {
          const currentDate = new Date();
          const elapsedDays = Math.floor((currentDate - plantingDate) / (1000 * 60 * 60 * 24));
          const totalDuration = estimatedGrowthDays;
          const progress = Math.min(Math.max(elapsedDays, 0), totalDuration);
          const percentage = (progress / totalDuration) * 100;
          crop.growthStage = Math.round(percentage);
  
          crop.save()
            .catch(error => {
              console.error(error);
            });
  
          // Controleer of de groei is voltooid
          if (crop.growthStage >= 100) {
            clearInterval(updateInterval);
          }
        }, 24 * 60 * 60 * 1000); // Update de growthStage elke 24 uur
  
        return crop.save();
      })
      .then(updatedCrop => {
        return res.status(200).json({ message: 'Planting date is successfully updated', crop: updatedCrop });
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      });
  };  
  
  
const getById = (req, res) => {
    Crop.findOne({ _id: req.params.id })
        .then(doc => {
            res.json({
                "status": "success",
                "message": "Gewas gevonden",
                "data": {
                    "crop": doc
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Gewas niet gevonden",
                "error": err
            })
        }
        )
}

const remove = (req, res) => {
    Crop.deleteOne({ _id: req.params.id })
        .then(doc => {
            res.json({
                "status": "success",
                "message": "Gewas verwijderd",
                "data": {
                    "crop": doc
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Gewas niet verwijderd",
                "error": err
            })
        }
        )
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getById = getById;
module.exports.update = update;
module.exports.updateDate = updateDate;
module.exports.remove = remove;