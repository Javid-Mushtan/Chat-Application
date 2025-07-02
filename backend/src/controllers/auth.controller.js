import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if(newUser) {
            await newUser.save();
            generateToken(newUser._id,res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            return res.status(400).json({message: "Invalid Credentials"});
        }
    } catch (error) {
        console.log("Error in signup controller " + error.message);
        res.status(400).send({message: "Invalid Credentials"});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        generateToken(user._id,res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in signup controller " + error.message);
        res.status(400).send({message: "Invalid Credentials"});
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("jwt","", { maxAge: 0 });
        res.status(200).json({message: "Logged out successfully"});
    } catch(error) {
        console.log("Error in logout controller " + error.message);
        res.status(500).send({message: "Invalid Credentials"});
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic },
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile" });
    }
}

export const checkAuth = async (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error) {
        console.log("Error in checkAuth controller " + error.message);
        res.status(500).send({message: "Internal server error"});
    }
}