const Field = require("../../../models/field")

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

    field.name = req.body.name;
    field.users = req.body.users;
    field.size = req.body.size;
    field.crops = req.body.crops;
    field.polygon = req.body.polygon;

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

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getById = getById;
module.exports.getByFarmId = getByFarmId;