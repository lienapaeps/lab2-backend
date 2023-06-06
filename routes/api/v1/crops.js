const express = require('express');
const router = express.Router();
const cropsController = require("../../../controllers/api/v1/crops");

// get all crops
router.get('/', cropsController.getAll);

// get crop by id
router.get('/:id', cropsController.getById);

// create crop
router.post("/", cropsController.create);

// update crop
router.put('/:id', cropsController.update);

// delete crop
// router.delete('/:id', cropsController.delete);

module.exports = router;
