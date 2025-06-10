import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Analyze from '../components/Analyze';
import Product from '../components/Product';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const image = location.state?.image;
  const resultText = location.state?.result || '';

  const [ingredients, setIngredients] = useState('');

  useEffect(() => {
    setIngredients('Salicylic Acid, AHA BHA');
  }, [resultText]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 pt-24 pb-12 px-6"
      style={{
        backgroundImage: `url("/bg-last.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      
      <div className="absolute top-4 left-4 z-10 mt-17">
        <Button type="back" onClick={() => navigate(-1)} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start mt-8">
        <div className="lg:w-1/2 w-full flex justify-center">
          {image ? (
            <img
              src={image}
              alt="Captured face"
              className="rounded-2xl shadow-xl max-h-96 object-contain border border-blue-200 bg-white"
            />
          ) : (
            <div className="w-full h-64 bg-white rounded-2xl shadow-md flex items-center justify-center text-gray-500">
              No image available.
            </div>
          )}
        </div>

        <div className="lg:w-1/2 w-full">
          <Analyze concern={resultText} ingredients={ingredients} />
        </div>
      </div>

      <div className="mt-12">
        <Product />
      </div>
    </div>
  );
}
