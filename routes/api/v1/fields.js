const express = require('express');
const router = express.Router();
const fieldsController = require("../../../controllers/api/v1/fields");

// get all fields
router.get('/', fieldsController.getAll);

// get all fields by farm id 
router.get('/farm/:id', fieldsController.getByFarmId);

// get field by id
router.get('/:id', fieldsController.getById);

// create field
router.post("/", fieldsController.create);

// update field by id
router.put('/:id', fieldsController.update); 

// delete field by id
router.delete('/:id', fieldsController.remove);

module.exports = router;
