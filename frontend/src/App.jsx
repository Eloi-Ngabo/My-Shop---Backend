/* eslint-disable no-undef */
// import { useState, useEffect } from "react";

// export default function App() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Interactive UI states
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [previewImage, setPreviewImage] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/products");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products. Please check if your backend server is running on http://localhost:3000.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Cart operations
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find((item) => item.id === product.id);
//       if (existing) {
//         return prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (id, delta) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) => {
//           if (item.id === id) {
//             const newQty = item.quantity + delta;
//             return newQty > 0 ? { ...item, quantity: newQty } : null;
//           }
//           return item;
//         })
//         .filter(Boolean)
//     );
//   };

//   const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   // Filter logic
//   const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
  
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           product.description?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
//         <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="text-gray-600 font-medium animate-pulse">Loading catalog...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//         <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
//           <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">!</div>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Failure</h2>
//           <p className="text-gray-500 text-sm mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
//           >
//             Retry Connection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
//       {/* Navigation Header */}
//       <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-lg">S</div>
//             <span className="text-xl font-black tracking-tight text-gray-900">MyShop</span>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-md hidden sm:block">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
//             />
//           </div>

//           {/* Cart Trigger */}
//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
//             aria-label="Shopping Cart"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//             </svg>
//             {totalCartItems > 0 && (
//               <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
//                 {totalCartItems}
//               </span>
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Hero Banner */}
//       <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
//           <div>
//             <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase">New Collection</span>
//             <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Discover Premier Quality Products</h2>
//             <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl">
//               Explore our curated selection. Click any product image for a full-size preview or add items straight to your cart.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content Area */}
//       <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Category Filters & Mobile Search */}
//         <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
//           <div className="sm:hidden">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
//             />
//           </div>

//           {categories.length > 1 && (
//             <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
//                     selectedCategory === category
//                       ? "bg-emerald-600 text-white shadow-sm"
//                       : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Grid */}
//         {filteredProducts.length === 0 ? (
//           <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto my-12">
//             <p className="text-gray-500 font-medium">No products match your current selection.</p>
//             <button
//               onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
//               className="mt-4 text-emerald-600 text-sm font-semibold hover:underline"
//             >
//               Reset filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id || product._id}
//                 className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* Image Preview Window */}
//                 <div 
//                   className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
//                   onClick={() => setPreviewImage(product.image)}
//                 >
//                   <img
//                     src={product.image || "https://via.placeholder.com/400?text=No+Image"}
//                     alt={product.name}
//                     className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                     <span className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
//                       Expand Image ↗
//                     </span>
//                   </div>
//                 </div>

//                 {/* Details */}
//                 <div className="p-5 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
//                       {product.name}
//                     </h3>
//                     <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
//                       {product.description || "No product description provided."}
//                     </p>
//                   </div>

//                   <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
//                     <div>
//                       <span className="text-xs text-gray-400 block">Price</span>
//                       <span className="text-lg font-black text-emerald-600">
//                         ${Number(product.price || 0).toFixed(2)}
//                       </span>
//                     </div>

//                     <button
//                       onClick={() => addToCart(product)}
//                       className="px-4 py-2 bg-gray-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm active:scale-95"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Slide-out Cart Drawer */}
//       {isCartOpen && (
//         <div className="fixed inset-0 z-50 overflow-hidden">
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
//             onClick={() => setIsCartOpen(false)}
//           />
//           <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
//             <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
//               <div className="p-6 border-b border-gray-100 flex items-center justify-between">
//                 <h2 className="text-lg font-bold text-gray-900">Your Cart ({totalCartItems})</h2>
//                 <button
//                   onClick={() => setIsCartOpen(false)}
//                   className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Cart List */}
//               <div className="flex-1 overflow-y-auto p-6 space-y-4">
//                 {cart.length === 0 ? (
//                   <div className="text-center py-12 text-gray-400">
//                     <p>Your cart is empty.</p>
//                   </div>
//                 ) : (
//                   cart.map((item) => (
//                     <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded-lg bg-gray-100"
//                       />
//                       <div className="flex-1">
//                         <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
//                         <p className="text-xs text-emerald-600 font-bold mt-0.5">
//                           ${(item.price * item.quantity).toFixed(2)}
//                         </p>
//                         <div className="flex items-center space-x-2 mt-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, -1)}
//                             className="w-6 h-6 border rounded-md flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100"
//                           >
//                             -
//                           </button>
//                           <span className="text-xs font-semibold">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.id, 1)}
//                             className="w-6 h-6 border rounded-md flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               {/* Checkout Footer */}
//               {cart.length > 0 && (
//                 <div className="p-6 border-t border-gray-100 bg-gray-50">
//                   <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
//                     <span>Subtotal</span>
//                     <span>${cartTotal.toFixed(2)}</span>
//                   </div>
//                   <button
//                     onClick={() => alert("Proceeding to checkout!")}
//                     className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-md"
//                   >
//                     Checkout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Full-Screen Image Lightbox Modal */}
//       {previewImage && (
//         <div 
//           className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
//           onClick={() => setPreviewImage(null)}
//         >
//           <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
//             <img
//               src={previewImage}
//               alt="Full view"
//               className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
//             />
//             <button
//               onClick={() => setPreviewImage(null)}
//               className="absolute -top-10 right-0 text-white hover:text-gray-300 font-bold text-xl"
//             >
//               Close ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, X, Sparkles, Star, 
  Plus, Minus, Trash2, Eye, ArrowRight,
  Maximize2, AlertCircle, CheckCircle2, ArrowUpDown,
  ShoppingBag as CartIcon, Heart, Package
} from 'lucide-react';

