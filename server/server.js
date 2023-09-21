const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
const PORT = process.env.BASE_URL;
const DB_CONNECT_LINK = process.env.DB_URL;


mongoose
  .connect(DB_CONNECT_LINK) 
  .then(() => {
    console.log("DB Connected");
    
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send(":)");
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});


