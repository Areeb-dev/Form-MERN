const express = require("express");
const router = express.Router();
const {
    signIn,
//   getUser,
} = require("../controllers/signInControllers.js");

router.post("/signIn", signIn);


module.exports = router;