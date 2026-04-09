import { useState, useEffect } from "react";

export default function Cart({ cart, setCart, removeItem }) {

  const [todayBills, setTodayBills] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todayBills")) || [];
    setTodayBills(saved);
  }, []);

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    setCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];

    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
      setCart(updated);
    } else {
      removeItem(index);
    }
  };

  const handlePaid = () => {
    if (cart.length === 0) return;

    const bill = {
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * (item.qty || 1),
        0
      ),
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };

    const updatedBills = [...todayBills, bill];

    setTodayBills(updatedBills);
    localStorage.setItem("todayBills", JSON.stringify(updatedBills));

    setCart([]);
  };

  const resetBill = () => {
    setCart([]);
  };

  const deleteAllBills = () => {
    setTodayBills([]);
    localStorage.removeItem("todayBills");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div className="h-full flex flex-col p-6 bg-white print-area">

      {/* HEADER */}
      <div className="text-center mb-3">
        <h2 className="font-bold text-lg">INDIA ONN PLATE</h2>
        <p className="text-xs">Modern Flavors • Clean Vibe</p>
        <p className="text-xs">
          {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}
        </p>
      </div>

      <hr className="my-2 border-dashed" />

      {/* 🔥 ITEMS (NO HEIGHT LIMIT → SHOW ALL) */}
      <div className="flex flex-col space-y-3 pr-2">

        {cart.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No items added
          </div>
        ) : (
          cart.map((item, i) => (
            <div key={i} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">
                  {item.qty || 1} x ₹{item.price}
                </p>
              </div>

              <div className="flex items-center gap-2 no-print">
                <button onClick={() => decreaseQty(i)} className="bg-gray-200 px-2 rounded">−</button>
                <span>{item.qty || 1}</span>
                <button onClick={() => increaseQty(i)} className="bg-gray-200 px-2 rounded">+</button>
              </div>

              <div className="font-semibold">
                ₹{item.price * (item.qty || 1)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOTTOM */}
      <div className="border-t pt-3 mt-4">

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <div className="flex gap-2 mt-3 no-print">
          <button onClick={handlePaid} className="bg-green-600 text-white w-full py-2 rounded-lg">
            Paid
          </button>

          <button onClick={resetBill} className="bg-red-500 text-white w-full py-2 rounded-lg">
            Reset
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-black text-white w-full mt-3 py-3 rounded-xl text-lg no-print"
        >
          Print Bill
        </button>

        {/* TODAY BILLS */}
        <div className="mt-4 border-t pt-3 no-print">
          
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Today's Bills</h3>

            <button
              onClick={deleteAllBills}
              className="bg-red-600 text-white px-3 py-1 rounded text-xs"
            >
              Delete All
            </button>
          </div>

          <div className="h-[120px] overflow-y-auto space-y-2 text-sm">
            {todayBills.length === 0 ? (
              <p className="text-gray-400">No bills yet</p>
            ) : (
              todayBills.map((bill, i) => (
                <div key={i} className="border p-2 rounded flex justify-between items-center">
                  <div>
                    <p className="font-semibold">₹{bill.total}</p>
                    <p className="text-gray-500">
                      {bill.date} • {bill.time}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const updated = todayBills.filter((_, index) => index !== i);
                      setTodayBills(updated);
                      localStorage.setItem("todayBills", JSON.stringify(updated));
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}