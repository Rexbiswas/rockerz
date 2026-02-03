import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Headset, Smartphone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Headphones', path: '/headphone', icon: <Headset className="w-4 h-4" /> },
        { name: 'Earbuds', path: '/earbuds', icon: <Smartphone className="w-4 h-4" /> },
        { name: 'Shops', path: '/shop' }
    ];

    // Decleared Dynamic classes based on scroll state 
    const textColor = scrolled ? 'text-[#333]' : 'text-white';
    const bgColor = scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/20' : 'bg-transparent border-transparent';
    const logoBg = scrolled ? 'bg-[#333]' : 'bg-white';
    const logoIconColor = scrolled ? 'text-white' : 'text-black';
    const activePillClass = scrolled ? 'bg-[#333] text-white' : 'bg-white text-black';
    const hoverClass = scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* navbar container */}
                <div className={`relative w-full flex items-center justify-between transition-all duration-300 rounded-2xl px-6 py-2 ${bgColor}`}>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                    ? activePillClass
                                    : `${textColor} ${hoverClass}`
                                    }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group md:absolute md:left-1/2 md:-translate-x-1/2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 ${logoBg}`}>
                            <Headset className={`w-6 h-6 ${logoIconColor}`} />
                        </div>
                        &nbsp;
                        <span className={`text-2xl font-black tracking-tighter uppercase italic ml-2 ${textColor}`}>
                            Rokerz
                        </span>
                    </Link>

                    {/* Right Section */}
                    <div className="flex items-center space-x-5">
                        <button className={`p-2 rounded-full relative group transition-colors ${textColor} ${hoverClass}`}>
                            <ShoppingCart className="w-5 h-5" />
                            <span className={`absolute top-0 right-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 group-hover:scale-110 transition-transform bg-red-500 text-white border-white`}>
                                0
                            </span>
                        </button>
                        <button
                            className={`md:hidden p-2 rounded-xl ml-2 ${scrolled ? 'bg-gray-100 text-[#333]' : 'bg-white/20 text-white'}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <div className="hidden md:flex items-center pl-4">
                            <motion.button
                                whileHover="hover"
                                initial="initial"
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsAuthOpen(true)}
                                className={`
                                    relative overflow-hidden px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase
                                    border transition-all duration-300 group
                                    ${scrolled
                                        ? 'border-black/10 text-black'
                                        : 'border-white/20 text-white bg-white/5 backdrop-blur-sm'
                                    }
                                `}
                            >
                                <motion.div
                                    variants={{
                                        initial: { y: "100%" },
                                        hover: { y: "0%" }
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`absolute inset-0 z-0 ${scrolled ? 'bg-black' : 'bg-white'}`}
                                />
                                <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${scrolled ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
                                    <span>Login</span>
                                    <User className="w-4 h-4" />
                                </span>
                            </motion.button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`md:hidden absolute top-20 left-4 right-4 border rounded-3xl shadow-2xl overflow-hidden z-50 p-4 bg-white border-gray-100`}
                    >
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${location.pathname === link.path
                                        ? 'bg-black text-white'
                                        : 'text-[#333] hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${location.pathname === link.path ? 'bg-white/20' : 'bg-gray-100'}`}>
                                        {link.icon}
                                    </div>
                                    <span className="font-semibold">{link.name}</span>
                                </Link>
                            ))}

                            <hr className="border-gray-100 my-2" />

                            <button
                                className="w-full flex items-center justify-center space-x-2 p-4 rounded-2xl bg-black text-white active:scale-95 transition-transform"
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsAuthOpen(true);
                                }}
                            >
                                <span>Login</span>
                                <User className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </nav>
    );
};

export default Navbar;
