const express = require('express');
const router = express.Router();
const fieldsController = require("../../../controllers/api/v1/fields");

// get all fields
router.get('/', fieldsController.getAll);

// get all fields by farm id 
router.get('/farm/:id', fieldsController.getByFarmId);

// get field by id
router.get('/:id', fieldsController.getById);

// create farm
router.post("/", fieldsController.create);

// update farm by id
// router.put('/:id', farmsController.update);

// delete farm by id
// router.delete('/:id', farmsController.remove);

module.exports = router;
