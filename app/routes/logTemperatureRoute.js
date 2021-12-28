const express =require('express')
const logLocationController = require('../controllers/logTemperatureController')

const router = express.Router();

router.route("/temp_list").get(logLocationController.getLogTemperatures)
router.route("/temp_add").post(logLocationController.createLogTemperature)

module.exports = router;