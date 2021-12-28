const db = require("../adapters/database/postgresql")
var _ = require("underscore");

exports.getLogTemperatures = async (req, res) => {

    const getLogTemperaturesQuery =
        "SELECT id, vehicle_id, device_id, read_data, created_at FROM log_temperature"
    try {

        const response = await db.pg_client.query(getLogTemperaturesQuery);
        res.send(response.rows);

    } catch (error) {
        res.send("error");
    }
}

exports.createLogTemperature = async (req, res) => {

    let body = _.pick(req.body, "id", "vehicle_id", "device_id", "read_data")

    try {

        const createLogTemperatureQuery = `INSERT INTO LOG_TEMPERATURE (vehicle_id, device_id, read_data, created_at)
        VALUES ($1,$2,$3,$4)`
        const values = [body.vehicle_id, body.device_id, body.read_data,"NOW()"];
        db.pg_client.query(createLogTemperatureQuery, values);
        res.send("temperature log added")
    } catch (error) {
        res.send("error : temperature not logged")
    }
}