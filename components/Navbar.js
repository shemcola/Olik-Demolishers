import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const Navbar = ({ onAdminClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Activity', href: '#activity' },
        { name: 'Salvage', href: '#salvage' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'AI Audit', href: '#audit', special: true },
    ];
    const handleAdminAccess = () => {
        setIsMenuOpen(false);
        if (onAdminClick) {
            onAdminClick();
        }
        else {
            const url = new URL(window.location.href);
            url.searchParams.set('admin', 'true');
            window.history.pushState({}, '', url);
            window.dispatchEvent(new Event('popstate'));
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-3 shadow-md border-b border-blue-100/30' : 'bg-transparent py-6'}`, children: _jsxs("div", { className: "container mx-auto px-4 md:px-6 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-3 cursor-pointer", onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }), children: [_jsx("div", { className: "w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transform hover:rotate-6 transition-transform", children: _jsx("i", { className: "fas fa-helmet-safety text-2xl" }) }), _jsxs("div", { children: [_jsx("h1", { className: "font-black text-2xl tracking-tighter text-blue-950 leading-none", children: "OLIK" }), _jsx("p", { className: "text-[11px] font-black uppercase tracking-[0.2em] text-blue-600", children: "Demolishers" })] })] }), _jsxs("div", { className: "hidden md:flex items-center space-x-8 font-bold text-xs uppercase tracking-widest text-slate-700", children: [navLinks.map(link => (_jsx("a", { href: link.href, className: `hover:text-blue-600 transition-colors ${link.special ? 'text-blue-600' : ''}`, children: link.name }, link.name))), _jsx("a", { href: "https://wa.me/254700192081", className: "bg-blue-600 text-white px-7 py-3 rounded-xl text-xs font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform hover:scale-105 active:scale-95", children: "Hire Team" })] }), _jsx("button", { onClick: () => setIsMenuOpen(!isMenuOpen), className: "md:hidden w-10 h-10 flex items-center justify-center text-blue-950 focus:outline-none", "aria-label": "Toggle Menu", children: _jsx("i", { className: `fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-2xl` }) })] }) }), _jsx("div", { className: `fixed inset-0 z-[45] bg-blue-950/95 backdrop-blur-3xl transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`, children: _jsxs("div", { className: "flex flex-col items-center justify-center h-full space-y-8 p-6", children: [navLinks.map((link, idx) => (_jsx("a", { href: link.href, onClick: () => setIsMenuOpen(false), className: "text-white text-3xl font-black uppercase tracking-widest hover:text-blue-400 transition transform active:scale-95", style: { transitionDelay: `${idx * 75}ms` }, children: link.name }, link.name))), _jsxs("div", { className: "flex flex-col space-y-4 w-full max-w-xs pt-4", children: [_jsx("a", { href: "https://wa.me/254700192081", onClick: () => setIsMenuOpen(false), className: "bg-blue-600 text-white text-center py-5 rounded-2xl font-black text-xl uppercase shadow-2xl active:scale-95 transition", children: "Hire Team" }), _jsx("button", { onClick: handleAdminAccess, className: "bg-white/10 text-white/60 text-center py-4 rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/10 active:scale-95 transition", children: "Owner Portal" })] }), _jsxs("div", { className: "pt-12 flex space-x-8 text-3xl text-blue-300", children: [_jsx("a", { href: "#", children: _jsx("i", { className: "fab fa-instagram" }) }), _jsx("a", { href: "https://wa.me/254700192081", children: _jsx("i", { className: "fab fa-whatsapp" }) })] })] }) })] }));
};
export default Navbar;
