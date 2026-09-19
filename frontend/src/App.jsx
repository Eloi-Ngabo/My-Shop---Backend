import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Interactive UI states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please check if your backend server is running on http://localhost:3000.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Cart operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter logic
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium animate-pulse">Loading catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">!</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Failure</h2>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-lg">S</div>
            <span className="text-xl font-black tracking-tight text-gray-900">MyShop</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
            />
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            aria-label="Shopping Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase">New Collection</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Discover Premier Quality Products</h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl">
              Explore our curated selection. Click any product image for a full-size preview or add items straight to your cart.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters & Mobile Search */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
          <div className="sm:hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {categories.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto my-12">
            <p className="text-gray-500 font-medium">No products match your current selection.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-emerald-600 text-sm font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id || product._id}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Preview Window */}
                <div 
                  className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => setPreviewImage(product.image)}
                >
                  <img
                    src={product.image || "https://via.placeholder.com/400?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                      Expand Image ↗
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                      {product.description || "No product description provided."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-xs text-gray-400 block">Price</span>
                      <span className="text-lg font-black text-emerald-600">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-gray-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Your Cart ({totalCartItems})</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-emerald-600 font-bold mt-0.5">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 border rounded-md flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 border rounded-md flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => alert("Proceeding to checkout!")}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-md"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Image Lightbox Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={previewImage}
              alt="Full view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 font-bold text-xl"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
