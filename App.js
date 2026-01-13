import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSlider from './components/ServicesSlider';
import AIQuoteAssistant from './components/AIQuoteAssistant';
import ProjectActivity from './components/ProjectActivity';
import SalvageGallery from './components/SalvageGallery';
import ProjectGallery from './components/ProjectGallery';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
const App = () => {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(false);
    useEffect(() => {
        const checkParams = () => {
            const params = new URLSearchParams(window.location.search);
            if (params.get('admin') === 'true') {
                setIsAdminMode(true);
            }
            else {
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
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === '2026') {
            setIsAuth(true);
            sessionStorage.setItem('olik_auth', 'true');
            setAuthError(false);
        }
        else {
            setAuthError(true);
            setTimeout(() => setAuthError(false), 2000);
        }
    };
    const toggleAdminMode = (show) => {
        const url = new URL(window.location.href);
        if (show) {
            url.searchParams.set('admin', 'true');
        }
        else {
            url.searchParams.delete('admin');
        }
        window.history.pushState({}, '', url);
        setIsAdminMode(show);
    };
    if (isAdminMode && !isAuth) {
        return (_jsx("div", { className: "min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans animate-fadeIn", children: _jsxs("div", { className: "max-w-md w-full animate-scaleIn", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("div", { className: "w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20 pulse-glow", children: _jsx("i", { className: "fas fa-shield-halved text-white text-3xl" }) }), _jsx("h1", { className: "text-white text-3xl font-black tracking-tighter mb-2", children: "OWNER COMMAND" }), _jsx("p", { className: "text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]", children: "Secure 2026 Protocol Required" })] }), _jsxs("form", { onSubmit: handleLogin, className: `bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-3xl space-y-6 ${authError ? 'animate-shake' : ''}`, children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 px-1", children: "Access Credential" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "0000", className: `w-full bg-slate-950 border ${authError ? 'border-red-500 shadow-red-500/20' : 'border-white/10 focus:border-blue-500 shadow-blue-500/10'} px-6 py-5 rounded-2xl text-white text-center text-4xl font-black outline-none transition-all shadow-inner font-mono tracking-[0.5em]`, autoFocus: true })] }), _jsx("button", { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-blue-900/40", children: "Verify Protocol" }), _jsx("button", { type: "button", onClick: () => toggleAdminMode(false), className: "w-full bg-transparent text-slate-500 hover:text-white py-2 font-bold text-[10px] uppercase tracking-widest transition", children: "Return to Public Site" })] }), _jsx("div", { className: "mt-10 text-center", children: _jsx("p", { className: "text-slate-800 text-[9px] font-black uppercase tracking-widest", children: "\u00A9 2026 OLIK Command Center \u2022 Secure Link Active" }) })] }) }));
    }
    if (isAdminMode && isAuth) {
        return _jsx(AdminDashboard, { onExit: () => toggleAdminMode(false) });
    }
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 overflow-x-hidden", children: [_jsx(Navbar, { onAdminClick: () => toggleAdminMode(true) }), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(ServicesSlider, {}), _jsx(AIQuoteAssistant, {}), _jsx(ProjectActivity, {}), _jsx(SalvageGallery, {}), _jsx(ProjectGallery, {}), _jsx(Contact, {})] }), _jsx("footer", { className: "bg-blue-950 text-white py-12", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center border-b border-blue-900 pb-12 mb-12 space-y-8 md:space-y-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-950", children: _jsx("i", { className: "fas fa-hammer text-xl" }) }), _jsxs("div", { onClick: () => toggleAdminMode(true), className: "cursor-pointer group", children: [_jsx("h1", { className: "font-extrabold text-xl tracking-tight text-white leading-none", children: "OLIK" }), _jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-blue-400 group-hover:text-white transition", children: "Demolishers" })] })] }), _jsxs("div", { className: "flex space-x-6 text-2xl", children: [_jsx("a", { href: "#", className: "hover:text-blue-400 transition", "aria-label": "Instagram", children: _jsx("i", { className: "fab fa-instagram" }) }), _jsx("a", { href: "https://wa.me/254700192081", className: "hover:text-blue-400 transition", "aria-label": "WhatsApp", children: _jsx("i", { className: "fab fa-whatsapp" }) })] })] }), _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center text-sm text-blue-400", children: [_jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " OLIK Demolishers. All rights reserved."] }), _jsxs("div", { className: "flex space-x-6 mt-4 md:mt-0", children: [_jsx("a", { href: "#", className: "hover:text-white transition", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "hover:text-white transition", children: "Terms of Service" })] })] })] }) }), _jsxs("div", { className: "fixed bottom-6 right-6 z-40 space-y-4", children: [_jsx("a", { href: "tel:+254700192081", className: "w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl animate-pulse hover:scale-110 transition active:scale-95", "aria-label": "Call Now", children: _jsx("i", { className: "fas fa-phone-alt" }) }), _jsx("a", { href: "https://wa.me/254700192081", className: "w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:scale-110 transition active:scale-95", "aria-label": "Chat on WhatsApp", children: _jsx("i", { className: "fab fa-whatsapp" }) })] })] }));
};
export default App;
