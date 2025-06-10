import React from 'react';

const Carousel: React.FC = () => {
  const images = ['/img1.png', '/img2.png', '/img3.png', '/img1.png', '/img2.png', '/img3.png'];

  return (
    <div className="overflow-hidden w-full max-w-5xl mx-auto mb-20 mt-5">
      <div className="flex animate-slide-left gap-4 w-max">
        {[...images, ...images].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className="h-80 w-auto object-contain rounded-xl flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
