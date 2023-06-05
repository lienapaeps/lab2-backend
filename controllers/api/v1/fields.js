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

const update = (req, res) => {
    let fieldId = req.params.id;
    let userId = req.user._id;
    let cropId = req.body.cropId;

    Field.findOne({
        _id: fieldId
    }).then(existingField => {
        if (existingField) {
            if (existingField.owner.length >= 3) {
                res.json({
                    "status": "error",
                    "message": "Het maximum aantal gebruikers is al bereikt voor dit veld."
                });
            } else if (existingField.owner.some(user => user.id === userId)) {
                res.json({
                    "status": "error",
                    "message": "Je hebt dit veld al gehuurd."
                });
            } else {
                Crop.findById(cropId).then(existingCrop => {
                    if (existingCrop) {
                        Field.findOneAndUpdate(
                            {
                                _id: fieldId
                            },
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
                                        name: existingCrop.name
                                    }
                                }
                            },
                            {
                                new: true
                            }
                        ).then(doc => {
                            res.json({
                                "status": "success",
                                "message": "Je hebt het veld succesvol gehuurd.",
                                "data": {
                                    field: doc
                                }
                            });
                        }).catch(err => {
                            res.json({
                                "status": "error",
                                "message": "Veld kon niet worden gehuurd.",
                                "error": err
                            });
                        });
                    } else {
                        res.json({
                            "status": "error",
                            "message": "Geselecteerde crop kon niet worden gevonden."
                        });
                    }
                }).catch(err => {
                    res.json({
                        "status": "error",
                        "message": "Geselecteerde crop kon niet worden gevonden.",
                        "error": err
                    });
                });
            }
        } else {
            res.json({
                "status": "error",
                "message": "Veld kon niet worden gevonden."
            });
        }
    }).catch(err => {
        res.json({
            "status": "error",
            "message": "Veld kon niet worden gevonden.",
            "error": err
        });
    });
}

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

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getById = getById;
module.exports.getByFarmId = getByFarmId;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getByUserId = getByUserId;