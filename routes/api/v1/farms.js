const express = require('express');
const router = express.Router();
const farmsController = require("../../../controllers/api/v1/farms");

// get all farms
router.get('/', farmsController.getAll);

// get farm by id
router.get('/:id', farmsController.getById);

// create farm
router.post("/", farmsController.create);

// get farm by user id
router.get('/user/:id', farmsController.getByUserId);

// update farm by id
// router.put('/:id', farmsController.update);

// delete farm by id
// router.delete('/:id', farmsController.remove);

module.exports = router;
