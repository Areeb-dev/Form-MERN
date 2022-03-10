const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    date:{type:String}
});

const SignupUser = mongoose.model("SignupUser", userSchema);

module.exports = SignupUser;