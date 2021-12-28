const db = require("../adapters/database/postgresql")
var _ = require("underscore");

exports.getLogLocations = async (req, res) => {

    const getLogLocationsQuery =
        "SELECT id, vehicle_id, device_id, latitude, longitude, created_at FROM log_location"
    try {

        const response = await db.pg_client.query(getLogLocationsQuery);
        res.send(response.rows);

    } catch (error) {
        res.send("error");
    }
}

exports.createLogLocation = async (req, res) => {

    let body = _.pick(req.body, "id", "vehicle_id", "device_id", "latitude", "longitude")

    try {

        const createLogLocationQuery = `INSERT INTO LOG_LOCATION (vehicle_id, device_id, latitude, longitude, created_at)
        VALUES ($1,$2,$3,$4,$5)`
        const values = [body.vehicle_id, body.device_id, body.latitude, body.longitude,"NOW()"];
        db.pg_client.query(createLogLocationQuery, values);
        res.send("log added")
    } catch (error) {
        res.send("error : not logged")
    }
}