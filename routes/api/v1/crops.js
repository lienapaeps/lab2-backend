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

// update date of crop
router.put('/date/:id', cropsController.updateDate);

// delete crop
router.delete('/:id', cropsController.remove);

module.exports = router;
