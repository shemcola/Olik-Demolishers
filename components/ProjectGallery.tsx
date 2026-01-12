
import React, { useState, useEffect } from 'react';
import { GalleryImage } from '../types';
import ImageLightbox from './ImageLightbox';

const ProjectGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('olik_field_reports');
    const userImages = saved ? JSON.parse(saved) : [];
    setImages(userImages);
  }, []);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
            Official Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 mb-4">Verified Field Records</h2>
          <p className="text-base md:text-lg text-slate-600">
            Professional records of complex deconstruction projects across Kenya. Managed via secure owner uplinks.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-square rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-300">LOG-A-2026-00{n}</div>
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-lock text-slate-200 text-2xl"></i>
                </div>
                <p className="font-black text-slate-300 text-sm uppercase tracking-[0.2em]">Data Slot Awaiting</p>
                <p className="text-[9px] uppercase tracking-widest text-slate-300 mt-2 font-bold italic">Owner authorization required for field upload</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {images.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedImage(item)}
                className="group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] aspect-square shadow-lg bg-slate-100 cursor-pointer animate-fadeIn"
              >
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[2px]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-blue-300">
                    {item.tag}
                  </span>
                  <h3 className="text-white font-bold text-base md:text-lg leading-tight">
                    {item.caption}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageLightbox 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage?.url || ''}
        title={selectedImage?.caption || ''}
        tag={selectedImage?.tag}
      />
    </section>
  );
};

export default ProjectGallery;
