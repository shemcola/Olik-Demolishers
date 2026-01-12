
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581094281212-401715822161?auto=format&fit=crop&q=80&w=1920" 
          alt="OLIK Manual Roof Operation" 
          className="w-full h-full object-cover opacity-10 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-blue-50/80"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:space-y-8 animate-fadeIn text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Licensed Manual Demolition Experts
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-blue-950">
            Precision <span className="text-gradient">Demolition</span>. High Recovery.
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            We specialize in dismantling residential and commercial properties with a focus on salvage. Safely reclaim 100% of material value with our precision teams.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <a href="https://wa.me/254700192081" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition text-center flex items-center justify-center space-x-2 active:scale-95">
              <i className="fab fa-whatsapp"></i>
              <span>Hire Team Now</span>
            </a>
            <a href="#audit" className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition text-center flex items-center justify-center space-x-2 active:scale-95">
              <i className="fas fa-camera"></i>
              <span>Scan Site for AI Audit</span>
            </a>
          </div>
        </div>

        <div className="relative group block">
          <div className="absolute -inset-4 bg-blue-600 rounded-[2.5rem] rotate-3 opacity-10 blur-2xl group-hover:rotate-6 transition duration-500"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200" 
              alt="Active Manual Dismantling Team" 
              className="w-full aspect-video lg:aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 glass-morphism rounded-2xl shadow-xl border border-white/40">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Live Operation</p>
                  <p className="text-sm md:text-lg font-extrabold text-slate-900">Residential Site Remediation</p>
                </div>
                <div className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                  Active Site
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
