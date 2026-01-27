import React, { useState, useEffect, useRef } from 'react';
// Changed HashRouter to BrowserRouter to resolve potential export issues in specific environments and updated to standard v6 imports.
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, Image as ImageIcon, Settings, Shield, Plus, Trash2, Menu, X, Hammer, 
  Recycle, HardHat, Phone, MapPin, ChevronRight, ChevronLeft,
  LayoutDashboard, LogOut, MessageSquare, Send, Bot, Loader2, Sparkles, Building2,
  Camera, Scan, Info, Cpu, Zap, Box, Users, Clock, Globe, ArrowRight, Database, Target,
  Construction, CheckCircle2, TrendingUp, AlertTriangle, CheckCircle, Filter, RefreshCcw
} from 'lucide-react';
import { getImages, saveImage, deleteImage } from './database';
import { Category, ProjectImage } from './types';
import { GoogleGenAI } from "@google/genai";

// --- Utilities ---

const compressImage = (base64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const MAX_SIZE = 800;

      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject("Canvas Context Error");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    img.onerror = (e) => reject(e);
  });
};

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto px-6 md:px-10 py-5 rounded-[2rem] flex items-center gap-4 md:gap-5 animate-fadeIn shadow-2xl border-2 ${
      type === 'success' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-red-600 border-red-400 text-white'
    }`}>
      {type === 'success' ? <CheckCircle size={24} className="flex-shrink-0" /> : <AlertTriangle size={24} className="flex-shrink-0" />}
      <span className="font-black uppercase tracking-[0.1em] text-[10px] md:text-[11px] leading-tight">{message}</span>
      <button onClick={onClose} className="ml-auto hover:rotate-90 transition-transform"><X size={18} /></button>
    </div>
  );
};

const WhatsAppAction = () => (
  <a 
    href="https://wa.me/254712345678" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[60] group flex items-center"
  >
    <div className="mr-4 hidden md:block glass-panel px-5 py-2.5 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none">
      Contact Oliver
    </div>
    <div className="bg-[#25D366] text-white p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white/20">
      <i className="fab fa-whatsapp text-2xl md:text-3xl"></i>
    </div>
  </a>
);

// --- Services Grid ---
const ServicesSection = () => {
  const services = [
    { icon: Hammer, title: "Precision Dismantling", desc: "Expert manual unbuilding to ensure material integrity and maximum asset preservation." },
    { icon: Recycle, title: "Salvage Logistics", desc: "Coordinated extraction and transport of high-value timber, steel, and architectural components." },
    { icon: Shield, title: "Site Risk Management", desc: "Comprehensive site safety audits and controlled deconstruction in high-density areas." },
    { icon: Building2, title: "Corporate Strip-outs", desc: "Highly efficient dismantling of commercial interiors for renovation or redevelopment." }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {services.map((s, i) => (
        <div key={i} className="glass-panel p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-white/10 group hover:border-blue-500/40 transition-all">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
            <s.icon size={28} />
          </div>
          <h4 className="text-lg md:text-xl font-black text-white uppercase italic mb-4 tracking-tight">{s.title}</h4>
          <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  );
};

const TacticalScanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startStream = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      alert("Camera access is vital for real-time site intelligence.");
    }
  };

  const closeStream = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  const runAnalysis = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    const base64Data = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    
    // Initializing GoogleGenAI right before the API call as per guidelines.
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Correctly calling generateContent with model and contents parts.
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            { text: "ACT AS OLIK DEMOLISHERS SITE INTELLIGENCE. Analyze this structure structure. Provide: 1. CORE MATERIALS. 2. MANPOWER. 3. LOGISTICS. 4. SALVAGE VALUE." },
            { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
          ]
        }
      });
      // Extracting text output directly from the .text property of GenerateContentResponse.
      setReport(response.text || "Report generation failed.");
    } catch (err) {
      setReport("Communication link severed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => { setIsOpen(true); startStream(); }}
        className="w-full sm:w-auto group glass-panel px-8 md:px-12 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] border-blue-500/40 text-white flex items-center justify-center gap-4 hover:bg-blue-600/30 transition-all shadow-2xl active:scale-95"
      >
        <Scan className="text-blue-500 group-hover:rotate-90 transition-transform duration-500" size={24} />
        <span className="font-black text-xs uppercase tracking-[0.4em]">Tactical Site Audit</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-12 bg-slate-950/98 backdrop-blur-2xl animate-fadeIn">
          <div className="max-w-5xl w-full h-[95vh] md:h-auto glass-panel rounded-[2rem] md:rounded-[4rem] border-white/10 overflow-hidden shadow-2xl relative">
            <button onClick={() => { setIsOpen(false); closeStream(); setReport(null); }} className="absolute top-6 right-6 md:top-10 md:right-10 text-white/30 hover:text-white z-50 p-2 md:p-3 bg-white/5 rounded-full border border-white/10 transition-all">
              <X size={24} />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full lg:h-[80vh] overflow-y-auto lg:overflow-hidden">
              <div className="relative bg-black h-[40vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/5">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-75" />
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_20px_#3b82f6] animate-[scanLine_4s_linear_infinite]"></div>
                {!report && (
                  <button onClick={runAnalysis} disabled={isProcessing} className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-4 shadow-3xl hover:bg-blue-500 disabled:opacity-50">
                    {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Camera size={18} />}
                    {isProcessing ? 'SCANNING...' : 'START SCAN'}
                  </button>
                )}
              </div>
              <div className="p-8 md:p-16 flex flex-col justify-center space-y-6 md:space-y-10 bg-white/[0.02]">
                <div className="flex items-center gap-4 text-blue-500">
                  <div className="p-3 md:p-4 bg-blue-600/20 rounded-2xl"><Cpu size={30} className="animate-pulse" /></div>
                  <h2 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-white">OLIK_CORE_AI</h2>
                </div>
                {report ? (
                  <div className="glass-panel p-6 md:p-10 rounded-[1.5rem] md:rounded-[3rem] bg-black/60 border-white/10 max-h-[400px] overflow-y-auto border-l-4 border-l-blue-600">
                    <div className="whitespace-pre-wrap text-slate-200 text-xs md:text-sm font-mono leading-relaxed">{report}</div>
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm md:text-lg">Structural deconstruction intelligence active. Forecast salvage rates instantly.</p>
                )}
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
      <style>{`@keyframes scanLine { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
    </>
  );
};

