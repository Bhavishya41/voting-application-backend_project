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

app.get("/", (req,res) => {
    try{
        res.send("This API is working properly, please use tools like postman to test various endpoints of this application");
    }catch(err){
        res.send("Internal server Error");
    }
})