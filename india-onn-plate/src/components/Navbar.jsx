export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-xl">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT: LOGO + NAME */}
        <div className="flex items-center gap-3">
          
          {/* 🖼️ LOGO IMAGE */}
          <img
            src="/logo.jpeg"   // 👉 put your image in public folder
            alt="logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />

          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              INDIA ONN PLATE
            </h1>
            <p className="text-xs text-gray-300">
              Modern Flavors • Clean Vibe
            </p>
          </div>
        </div>

        {/* RIGHT: STATUS / TIME */}
        <div className="hidden md:block text-right">
          <p className="text-sm text-gray-300">Open Now</p>
          <p className="text-xs text-gray-400">
            {new Date().toLocaleTimeString()}
          </p>
        </div>

      </div>

    </div>
  );
}