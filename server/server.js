const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000




app.get("/", (req, res) => {
  res.send(":)");
  
});

// app.listen(PORT, () => {
//   console.log(`server running at ${PORT}`);
// });


mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(PORT, () =>{
                console.log(`Server running on port ${PORT}`)
            })
        })

        .catch((err) => console.log(err))