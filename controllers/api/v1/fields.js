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

    field.farmId = req.body.farmId;
    // default owner is empty
    field.owner = [];
    field.available = true;
    field.name = req.body.name;
    field.size = req.body.size;
    field.crops = req.body.crops;
    // field.polygon = req.body.polygon;

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
    // let owner = req.user._id;

    let fieldId = req.params.id;

    Field.findOneAndUpdate({
        _id: fieldId,
    }, {
        $addToSet: {
            owner: {
                id: req.user._id,
                name: req.user.firstname
            }
        }
    }, {
        new: true
    }).then(doc => {
        res.json({
            "status": "success",
            "message": "Veld is geupdate",
            "data": {
                field: doc
            }
        })
    }).catch(err => {
        res.json({
            "status": "error",
            "message": "Veld kon niet worden geupdate",
            "error": err
        })
    })
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
        // get all fields by user id
        Field.find({ 
            // vind alle velden waarvan de user id in de owner array staat
            owner: req.params.id
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