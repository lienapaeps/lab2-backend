const Field = require("../../../models/field")
const Crop = require("../../../models/crop")

const getAll = (req, res) => {
    Field.find()
        .then(docs => {
            res.json({
                "status": "success",
                "message": "Velden gevonden",
                "data": {
                    "fields": docs
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Velden niet gevonden",
                "error": err
            })
        })
}

const create = (req, res) => {
    let field = new Field();

    field.farmId = req.body.farmId;
    // default owner is empty
    field.owner = [];
    field.available = true;
    field.name = req.body.name;
    field.size = req.body.size;
    field.crops = [];
    field.plannedCrops = [];

    field.save()
        .then(doc => {
            res.json({
                "status": "success",
                "message": "Veld is toegevoegd",
                "data": {
                    "field": doc
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Veld kon niet worden toegevoegd",
                "error": err
            })
        })
};

const hire = async (req, res) => {
    try {
      const fieldId = req.params.id;
      const userId = req.user._id;
      const cropId = req.body.cropId;
  
      const existingField = await Field.findOne({ _id: fieldId });
  
      if (!existingField) {
        return res.json({
          status: "error",
          message: "Veld kon niet worden gevonden."
        });
      }
  
      if (existingField.owner.length >= 3) {
        return res.json({
          status: "error",
          message: "Het maximum aantal gebruikers is al bereikt voor dit veld."
        });
      }
  
      if (existingField.owner.some(user => user.id === userId)) {
        return res.json({
          status: "error",
          message: "Je hebt dit veld al gehuurd."
        });
      }
  
      const existingCrop = await Crop.findById(cropId);
  
      if (!existingCrop) {
        return res.json({
          status: "error",
          message: "Geselecteerde crop kon niet worden gevonden."
        });
      }
  
      const updatedField = await Field.findOneAndUpdate(
        { _id: fieldId },
        {
          $addToSet: {
            owner: {
              id: userId,
              name: req.user.firstname
            }
          },
          $push: {
            plannedCrops: {
              _id: existingCrop._id,
              name: existingCrop.name,
              userId: userId
            }
          }
        },
        { new: true }
      );
  
      res.json({
        status: "success",
        message: "Je hebt het veld succesvol gehuurd.",
        data: {
          field: updatedField
        }
      });
    } catch (err) {
      res.json({
        status: "error",
        message: "Er is een fout opgetreden.",
        error: err
      });
    }
};

const update = (req, res) => {
  const fieldId = req.params.id; 
  const { name, size } = req.body; 
  // Zoek het veld op basis van het veldId
  Field.findById(fieldId)
    .then(field => {
      if (!field) {
        throw new Error('Veld niet gevonden');
      }

      field.name = name;
      field.size = size;

      return field.save();
    })
    .then(updatedField => {
      res.json({
        status: "success",
        message: "Veld is bijgewerkt",
        data: {
          field: updatedField
        }
      });
    })
    .catch(err => {
      res.json({
        status: "error",
        message: "Veld kon niet worden bijgewerkt",
        error: err.message
      });
    });
};

const remove = (req, res) => {
    let fieldId = req.params.id;

    Field.findOneAndDelete({
        _id: fieldId
    }).then(doc => {
        res.json({
            "status": "success",
            "message": "Veld is verwijderd",
            "data": {
                field: doc
            }
        })
    }).catch(err => {
        res.json({
            "status": "error",
            "message": "Veld kon niet worden verwijderd",
        })
    })
}

const getById = (req, res) => {
    Field.findOne({ _id: req.params.id })
        .then(doc => {
            res.json({
                "status": "success",
                "message": "Veld gevonden",
                "data": {
                    "field": doc
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Veld niet gevonden",
                "error": err
            })
        })
}

const getByFarmId = (req, res) => {
    // get all fields by farm id
    Field.find({ farmId: req.params.id })
        .then(docs => {
            res.json({
                "status": "success",
                "message": "Velden gevonden",
                "data": {
                    "fields": docs
                }
            })
        }
        )
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Velden niet gevonden",
                "error": err
            })
        })
}

const getByUserId = (req, res) => {
        const userId = req.params.id;
        // get all fields by user id
        Field.find({ 
            owner: { $elemMatch: { id: userId } }
         })
        .then(docs => {
            res.json({
                "status": "success",
                "message": "Velden gevonden",
                "data": {
                    "fields": docs
                }
            })
        }
        )
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Velden niet gevonden",
                "error": err
            })
        })
}

const removeFieldAndCrops = async (req, res) => {
  try {
    const fieldId = req.params.id;

    // Verwijder het veld
    await Field.findByIdAndDelete(fieldId);

    // Verwijder de bijbehorende crops
    await Crop.deleteMany({ fieldId });

    res.json({ message: 'Veld en bijbehorende crops zijn succesvol verwijderd' });
  } catch (error) {
    res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van het veld en de crops' });
  }
};

const getPlannedCropByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const field = await Field.findOne({ "owner.id": userId });

    if (!field) {
      return res.json({
        status: "error",
        message: "Veld niet gevonden voor de opgegeven gebruiker."
      });
    }

    if (!field.owner.some(owner => owner.id === userId)) {
      return res.json({
        status: "error",
        message: "Je bent geen eigenaar van dit veld."
      });
    }

    const plannedCrop = field.plannedCrops.find(crop => crop.userId === userId);

    if (!plannedCrop) {
      return res.json({
        status: "error",
        message: "Geen gepland gewas gevonden voor de opgegeven gebruiker."
      });
    }

    res.json({
      status: "success",
      data: {
        plannedCrop
      }
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Er is een fout opgetreden.",
      error: err
    });
  }
};

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getById = getById;
module.exports.getByFarmId = getByFarmId;
module.exports.hire = hire;
module.exports.remove = remove;
module.exports.getByUserId = getByUserId;
module.exports.update = update;
module.exports.removeFieldAndCrops = removeFieldAndCrops;
module.exports.getPlannedCropByUserId = getPlannedCropByUserId;