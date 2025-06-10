import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Camres = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('[DEBUG] Authenticated user:', user.uid);
        setUserId(user.uid);
      } else {
        // console.log('[DEBUG] No user logged in');
        setUserId(null);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [auth]);

  const backgroundStyle = {
    backgroundImage: 'url("/bg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  if (!image) {
    // console.warn('[DEBUG] No image found in location state');
    return (
      <div className="flex flex-col min-h-screen" style={backgroundStyle}>
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow">
          <p className="text-white font-semibold text-lg">Image Unavailable</p>
          <Button type="back" onClick={() => navigate('/camera')} />
        </div>
      </div>
    );
  }

  const handleRetake = () => {
    // console.log('[DEBUG] Retake button clicked');
    navigate('/camera');
  };

  const handleNext = async () => {
    if (!userId) {
      // console.warn('[DEBUG] No userId found, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const imageBase64 = image.replace(/^data:image\/\w+;base64,/, '');
      // console.log('[DEBUG] Sending request to backend with userId:', userId);
      // console.log('[DEBUG] Image (shortened):', imageBase64.substring(0, 100) + '...');

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_base64: imageBase64,
          user_id: userId,
        }),
      });

      const result = await response.json();
      // console.log('[DEBUG] Backend response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Gagal menganalisis gambar');
      }

      const label = result.detections?.[0]?.label || 'No concern detected';
      // console.log('[DEBUG] Detected label:', label);

      navigate('/result', {
        state: {
          image,
          result: label,
        },
      });

    } catch (err: any) {
      console.error('[ERROR] Error in handleNext:', err);
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={backgroundStyle}>
      <Navbar />

      <div className="absolute top-2 left-2 z-10 mt-18">
        <Button type="back" onClick={() => navigate(-1)} />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow space-y-4">
        <img
          src={image}
          alt="Captured"
          className="rounded-lg shadow-lg max-w-[90%] max-h-[60vh] mt-15"
        />

        <p className="font-montserrat! bg-white font-semibold text-blue-400 px-4 py-2 rounded">
          Looks good? You can retake the photo or move on to analysis.
        </p>

        {error && (
          <p className="text-red-500 bg-white px-4 py-2 rounded">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button type="camera" onClick={handleRetake} />
          <Button type="next" onClick={handleNext} disabled={loading || !userId} />
        </div>

        {loading && <p className="text-white">Analyzing...</p>}
      </div>
    </div>
  );
};

export default Camres;
debugger;