// High quality catalog fallback if local server at http://localhost:3000/products is offline


export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Interactive UI states
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [previewImage, setPreviewImage] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setIsUsingFallback(false);
      } catch (err) {
        console.warn("Backend API unreachable at http://localhost:3000/products. Using rich mock dataset fallback.", err);
        setProducts(MOCK_PRODUCTS);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to your bag.`);
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

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("Item removed from bag.");
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist.`);
        return [...prev, product];
      }
    });
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalCartItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutModalOpen(false);
      setOrderComplete(false);
      setIsCartOpen(false);
      showToast("Order placed successfully! Thank you for shopping with us.");
    }, 2000);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#020617',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid rgba(16, 185, 129, 0.2)',
            borderTopColor: '#34d399',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <ShoppingBag style={{ width: '24px', height: '24px', color: '#34d399', position: 'absolute' }} />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.025em', color: '#f1f5f9', margin: 0 }}>Initializing Storefront</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Connecting to catalog API...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020617',
      color: '#f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          backgroundColor: '#10b981',
          color: '#020617',
          fontWeight: 'bold',
          fontSize: '14px',
          padding: '12px 20px',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #6ee7b7'
        }}>
          <CheckCircle2 style={{ width: '20px', height: '20px' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backgroundColor: 'rgba(2, 6, 23, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          
          {/* Logo */}
          <div 
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '16px',
              background: 'linear-gradient(to top right, #10b981, #5eead4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#020617',
              fontWeight: 900,
              fontSize: '20px',
              boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)'
            }}>
              S
            </div>
            <div>
              <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.05em', color: '#ffffff', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block' }}>EloiStore</span>
              <span style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block' }}>Premium Goods</span>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '448px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search premium electronics, apparel, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '44px',
                paddingRight: '40px',
                paddingTop: '10px',
                paddingBottom: '10px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '14px',
                color: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <Search style={{ width: '16px', height: '16px', color: '#94a3b8', position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>
            )}
          </div>

          {/* Right Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative',
                padding: '12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Shopping Cart"
            >
              <CartIcon style={{ width: '20px', height: '20px', color: '#e2e8f0' }} />
              {totalCartItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'linear-gradient(to right, #34d399, #2dd4bf)',
                  color: '#020617',
                  fontSize: '12px',
                  fontWeight: 900,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sandbox Alert */}
      {isUsingFallback && (
        <div style={{
          background: 'linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.2))',
          borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
          color: '#fcd34d',
          padding: '8px 16px',
          fontSize: '12px',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
          <span>
            Backend server (http://localhost:3000) not detected. Operating in <strong>Sandbox Mode</strong> with curated mock inventory.
          </span>
        </div>
      )}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'linear-gradient(to bottom right, #0f172a, #020617, rgba(6, 78, 59, 0.4))',
        padding: '64px 16px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '384px',
          height: '384px',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '50%',
          filter: 'blur(64px)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              width: 'fit-content'
            }}>
              <Sparkles style={{ width: '14px', height: '14px' }} /> Modern Collection
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              lineHeight: 1.1,
              margin: 0
            }}>
              Elegance Meets <span style={{
                background: 'linear-gradient(to right, #34d399, #99f6e4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Innovation</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '16px', maxWidth: '576px', margin: 0, lineHeight: 1.6 }}>
              Explore meticulously crafted technology, luxury timepieces, and refined lifestyle goods. Free worldwide express delivery on orders over $150.
            </p>
            <div style={{ paddingTop: '8px' }}>
              <button
                onClick={() => {
                  const elem = document.getElementById("product-catalog");
                  elem?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: '14px 24px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(to right, #34d399, #2dd4bf)',
                  color: '#020617',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.25)'
                }}
              >
                Browse Catalog <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
                alt="Featured Headphone" 
                style={{
                  borderRadius: '16px',
                  width: '100%',
                  height: '320px',
                  objectFit: 'cover',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Featured Item</p>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Aura Pro Headphones</p>
                </div>
                <span style={{ color: '#34d399', fontWeight: 800, fontSize: '14px' }}>$299.99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main id="product-catalog" style={{
        flex: 1,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '40px 16px',
        boxSizing: 'border-box'
      }}>

        {/* Filter Controls Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          
          {/* Category Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {categories.map((cat) => {
              const count = cat === "All" 
                ? products.length 
                : products.filter(p => p.category === cat).length;

              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected ? 'linear-gradient(to right, #34d399, #2dd4bf)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#020617' : '#cbd5e1'
                  }}
                >
                  <span>{cat}</span>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    backgroundColor: isSelected ? 'rgba(2, 6, 23, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    color: isSelected ? '#020617' : '#94a3b8',
                    fontWeight: 900
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                backgroundColor: '#0f172a',
                color: '#e2e8f0',
                fontSize: '12px',
                fontWeight: 600,
                padding: '8px 12px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            maxWidth: '448px',
            margin: '48px auto',
            backdropFilter: 'blur(12px)'
          }}>
            <Package style={{ width: '48px', height: '48px', color: '#64748b', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px' }}>No products found</h3>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '24px' }}>
              No inventory matched "{searchQuery}" under {selectedCategory}.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#10b981',
                color: '#020617',
                fontWeight: 'bold',
                fontSize: '12px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some(p => p.id === product.id);

              return (
                <div
                  key={product.id || product._id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  {/* Image Container */}
                  <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: 'rgba(15, 23, 42, 0.6)', overflow: 'hidden' }}>
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        display: 'block'
                      }}
                      onClick={() => setQuickViewProduct(product)}
                    />
                    
                    {/* Top Badges */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10 }}>
                      {product.isNew && (
                        <span style={{
                          backgroundColor: '#10b981',
                          color: '#020617',
                          fontSize: '10px',
                          fontWeight: 900,
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          New
                        </span>
                      )}
                      <span style={{
                        backgroundColor: 'rgba(2, 6, 23, 0.7)',
                        color: '#cbd5e1',
                        backdropFilter: 'blur(12px)',
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '9999px'
                      }}>
                        {product.category || "General"}
                      </span>
                    </div>

                    {/* Quick Action Buttons */}
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
                      <button
                        onClick={() => toggleWishlist(product)}
                        style={{
                          padding: '8px',
                          borderRadius: '50%',
                          backdropFilter: 'blur(12px)',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: isWishlisted ? '#f43f5e' : 'rgba(2, 6, 23, 0.6)',
                          color: isWishlisted ? '#ffffff' : '#cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Wishlist"
                      >
                        <Heart style={{ width: '16px', height: '16px', fill: 'currentColor' }} />
                      </button>
                      <button
                        onClick={() => setPreviewImage(product.image)}
                        style={{
                          padding: '8px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(2, 6, 23, 0.6)',
                          color: '#cbd5e1',
                          backdropFilter: 'blur(12px)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Expand Image"
                      >
                        <Maximize2 style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>

                    {/* Quick View Bar */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '10px',
                        backgroundColor: 'rgba(2, 6, 23, 0.9)',
                        color: '#e2e8f0',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(12px)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Eye style={{ width: '14px', height: '14px', color: '#34d399' }} /> Quick View
                    </button>
                  </div>

                  {/* Card Details */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Rating */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '12px', marginBottom: '6px' }}>
                        <Star style={{ width: '14px', height: '14px', fill: '#fbbf24' }} />
                        <span style={{ fontWeight: 'bold' }}>{product.rating || "4.8"}</span>
                        <span style={{ color: '#64748b', fontSize: '11px' }}>({product.reviewsCount || "42"})</span>
                      </div>

                      <h3 
                        onClick={() => setQuickViewProduct(product)}
                        style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          margin: '0 0 6px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {product.name}
                      </h3>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '12px',
                        lineHeight: 1.5,
                        margin: '0 0 16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.description || "Premium high-quality crafted item."}
                      </p>
                    </div>

                    <div style={{
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}>
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 600, color: '#64748b', display: 'block' }}>Price</span>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#34d399' }}>
                          ${Number(product.price || 0).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          padding: '8px 16px',
                          background: 'linear-gradient(to right, #34d399, #2dd4bf)',
                          color: '#020617',
                          fontSize: '12px',
                          fontWeight: 900,
                          borderRadius: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(2, 6, 23, 0.8)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setIsCartOpen(false)}
          />
          <div style={{ position: 'fixed', top: 0, bottom: 0, right: 0, maxWidth: '100%', display: 'flex', paddingLeft: '40px' }}>
            <div style={{
              width: '100vw',
              maxWidth: '448px',
              backgroundColor: '#0f172a',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              
              {/* Drawer Header */}
              <div style={{ padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CartIcon style={{ width: '20px', height: '20px', color: '#34d399' }} />
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Shopping Bag ({totalCartItems})</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    padding: '8px',
                    color: '#94a3b8',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                </button>
              </div>

              {/* Drawer Items List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '64px 0', color: '#64748b' }}>
                    <ShoppingBag style={{ width: '48px', height: '48px', margin: '0 auto 12px', color: '#475569' }} />
                    <p style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>Your shopping bag is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      style={{ fontSize: '12px', color: '#34d399', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Explore items and start adding →
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      padding: '14px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '12px', backgroundColor: '#1e293b', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                        <p style={{ fontSize: '12px', color: '#34d399', fontWeight: 800, margin: '2px 0 0' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: '#cbd5e1',
                              backgroundColor: 'transparent',
                              cursor: 'pointer'
                            }}
                          >
                            <Minus style={{ width: '12px', height: '12px' }} />
                          </button>
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff', padding: '0 4px' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: '#cbd5e1',
                              backgroundColor: 'transparent',
                              cursor: 'pointer'
                            }}
                          >
                            <Plus style={{ width: '12px', height: '12px' }} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ padding: '8px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}
                        title="Remove"
                      >
                        <Trash2 style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Checkout Footer */}
              {cart.length > 0 && (
                <div style={{ padding: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(2, 6, 23, 0.6)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Subtotal</span>
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Shipping</span>
                      <span style={{ color: '#34d399', fontWeight: 600 }}>{cartTotal > 150 ? "FREE" : "$15.00"}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', color: '#ffffff', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <span>Total</span>
                      <span style={{ color: '#34d399', fontWeight: 800 }}>
                        ${(cartTotal + (cartTotal > 150 ? 0 : 15)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'linear-gradient(to right, #34d399, #2dd4bf)',
                      color: '#020617',
                      fontWeight: 900,
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    Proceed to Checkout <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(12px)' }}>
          <div style={{
            position: 'relative',
            backgroundColor: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            maxWidth: '672px',
            width: '100%',
            padding: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px', color: '#94a3b8', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', cursor: 'pointer' }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: '256px', objectFit: 'cover', borderRadius: '16px', backgroundColor: '#1e293b' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {quickViewProduct.category}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: '4px 0 0' }}>{quickViewProduct.name}</h3>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#34d399', margin: '8px 0 0' }}>
                    ${Number(quickViewProduct.price).toFixed(2)}
                  </p>
                  <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6, marginTop: '12px' }}>
                    {quickViewProduct.description}
                  </p>

                  {quickViewProduct.specs && (
                    <div style={{ marginTop: '16px' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Specifications:</span>
                      <ul style={{ fontSize: '12px', color: '#cbd5e1', padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {quickViewProduct.specs.map((spec, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34d399' }} />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  style={{
                    marginTop: '24px',
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(to right, #34d399, #2dd4bf)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Add To Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Image Lightbox */}
      {previewImage && (
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', cursor: 'pointer' }}
          onClick={() => setPreviewImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '896px', width: '100%', maxHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={previewImage}
              alt="Expanded preview"
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            />
            <button
              onClick={() => setPreviewImage(null)}
              style={{ position: 'absolute', top: '-40px', right: 0, color: '#ffffff', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Close <X style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(12px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', maxWidth: '448px', width: '100%', padding: '24px', position: 'relative' }}>
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px', color: '#94a3b8', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', cursor: 'pointer' }}
            >
              <X style={{ width: '16px', height: '16px' }} />
            </button>

            {orderComplete ? (
              <div style={{ textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <CheckCircle2 style={{ width: '64px', height: '64px', color: '#34d399', margin: '0 auto' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: 0 }}>Order Confirmed!</h3>
                <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0 }}>
                  Processing your order. A confirmation email has been sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 8px' }}>Complete Order</h3>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '12px',
                      color: '#ffffff',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '12px',
                      color: '#ffffff',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>Shipping Address</label>
                  <input
                    type="text"
                    required
                    placeholder="123 Luxury Ave, City, Country"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '12px',
                      color: '#ffffff',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>
                  <span>Pay Total</span>
                  <span style={{ color: '#34d399' }}>${(cartTotal + (cartTotal > 150 ? 0 : 15)).toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(to right, #34d399, #2dd4bf)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Confirm & Pay
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}