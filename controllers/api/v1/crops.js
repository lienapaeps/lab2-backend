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
    const cropsData = req.body.crops; // Ontvang de array van gewassenobjecten uit de payload

    // Maak een array aan om de promises voor het opslaan van gewassen en bijwerken van velden bij te houden
    const promises = [];

    // Itereer over elk gewasobject in de cropsData array
    cropsData.forEach(cropData => {
        let crop = new Crop();
        crop.name = cropData.name;
        crop.fieldId = cropData.fieldId;

        // Maak een promise aan voor het opslaan van het gewas
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

    // Wacht tot alle promises zijn voltooid
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
    const fieldId = req.params.id; // Ontvang het veldId uit de route parameters
    const cropsData = req.body.crops; // Ontvang de array van gewassenobjecten uit de payload
  
    // Zoek het veld op basis van het veldId
    Field.findById(fieldId)
      .then(field => {
        // Itereer over elk gewasobject in de cropsData array
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
              // Als het gewas ook gepland is, update de naam van het geplande gewas
              plannedCrop.name = cropName;
            }
          }
        });
  
        // Sla het veld op met de bijgewerkte gewassen en geplande gewassen
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

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getById = getById;
module.exports.update = update;