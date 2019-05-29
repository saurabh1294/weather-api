const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");






var originsWhitelist = [
    'http://localhost:4200'
	// add more whitelisted URLs here comma separated
];
var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
// whitelist domains for CORS/CORB
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log('[mock] requested URL:', req.url);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/getWeatherData', function(req, res) {
    
});

'use strict';

let jsonParser = require('./utils/json-parser.js');
let csvToJson = require('./utils/csv-to-json.js');
const data = csvToJson.readFile(`${__dirname}/weather_data.csv`);
const json = csvToJson.buildJSONfromCSV(data);


console.log(JSON.stringify(jsonParser.getWeatherDataForYear(2019), null, 4));
// Get weather data for given year
csvToJson.writeJSONToFile(`${JSON.stringify(json, null, 4)}`, `${__dirname}/weather.json`);
// Get all time weather data
csvToJson.writeJSONToFile(JSON.stringify(jsonParser.getAllTimeWeatherData(json), null, 4), 
`${__dirname}/allyears.json`);

 




// const routes = require("./mock.routes.js")(app);

const server = app.listen(3456, function() {
    console.log("[mock] mock server listening on port %s...", server.address().port);
});