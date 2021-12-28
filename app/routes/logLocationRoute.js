const express =require('express')
const logLocationController = require('../controllers/logLocationController')

const router = express.Router();

router.route("/gps_list").get(logLocationController.getLogLocations)
router.route("/gps_add").post(logLocationController.createLogLocation)

module.exports = router;