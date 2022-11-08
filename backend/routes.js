const { response } = require('express');
const express = require('express');
const recordRoutes = express.Router();
const dbo = require("./db/conn");
const ObjectID = require("mongodb").ObjectID;

// Get all items
recordRoutes.route("/record").get(function (req,res) { // specify route and get as per REST
    let db_connect = dbo.getDb("inventory"); // Connect to the database
    db_connect.collection("records").find({}).toArray(function (err, result) { // Return all entries as array, throw error if error
        if (err) throw err;
        res.json(result);
    });
});

// Get select item by id 
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectID(req.params.id)};
    db_connect.collection("records").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// Create new item 
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        type: req.body.type,
        quantity: req.body.quantity
    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// Update an item by name
recordRoutes.route("/update/:id").post(function(req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectID(req.params.id)};
    let newvals = {
        $set: {
            name: req.body.name,
            type: req.body.type,
            quantity: req.body.quantity
        },
    };
    db_connect.collection("records").updateOne(myquery, newvals, function(err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// Delete an item by name
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectID(req.params.id)};
    db_connect.collection("records").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        response.json(obj);
    });
})

module.exports = recordRoutes;