const GalleryCard: React.FC<{ img: ProjectImage; onPurge?: (id: string) => void | Promise<void>; }> = ({ img, onPurge }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="glass-panel p-6 md:p-8 rounded-[2rem] md:rounded-[3.5rem] border-white/10 group hover:border-blue-500/20 transition-all bg-white/[0.01] animate-fadeIn">
      <div className="aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 relative border border-white/5 bg-slate-900 flex items-center justify-center">
        {hasError ? (
          <div className="flex flex-col items-center gap-3 text-slate-800">
            <ImageIcon size={40} />
            <span className="text-[7px] font-black tracking-widest uppercase">IMAGE_ERR</span>
          </div>
        ) : (
          <img 
            src={img.url} 
            onError={() => setHasError(true)}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" 
            alt={img.title} 
          />
        )}
        <div className="absolute top-4 left-4"><span className="text-[8px] font-black uppercase text-blue-500 bg-black/90 px-3 py-1.5 rounded-lg border border-white/10 tracking-widest">{img.category}</span></div>
      </div>
      <h4 className="font-black text-white text-lg md:text-xl mb-2 md:mb-3 uppercase italic truncate">{img.title}</h4>
      <p className="text-slate-500 text-xs md:text-sm line-clamp-2 mb-4 md:mb-6 font-medium leading-relaxed">{img.description}</p>
      <div className="flex items-center justify-between text-[8px] font-black text-slate-700 uppercase tracking-widest pt-4 border-t border-white/5">
        <span>{new Date(img.createdAt).toLocaleDateString()}</span>
        {onPurge ? (
          <button onClick={() => onPurge(img.id)} className="text-red-500/40 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
        ) : (
          <div className="flex items-center gap-1.5 text-blue-900/40"><Database size={10} /> SECURE_DATA</div>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const refreshGallery = async () => {
    setLoading(true);
    const data = await getImages();
    setImages(data);
    setLoading(false);
  };

  useEffect(() => { refreshGallery(); }, []);

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <main className="relative">
      <WhatsAppAction />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/40 to-slate-950 z-10"></div>
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover scale-110 grayscale" alt="Background" />
        </div>
        
        <div className="relative z-20 text-center max-w-6xl space-y-12 md:space-y-16">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 animate-fadeIn">
               <span className="text-blue-500 font-black text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[0.8em] uppercase border-b border-blue-500/30 pb-3 md:pb-4 mb-2 md:mb-4">
                 Industrial Deconstruction • Nairobi HQ • Salvage Experts
               </span>
               <div className="inline-flex items-center gap-3 md:gap-4 px-6 md:px-10 py-2.5 md:py-3 glass-panel rounded-full text-white/60 font-black text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.5em] border-white/10 uppercase">
                 <TrendingUp size={16} className="text-blue-500" /> Operational Since 2012
               </div>
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black text-white tracking-tighter leading-[0.9] md:leading-[0.8] animate-fadeIn uppercase italic">
              OLIK <br className="md:hidden" /> <span className="text-blue-500 not-italic">Demolishers.</span>
            </h1>
          </div>
          <p className="text-lg md:text-3xl text-slate-400 leading-relaxed max-w-4xl mx-auto font-medium animate-fadeIn px-4">
            Specialized manual unbuilding and architectural salvage recovery in Nairobi. Maximizing material integrity through precision dismantling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-12 animate-fadeIn">
            <TacticalScanner />
            <a href="#services" className="w-full sm:w-auto px-12 md:px-20 py-5 md:py-7 bg-white text-slate-950 rounded-[2rem] md:rounded-[3rem] font-black text-xs uppercase tracking-[0.4em] transition-all hover:bg-blue-600 hover:text-white shadow-2xl flex items-center justify-center gap-4">
              Our Capabilities <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-48 px-6 md:px-12 relative z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-32 text-center max-w-3xl mx-auto">
            <h2 className="text-blue-500 font-black text-xs uppercase tracking-[0.5em] mb-6 md:mb-8">Operational Scope</h2>
            <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none">Field <span className="text-blue-500">Expertise.</span></h3>
          </div>
          <ServicesSection />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-48 px-6 md:px-12 relative z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-32 flex flex-col lg:flex-row justify-between lg:items-end gap-10 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase italic">Site Archive.</h3>
              <p className="text-slate-600 text-[10px] font-black tracking-widest uppercase">Verified Projects // Central District</p>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4 glass-panel p-3 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] border-white/5 bg-white/[0.02] w-full lg:w-auto justify-center">
              <button onClick={() => setFilter('All')} className={`px-5 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'All' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>All</button>
              {Object.values(Category).map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-5 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>{cat.split(' ')[0]}</button>
              ))}
              <button onClick={refreshGallery} className="p-2 md:p-3 text-slate-500 hover:text-blue-500"><RefreshCcw size={16} /></button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center gap-6 py-24 md:py-40">
              <Loader2 className="animate-spin text-blue-500" size={50} />
              <span className="text-[9px] font-black text-slate-700 tracking-[0.4em] uppercase">Loading Field Logs...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {filteredImages.length === 0 ? (
                <div className="col-span-full py-24 md:py-40 text-center glass-panel rounded-[2rem] md:rounded-[4rem] border-white/5 bg-white/[0.01]">
                   <Box className="mx-auto text-slate-800 mb-6" size={60} />
                   <p className="text-slate-600 font-black uppercase tracking-widest text-xs">No project logs found in this sector.</p>
                </div>
              ) : (
                filteredImages.map(img => <GalleryCard key={img.id} img={img} />)
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 md:py-40 px-6 md:px-12 relative z-10 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
            <div className="flex items-center space-x-4 md:space-x-5">
              <div className="p-3 md:p-4 bg-blue-600 rounded-2xl md:rounded-3xl shadow-lg border border-white/20"><Hammer className="text-white h-6 w-6 md:h-8 md:w-8" /></div>
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-white uppercase italic">Olik<span className="text-blue-500 font-light ml-0.5 not-italic">Demolishers</span></span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 text-center">
              <div className="space-y-2">
                <p className="text-blue-500 font-black text-[9px] md:text-[10px] tracking-widest uppercase">Directorate Contact</p>
                <p className="text-white text-xs md:text-sm font-bold tracking-widest italic">+254 712 345 678</p>
              </div>
              <div className="space-y-2">
                <p className="text-blue-500 font-black text-[9px] md:text-[10px] tracking-widest uppercase">Nairobi Headquarters</p>
                <p className="text-white text-xs md:text-sm font-bold tracking-widest italic">Central District</p>
              </div>
              <div className="space-y-2">
                <p className="text-blue-500 font-black text-[9px] md:text-[10px] tracking-widest uppercase">Management Hub</p>
                <Link to="/admin" className="text-white/40 hover:text-white text-xs md:text-sm font-bold tracking-widest italic underline decoration-blue-500/30">Owner Portal Access</Link>
              </div>
            </div>
            <p className="text-slate-800 text-[8px] md:text-[9px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] pt-8 md:pt-12">© 2026 OLIK GROUP • SECURE_NODE_ALPHA</p>
        </div>
      </footer>
    </main>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isOwnerPortal = location.pathname.startsWith('/admin');

  return (
    <nav className="fixed w-full z-[100] px-4 md:px-16 py-6 md:py-10">
      <div className="max-w-7xl mx-auto glass-panel rounded-[2rem] md:rounded-[3.5rem] flex justify-between items-center px-6 md:px-12 py-4 md:py-6 border-white/10 shadow-2xl">
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 md:space-x-5 group">
          <div className="p-3 md:p-4 bg-blue-600 rounded-xl md:rounded-3xl group-hover:rotate-12 transition-transform shadow-lg border border-white/10">
            <Hammer className="text-white h-6 w-6 md:h-8 md:w-8" />
          </div>
          <span className="font-black text-xl md:text-3xl tracking-tighter text-white uppercase italic">Olik<span className="text-blue-500 font-light ml-0.5 not-italic">Demolishers</span></span>
        </Link>
        <div className="hidden md:flex items-center space-x-14">
          <a href="/#services" className="text-white/40 hover:text-blue-500 transition-colors font-black text-[11px] uppercase tracking-[0.5em]">Capabilities</a>
          <a href="/#gallery" className="text-white/40 hover:text-blue-500 transition-colors font-black text-[11px] uppercase tracking-[0.5em]">Archive</a>
          <Link to="/admin" className="bg-white text-slate-950 px-10 py-4 rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
            {isOwnerPortal ? <LayoutDashboard size={20} /> : <Shield size={20} />}
            {isOwnerPortal ? 'DASHBOARD' : 'OWNER PORTAL'}
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-3 hover:bg-white/5 rounded-2xl transition-all">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-3 glass-panel p-8 rounded-[2rem] border-white/10 shadow-2xl flex flex-col items-center space-y-6 animate-fadeIn">
          <a href="/#services" onClick={() => setIsOpen(false)} className="text-white font-black uppercase tracking-widest text-base italic">Capabilities</a>
          <a href="/#gallery" onClick={() => setIsOpen(false)} className="text-white font-black uppercase tracking-widest text-base italic">Archive</a>
          <div className="w-full h-px bg-white/5 my-2"></div>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full bg-white text-slate-950 py-5 rounded-[1.5rem] text-center font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3">
             <Shield size={18} /> OWNER PORTAL
          </Link>
        </div>
      )}
    </nav>
  );
};

const AdminPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [uploadData, setUploadData] = useState({ title: '', description: '', category: Category.CONSTRUCTION, previewUrl: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const fetchImages = async () => {
    const data = await getImages();
    setImages(data);
  };

  useEffect(() => { if (isLoggedIn) fetchImages(); }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2026') { setIsLoggedIn(true); } else { 
      setToast({ message: "Access Denied. Command Authority Required.", type: 'error' });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.previewUrl || !uploadData.title) {
       setToast({ message: "Incomplete Payload.", type: 'error' });
       return;
    }
    setIsUploading(true);
    try {
      const compressedData = await compressImage(uploadData.previewUrl);
      await saveImage({ title: uploadData.title, description: uploadData.description, category: uploadData.category }, compressedData);
      await fetchImages();
      setUploadData({ title: '', description: '', category: Category.CONSTRUCTION, previewUrl: '' });
      setToast({ message: "Field Log Successfully Synchronized.", type: 'success' });
      setActiveTab('manage');
    } catch (error: any) { 
      setToast({ message: error.message || "Cloud Engine Error.", type: 'error' });
    } finally { setIsUploading(false); }
  };

  const handlePurge = async (id: string) => {
    if (!confirm('Confirm record purge?')) return;
    try {
      await deleteImage(id);
      setImages(prev => prev.filter(img => img.id !== id));
      setToast({ message: "Site record purged.", type: 'success' });
    } catch (error) { setToast({ message: "Purge protocol failure.", type: 'error' }); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-slate-950 px-6">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="max-w-md w-full glass-panel p-10 md:p-20 rounded-[2.5rem] md:rounded-[5rem] border-blue-500/20 shadow-3xl text-center">
          <div className="bg-blue-600 w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center mx-auto mb-8 md:mb-12 border border-white/20 shadow-2xl shadow-blue-600/20">
            <Shield className="text-white" size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic mb-10 md:mb-16">Owner Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6 md:space-y-10">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ACCESS KEY" className="w-full px-8 md:px-12 py-5 md:py-7 rounded-[1.5rem] md:rounded-[3rem] bg-black/60 border border-white/10 text-white font-mono text-center tracking-[0.4em] font-black text-lg md:text-xl outline-none focus:border-blue-500" required />
            <button type="submit" className="w-full py-5 md:py-7 bg-white text-slate-950 rounded-[1.5rem] md:rounded-[3rem] font-black uppercase tracking-[0.3em] text-xs md:text-sm hover:bg-blue-600 hover:text-white transition-all shadow-3xl">Authorize</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 md:pt-48 pb-20 px-6 md:px-12 relative bg-slate-950">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel p-8 md:p-16 rounded-[2.5rem] md:rounded-[4.5rem] flex flex-col lg:flex-row justify-between lg:items-center mb-12 md:mb-24 gap-10 border-white/10 shadow-3xl">
          <div className="flex items-center gap-4 md:gap-6">
             <div className="p-3 md:p-4 bg-blue-600/20 rounded-2xl text-blue-500 shadow-inner"><Target size={32} /></div>
             <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Owner Portal</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full lg:w-auto">
            <button onClick={() => setActiveTab('upload')} className={`px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-[10px] md:text-[11px] tracking-[0.3em] uppercase transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-3xl' : 'bg-white/5 text-slate-400 hover:text-white'}`}>New Site Log</button>
            <button onClick={() => setActiveTab('manage')} className={`px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-[10px] md:text-[11px] tracking-[0.3em] uppercase transition-all ${activeTab === 'manage' ? 'bg-blue-600 text-white shadow-3xl' : 'bg-white/5 text-slate-400 hover:text-white'}`}>Site Records</button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-500/10 text-red-500 p-4 md:p-6 rounded-[1rem] md:rounded-3xl hover:bg-red-500 hover:text-white transition-all self-end sm:self-auto"><LogOut size={24} /></button>
          </div>
        </div>

        {activeTab === 'upload' ? (
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-[2.5rem] md:rounded-[5rem] border-white/10 animate-fadeIn bg-white/[0.01]">
            <form onSubmit={handleUpload} className="space-y-10 md:space-y-14">
              <div className="relative border-4 border-dashed border-white/5 rounded-[2rem] md:rounded-[4rem] h-[300px] md:h-[500px] flex flex-col items-center justify-center overflow-hidden bg-black/40 group cursor-pointer hover:border-blue-500/40 transition-all">
                {uploadData.previewUrl ? <img src={uploadData.previewUrl} className="w-full h-full object-cover opacity-60" alt="Preview" /> : <div className="text-center px-6"><ImageIcon size={60} className="text-blue-500 mx-auto mb-6" /><p className="text-[10px] text-slate-500 font-black tracking-[0.4em] uppercase">Attach Field Intelligence</p></div>}
                <input type="file" accept="image/*" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if(f) {
                    const r = new FileReader();
                    r.onload = () => setUploadData({...uploadData, previewUrl: r.result as string});
                    r.readAsDataURL(f);
                  }
                }} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-500 tracking-widest uppercase ml-4">Site Location</label>
                  <input type="text" value={uploadData.title} onChange={(e) => setUploadData({...uploadData, title: e.target.value})} placeholder="LOCATION NAME" className="w-full px-8 py-5 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] outline-none focus:border-blue-500" required />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-500 tracking-widest uppercase ml-4">Sector</label>
                  <select value={uploadData.category} onChange={(e) => setUploadData({...uploadData, category: e.target.value as Category})} className="w-full px-8 py-5 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] appearance-none outline-none focus:border-blue-500">
                    {Object.values(Category).map(cat => <option key={cat} value={cat} className="bg-slate-950">{cat}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-blue-500 tracking-widest uppercase ml-4">Technical Logs</label>
                <textarea rows={4} value={uploadData.description} onChange={(e) => setUploadData({...uploadData, description: e.target.value})} placeholder="Summarize site findings..." className="w-full px-8 py-5 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 text-slate-300 font-medium text-sm outline-none focus:border-blue-500"></textarea>
              </div>
              <button type="submit" disabled={isUploading} className="w-full py-6 md:py-10 bg-blue-600 text-white rounded-[2rem] md:rounded-[3.5rem] font-black uppercase tracking-[0.3em] text-xs md:text-sm hover:bg-blue-500 transition-all shadow-3xl flex items-center justify-center gap-4">
                {isUploading ? <><Loader2 className="animate-spin" /><span>SYNCHRONIZING...</span></> : <><TrendingUp size={20} /><span>Upload Site Record</span></>}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
            {images.length === 0 ? (
              <div className="col-span-full py-20 md:py-40 text-center glass-panel rounded-[2rem] md:rounded-[4rem] bg-white/[0.01] border-white/5">
                <Box size={48} className="mx-auto text-slate-800 mb-6" />
                <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Cloud Records Empty</p>
              </div>
            ) : (
              images.map(img => <GalleryCard key={img.id} img={img} onPurge={handlePurge} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    // Changed HashRouter to BrowserRouter to resolve environment-specific export errors.
    <BrowserRouter>
      <div className="min-h-screen flex flex-col selection:bg-blue-600/40 selection:text-white">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;