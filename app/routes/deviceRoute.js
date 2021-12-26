const express =require('express')
const deviceController = require('../controllers/deviceController')

const router = express.Router();

router.route("/device_list").get(deviceController.getDevices)
router.route("/device_add").post(deviceController.createDevice)
router.route("/device_update/:id").put(deviceController.updateDevice)
router.route("/device_delete/:id").delete(deviceController.deleteDevice)


module.exports = router;