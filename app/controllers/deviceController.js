const db = require("../adapters/database/postgresql")
var _ = require("underscore");

exports.getDevices = async (req, res) => {

    const getDevicesQuery = 
    `SELECT id, device_type_id, vehicle_id, device_name, is_online, is_active FROM DEVICES`;
    try {

        const response = await db.pg_client.query(getDevicesQuery);
        res.send(response.rows);

    } catch (error) {
        res.send("error");
    }
}

exports.createDevice = async (req, res) => {

    let body = _.pick(req.body, "id", "device_type_id", "vehicle_id", "device_name", "is_online", "is_active")

    const getVehiclesQuery =
    "SELECT id, vehicle_plate, current_status, is_active FROM VEHICLES WHERE id = $1"

    const response = await db.pg_client.query(getVehiclesQuery, [body.vehicle_id])

    if (response.rowCount === 0) {
        res.send("No exist vehicle, Device is not added")
    }
    else {
        try {

            const createDeviceQuery =
            "INSERT INTO DEVICES (device_type_id, vehicle_id, device_name, is_online, is_active) VALUES ($1,$2,$3,$4,$5)"
            const values = 
            [body.device_type_id, body.vehicle_id, body.device_name, body.is_online,body.is_active];
            db.pg_client.query(createDeviceQuery, values);
            res.send("device added")
        } catch (error) {

        }
    }
}

exports.updateDevice = async (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, "id", "device_type_id", "vehicle_id", "device_name", "is_online", "is_active")

    const getDevicesQuery = "SELECT id, device_type_id, vehicle_id, device_name, is_online, is_active FROM DEVICES WHERE id = $1"

    const response = await db.pg_client.query(getDevicesQuery, [id])

    if (response.rowCount === 0) {
        res.send("device is not exist in database")
    }
    else {
        try {

            const createVehicleQuery = "UPDATE DEVICES SET device_type_id =$1, vehicle_id =$2, device_name =$3, is_online =$4, is_active =$5  where id =$6"
            const values = [body.device_type_id, body.vehicle_id, body.device_name, body.is_online, 
            body.is_active, id];
            db.pg_client.query(createVehicleQuery, values);
            res.send("vehicle updated")
        } catch (error) {

        }

    }
}

exports.deleteDevice = async (req, res) => {

    let id = req.params.id;

    const getDevicesQuery = "SELECT id, device_type_id, vehicle_id, device_name, is_online, is_active FROM DEVICES WHERE id = $1"
    const response = await db.pg_client.query(getDevicesQuery, [id])

    if (response.rowCount === 0) {
        res.send("device is not exist in db")
    }
    else {
        try {
            const deleteDeviceQuery = "DELETE FROM DEVICES WHERE id = $1";
            db.pg_client.query(deleteDeviceQuery, [id]);
            res.send("device deleted")
        } catch (error) {

        }
    }
}
