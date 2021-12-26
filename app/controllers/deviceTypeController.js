const db = require("../adapters/database/postgresql")
var bodyParser = require("body-parser"); // veriyi parcalar (parseler) ve bize array doner
var _ = require("underscore"); //body parserdan donen arrayin indislerini tek tek okumak icin isimizi kolaylastirir.

exports.getDevicesTypes = async (req, res) => {

    const getDeviceTypesQuery = "SELECT id, device_name, device_description, is_active FROM DEVICES_TYPE"
    try {

        const response = await db.pg_client.query(getDeviceTypesQuery);
        res.send(response.rows);

    } catch (error) {
        res.send("error");
    }
}

exports.createDevicesType = async (req, res) => {

    let body = _.pick(req.body, "id", "device_name", "device_description", "is_active")  

    const getDeviceTypesQuery = "SELECT id, device_name, device_description, is_active FROM DEVICES_TYPE WHERE device_name = $1"
    const response = await db.pg_client.query(getDeviceTypesQuery, [body.device_name])

    if (response.rowCount === 0) {
        try {

            const createDeviceTypeQuery = "INSERT INTO DEVICES_TYPE (device_name, device_description, is_active) VALUES ($1,$2,$3)"
            const values = [body.device_name, body.device_description, body.is_active];
            db.pg_client.query(createDeviceTypeQuery, values);
            res.send("DeviceType added")
        } catch (error) {

        }
    }
    else {
        res.send("DeviceType is already exists")
    }
}

exports.deleteDevicesType = async (req, res) => {

    let body = _.pick(req.body, "id", "device_name", "device_description", "is_active")

    const getDeviceTypesQuery = "SELECT id, device_name, device_description, is_active FROM DEVICES_TYPE WHERE device_name = $1"
    const response = await db.pg_client.query(getDeviceTypesQuery, [body.device_name])

    if (response.rowCount === 0) {
        res.send("DeviceType is not exist in database")
    }
    else {
        try {
            const deleteDeviceTypeQuery = "DELETE FROM DEVICES_TYPE WHERE device_name = $1";
            db.pg_client.query(deleteDeviceTypeQuery, [body.device_name]);
            res.send("DeviceType deleted")
        } catch (error) {

        }

    }
}
