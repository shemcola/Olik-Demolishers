
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSlider from './components/ServicesSlider';
import AIQuoteAssistant from './components/AIQuoteAssistant';
import ProjectActivity from './components/ProjectActivity';
import SalvageGallery from './components/SalvageGallery';
import ProjectGallery from './components/ProjectGallery';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const checkParams = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    };

    checkParams();
    window.addEventListener('popstate', checkParams);
    
    if (sessionStorage.getItem('olik_auth') === 'true') {
      setIsAuth(true);
    }

    return () => window.removeEventListener('popstate', checkParams);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2026') {
      setIsAuth(true);
      sessionStorage.setItem('olik_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const toggleAdminMode = (show: boolean) => {
    const url = new URL(window.location.href);
    if (show) {
      url.searchParams.set('admin', 'true');
    } else {
      url.searchParams.delete('admin');
    }
    window.history.pushState({}, '', url);
    setIsAdminMode(show);
  };

  if (isAdminMode && !isAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans animate-fadeIn">
        <div className="max-w-md w-full animate-scaleIn">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20 pulse-glow">
              <i className="fas fa-shield-halved text-white text-3xl"></i>
            </div>
            <h1 className="text-white text-3xl font-black tracking-tighter mb-2">OWNER COMMAND</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Secure 2026 Protocol Required</p>
          </div>

          <form onSubmit={handleLogin} className={`bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-3xl space-y-6 ${authError ? 'animate-shake' : ''}`}>
            <div>
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 px-1">Access Credential</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="0000"
                className={`w-full bg-slate-950 border ${authError ? 'border-red-500 shadow-red-500/20' : 'border-white/10 focus:border-blue-500 shadow-blue-500/10'} px-6 py-5 rounded-2xl text-white text-center text-4xl font-black outline-none transition-all shadow-inner font-mono tracking-[0.5em]`}
                autoFocus
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-blue-900/40"
            >
              Verify Protocol
            </button>
            
            <button 
              type="button"
              onClick={() => toggleAdminMode(false)}
              className="w-full bg-transparent text-slate-500 hover:text-white py-2 font-bold text-[10px] uppercase tracking-widest transition"
            >
              Return to Public Site
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-slate-800 text-[9px] font-black uppercase tracking-widest">© 2026 OLIK Command Center • Secure Link Active</p>
          </div>
        </div>
      </div>
    );
  }

  if (isAdminMode && isAuth) {
    return <AdminDashboard onExit={() => toggleAdminMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar onAdminClick={() => toggleAdminMode(true)} />
      <main>
        <Hero />
        <ServicesSlider />
        <AIQuoteAssistant />
        <ProjectActivity />
        <SalvageGallery />
        <ProjectGallery />
        <Contact />
      </main>
      
      <footer className="bg-blue-950 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-blue-900 pb-12 mb-12 space-y-8 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-950">
                <i className="fas fa-hammer text-xl"></i>
              </div>
              <div onClick={() => toggleAdminMode(true)} className="cursor-pointer group">
                <h1 className="font-extrabold text-xl tracking-tight text-white leading-none">OLIK</h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 group-hover:text-white transition">Demolishers</p>
              </div>
            </div>
            <div className="flex space-x-6 text-2xl">
              <a href="#" className="hover:text-blue-400 transition" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://wa.me/254700192081" className="hover:text-blue-400 transition" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-400">
            <p>&copy; {new Date().getFullYear()} OLIK Demolishers. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-40 space-y-4">
        <a 
          href="tel:+254700192081" 
          className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl animate-pulse hover:scale-110 transition active:scale-95"
          aria-label="Call Now"
        >
          <i className="fas fa-phone-alt"></i>
        </a>
        <a 
          href="https://wa.me/254700192081" 
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:scale-110 transition active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  );
};

export default App;
