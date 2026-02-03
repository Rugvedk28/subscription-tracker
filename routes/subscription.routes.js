import { Router } from "express";
const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("Get all subscriptions route");
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send(`Get subscription with id ${req.params.id} route`);
});

subscriptionRouter.post("/", (req, res) => {
  res.send("Create new subscription route");
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send(`Update subscription with id ${req.params.id} route`);
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send(`Delete subscription with id ${req.params.id} route`);
});

export default subscriptionRouter; 