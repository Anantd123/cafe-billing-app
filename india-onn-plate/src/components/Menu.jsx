import { useState } from "react";
import { menuData } from "../data/menuData";

export default function Menu({ addToCart }) {
  const [menu, setMenu] = useState(menuData);
  const [category, setCategory] = useState("");
  const [dish, setDish] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (!category || !dish || !price) return;

    if (!menu[category]) menu[category] = [];

    menu[category].push({
      name: dish,
      price: Number(price),
    });

    setMenu({ ...menu });

    setCategory("");
    setDish("");
    setPrice("");
  };

  // ✅ DELETE ITEM
  const handleDelete = (cat, index) => {
    const updated = { ...menu };
    updated[cat].splice(index, 1);
    setMenu(updated);
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">🍴 Menu</h2>

      {/* 🔍 SEARCH */}
      <div className="mb-4">
        <input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Add Dish Section */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-8 flex flex-wrap gap-3 items-center">
        <input
          value={category}
          placeholder="Category"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          value={dish}
          placeholder="Dish Name"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setDish(e.target.value)}
        />

        <input
          value={price}
          placeholder="Price"
          type="number"
          className="border rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Dish
        </button>
      </div>

      {/* Menu List */}
      {Object.keys(menu).map((cat) => {
        // filter items based on search
        const filteredItems = menu[cat].filter((item) =>
          item.name.toLowerCase().includes(search)
        );

        if (filteredItems.length === 0) return null;

        return (
          <div key={cat} className="mb-8">
            {/* Category Title */}
            <h3 className="text-xl font-semibold mb-3 border-l-4 border-black pl-2">
              {cat}
            </h3>

            {/* Items */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {/* ADD */}
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                    >
                      Add
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(cat, i)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}