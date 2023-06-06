const express = require('express');
const router = express.Router();
const fieldsController = require("../../../controllers/api/v1/fields");

// get all fields
router.get('/', fieldsController.getAll);

// get all fields by farm id 
router.get('/farm/:id', fieldsController.getByFarmId);

// get field by id
router.get('/:id', fieldsController.getById);

// get field by user id
router.get('/user/:id', fieldsController.getByUserId);

// create field
router.post("/", fieldsController.create);

// update/hire field by id
router.put('/hire/:id', fieldsController.hire); 

// update field by id
router.put('/update/:id', fieldsController.update);

// delete field by id
router.delete('/:id', fieldsController.remove);

// delete field and crops by id
router.delete('/delete/:id', fieldsController.removeFieldAndCrops);

module.exports = router;
