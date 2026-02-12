import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, Image as ImageIcon, Settings, Shield, Plus, Trash2, Menu, X, Hammer, 
  Recycle, HardHat, Phone, MapPin, ChevronRight, ChevronLeft,
  LayoutDashboard, LogOut, MessageSquare, Send, Bot, Loader2, Sparkles, Building2,
  Camera, Scan, Info, Cpu, Zap, Box, Users, Clock, Globe, ArrowRight, Database, Target,
  Construction, CheckCircle2, TrendingUp, AlertTriangle, CheckCircle, RefreshCcw,
  WifiOff, AlertCircle
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
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = (e) => reject(e);
  });
};

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto px-6 md:px-10 py-4 rounded-2xl flex items-center gap-4 animate-fadeIn shadow-2xl border-2 ${
      type === 'success' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-red-600 border-red-400 text-white'
    }`}>
      {type === 'success' ? <CheckCircle size={20} className="flex-shrink-0" /> : <AlertCircle size={20} className="flex-shrink-0" />}
      <span className="font-bold uppercase tracking-wider text-[10px] md:text-xs">{message}</span>
      <button onClick={onClose} className="ml-auto p-1"><X size={16} /></button>
    </div>
  );
};

const WhatsAppAction = () => (
  <a 
    href="https://wa.me/254700192081" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[60] flex items-center"
  >
    <div className="bg-[#25D366] text-white p-4 md:p-5 rounded-2xl md:rounded-[2rem] shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white/20">
      <i className="fab fa-whatsapp text-2xl md:text-3xl"></i>
    </div>
  </a>
);

const TacticalScanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startStream = async () => {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err: any) {
      setError("CAMERA_ACCESS_DENIED: Please enable camera permissions in your browser settings to use site intelligence.");
      console.error("Camera Error:", err);
    }
  };

  const closeStream = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setReport(null);
    setError(null);
  };

  const runAnalysis = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessing(true);
    setError(null);
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    const base64Data = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY_MISSING");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: "ACT AS OLIK DEMOLISHERS ARCHITECTURAL INTELLIGENCE. You are looking at a site in Nairobi. Analyze the structural components in this image. Provide a highly professional, concise tactical report covering: 1. PREDOMINANT MATERIALS. 2. ESTIMATED DECONSTRUCTION COMPLEXITY. 3. RECOVERABLE ASSET VALUE. 4. IMMEDIATE SITE HAZARDS. Be precise." },
            { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
          ]
        }
      });

      const text = response.text;
      if (!text) throw new Error("EMPTY_RESPONSE");
      setReport(text);
    } catch (err: any) {
      console.error("AI Analysis Error:", err);
      if (err.message === "API_KEY_MISSING") {
        setError("CONFIGURATION_ERROR: Intelligence link requires a valid authority key.");
      } else if (err.message === "EMPTY_RESPONSE") {
        setError("ANALYSIS_FAILED: Could not extract meaningful structural data.");
      } else {
        setError("LINK_FAILURE: The site intelligence relay is currently unavailable.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => { setIsOpen(true); startStream(); }}
        className="w-full sm:w-auto group glass-panel px-8 md:px-12 py-5 rounded-2xl border-blue-500/40 text-white flex items-center justify-center gap-4 hover:bg-blue-600/30 transition-all shadow-2xl active:scale-95"
      >
        <Scan className="text-blue-500 group-hover:rotate-90 transition-transform duration-500" size={20} />
        <span className="font-black text-xs uppercase tracking-widest">Tactical Site Audit</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 lg:p-12 bg-slate-950/98 backdrop-blur-3xl animate-fadeIn">
          <div className="max-w-6xl w-full h-full md:h-auto md:max-h-[90vh] glass-panel rounded-none md:rounded-[3rem] border-white/10 overflow-hidden shadow-2xl relative flex flex-col">
            <button 
              onClick={() => { setIsOpen(false); closeStream(); }} 
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white z-50 p-2 bg-white/10 rounded-full border border-white/10 transition-all backdrop-blur-md"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 flex-grow overflow-hidden">
              <div className="relative bg-black border-b lg:border-b-0 lg:border-r border-white/5 h-[40vh] md:h-auto">
                {stream ? (
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-75 contrast-125" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900">
                    <Camera size={48} className="text-slate-700 animate-pulse" />
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-4 rounded-xl">
                  <div className="absolute top-4 left-4 border-t-2 border-l-2 border-blue-500/50 w-8 h-8"></div>
                  <div className="absolute top-4 right-4 border-t-2 border-r-2 border-blue-500/50 w-8 h-8"></div>
                  <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-blue-500/50 w-8 h-8"></div>
                  <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-blue-500/50 w-8 h-8"></div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/20 shadow-[0_0_15px_#3b82f6] animate-[scanLine_4s_linear_infinite]"></div>
                </div>
                {!report && !error && stream && (
                  <button onClick={runAnalysis} disabled={isProcessing} className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-4 shadow-3xl hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-95">
                    {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Scan size={18} />}
                    {isProcessing ? 'PROCESSING...' : 'RUN_STRUCTURAL_AI'}
                  </button>
                )}
                {error && (
                  <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center p-8 backdrop-blur-md">
                    <div className="max-w-xs text-center space-y-6">
                      <AlertTriangle className="text-red-500 mx-auto" size={32} />
                      <p className="text-red-400 font-mono text-[10px] leading-relaxed uppercase tracking-widest">{error}</p>
                      <button onClick={startStream} className="text-white bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all">Retry</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8 md:p-16 flex flex-col space-y-8 bg-slate-900/40 overflow-y-auto">
                <div className="flex items-center gap-4 text-blue-500">
                  <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20">
                    <Cpu size={24} className={isProcessing ? "animate-spin" : "animate-pulse"} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">OLIK_CORE_AI</h2>
                  </div>
                </div>
                <div className="flex-grow space-y-6">
                  {report ? (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="glass-panel p-6 md:p-8 rounded-2xl bg-black/60 border-white/5 border-l-4 border-l-blue-600 shadow-xl">
                        <div className="whitespace-pre-wrap text-slate-200 text-xs md:text-sm font-mono leading-relaxed prose prose-invert max-w-none">
                          {report}
                        </div>
                      </div>
                      <button onClick={() => { setReport(null); setError(null); }} className="w-full py-4 border border-blue-500/20 text-blue-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-500/10 transition-all flex items-center justify-center gap-3">
                        <RefreshCcw size={14} /> New Scan
                      </button>
                    </div>
                  ) : !error && (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-6 border border-white/5 rounded-3xl bg-white/[0.01]">
                      {isProcessing ? (
                        <div className="space-y-6">
                          <Loader2 className="animate-spin text-blue-500 mx-auto" size={48} />
                          <p className="text-white font-black uppercase text-xs tracking-widest">Analyzing Structures...</p>
                        </div>
                      ) : (
                        <div className="space-y-6 px-12">
                          <Target size={40} className="mx-auto text-slate-600 opacity-40" />
                          <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">Align camera with structures and initiate scan.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
    <div className="glass-panel p-4 md:p-8 rounded-3xl border-white/10 group hover:border-blue-500/20 transition-all bg-white/[0.01] animate-fadeIn">
      <div className="aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden mb-6 relative bg-slate-900 flex items-center justify-center border border-white/5 shadow-inner">
        {hasError ? (
          <div className="flex flex-col items-center gap-2 text-slate-800">
            <WifiOff size={32} />
            <span className="text-[7px] font-black tracking-widest">OFFLINE</span>
          </div>
        ) : (
          <img src={img.url} onError={() => setHasError(true)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" alt={img.title} />
        )}
        <div className="absolute top-4 left-4"><span className="text-[8px] font-black uppercase text-blue-500 bg-black/90 px-3 py-1.5 rounded-lg border border-white/10 tracking-widest">{img.category}</span></div>
      </div>
      <h4 className="font-black text-white text-lg mb-2 uppercase italic truncate tracking-tight">{img.title}</h4>
      <p className="text-slate-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">{img.description}</p>
      <div className="flex items-center justify-between text-[8px] font-black text-slate-700 uppercase tracking-widest pt-4 border-t border-white/5">
        <span>{new Date(img.createdAt).toLocaleDateString()}</span>
        {onPurge && (
          <button onClick={() => onPurge(img.id)} className="text-red-500/40 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
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
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950 z-10"></div>
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-30 scale-105" alt="Background" />
        </div>
        <div className="relative z-20 text-center max-w-6xl space-y-12 md:space-y-16">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 animate-fadeIn">
               <span className="text-blue-500 font-black text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[1em] uppercase border-b border-blue-500/20 pb-4 mb-2">Precision Deconstruction • Nairobi • Salvage</span>
               <div className="inline-flex items-center gap-3 px-6 py-2 glass-panel rounded-full text-white/50 font-black text-[8px] md:text-[10px] tracking-[0.4em] uppercase border-white/5">
                 <Shield size={14} className="text-blue-500" /> Authorized Operations
               </div>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-black text-white tracking-tighter leading-[0.9] md:leading-[0.8] animate-fadeIn uppercase italic">
              OLIK <br className="sm:hidden" /> <span className="text-blue-500 not-italic">Demolishers.</span>
            </h1>
          </div>
          <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium animate-fadeIn px-4">Recovering architectural value through precision manual deconstruction.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 animate-fadeIn pt-4">
            <TacticalScanner />
            <a href="#gallery" className="w-full sm:w-auto px-12 md:px-16 py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-blue-600 hover:text-white shadow-2xl flex items-center justify-center gap-4 active:scale-95">
              Site Archive <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 md:py-48 px-6 md:px-12 relative z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-32 flex flex-col lg:flex-row justify-between lg:items-end gap-10">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase italic">Cloud Archive.</h3>
              <p className="text-slate-600 text-[10px] font-black tracking-widest uppercase">Field Report synchronization Active</p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4 glass-panel p-2 md:p-3 rounded-2xl border-white/5 bg-white/[0.01] w-full lg:w-auto overflow-x-auto no-scrollbar">
              <button onClick={() => setFilter('All')} className={`flex-1 sm:flex-none whitespace-nowrap px-4 md:px-6 py-2 md:py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === 'All' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>All</button>
              {Object.values(Category).map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`flex-1 sm:flex-none whitespace-nowrap px-4 md:px-6 py-2 md:py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>{cat.split(' ')[0]}</button>
              ))}
              <button onClick={refreshGallery} className="p-2 md:p-3 text-slate-500 hover:text-blue-500"><RefreshCcw size={16} /></button>
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center gap-6 py-40">
              <Loader2 className="animate-spin text-blue-500" size={48} />
              <span className="text-[9px] font-black text-slate-700 tracking-[0.6em] uppercase">Retrieving Remote Logs...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {filteredImages.length === 0 ? (
                <div className="col-span-full py-40 text-center glass-panel rounded-3xl border-white/5">
                   <Box className="mx-auto text-slate-800 mb-6" size={64} />
                   <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Archive empty.</p>
                </div>
              ) : (
                filteredImages.map(img => <GalleryCard key={img.id} img={img} />)
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="py-24 md:py-40 px-6 md:px-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-20 text-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg border border-white/10"><Hammer className="text-white" size={24} /></div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">Olik<span className="text-blue-500 font-light ml-0.5 not-italic">Demolishers</span></span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 max-w-6xl w-full">
              {/* Oliver Ndavi - Prominent Card */}
              <div className="glass-panel p-6 rounded-[2rem] border-blue-500/20 bg-blue-500/[0.02] flex flex-col items-center space-y-6 group hover:border-blue-500/40 transition-all">
                <div className="space-y-1">
                  <p className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase">Oliver Ndavi</p>
                  <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Managing Director</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <a href="tel:+254700192081" className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all">
                    <Phone size={14} /> Call Now
                  </a>
                  <a href="https://wa.me/254700192081" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all">
                    <i className="fab fa-whatsapp"></i> Message
                  </a>
                </div>
              </div>

              {/* Isiah Ndavi */}
              <div className="space-y-4 pt-6">
                <p className="text-blue-500 font-black text-[9px] tracking-[0.3em] uppercase">Isiah Ndavi</p>
                <a href="tel:+254101649563" className="text-white text-base md:text-lg font-bold tracking-widest italic hover:text-blue-500 transition-colors block">+254 101 649563</a>
                <p className="text-slate-600 text-[8px] font-black uppercase tracking-widest">Operations Director</p>
              </div>

              {/* Jeremiah Ndavi */}
              <div className="space-y-4 pt-6">
                <p className="text-blue-500 font-black text-[9px] tracking-[0.3em] uppercase">Jeremiah Ndavi</p>
                <a href="tel:+254101644035" className="text-white text-base md:text-lg font-bold tracking-widest italic hover:text-blue-500 transition-colors block">+254 101 644035</a>
                <p className="text-slate-600 text-[8px] font-black uppercase tracking-widest">Operations Director</p>
              </div>

              {/* Base Station */}
              <div className="space-y-4 pt-6">
                <p className="text-blue-500 font-black text-[9px] tracking-[0.3em] uppercase">Base Station</p>
                <p className="text-white text-sm font-bold tracking-widest italic">Nairobi, Kenya</p>
                <Link to="/admin" className="inline-flex items-center gap-2 text-blue-500/40 hover:text-blue-500 text-[10px] font-black tracking-widest uppercase transition-colors">
                  <Shield size={12} /> Portal Access
                </Link>
              </div>
            </div>
            
            <p className="text-slate-800 text-[8px] font-black uppercase tracking-[1em] pt-12 border-t border-white/5 w-full">© 2026 OLIK GROUP • SECURE_NODE_1</p>
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
    <nav className="fixed w-full z-[100] px-4 md:px-10 py-6">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl md:rounded-[2.5rem] flex justify-between items-center px-6 md:px-10 py-4 border-white/10 shadow-2xl">
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 md:space-x-4 group">
          <div className="p-2 md:p-3 bg-blue-600 rounded-xl shadow-lg transition-transform group-hover:rotate-12">
            <Hammer className="text-white" size={20} />
          </div>
          <span className="font-black text-lg md:text-2xl tracking-tighter text-white uppercase italic">Olik<span className="text-blue-500 font-light ml-0.5 not-italic">Demolishers</span></span>
        </Link>
        <div className="hidden md:flex items-center space-x-12">
          <a href="/#gallery" className="text-white/40 hover:text-blue-500 transition-colors font-black text-[10px] uppercase tracking-[0.5em]">Archive</a>
          <Link to="/admin" className="bg-white text-slate-950 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
            {isOwnerPortal ? <LayoutDashboard size={16} /> : <Shield size={16} />}
            {isOwnerPortal ? 'DASHBOARD' : 'OWNER PORTAL'}
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-all">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-3 glass-panel p-8 rounded-2xl border-white/10 shadow-2xl flex flex-col items-center space-y-8 animate-fadeIn backdrop-blur-3xl">
          <a href="/#gallery" onClick={() => setIsOpen(false)} className="text-white/60 font-black uppercase tracking-widest text-sm hover:text-white transition-colors">ARCHIVE</a>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full bg-white text-slate-950 py-5 rounded-xl text-center font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 shadow-xl active:scale-95">
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
    if (password === '2026') { 
      setIsLoggedIn(true); 
      setToast({ message: "Authority Recognized.", type: 'success' });
    } else { 
      setToast({ message: "Access Denied.", type: 'error' });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.previewUrl || !uploadData.title) {
       setToast({ message: "Log Payload Incomplete.", type: 'error' });
       return;
    }
    setIsUploading(true);
    try {
      const compressedData = await compressImage(uploadData.previewUrl);
      await saveImage({ title: uploadData.title, description: uploadData.description, category: uploadData.category }, compressedData);
      await fetchImages();
      setUploadData({ title: '', description: '', category: Category.CONSTRUCTION, previewUrl: '' });
      setToast({ message: "Field Record Synchronized.", type: 'success' });
      setActiveTab('manage');
    } catch (error: any) { 
      setToast({ message: error.message || "Cloud Engine Sync Error.", type: 'error' });
    } finally { setIsUploading(false); }
  };

  const handlePurge = async (id: string) => {
    if (!confirm('Permanently purge this record?')) return;
    try {
      await deleteImage(id);
      setImages(prev => prev.filter(img => img.id !== id));
      setToast({ message: "Record Purged.", type: 'success' });
    } catch (error) { setToast({ message: "Purge protocol failed.", type: 'error' }); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-slate-950 px-6">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="max-w-md w-full glass-panel p-10 md:p-16 rounded-[3rem] border-blue-500/20 shadow-3xl text-center backdrop-blur-2xl">
          <div className="bg-blue-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-white/20 shadow-2xl shadow-blue-600/30">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic mb-10">Owner Authorization</h1>
          <form onSubmit={handleLogin} className="space-y-8">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="COMMAND_KEY" 
              className="w-full px-6 py-5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-center tracking-[0.6em] font-black text-lg outline-none focus:border-blue-500 transition-all shadow-inner" 
              required 
            />
            <button type="submit" className="w-full py-5 bg-white text-slate-950 rounded-xl font-black uppercase tracking-[0.4em] text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">Grant Access</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative bg-slate-950">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel p-6 md:p-12 rounded-[2.5rem] flex flex-col lg:flex-row justify-between lg:items-center mb-10 border-white/10 shadow-3xl gap-8">
          <div className="flex items-center gap-6">
             <div className="p-4 bg-blue-600/20 rounded-2xl text-blue-500 border border-blue-500/10"><Target size={32} /></div>
             <div>
               <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Owner Hub</h1>
             </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <button onClick={() => setActiveTab('upload')} className={`flex-1 lg:flex-none px-8 py-4 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'}`}>New Site Log</button>
            <button onClick={() => setActiveTab('manage')} className={`flex-1 lg:flex-none px-8 py-4 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all ${activeTab === 'manage' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'}`}>Management</button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-500/10 text-red-500 p-4 rounded-xl hover:bg-red-500 transition-all"><LogOut size={22} /></button>
          </div>
        </div>
        {activeTab === 'upload' ? (
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-[3rem] border-white/10 animate-fadeIn bg-white/[0.01]">
            <form onSubmit={handleUpload} className="space-y-10">
              <div className="relative border-2 border-dashed border-white/10 rounded-3xl h-[300px] md:h-[500px] flex flex-col items-center justify-center overflow-hidden bg-black/40 group cursor-pointer hover:border-blue-500/40 transition-all shadow-inner">
                {uploadData.previewUrl ? <img src={uploadData.previewUrl} className="w-full h-full object-cover opacity-80" alt="Preview" /> : <div className="text-center px-6"><ImageIcon size={64} className="text-slate-800 mx-auto mb-6 group-hover:text-blue-500 transition-colors" /><p className="text-[10px] text-slate-600 font-black tracking-widest uppercase">Select Visual</p></div>}
                <input type="file" accept="image/*" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if(f) {
                    const r = new FileReader();
                    r.onload = () => setUploadData({...uploadData, previewUrl: r.result as string});
                    r.readAsDataURL(f);
                  }
                }} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" value={uploadData.title} onChange={(e) => setUploadData({...uploadData, title: e.target.value})} placeholder="LOCATION" className="w-full px-6 py-5 rounded-xl bg-black/40 border border-white/10 text-white font-black uppercase tracking-widest text-xs outline-none focus:border-blue-500 transition-all" required />
                <select value={uploadData.category} onChange={(e) => setUploadData({...uploadData, category: e.target.value as Category})} className="w-full px-6 py-5 rounded-xl bg-black/40 border border-white/10 text-white font-black uppercase tracking-widest text-xs appearance-none outline-none focus:border-blue-500 transition-all">
                  {Object.values(Category).map(cat => <option key={cat} value={cat} className="bg-slate-950">{cat}</option>)}
                </select>
              </div>
              <textarea rows={4} value={uploadData.description} onChange={(e) => setUploadData({...uploadData, description: e.target.value})} placeholder="Technical Brief..." className="w-full px-6 py-5 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-medium text-sm outline-none focus:border-blue-500 transition-all resize-none"></textarea>
              <button type="submit" disabled={isUploading} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-blue-500 transition-all shadow-3xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50">
                {isUploading ? <><Loader2 className="animate-spin" /><span>SYNCHRONIZING...</span></> : <><TrendingUp size={20} /><span>Finalize Log</span></>}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {images.length === 0 ? (
              <div className="col-span-full py-40 text-center glass-panel rounded-3xl border-white/5">
                <Box size={56} className="mx-auto text-slate-900 mb-8" />
                <p className="text-slate-700 font-black uppercase tracking-widest text-[10px]">No records.</p>
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
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-blue-600/40 selection:text-white">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;