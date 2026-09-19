import express from "express";
import cors from "cors";

import productsRoutes from "./routes/products.js";
import checkoutRouter from "./routes/checkout.js";

import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/checkout", checkoutRouter);
app.use("/products", productsRoutes);

app.use(errorHandler);
app.use(notFound);

export default app;