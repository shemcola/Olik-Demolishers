import React from 'react';

const Contact: React.FC = () => {
  const directors = [
    { name: 'Oliver Ndavi', role: 'Managing Director', phone: '+254700192081', email: 'oliverndavi@gmail.com', icon: 'fa-helmet-safety' },
    { name: 'Isiah Ndavi', role: 'Operations Director', phone: '+254101649563', email: 'isiahndavi@gmail.com', icon: 'fa-hard-hat' },
    { name: 'Jeremiah Ndavi', role: 'Salvage Lead', phone: '+254101644035', email: 'jeremiahndavi@gmail.com', icon: 'fa-hammer' }
  ];

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Force Action: Hire OLIK Now
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-blue-950 mb-6">Ready to Start?</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Don't wait. Contact our directors directly or send an email for an instant quote. We are available 24/7 for emergency demolition and salvage audits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {directors.map((director) => (
            <div key={director.phone} className="group bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:border-blue-500 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-8 group-hover:rotate-12 transition-transform">
                <i className={`fas ${director.icon}`}></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{director.name}</h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-8">{director.role}</p>
              
              <div className="space-y-4">
                <a 
                  href={`tel:${director.phone}`} 
                  className="flex items-center justify-between w-full bg-white border-2 border-slate-200 p-4 rounded-2xl font-bold text-slate-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all group/btn"
                >
                  <span>Call Now</span>
                  <i className="fas fa-phone-alt group-hover/btn:animate-pulse"></i>
                </a>
                <a 
                  href={`mailto:olikdemolishers@gmail.com?subject=Inquiry for ${director.name}`} 
                  className="flex items-center justify-between w-full bg-slate-200 p-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all"
                >
                  <span>Email Director</span>
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-950 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-black mb-6">Central Quote Desk</h3>
              <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                Need a formal quote or pre-demolition audit? Send us your project details and images. Our team will get back to you within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:olikdemolishers@gmail.com" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center space-x-3 transition-transform active:scale-95 shadow-xl shadow-blue-900/40"
                >
                  <i className="fas fa-paper-plane"></i>
                  <span>Email Main Office</span>
                </a>
                <a 
                  href="https://wa.me/254700192081" 
                  className="bg-green-600 hover:bg-green-500 text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center space-x-3 transition-transform active:scale-95"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp Oliver</span>
                </a>
              </div>
            </div>
            
            <div className="glass-morphism rounded-3xl p-8 border border-white/10">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <i className="fas fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="font-bold">Headquarters</p>
                    <p className="text-sm text-blue-300">Nairobi Industrial Area, Plot 45B</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <p className="font-bold">Operational Hours</p>
                    <p className="text-sm text-blue-300">Mon - Sat: 7:00 AM - 6:00 PM<br/>Emergency: 24/7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <i className="fas fa-truck-fast"></i>
                  </div>
                  <div>
                    <p className="font-bold">Coverage</p>
                    <p className="text-sm text-blue-300">Serving all 47 Counties in Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;