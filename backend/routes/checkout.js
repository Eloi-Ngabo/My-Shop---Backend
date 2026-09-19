import express from "express";
import { Checkout } from "../controllers/checkout.js";

const router = express.Router();

router.post("/", Checkout);


export default router;