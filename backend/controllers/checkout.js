import { createCheckoutSession } from "../services/stripe.js";

export async function Checkout(req, res, next) {
  try {
    const session = await createCheckoutSession(req.body.items);
    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

