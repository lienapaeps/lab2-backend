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
    field.farm = req.body.farm;
    field.owners = req.body.owners;
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

module.exports.getAll = getAll;
module.exports.create = create;