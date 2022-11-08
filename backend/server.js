const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.use(cors());
app.use(express.json());
app.use(require("./routes"));


const dbo = require("./db/conn");
app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});