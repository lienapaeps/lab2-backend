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
    let crop = new Crop();

    crop.name = req.body.name;
    //planting date and harvest date are not required
    crop.fieldId = req.body.fieldId;
    // crop.farmId = req.body.farmId;

    crop.save()
        .then(doc => {
            return Field.findById(req.body.fieldId);
        })
        .then(field => {
            field.crops.push(crop._id);
            return field.save();
        })
        .then(updatedField => {
            res.json({
                "status": "success",
                "message": "Gewas is toegevoegd en Field is bijgewerkt",
                "data": {
                    "crop": crop,
                    "field": updatedField
                }
            });
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Gewas kon niet worden toegevoegd",
                "error": err
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