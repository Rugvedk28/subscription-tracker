import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        // Simulate subscription creation logic
        const subscription= await Subscription.create({
            ...req.body, user: req.user._id
        })

        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscriptions/reminders`,
            body: { subscriptionId: subscription._id },
            headers: {
                "Content-Type": "application/json",
            },
            retries: 0, // Optional: number of retry attempts for the workflow trigger  
        })

        // Here you would typically save the subscription to a database
        res.status(201).json({success:true,
            data: subscription,
            message: "Subscription created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
};

export const getSubscription = async (req, res, next) => {
    try {
        // Simulate fetching subscription logic
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }
        res.status(200).json({success:true,
            data: subscription,
            message: "Subscription fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
};
