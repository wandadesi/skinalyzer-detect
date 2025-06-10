import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';

const Page1 = () => {
  const navigate = useNavigate();

  const handleCamera = () => {
    navigate('/Camera'); // Navigasi ke halaman kamera
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url("/bg.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />

      <div className=" flex flex-col items-center justify-center flex-grow text-center px-4 ">
        <h1 className="text-white moving-text text-3xl! font-bold italic mb-4 mt-20 font-playfair">
          Start Analyze Your Skin
        </h1>
        <p className="mb-8 font-montserrat! text-white ">Tap to open your camera and start the scan</p>

        <Button type="camera" onClick={handleCamera} />
      </div>
    </div>
  );
};

export default Page1;
