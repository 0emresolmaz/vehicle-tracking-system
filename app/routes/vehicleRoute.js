const express =require('express')
const vehicleController = require('../controllers/vehicleController')

const router = express.Router();
router.route("/").get(vehicleController.getVehicles)
router.route("/").post(vehicleController.createVehicle)
// router.route("/").put(vehicleController.updateVehicle)

module.exports = router;