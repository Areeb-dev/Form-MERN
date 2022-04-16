const SignupUser = require("../models/Signup.js");
const bcrypt = require("bcrypt");

module.exports = {
  signIn: async (req, res) => {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({
          statusCode: 400,
          success: false,
          message: "Please Fill All Required Fields",
        });
      }
      // check user exist or not?
      const checkEmail = await SignupUser.findOne({ email: email }).exec();

      if (!checkEmail) {
        return res.status(400).send({
          statusCode: 400,
          success: false,
          message: "InValid Credentials!",
        });
      }

      //if user exist then check password isCorrect or not?
      const getpassWord = checkEmail.password;
      //getpassWord == get password form database
      const recheckPassword=bcrypt.compareSync(password, getpassWord);

      if(!recheckPassword){
        return res.status(400).send({
            statusCode: 400,
            success: false,
            message: "Incorect Password!",
          });
      }

      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Sign In sucessfully",
      });
    } catch (e) {
      console.log("error", e);
      return res.status(500).send({
        statusCode: 500,
        success: false,
        message: "Server Error",
      });
    }
  },
};
