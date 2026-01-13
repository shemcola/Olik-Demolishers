import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { analyzeSiteImage } from '../services/geminiService';
const AIQuoteAssistant = () => {
    const [image, setImage] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError("Image too large. Please use a file under 10MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setAnalysis(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleAnalyze = async () => {
        if (!image)
            return;
        setLoading(true);
        setError(null);
        try {
            const result = await analyzeSiteImage(image);
            setAnalysis(result);
        }
        catch (err) {
            setError("Failed to process analysis. Please check your connection.");
        }
        finally {
            setLoading(false);
        }
    };
    const clearAll = () => {
        setImage(null);
        setAnalysis(null);
        setError(null);
    };
    return (_jsxs("section", { id: "audit", className: "py-24 bg-blue-900 text-white relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-blue-800 skew-x-12 translate-x-1/2 opacity-50" }), _jsx("div", { className: "container mx-auto px-6 relative z-10", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("div", { className: "inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-widest mb-4", children: [_jsx("i", { className: "fas fa-user-gear" }), _jsx("span", { children: "Customer Facing Analysis Tool" })] }), _jsx("h2", { className: "text-4xl md:text-5xl font-black mb-4", children: "Instant Site Audit Engine" }), _jsx("p", { className: "text-blue-200 text-lg max-w-2xl mx-auto", children: "Upload or capture a photo for an immediate structural breakdown. Note: This analysis is for estimation only and is not saved to our public portfolio." })] }), _jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: `group relative border-4 border-dashed rounded-[2.5rem] p-4 flex flex-col items-center justify-center transition-all min-h-[450px] shadow-2xl ${!image
                                                ? 'border-blue-500 bg-blue-950/40 hover:bg-blue-950/80 hover:border-blue-300 cursor-pointer scale-100 hover:scale-[1.01]'
                                                : 'border-transparent bg-white shadow-inner'}`, onClick: () => !image && fileInputRef.current?.click(), children: [image ? (_jsxs("div", { className: "relative w-full h-full rounded-3xl overflow-hidden shadow-2xl", children: [_jsx("img", { src: image, alt: "Site Preview", className: "w-full h-full object-cover" }), _jsx("button", { onClick: (e) => { e.stopPropagation(); clearAll(); }, className: "absolute top-6 right-6 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 transition hover:scale-110 active:scale-95 z-20", children: _jsx("i", { className: "fas fa-trash-alt" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" })] })) : (_jsxs("div", { className: "text-center p-8 flex flex-col items-center", children: [_jsx("div", { className: "w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:bg-blue-500 transition-all duration-300 shadow-xl animate-bounce", children: _jsx("i", { className: "fas fa-camera text-4xl text-white" }) }), _jsx("h4", { className: "text-2xl font-black text-white mb-2 uppercase tracking-tight", children: "Camera Feed" }), _jsx("p", { className: "text-blue-400 text-sm mb-6 max-w-[200px] font-bold", children: "CAPTURE SITE LIVE FOR AUDIT" }), _jsx("div", { className: "px-6 py-3 bg-white/10 rounded-full border border-white/20 text-xs font-black uppercase tracking-[0.2em]", children: "AI TELEMETRY \u2022 V2.0" })] })), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*", capture: "environment", onChange: handleFileChange })] }), image && !analysis && (_jsx("button", { onClick: handleAnalyze, disabled: loading, className: "w-full bg-blue-500 hover:bg-blue-400 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center space-x-4 disabled:opacity-50 shadow-xl shadow-blue-500/20 active:scale-[0.98]", children: loading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Processing Structural Scan..." })] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fas fa-bolt" }), _jsx("span", { children: "Request Immediate Analysis" })] })) })), error && (_jsxs("div", { className: "p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-center space-x-3", children: [_jsx("i", { className: "fas fa-exclamation-triangle" }), _jsx("span", { children: error })] }))] }), _jsx("div", { className: "relative", children: _jsxs("div", { className: "bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 h-full min-h-[450px] flex flex-col shadow-2xl relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600" }), _jsx("div", { className: "flex justify-between items-center mb-8", children: _jsx("div", { className: "flex flex-col", children: _jsxs("h3", { className: "text-2xl font-black flex items-center space-x-3", children: [_jsx("span", { className: "w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-sm", children: _jsx("i", { className: "fas fa-microchip" }) }), _jsx("span", { children: "Scan Results" })] }) }) }), analysis ? (_jsxs("div", { className: "flex-grow flex flex-col", children: [_jsx("div", { className: "bg-slate-950/50 p-6 rounded-2xl border border-white/5 whitespace-pre-wrap leading-relaxed text-blue-50 font-medium text-base overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-blue-600", children: analysis }), _jsxs("div", { className: "mt-8 grid grid-cols-2 gap-4", children: [_jsxs("button", { onClick: () => window.print(), className: "bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center space-x-2 border border-white/10", children: [_jsx("i", { className: "fas fa-print text-xs" }), _jsx("span", { children: "Print Report" })] }), _jsx("button", { className: "bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/30", children: "Discuss with Director" })] })] })) : (_jsx("div", { className: "flex-grow flex flex-col items-center justify-center text-slate-500 space-y-6", children: loading ? (_jsxs("div", { className: "flex flex-col items-center space-y-6", children: [_jsx("div", { className: "relative", children: _jsx("div", { className: "w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" }) }), _jsx("div", { className: "text-center", children: _jsx("p", { className: "text-white font-bold animate-pulse", children: "Scanning Structural Data" }) })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5", children: _jsx("i", { className: "fas fa-file-shield text-5xl opacity-10" }) }), _jsxs("div", { className: "text-center max-w-xs", children: [_jsx("p", { className: "text-lg font-bold text-slate-400 mb-2", children: "Awaiting Telemetry" }), _jsx("p", { className: "text-xs opacity-50 italic", children: "Live camera scan data will be processed here for structural and salvage estimates." })] })] })) }))] }) })] })] }) })] }));
};
export default AIQuoteAssistant;
