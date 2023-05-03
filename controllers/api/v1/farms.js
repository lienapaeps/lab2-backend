const Farm = require("../../../models/farm")

const getAll = (req, res) => {
    Farm.find()
        .then(docs => {
            res.json({
                "status": "success",
                "message": "Boerderijen gevonden",
                "data": {
                    "farms": docs
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Boerderijen niet gevonden",
                "error": err
            })
        })
}

const getById = (req, res) => {
    Farm.findById(req.params.id)
        .then(doc => {
            res.json({
                "status": "success",
                "message": "Boerderij gevonden",
                "data": {
                    "farm": doc
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Boerderij niet gevonden",
                "error": err
            })
        })
}

const create = (req, res) => {
    let farm = new Farm();

    farm.name = req.body.name;
    farm.street = req.body.street;
    farm.streetnumber = req.body.streetnumber;
    farm.postalcode = req.body.postalcode;
    farm.city = req.body.city;
    farm.location = req.body.location;

    farm.save()
        .then(doc => {
            res.json({
                "status": "success",
                "message": "Boerderij is toegevoegd",
                "data": {
                    "farm": doc
                }
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "message": "Boerderij kon niet worden toegevoegd",
                "error": err
            })
        })
};

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;