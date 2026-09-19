import axios from "axios";

export default async function getProducts() {
 
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data.map((product) => ({
        id: `fake_${product.id}`,
        name: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        currency: "USD",
    }));

}