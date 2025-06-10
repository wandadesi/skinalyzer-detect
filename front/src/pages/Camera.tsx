import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Permission from '../components/ui/Permission';
import { useAuth } from '../context/AuthContext'; // ⬅️ Import useAuth

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();

  const [showPermissionPopup, setShowPermissionPopup] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const { userId } = useAuth(); // ⬅️ Ambil userId dari context

  useEffect(() => {
    if (!isCameraReady) return;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Gagal mengakses kamera:', error);
        alert('Gagal mengakses kamera. Pastikan Anda memberikan izin.');
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    };
  }, [isCameraReady]);

  const handleAllowCamera = () => {
    setShowPermissionPopup(false);
    setIsCameraReady(true);
  };

  const handleCancelPermission = () => {
    setShowPermissionPopup(false);
    navigate(-1);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const video = videoRef.current;

      if (ctx) {
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        const imageData = canvasRef.current.toDataURL('image/png');

        if (!userId) {
          alert("User belum login.");
          return;
        }

        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;

        navigate('/camres', { state: { image: imageData, user_id: userId } });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 relative">
      {showPermissionPopup && (
        <Permission
          message="Aplikasi akan meminta izin untuk menggunakan kamera Anda."
          onConfirm={handleAllowCamera}
          onCancel={handleCancelPermission}
        />
      )}

      {!showPermissionPopup && (
        <div className="relative min-h-screen w-full bg-white bg-cover bg-center">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-[75vh] object-contain"
            autoPlay
            muted
          />
          <canvas ref={canvasRef} width="640" height="480" className="hidden" />

          <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-blue-400 px-4 flex flex-col items-center justify-center space-y-4">
            <h3 className="font-montserrat! text-white text-center max-w-md">
              Make sure your face is clearly visible on the screen, then press the button to capture your photo.
            </h3>

            <Button type="camera" onClick={handleCapture} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
