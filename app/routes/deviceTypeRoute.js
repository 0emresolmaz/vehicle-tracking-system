const express =require('express')
const deviceTypeController = require('../controllers/deviceTypeController')

const router = express.Router();

router.route("/type_list").get(deviceTypeController.getDevicesTypes)
router.route("/type_add").post(deviceTypeController.createDevicesType)
router.route("/type_delete").delete(deviceTypeController.deleteDevicesType)

module.exports = router;