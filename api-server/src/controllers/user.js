require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET_TOKEN = process.env.SECRET_TOKEN;

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      image: `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrecte" });
    } else {
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword) {
        res
          .status(401)
          .json({ message: "Identifiant ou mot de passe incorrecte" });
      } else {
        res.status(200).json({
          username: user.username,
          userId: user._id,
          token: jwt.sign({ userId: user._id }, SECRET_TOKEN, {
            expiresIn: "24h",
          }),
          image: user.image,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.modifyProfile = async (req, res) => {
  try {
    const userObject = req.file
      ? {
          ...req.body.user,
          image: `${req.protocol}://${req.get("host")}/avatars/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    const user = await User.findOne({ _id: req.params.id });
    if (user._id != req.auth.userId) {
      return res.status(403).json({ message: "Non autorisé" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      userObject,
      {
        new: true,
      }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};
