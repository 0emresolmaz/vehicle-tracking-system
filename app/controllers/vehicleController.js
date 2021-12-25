const db = require("../adapters/database/postgresql")
var bodyParser = require("body-parser"); // veriyi parcalar (parseler) ve bize array doner
var _ = require("underscore"); //body parserdan donen arrayin indislerini tek tek okumak icin isimizi kolaylastirir.

exports.getVehicles = async (req, res) => {

    const getVehiclesQuery = "SELECT id, vehicle_plate, current_status, is_active FROM VEHICLES"
    try {

        const response = await db.pg_client.query(getVehiclesQuery);
        res.send(response.rows);

    } catch (error) {
        res.send("error");
    }
}

exports.createVehicle = async (req, res) => {

    let body = _.pick(req.body, "id", "vehicle_plate", "current_status", "is_active")  //pick objectin kopyasini doner.

    const getVehiclesQuery = "SELECT id, vehicle_plate, current_status, is_active FROM VEHICLES WHERE vehicle_plate = $1"
    const response = await db.pg_client.query(getVehiclesQuery, [body.vehicle_plate])

    if (response.rowCount === 0) {
        try {

            const createVehicleQuery = "INSERT INTO VEHICLES (vehicle_plate, current_status, is_active) VALUES ($1,$2,$3)"
            const values = [body.vehicle_plate, body.current_status, body.is_active];
            db.pg_client.query(createVehicleQuery,values);
            res.send("vehicle added")
        } catch (error) {

        }
    }
    else
    {
        res.send("vehicle is already exists")
    }
}

