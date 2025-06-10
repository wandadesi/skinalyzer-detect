import { ArrowLeft, Camera, ArrowRight } from 'lucide-react';
import React from 'react';

type ButtonType = 'back' | 'camera' | 'next';

interface ButtonProps {
  type: ButtonType;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  className = '',
  disabled = false,
  
}) => {
  const styles = {
    back: {
      icon: <ArrowLeft className="w-5 h-5 text-blue-500" />,
      baseClass: 'bg-white',
    },
    camera: {
      icon: <Camera className="w-12 h-12 text-blue-500 p-2" />,
      baseClass: 'bg-white',
    },
    next: {
      icon: <ArrowRight className="w-5 h-5 text-white! " />,
      baseClass: 'bg-blue-500!',
    },
    
  };

  const commonClass =
    'w-10 h-10 rounded-full shadow-lg hover:scale-105 transition flex items-center justify-center';

    
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${commonClass} ${styles[type].baseClass} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {styles[type].icon}
    </button>
  );
};

export default Button;
