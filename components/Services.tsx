
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  if (SERVICES.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-blue-950 mb-4">Core Expertise</h2>
          <p className="text-slate-600">From structural removal to surgical salvage, we provide end-to-end demolition solutions tailored for modern development.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id} 
              className="group relative bg-slate-50 rounded-[2rem] p-8 hover:bg-blue-600 hover:text-white transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-slate-100 shadow-sm"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-blue-500 transition-colors mb-8">
                <i className={`fas ${service.icon} text-2xl text-blue-600 group-hover:text-white`}></i>
              </div>
              <h3 className="text-xl font-extrabold mb-4">{service.title}</h3>
              <p className="text-slate-600 group-hover:text-blue-50 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center text-sm font-bold text-blue-600 group-hover:text-white">
                <span>Learn More</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
              
              <div className="absolute top-4 right-8 opacity-5 text-8xl font-black italic -z-0">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
