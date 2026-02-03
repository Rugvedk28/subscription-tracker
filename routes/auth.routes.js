import { Router } from "express";
const authRouter = Router();

authRouter.post("/signup", (req, res) => {
  res.send("Sign-up route");
});

authRouter.post("/signin", (req, res) => {
  res.send("Sign-in route");
});

authRouter.post("/signout", (req, res) => {
  res.send("Sign-out route");
});


export default authRouter;