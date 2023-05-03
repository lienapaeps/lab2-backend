var express = require('express');
var router = express.Router();
const farmsController = require("../controllers/farms");

// get all farms
// router.get('/', farmsController.getAll);

// get farm by id
// router.get('/:id', farmsController.getById);

// create farm
router.post('/', farmsController.create);

// update farm by id
// router.put('/:id', farmsController.update);

// delete farm by id
// router.delete('/:id', farmsController.remove);

module.exports = router;
