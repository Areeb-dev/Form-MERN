const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://areeb:areeb@cluster001.zrgem.mongodb.net/FORM?retryWrites=true&w=majority");
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
