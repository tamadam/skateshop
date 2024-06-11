import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_SECRET!, {
    apiVersion: "2024-04-10",
    typescript: true,
});