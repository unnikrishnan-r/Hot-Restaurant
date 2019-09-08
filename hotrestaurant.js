// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// ==============================================================

var tableInfo = {
    "tableId": "1",
    "customerId": "Test Reservation",
    "customerName": "Dummy",
    "customerPhone": "",
    "customerEmail": "",
    "reservationStatus": "Reserved"
};

var tableList = [];
tableList.push(tableInfo);

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/frontendjs.js", function(req, res) {
    res.sendFile(path.join(__dirname, "frontendjs.js"));
});
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "viewTables.html"));
});

// Displays all reservations
app.get("/api/tables", function(req, res) {
    console.log("Processing the get api")
    console.log(tableList)
    return res.json(tableList);
});

// Create New Reservation - takes in JSON input
app.post("/api/reserve", function(req, res) {
    console.log("Porcessing the POST api")

    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.customerId = newTable.customerId.replace(/\s+/g, "");
    newTable.customerName = newTable.customerName.replace(/\s+/g, "");
    newTable.customerPhone = newTable.customerPhone.replace(/\s+/g, "");
    newTable.customerEmail = newTable.customerEmail.replace(/\s+/g, "");

    let status = "";

    if (tableList.length < 5) {
        status = "Reserved";
    } else {
        status = "Waiting";
    }

    newTable.reservationStatus = status;
    newTable.tableId = tableList.length + 1;

    console.log(newTable);

    tableList.push(newTable);

    res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});