const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

let originsWhitelist = [
    'http://localhost:4200'
	// add more whitelisted URLs here comma separated
];
let corsOptions = {
    origin: function(origin, callback) {
        let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}

const jsonParser = require('./utils/json-parser.js');
const csvToJson = require('./utils/csv-to-json.js');
const data = csvToJson.readFile(`${__dirname}/weather_data.csv`);
const json = csvToJson.buildJSONfromCSV(data);

// Generate JSON from CSV
csvToJson.writeJSONToFile(`${JSON.stringify(json, null, 4)}`, `${__dirname}/weather.json`);
// Get all time weather data
csvToJson.writeJSONToFile(JSON.stringify(jsonParser.getAllTimeWeatherData(json), null, 4), 
`${__dirname}/allyears.json`);

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

app.get('/getYears', function(req, res) {
    let json = csvToJson.json['WeatherData']['WeatherDataForYear'];
    res.send({
        'startYear' : json[0].Year,
        'endYear' : json[json.length-1].Year
    });
});

app.post('/getWeatherData', function(req, res) {
    console.log(req.body, 'data');
    let year = req.body && req.body.year;
    if (year === 0) {
        // send all year data
        res.send(jsonParser.getAllTimeWeatherData(json));
    } else {
        // send specific year data
        res.send(jsonParser.getWeatherDataForYear(year));
    }
});

const server = app.listen(3456, function() {
    console.log("[mock] mock server listening on port %s...", server.address().port);
});