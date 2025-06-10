export default function Rekomendasi() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-montserrat! text-lg font-semibold text-blue-600 mb-6 text-left">
        Recommended Products for Your Skin
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Produk 1 */}
        <div className="border border-blue-200 rounded-lg p-4 flex items-start gap-4 text-left">
          <img
            src="/product2.png" // sesuaikan path
            alt="Skintific Serum"
            className="w-28 h-auto object-contain"
          />
          <div>
            <h4 className="font-montserrat! text-base font-semibold mb-1">
              Skintific 2% Salicylic Acid Anti Acne Serum
            </h4>
            <p className="font-montserrat! text-sm text-gray-700 mb-2">Rp128.880 - Rp138.195</p>
            <p className="font-montserrat! text-sm font-semibold mb-1">How to use</p>
            <ul className="font-montserrat! text-sm list-disc list-inside text-gray-700 space-y-1">
              <li>Aplikasikan beberapa tetes ke area berjerawat</li>
              <li>Gunakan pagi dan malam hari</li>
              <li>Gunakan sunscreen di pagi hari</li>
            </ul>
          </div>
        </div>

        {/* Produk 2 */}
        <div className="border border-blue-200 rounded-lg p-4 flex items-start gap-4 text-left">
          <img
            src="/product1.png" // sesuaikan path
            alt="Glow2Glow Serum"
            className="w-28 h-auto object-contain"
          />
          <div>
            <h4 className="font-montserrat! text-base font-semibold mb-1">
              Skintific 2% Salicylic Acid Anti Acne Serum
            </h4>
            <p className="font-montserrat! text-sm text-gray-700 mb-2">Rp35.700</p>
            <p className="font-montserrat! text-sm font-semibold mb-1">How to use</p>
            <ul className="font-montserrat! text-sm list-disc list-inside text-gray-700 space-y-1">
              <li>Aplikasikan acne spot ke area yang berjerawat</li>
              <li>Oleskan di tahap akhir skincare</li>
              <li>Gunakan pagi dan malam hari</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
