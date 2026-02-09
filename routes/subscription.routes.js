import { Router } from "express";
const subscriptionRouter = Router();
import authorise from "../middlewares/auth.middleware.js";
import { createSubscription } from "../controllers/subscription.controller.js";

subscriptionRouter.get("/", (req, res) => {
  res.send("Get all subscriptions route");
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send(`Get subscription with id ${req.params.id} route`);
});

subscriptionRouter.post("/", authorise, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send(`Update subscription with id ${req.params.id} route`);
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send(`Delete subscription with id ${req.params.id} route`);
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send(`Get subscriptions for user with id ${req.params.id} route`);
});

subscriptionRouter.post("/:id/cancel", (req, res) => {
    res.send(`Cancel subscription with id ${req.params.id} route`);
});

subscriptionRouter.post("/renewals", (req, res) => {
    res.send("Handle subscription renewals route");
});

export default subscriptionRouter; 