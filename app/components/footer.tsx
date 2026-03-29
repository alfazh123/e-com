export default function Footer() {
    const footerData = {
        produk: ["Paket", "Pulsa", "Hiburan"],
        perusahaan: ["Tentang E-com", "Syarat & Ketentuan"],
        bantuan: [
            { title: "Topik paling banyak dicari", icon: "📱", color: "bg-orange-50" },
            { title: "Call Center", icon: "📞", color: "bg-green-50" },
        ]
        };

    return (
    <footer className="bg-white p-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Kolom Produk */}
        <div>
          <h3 className="font-bold text-lg mb-4">Produk</h3>
          <ul className="space-y-3 text-gray-700">
            {footerData.produk.map((item) => (
              <li key={item} className="hover:text-black cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Kolom Perusahaan */}
        <div>
          <h3 className="font-bold text-lg mb-4">Perusahaan</h3>
          <ul className="space-y-3 text-gray-700">
            {footerData.perusahaan.map((item) => (
              <li key={item} className="hover:text-black cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Kolom Pusat Bantuan */}
        <div>
          <h3 className="font-bold text-lg mb-4">Pusat Bantuan</h3>
          <div className="flex flex-col gap-3">
            {footerData.bantuan.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${item.color}`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="font-medium text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-4xl italic text-black">E-com*</span>
          </div>
        </div>

      </div>
    </footer>
  );
}