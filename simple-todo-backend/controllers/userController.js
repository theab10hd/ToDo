const User = require("../models/User");

const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in User!" });
    }

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    res.status(200).json({ message: "User Created", newUser });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Error Fetching Data!" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "No User Found!" });
    } else if (user.password != password) {
      return res.status(401).json({ message: "Password Not Match!" });
    } else {
      res.status(200).json({ message: "Login Success", user });
    }
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { Register, Login };
