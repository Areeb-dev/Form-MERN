const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Form");
let cors = require("cors");
app.use(cors());
app.use(express.json());

const signupRoute = require("./routes/signUpRoute.js");
const signInRoute = require("./routes/signInRoutes");

app.use("/", signupRoute);
app.use("/", signInRoute);
app.listen(3001, () => {
  console.log("Server is working");
});
