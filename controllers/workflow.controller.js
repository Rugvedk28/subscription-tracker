import { createRequire } from 'module';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS= [7,5,2,1]; // Days before renewal to send reminders


export const sendReminders= serve(async(context)=> {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);
    // Here you would implement the logic to send a reminder, e.g., fetch subscription details and send an email
    
    if(!subscription || subscription.status !== 'active') {
        throw new Error('Subscription not found or not active');
    }

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date for subscription ${subscription._id} has passed.
            Stopping workflow execution.`);
            return;
    }

    for(const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isAfter(dayjs())) {
            // Schedule a reminder
            await sleepUntilReminder(context, `reminder_${daysBefore}_days`, reminderDate);
        }
        await triggerReminder(context, `reminder_${daysBefore}_days`);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async() => {
        // Simulate fetching subscription from database
        return Subscription.findById(subscriptionId).populate('user', 'email name');
    })
}

const sleepUntilReminder = async(conext, label, date)=> {
    console.log("Sleeping until reminder:", label, "at", date);
    await context.sleepUntil(date.toDate());
    console.log("Woke up for reminder:", label);
}

const triggerReminder = async(context, label) => {
    return await context.run(label, () => {
        // Simulate sending reminder, e.g., send email to user
        console.log(`Triggering reminder: ${label} for subscription ${context.requestPayload.subscriptionId}`);
        //send email logic here
    })
}