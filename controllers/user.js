const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    //the object about to be created following our model
    let newUser = await new User({ name, email, password });
    //see if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already registered");
    } else {
      const salt = await bcrypt.genSalt(10);
      //replace password from request with the hashed one
      newUser.password = await bcrypt.hash(newUser.password, salt);
      newUser.save();
      return res.send(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to create user!");
  }
};

exports.logUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to login!");
  }
};

