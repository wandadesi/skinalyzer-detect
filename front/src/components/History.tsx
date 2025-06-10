export default function History() {
  const data = [
    {
      date: '24/02/25',
      photo: 'Image1.jpg',
      concern: 'Acne',
      ingredients: 'Salycilic Acid, AHA BHA',
      product: 'Skintific 2% Salicylic Acid Anti Acne Serum',
    },
    {
      date: '01/05/25',
      photo: 'Image2.jpg',
      concern: 'Acne',
      ingredients: 'Salycilic Acid, AHA BHA',
      product: 'Skintific 2% Salicylic Acid Anti Acne Serum',
    },
    {
      date: '03/05/25',
      photo: 'Image3.jpg',
      concern: 'Acne Scars',
      ingredients: 'Niacinamide',
      product: 'COSRX The Niacinamide 15 Serum',
    },
  ];

  return (
 
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full table-auto text-sm text-left border-collapse bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 rounded-tl-xl">Date</th>
                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Concern</th>
                <th className="px-4 py-2">Ingredients</th>
                <th className="px-4 py-2 rounded-tr-xl">Product</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-50 transition">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.photo}</td>
                  <td className="px-4 py-2">{item.concern}</td>
                  <td className="px-4 py-2">{item.ingredients}</td>
                  <td className="px-4 py-2 truncate max-w-[200px]">{item.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
    
  );
}
