import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(items) {
   return stripe.checkout.sessions.create({
    mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100), // Convert to cents
          product_data: {
            name: item.name,
          },
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
}



