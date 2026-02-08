import { Router } from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
const userRouter = Router();

// Example auth route
userRouter.get("/", getUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/", (req, res) => {
  res.send("Create new user route");
});

userRouter.put("/:id", (req, res) => {
  res.send(`Update user with id ${id} route`);
});

userRouter.delete("/:id", (req, res) => {
  res.send(`Delete user with id ${id} route`);
});



export default userRouter;  