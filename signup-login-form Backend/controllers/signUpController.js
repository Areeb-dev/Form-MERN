const SignupUser = require("../models/Signup.js");
const bcrypt = require("bcrypt");
module.exports = {
  createUser: async (req, res) => {
    try {
      const accountCreatedDate = new Date();
      const { fullName, email, number, password } = req.body;
      if (!fullName || !email || !number || !password) {
        return res.status(400).send({
          statusCode: 400,
          success: false,
          message: "Please Fill All Required fields",
        });
      }
      if (password.length <= 6) {
        return res.status(400).send({
          statusCode: 400,
          success: false,
          message: "Please Enter Strong Password",
        });
      }
      // check email is already exist or not?
      const checkEmail=await SignupUser.findOne({ email: email }).exec();
      if(checkEmail){
        return res.status(400).send({
          statusCode: 400,
          success: false,
          message: "Email Already Exist",
        });
      }
      //hash password
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(password, salt);
      const addUser = new SignupUser({
        fullName: fullName,
        email: email,
        number: number,
        password: hashPassword,
        date:accountCreatedDate
      });
      await addUser.save();

      return res.status(201).send({
        statusCode: 201,
        success: true,
        message: "User Created",
      });
    } catch (error) {
      return res.status(500).send({
        statusCode: 500,
        success: false,
        message: "Server Error",
      });
    }
  },
  getUser: async (req, res) => {
    const getAllUser = await SignupUser.find({});
    try {
      return res.status(200).send({
        statusCode: 200,
        success: true,
        data: getAllUser,
      });
    } catch (error) {
      return res.status(500).send({
        statusCode: 500,
        success: false,
        message: "Server Error",
      });
    }
  },
};
