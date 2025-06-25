const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const port = process.env.PORT;
require("dotenv").config();

app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})