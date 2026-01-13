import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { autoTagImage } from '../services/geminiService';
const AdminDashboard = ({ onExit }) => {
    const [queue, setQueue] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [stats, setStats] = useState({ total: 0, demolition: 0, salvage: 0, clearance: 0 });
    const fileInputRef = useRef(null);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('olik_field_reports') || '[]');
        const counts = saved.reduce((acc, curr) => {
            const key = curr.tag.toLowerCase();
            if (acc.hasOwnProperty(key))
                acc[key]++;
            return acc;
        }, { total: saved.length, demolition: 0, salvage: 0, clearance: 0 });
        setStats({ ...counts, total: saved.length });
    }, []);
    const handleFiles = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0)
            return;
        const newEntries = [];
        for (const file of files) {
            const reader = new FileReader();
            const promise = new Promise((resolve) => {
                reader.onloadend = () => {
                    newEntries.push({
                        id: `temp-${Math.random().toString(36).substr(2, 9)}`,
                        base64: reader.result,
                        title: 'Waiting for scan...',
                        tag: 'Demolition',
                        status: 'pending'
                    });
                    resolve();
                };
            });
            reader.readAsDataURL(file);
            await promise;
        }
        setQueue(prev => [...prev, ...newEntries]);
        if (fileInputRef.current)
            fileInputRef.current.value = '';
    };
    const startBatchProcessing = async () => {
        if (isProcessing)
            return;
        setIsProcessing(true);
        const updatedQueue = [...queue];
        for (let i = 0; i < updatedQueue.length; i++) {
            if (updatedQueue[i].status !== 'pending')
                continue;
            updatedQueue[i].status = 'scanning';
            setQueue([...updatedQueue]);
            try {
                const aiResult = await autoTagImage(updatedQueue[i].base64);
                updatedQueue[i].title = aiResult.title || 'Untitled Site Photo';
                updatedQueue[i].tag = aiResult.tag || 'Demolition';
                updatedQueue[i].status = 'done';
            }
            catch (error) {
                updatedQueue[i].status = 'error';
            }
            setQueue([...updatedQueue]);
        }
        setIsProcessing(false);
    };
    const handlePublishBatch = () => {
        const readyToPublish = queue.filter(item => item.status === 'done');
        if (readyToPublish.length === 0)
            return;
        const newEntries = readyToPublish.map(item => ({
            id: `owner-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            url: item.base64,
            caption: item.title,
            tag: item.tag
        }));
        const existing = JSON.parse(localStorage.getItem('olik_field_reports') || '[]');
        localStorage.setItem('olik_field_reports', JSON.stringify([...newEntries, ...existing]));
        setQueue([]);
        alert(`Successfully published ${newEntries.length} field reports!`);
        window.location.reload();
    };
    const removeItem = (id) => {
        setQueue(prev => prev.filter(item => item.id !== id));
    };
    return (_jsxs("div", { className: "min-h-screen bg-slate-950 text-white font-sans", children: [_jsxs("nav", { className: "border-b border-white/10 px-6 py-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center", children: _jsx("i", { className: "fas fa-hammer" }) }), _jsx("h1", { className: "font-black text-lg tracking-tight", children: "OLIK BATCH CONSOLE" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("button", { onClick: () => fileInputRef.current?.click(), className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition flex items-center space-x-2", children: [_jsx("i", { className: "fas fa-plus" }), _jsx("span", { children: "Add Photos" })] }), _jsx("button", { onClick: onExit, className: "px-5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition", children: "Exit" })] })] }), _jsxs("main", { className: "container mx-auto px-6 py-12 max-w-7xl", children: [_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12", children: [
                            { label: 'Published Logs', val: stats.total, icon: 'fa-camera', color: 'text-blue-400' },
                            { label: 'Pending Queue', val: queue.length, icon: 'fa-layer-group', color: 'text-yellow-400' },
                            { label: 'Processed', val: queue.filter(i => i.status === 'done').length, icon: 'fa-check-double', color: 'text-green-400' },
                            { label: 'Site Coverage', val: '47 Counties', icon: 'fa-map-location-dot', color: 'text-purple-400' }
                        ].map(s => (_jsxs("div", { className: "bg-slate-900/50 p-6 rounded-3xl border border-white/5", children: [_jsx("i", { className: `fas ${s.icon} ${s.color} mb-3` }), _jsx("p", { className: "text-2xl font-black", children: s.val }), _jsx("p", { className: "text-[10px] text-slate-500 font-bold uppercase tracking-widest", children: s.label })] }, s.label))) }), queue.length > 0 ? (_jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between bg-blue-600/10 border border-blue-500/20 p-6 rounded-[2rem] mb-12 gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-black", children: "Staging Environment" }), _jsx("p", { className: "text-sm text-slate-400", children: "Review AI assignments before publishing to public site." })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsxs("button", { onClick: startBatchProcessing, disabled: isProcessing || queue.every(i => i.status !== 'pending'), className: "px-8 py-4 bg-white text-blue-950 rounded-2xl font-black text-sm transition-all hover:bg-blue-50 disabled:opacity-30 flex items-center space-x-2", children: [isProcessing ? _jsx("i", { className: "fas fa-spinner animate-spin" }) : _jsx("i", { className: "fas fa-brain" }), _jsx("span", { children: "AI Scan All" })] }), _jsx("button", { onClick: handlePublishBatch, disabled: isProcessing || !queue.some(i => i.status === 'done'), className: "px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm transition-all hover:bg-blue-500 disabled:opacity-30 shadow-xl shadow-blue-600/20", children: "Publish All Ready" })] })] })) : (_jsxs("div", { onClick: () => fileInputRef.current?.click(), className: "col-span-full border-4 border-dashed border-blue-500/30 rounded-[3rem] py-32 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-500 hover:bg-blue-500/10 transition-all mb-12", children: [_jsx("div", { className: "w-28 h-28 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl animate-pulse", children: _jsx("i", { className: "fas fa-images text-5xl text-white" }) }), _jsx("h3", { className: "text-3xl font-black text-white mb-4", children: "Click to Upload Site Photos" }), _jsx("p", { className: "text-slate-400 text-lg mb-8 max-w-md text-center", children: "Your gallery is currently empty. Upload photos from the field to populate your public portfolio." }), _jsx("button", { className: "bg-white text-blue-950 px-12 py-5 rounded-2xl font-black text-lg uppercase shadow-2xl group-hover:bg-blue-50 transition", children: "Select Field Photos" })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: queue.map((item) => (_jsxs("div", { className: "group bg-slate-900/50 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col relative", children: [_jsxs("div", { className: "relative aspect-video", children: [_jsx("img", { src: item.base64, className: "w-full h-full object-cover", alt: "Site thumbnail" }), item.status === 'scanning' && (_jsxs("div", { className: "absolute inset-0 bg-blue-600/60 backdrop-blur-sm flex flex-col items-center justify-center", children: [_jsx("div", { className: "w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-3" }), _jsx("span", { className: "text-[10px] font-black uppercase tracking-widest animate-pulse", children: "Scanning Site..." })] })), item.status === 'done' && (_jsx("div", { className: "absolute top-4 right-4 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg", children: _jsx("i", { className: "fas fa-check text-xs" }) })), _jsx("button", { onClick: () => removeItem(item.id), className: "absolute top-4 left-4 bg-red-500/80 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100", children: _jsx("i", { className: "fas fa-times text-xs" }) })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1 block", children: "Generated Title" }), _jsx("input", { type: "text", value: item.title, disabled: item.status !== 'done', onChange: (e) => {
                                                        const newQueue = [...queue];
                                                        const idx = newQueue.findIndex(q => q.id === item.id);
                                                        newQueue[idx].title = e.target.value;
                                                        setQueue(newQueue);
                                                    }, className: "w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" })] }), _jsx("div", { className: "flex items-center justify-between", children: _jsx("div", { className: "flex gap-2", children: ['Demolition', 'Salvage', 'Clearance'].map(t => (_jsx("button", { disabled: item.status !== 'done', onClick: () => {
                                                        const newQueue = [...queue];
                                                        const idx = newQueue.findIndex(q => q.id === item.id);
                                                        newQueue[idx].tag = t;
                                                        setQueue(newQueue);
                                                    }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${item.tag === t ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-600 border border-white/5'} disabled:opacity-30`, children: t }, t))) }) })] })] }, item.id))) })] }), _jsx("input", { type: "file", ref: fileInputRef, hidden: true, multiple: true, accept: "image/*", onChange: handleFiles })] }));
};
export default AdminDashboard;
