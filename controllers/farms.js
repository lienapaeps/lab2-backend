const Farm = require('../models/farm');

// get all farms

// get farm by id

// create farm
const create = (req, res) => {
    let farm = new Farm();

    farm.name = req.body.name;
    // farm.address = req.body.address;
    // farm.location = req.body.location;
    // farm.openinghours = req.body.openinghours;
    // farm.fields = req.body.fields;

    farm.save((err, doc) => {
        // er ging iets mis
        if (err) {
            res.json({
                "status": "error",
                "message": "Boerderij kon niet worden toegevoegd",
                "error": err
            })
        }
        // boerderij is opgeslagen
        if (!err) {
            res.json({
                "status": "success",
                "message": "Boerderij is toegevoegd",
                "data": {
                    "farm": doc
                }
            })
        }
    })
};

// update farm by id

// delete farm by id

module.exports.create = create;