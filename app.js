const express = require("express")
const bodyParser = require("body-parser")
const _ = require("underscore")
const vehicleRouter = require("./app/routes/vehicleRoute")
const deviceTypeController = require("./app/routes/deviceTypeRoute")
const deviceController = require("./app/routes/deviceRoute")

var app = express();
app.use(bodyParser.json());


//Routes
app.use("/vehicle",vehicleRouter);
app.use("/device_type",deviceTypeController);
app.use("/device",deviceController);


app.get('*', function(req, res){
    res.send('404 Not Found');
  });


const port = 3000
app.listen(port, () => {
    console.log(`Sunucu port ${port} da calismaya basladi `);
})