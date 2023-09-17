const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.BASE_URL;




app.get("/", (req, res) => {
  res.send(":)");
  
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
