import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";
const bcrypt = require("bcryptjs");

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const user = await User.find({ email });

        if(user) {
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        if(newUser) {
            generateToken(newUser._id,res);
            await newUser.save();
        } else {
            return res.status(401).json({message: "Invalid Credentials"});
        }
    } catch (err) {
        res.status(400).send({})
    }
};
export const login = (req, res) => {
    res.send("login route");
};
export const logout = (req, res) => {
    res.send("logout route");
};