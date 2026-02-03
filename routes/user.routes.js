import { Router } from "express";
const userRouter = Router();

// Example auth route
userRouter.get("/", (req, res) => {
  res.send("User profile route");
});

userRouter.get("/:id", (req, res) => {
  res.send(`User with id ${id} settings route`);
});

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