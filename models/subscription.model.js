import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minlength: [3, "Subscription name must be at least 3 characters long"],
    maxlength: [100, "Subscription name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Subscription price cannot be negative"],
  },
  curency: {
    type: String,
    required: [true, "Currency is required"],
    enum: ["USD", "EUR", "GBP", "INR"],
    default: "USD",
  },
  frequency: {
    type: String,
    // required: [true, "Subscription frequency is required"],
    enum: ["daily","weekly","monthly", "yearly"],
    default: "monthly",
  },
  category: {
    type: String,
    // trim: true,
    enum: ["entertainment", "education", "productivity", "health", "other"],
    default: "other",
    required: [true, "Subscription category is required"],
    maxlength: [50, "Category cannot exceed 50 characters"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Payment method is required"],
    trim: true,
    // enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "crypto"],
    // default: "credit_card",
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: [true, "Subscription start date is required"],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Start date cannot be in the future",
    },
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return !value || value > this.startDate;
      },
      message: "Renewal date must be after start date",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Associated user is required"],
    index: true,
  },
},
{ timestamps: true });
subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    // const daysToAdd = frequencyMap[this.frequency] || 30; // Default to monthly if frequency is unknown
    // this.renewalDate = new Date(this.startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  }
  if(this.renewalDate <= this.startDate) {
    // return next(new Error("Renewal date must be after start date"));
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);