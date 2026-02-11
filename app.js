import express from "express";
import { PORT } from './config/env.js';
import connectDB from "./database/mongodb.js";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import { workflowClient } from "./config/upstash.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());// Middleware to parse JSON bodies -> allows us to access req.body in our routes
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies -> allows us to access form data in req.body
app.use(cookieParser()); // Middleware to parse cookies -> allows us to access cookies in req.cookies
app.use(arcjetMiddleware);// Middleware to protect against bots and rate limit requests using Arcjet

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);

  await connectDB();

});
export default app;
