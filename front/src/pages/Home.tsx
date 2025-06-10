import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCarousel from '../components/Carousel';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full m-0 p-0 border-0 hide-scrollbar overflow-auto">
      <Navbar />
      <div className="flex-grow flex flex-col mt-8 min-h-screen w-full m-0 p-0 border-0 bg-cover bg-center hide-scrollbar overflow-auto"
      style={{
        backgroundImage: `url("/bg-home.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
   
      <h1 className="moving-text text-left text-7xl! font-bold font-playfair text-white italic mb-3 ml-12 mt-25 max-w-4xl break-words tracking-wider leading-snug">
        Smart Beauty <br />
        Starts with Your <br />
        Skin
      </h1>
  
      <h3 className="text-white text-lg text-left ml-12 mt-10 font-medium">
        Get Started →
      </h3>
    </div>


      <div className="flex-grow flex flex-col mt-0 min-h-screen w-full m-0 p-0 border-0 bg-cover bg-center hide-scrollbar overflow-auto"
      style={{
        backgroundImage: `url("/bg-home2.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
     <h2 id="awal" className="text-center text-2xl font-bold font-playfair text-transparent bg-gradient-to-r from-[#2D6EC0] to-[#A1BFE7] mb-3 mt-15 tracking-wide bg-clip-text">
  DISCOVER YOUR TRUE BEAUTY
    </h2>

    <div className="flex flex-row items-center justify-center gap-8 px-12 mt-10">
  {/* Gambar discover */}
  <img
    src="/discover.png"
    alt="Discover"
    className="w-60 h-auto object-contain rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105"
  />

  {/* Teks deskripsi */}
  <p className="text-black text-left ml-15 font-montserrat font-light text-lg max-w-2xl leading-relaxed">
    Skinalyzer is a smart beauty platform that helps you understand your skin like never before. Using advanced AI technology, we analyze your facial condition and recommend the best skincare and makeup products just from a single photo.
  </p>
</div>


       <h2  id="features"
       className="text-center text-2xl font-bold font-playfair text-transparent bg-gradient-to-r from-[#2D6EC0] to-[#A1BFE7] mb-3 mt-15 tracking-wide bg-clip-text">
  WHAT SKINALYZER CAN DO?
    </h2>
    <ImageCarousel />

    </div>
    
    
    <Footer />

    </div>
    
  );
};
export default Home;