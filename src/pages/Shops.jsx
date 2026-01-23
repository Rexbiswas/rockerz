import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroHeadphone from '../assets/hero-headphone.png';
import heroEarbuds from '../assets/hero-earbuds.png';

const colors = [
    {
        id: 'midnight',
        name: 'Midnight Black',
        primary: 'bg-black',
        text: 'text-black',
        accent: 'text-white',
        gradient: 'from-gray-900 to-black',
        button: 'bg-white text-black hover:bg-gray-200'
    },
    {
        id: 'azure',
        name: 'Azure Blue',
        primary: 'bg-blue-600',
        text: 'text-blue-600',
        accent: 'text-blue-100',
        gradient: 'from-blue-900 to-blue-950',
        button: 'bg-blue-500 text-white hover:bg-blue-400'
    },
    {
        id: 'crimson',
        name: 'Crimson Red',
        primary: 'bg-red-600',
        text: 'text-red-600',
        accent: 'text-red-100',
        gradient: 'from-red-900 to-red-950',
        button: 'bg-red-500 text-white hover:bg-red-400'
    },
    {
        id: 'lavender',
        name: 'Lavender Haze',
        primary: 'bg-purple-600',
        text: 'text-purple-400',
        accent: 'text-purple-200',
        gradient: 'from-purple-900 to-violet-950',
        button: 'bg-purple-500 text-white hover:bg-purple-400'
    }
];

const products = [
    {
        id: 'headphones',
        type: 'headphone',
        title: 'HEADPHONES',
        description: 'Studio-quality precision. Wireless freedom. The ultimate over-ear experience tailored to your vibe.',
        image: heroHeadphone
    },
    {
        id: 'earbuds',
        type: 'earbud',
        title: 'EARBUDS',
        description: 'Compact design. Huge sound. Experience true wireless freedom with adaptive noise cancellation.',
        image: heroEarbuds
    }
];

function Shops() {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProductIndex((prev) => (prev + 1) % products.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const product = products[currentProductIndex];

    return (
        <div className={`relative min-h-screen text-white overflow-hidden transition-colors duration-700 ease-in-out`}>
            {/* Dynamic Background */}
            <div className={`fixed inset-0 -z-10 bg-linear-to-br ${selectedColor.gradient} transition-colors duration-1000`} />

            {/* Grain Overlay */}
            <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Color Picker Sidebar */}
            <div className="color-picker-sidebar">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-6 h-6 rounded-full transition-all duration-300 relative group ${selectedColor.id === color.id ? 'scale-125' : 'scale-100 hover:scale-110'}`}
                    >
                        <span className={`absolute inset-0 rounded-full ${color.primary}`} />
                        {selectedColor.id === color.id && (
                            <motion.span
                                layoutId="activeColorRing"
                                className={`absolute -inset-2 rounded-full border-2 border-white/50`}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        )}
                        <span className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-medium tracking-wide">
                            {color.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <section className="min-h-screen flex flex-col md:flex-row items-center justify-center container mx-auto px-4 pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 text-center md:text-left z-10 space-y-6"
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
                            ROKERZ <br />
                            <span className={`text-transparent bg-clip-text bg-linear-to-r ${selectedColor.gradient} brightness-200`}>
                                {product.title}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg">
                            {product.description}
                        </p>
                        <button className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 ${selectedColor.button}`}>
                            Buy Now
                        </button>
                    </motion.div>
                </AnimatePresence>

                <div className="flex-1 flex justify-center relative mt-10 md:mt-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="w-full flex justify-center"
                        >
                            {product.type === 'headphone' ? (
                                <motion.img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full max-w-lg object-contain drop-shadow-2xl"
                                    animate={{ y: [-15, 15, -15] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                            ) : (
                                <motion.div
                                    className="w-full max-w-lg aspect-square rounded-[3rem] shadow-2xl overflow-hidden relative"
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </div>
    )
}

export default Shops