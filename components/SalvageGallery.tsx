
import React, { useState, useEffect } from 'react';
import { GalleryImage } from '../types';
import ImageLightbox from './ImageLightbox';

const SalvageGallery: React.FC = () => {
  const [salvageItems, setSalvageItems] = useState<GalleryImage[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('olik_field_reports');
    if (saved) {
      const allImages: GalleryImage[] = JSON.parse(saved);
      // Filter images specifically tagged as Salvage for this section
      setSalvageItems(allImages.filter(img => img.tag === 'Salvage'));
    }
  }, []);

  return (
    <section id="salvage" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            Reclaimed Inventory
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Asset Recovery Feed</h2>
          <p className="text-slate-600">Direct transmission of high-value items recovered from current dismantling sites. Managed via Secure 2026 Admin Portal.</p>
        </div>

        {salvageItems.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white rounded-[2rem] p-10 border border-slate-200 flex flex-col items-center justify-center text-center group min-h-[350px]">
                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
                  <i className="fas fa-barcode text-slate-200"></i>
                </div>
                <p className="font-black text-slate-300 text-xs tracking-widest uppercase mb-2">Item Entry 0{n}</p>
                <p className="text-[10px] uppercase text-slate-300 font-bold italic">Awaiting 2026 Secure Asset Log</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {salvageItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn">
                <div 
                  className="relative h-56 md:h-64 overflow-hidden bg-slate-200 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.url} 
                    alt={item.caption} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm rounded-full text-[9px] font-bold text-white uppercase tracking-widest shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">{item.caption}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-blue-700 font-black text-xl">P.O.A</p>
                    <a 
                      href={`https://wa.me/254700192081?text=Hi Oliver, I'm interested in: ${item.caption}`}
                      className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition active:scale-90 shadow-lg shadow-green-200"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageLightbox 
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        image={selectedItem?.url || ''}
        title={selectedItem?.caption || ''}
        tag={selectedItem?.tag}
      />
    </section>
  );
};

export default SalvageGallery;
