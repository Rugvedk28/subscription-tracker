import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
//what is a req body? -> req.body contains the data sent by the client in a POST or PUT request.

export const signUp = async (req, res, next) => {
    //implement the sign-up logic here
    const session = await mongoose.startSession();
    session.startTransaction();
    //each transaction has to be ATOMIC in nature, so we will use transactions to ensure that 
    // all operations either ONLY succeed or fail together, nothing in between.

    try {
        //Logic to create a new user and save it to the database goes here
        const { name, email, password } = req.body;

        //check for existing user with the same email
        const existingUser = await User.findOne({ email }) ;
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        //if no existing user is found we hash the password and create a new user
        //Hashing a password
        //we will use bcrypt to hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //create new user
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword,
        }], { session }); //we pass the session to ensure that this operation is part of the transaction

        const token = jwt.sign(
            { userId: newUsers[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        ); 

        //if everything is successful, we commit the transaction and send a success response
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ 
            success: true, 
            message: "User created successfully",
            data: {
                userId: newUsers[0]._id,
                token,
            },
     });
    }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }

}

export const signIn = async (req, res, next) => {
    //implement the sign-in logic here
    try{
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        //compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password,  user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        //if authentication is successful, we generate a JWT token and send it back to the client
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                userId: user._id,
                token,
            },
        });  
    }
    catch (error) {
        next(error);
    } 
}

export const signOut = async (req, res, next) => {
    //implement the sign-out logic here
    try {
        res.status(200).json({
            success: true,
            message: "User signed out successfully",
        });
    }
    catch (error) {
        next(error);
    }
}