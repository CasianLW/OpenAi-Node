const { config } = require("dotenv");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

// pour lancer le index public sur le meme port
app.use(express.static("public"));

// cors au cas ou de probleme
// app.use(cors());
// console.log(123);
//  Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => console.log(`Server started on port: ${port}`));
