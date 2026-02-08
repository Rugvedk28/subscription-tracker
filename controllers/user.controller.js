import User from "../models/user.model.js";

//this function will fetch all users from db and send them in the response
export const getUsers = async (req, res, next) => {
    try {
        //to fetch all users, we can simply use the find method of the User model.
        //without any arguments.
        // This will return an array of all user documents in the database.
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
}

//this function will fetch a single user by id from db and send it in the response
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        //to fetch a single user by id, we can use the findById method of the User model.
        //we pass the id as an argument to this method.
        // This will return the user document with the specified id from the database.
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}