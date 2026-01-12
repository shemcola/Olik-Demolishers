
import React, { useState, useRef } from 'react';
import { analyzeSiteImage } from '../services/geminiService';

const AIQuoteAssistant: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image too large. Please use a file under 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeSiteImage(image);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to process analysis. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <section id="audit" className="py-24 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800 skew-x-12 translate-x-1/2 opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
              <i className="fas fa-user-gear"></i>
              <span>Customer Facing Analysis Tool</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Instant Site Audit Engine</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">Upload or capture a photo for an immediate structural breakdown. Note: This analysis is for estimation only and is not saved to our public portfolio.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-6">
              <div 
                className={`group relative border-4 border-dashed rounded-[2.5rem] p-4 flex flex-col items-center justify-center transition-all min-h-[450px] shadow-2xl ${
                  !image 
                    ? 'border-blue-500 bg-blue-950/40 hover:bg-blue-950/80 hover:border-blue-300 cursor-pointer scale-100 hover:scale-[1.01]' 
                    : 'border-transparent bg-white shadow-inner'
                }`}
                onClick={() => !image && fileInputRef.current?.click()}
              >
                {image ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                    <img src={image} alt="Site Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); clearAll(); }}
                      className="absolute top-6 right-6 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 transition hover:scale-110 active:scale-95 z-20"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="text-center p-8 flex flex-col items-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:bg-blue-500 transition-all duration-300 shadow-xl animate-bounce">
                      <i className="fas fa-camera text-4xl text-white"></i>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Camera Feed</h4>
                    <p className="text-blue-400 text-sm mb-6 max-w-[200px] font-bold">CAPTURE SITE LIVE FOR AUDIT</p>
                    <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 text-xs font-black uppercase tracking-[0.2em]">
                      AI TELEMETRY • V2.0
                    </div>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleFileChange} 
                />
              </div>

              {image && !analysis && (
                <button 
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center space-x-4 disabled:opacity-50 shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Structural Scan...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-bolt"></i>
                      <span>Request Immediate Analysis</span>
                    </>
                  )}
                </button>
              )}
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-center space-x-3">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="relative">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 h-full min-h-[450px] flex flex-col shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"></div>
                
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black flex items-center space-x-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-sm">
                        <i className="fas fa-microchip"></i>
                      </span>
                      <span>Scan Results</span>
                    </h3>
                  </div>
                </div>
                
                {analysis ? (
                  <div className="flex-grow flex flex-col">
                    <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 whitespace-pre-wrap leading-relaxed text-blue-50 font-medium text-base overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-blue-600">
                      {analysis}
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => window.print()}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center space-x-2 border border-white/10"
                      >
                        <i className="fas fa-print text-xs"></i>
                        <span>Print Report</span>
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/30">
                        Discuss with Director
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center text-slate-500 space-y-6">
                    {loading ? (
                      <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                          <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-bold animate-pulse">Scanning Structural Data</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5">
                          <i className="fas fa-file-shield text-5xl opacity-10"></i>
                        </div>
                        <div className="text-center max-w-xs">
                          <p className="text-lg font-bold text-slate-400 mb-2">Awaiting Telemetry</p>
                          <p className="text-xs opacity-50 italic">Live camera scan data will be processed here for structural and salvage estimates.</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIQuoteAssistant;
