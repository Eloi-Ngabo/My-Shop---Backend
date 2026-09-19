import getProducts from "../services/fakeStore.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const products = await getProducts();
    const productId = Number(req.params.id);
    const product = products.find((p) => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

