import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function App() {

  // ✅ LOAD CART FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ AUTO SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);

      if (existing) {
        return prev.map((i) =>
          i.name === item.name
            ? { ...i, qty: (i.qty || 1) + 1 }
            : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* MENU */}
        <div className="w-full lg:w-2/3 overflow-y-auto p-4">
          <Menu addToCart={addToCart} />
        </div>

        {/* BILL */}
        <div className="w-full lg:w-1/3 border-l bg-white">
          <Cart
            cart={cart}
            setCart={setCart}
            removeItem={removeItem}
          />
        </div>

      </div>

      <Footer />
    </div>
  );
}import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function App() {

  // ✅ LOAD CART FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ AUTO SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);

      if (existing) {
        return prev.map((i) =>
          i.name === item.name
            ? { ...i, qty: (i.qty || 1) + 1 }
            : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* MENU */}
        <div className="w-full lg:w-2/3 overflow-y-auto p-4">
          <Menu addToCart={addToCart} />
        </div>

        {/* BILL */}
        <div className="w-full lg:w-1/3 border-l bg-white">
          <Cart
            cart={cart}
            setCart={setCart}
            removeItem={removeItem}
          />
        </div>

      </div>

      <Footer />
    </div>
  );
}