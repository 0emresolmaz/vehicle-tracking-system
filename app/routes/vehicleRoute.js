const express =require('express')
const vehicleController = require('../controllers/vehicleController')

const router = express.Router();
router.route("/").get(vehicleController.getVehicles)
router.route("/").post(vehicleController.createVehicle)
router.route("/:vehicle_plate").put(vehicleController.updateVehicle)
router.route("/").delete(vehicleController.deleteVehicle)


module.exports = router;