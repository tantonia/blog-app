import bcryptjs from 'bcryptjs';
import User from '../models/User.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken";

export const signup = async(req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, password: hashedPassword});
    try {
        const existingUser = await User.findOne({username});
        if (existingUser){
            throw errorHandler(409, 'user already exists');
        }
        await newUser.save();
        res.status(201).json('user created successfully');
    } catch {
        console.error(error.message);
        res.status(error.statusCode).json(error.message);
    }
};

export const signin = async (req, res) => {
    const {username, password} = req.body;
    try {
        const validUser = await User.findOne({username});
        if(!validUser) {
            throw errorHandler(404, 'user not found');
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            throw errorHandler(401, 'wrong credentials');
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json(rest);
    } catch(error) {
        console.error(error.message);
        res.status(error.statusCode).json(error.message);
    }
};

export const signout = async(req, res) => {
    try {
        const token = req.cookies.access_token;
        if (token) {
            res.clearCookie("access_token");
            res.status(200).json('user has been logged out!');
        } else {
            throw errorHandler(404, 'user is already logged out');
        }
    } catch(error) {
        console.error(error.message);
        res.status(error.statusCode).json(error.message);
    }
};

export const checkRoute = async(req, res) => {
    try {
        if(req.user) {
            res.json({isAuthorized:true});
        } else {
            throw errorHandler(500, 'internal server error');
        }
    } catch(error) {
        console.error(error.message);
        res.status(error.statusCode).json(error.message);
    }
};