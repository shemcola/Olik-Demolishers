
import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';

const ServicesSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (SERVICES.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SERVICES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (SERVICES.length === 0) {
    return null; // Hide section if no services are defined
  }

  const next = () => setCurrent((prev) => (prev + 1) % SERVICES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);

  return (
    <section id="services" className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8 animate-fadeIn">
            <div className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest">
              Our Specialized Services
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight transition-all duration-500">
              {SERVICES[current].title}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl min-h-[100px]">
              {SERVICES[current].description}
            </p>
            <div className="flex items-center space-x-4 pt-6">
              <button 
                onClick={prev}
                className="w-14 h-14 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                aria-label="Previous Service"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                onClick={next}
                className="w-14 h-14 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                aria-label="Next Service"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              <div className="flex-grow h-[1px] bg-slate-800 ml-4 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-700 ease-out"
                  style={{ width: `${((current + 1) / SERVICES.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-mono text-slate-500">
                0{current + 1} / 0{SERVICES.length}
              </span>
            </div>
          </div>

          <div className="lg:w-1/2 relative w-full">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900">
              {SERVICES.map((service, idx) => (
                <div 
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === current ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className={`w-full h-full object-cover transform transition-transform duration-[2000ms] ${idx === current ? 'scale-100' : 'scale-110'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
              ))}
              <div className="absolute bottom-10 left-10">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl">
                   <i className={`fas ${SERVICES[current].icon}`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
