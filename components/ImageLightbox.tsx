
import React from 'react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, onClose, image, title, subtitle, tag }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-2xl transition-opacity"></div>
      
      <div 
        className="relative max-w-5xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all animate-scaleIn flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white md:text-blue-950 transition-all active:scale-90"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="md:w-2/3 bg-slate-100 flex items-center justify-center min-h-[300px] md:min-h-[600px]">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover md:object-contain"
          />
        </div>

        <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-white">
          {tag && (
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 w-fit">
              {tag}
            </span>
          )}
          <h3 className="text-3xl md:text-4xl font-black text-blue-950 mb-4 leading-tight">{title}</h3>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            {subtitle || "Detailed inspection of site operation or high-value salvage material recovered by our manual dismantling teams."}
          </p>
          
          <div className="mt-auto space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Location / Source</p>
              <p className="text-sm font-bold text-blue-950">Active Site: Kenya Region</p>
            </div>
            
            <a 
              href={`https://wa.me/254700192081?text=Hi Oliver, I saw the ${title} in your gallery and would like more details.`}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-center flex items-center justify-center space-x-3 hover:bg-blue-700 transition shadow-xl shadow-blue-200 active:scale-[0.98]"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              <span>Enquire Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
