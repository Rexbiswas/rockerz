import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Battery, Zap, Music, Wifi, ChevronDown } from 'lucide-react';
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
        shadow: 'shadow-gray-900/50',
        ring: 'ring-gray-800',
        button: 'bg-white text-black hover:bg-gray-200',
        imgFilter: 'sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%)'
    },
    {
        id: 'azure',
        name: 'Azure Blue',
        primary: 'bg-blue-600',
        text: 'text-blue-600',
        accent: 'text-blue-100',
        gradient: 'from-blue-900 to-blue-950',
        shadow: 'shadow-blue-900/50',
        ring: 'ring-blue-500',
        button: 'bg-blue-500 text-white hover:bg-blue-400',
        imgFilter: 'sepia(100%) saturate(300%) hue-rotate(180deg) brightness(85%) contrast(110%)'
    },
    {
        id: 'crimson',
        name: 'Crimson Red',
        primary: 'bg-red-600',
        text: 'text-red-600',
        accent: 'text-red-100',
        gradient: 'from-red-900 to-red-950',
        shadow: 'shadow-red-900/50',
        ring: 'ring-red-500',
        button: 'bg-red-500 text-white hover:bg-red-400',
        imgFilter: 'sepia(100%) saturate(300%) hue-rotate(320deg) brightness(85%) contrast(110%)'
    },
    {
        id: 'lavender',
        name: 'Lavender Haze',
        primary: 'bg-purple-600',
        text: 'text-purple-400',
        accent: 'text-purple-200',
        gradient: 'from-purple-900 to-violet-950',
        shadow: 'shadow-purple-900/50',
        ring: 'ring-purple-500',
        button: 'bg-purple-500 text-white hover:bg-purple-400',
        imgFilter: 'sepia(100%) saturate(300%) hue-rotate(240deg) brightness(95%) contrast(110%)'
    }
];

const Home = () => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    // const targetRef = useRef(null); // Unused
    // const { scrollYProgress } = useScroll(); // Unused
    const { scrollY } = useScroll();

    // Parallax & Transform effects
    const yText = useTransform(scrollY, [0, 500], [0, 200]);
    const scaleImg = useTransform(scrollY, [0, 500], [1.6, 1.6]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className={`relative min-h-screen text-white overflow-x-hidden transition-colors duration-700 ease-in-out`}>

            {/* Dynamic Background */}
            <div className={`fixed inset-0 -z-10 bg-linear-to-br ${selectedColor.gradient} transition-colors duration-1000`} />

            {/* Animated Grain/Noise Overlay */}
            <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Vertical Color Picker - Right Side */}
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

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-20 overflow-hidden">

                {/* Background Massive Text - "Unexpected" Position */}
                <motion.div
                    style={{ y: yText, opacity: opacityHero }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap pointer-events-none select-none"
                >
                    <h1 className="text-[15rem] md:text-[25rem] font-bold tracking-tighter text-white/5 leading-none">
                        ROKERZ
                    </h1>
                </motion.div>

                <div className="container mx-auto relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">

                        {/* Text Block */}
                        <div className="lg:col-span-4 order-2 lg:order-1 text-center lg:text-left space-y-8">
                            <motion.div
                                key={selectedColor.id} // Re-animate on color change
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                            >
                                <h2 className="text-xl font-medium tracking-[0.2em] mb-4 text-white/60">INTRODUCING</h2>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
                                    SOUND <br />
                                    <span className={`text-transparent bg-clip-text bg-linear-to-r ${selectedColor.gradient} brightness-200`}>
                                        UNLEASHED
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                    Immerse yourself in pure audio perfection.
                                    Precision engineering meets studio-grade acoustics.
                                </p>
                            </motion.div>

                            <motion.div
                                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button className={`px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg ${selectedColor.button}`}>
                                    Pre-Order Now <ArrowRight className="w-4 h-4" />
                                </button>
                                <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 backdrop-blur-md transition-colors">
                                    <Play className="w-5 h-5 fill-current ml-1" />
                                    <span className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-medium tracking-wide">
                                        Watch Video
                                    </span>
                                </button>
                            </motion.div>
                        </div>

                        {/* Center Hero Image */}
                        <div className="lg:col-span-8 order-1 lg:order-2 relative h-[50vh] md:h-[70vh] flex items-center justify-center">
                            {/* Orbiting Elements */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-white/5 border-dashed z-0`}
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className={`absolute w-[500px] h-[500px] md:w-[750px] md:h-[750px] rounded-full border border-white/5 border-dashed z-0`}
                            />

                            <motion.img
                                src={heroHeadphone}
                                alt="Rokerz Hero"
                                style={{
                                    scale: scaleImg,
                                    filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))'
                                }}
                                className="w-full h-full object-contain relative z-20"
                                animate={{
                                    y: [-20, 20, -20],
                                }}
                                transition={{
                                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                }}
                            />

                            {/* Floating Glass Stats - Absolute Positioned around Headphone */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute top-1/4 right-0 md:right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-20 max-w-[150px]"
                            >
                                <Battery className={`w-6 h-6 mb-2 ${selectedColor.text} brightness-100`} />
                                <h3 className="font-bold text-2xl">50h</h3>
                                <p className="text-xs text-gray-400">Playtime on single charge</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="absolute bottom-1/4 left-0 md:left-10 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-20 max-w-[150px]"
                            >
                                <Wifi className={`w-6 h-6 mb-2 ${selectedColor.text} brightness-150`} />
                                <h3 className="font-bold text-sm uppercase">Adaptive ANC</h3>
                                <p className="text-xs text-gray-400">Smart noise cancellation</p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Scroll Indicator */}
                <motion.div
                    style={{ opacity: opacityHero }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll Down</span>
                    <ChevronDown className="w-5 h-5 text-white/50" />
                </motion.div>
            </section>

            {/* Features Section Stubs */}
            <section className="py-20 relative z-10 bg-black/50 backdrop-blur-lg">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Hyper Charge", desc: "0 to 100% in 15 mins" },
                            { icon: Music, title: "Spatial Audio", desc: "360° immersive soundstage" },
                            { icon: Wifi, title: "Low Latency", desc: "10ms for pro gaming" }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <feature.icon className={`w-10 h-10 mb-4 group-hover:scale-110 transition-transform ${selectedColor.text} brightness-150`} />
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ANC Interactive Experience Section */}
            <section className="relative z-20 w-full h-[80vh] overflow-hidden bg-zinc-900 border-y border-white/5">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
                    <video
                        src="https://www.leafstudios.in/cdn/shop/videos/c/vp/d2872930e7714f91993db54c7d1edbf4/d2872930e7714f91993db54c7d1edbf4.HD-720p-4.5Mbps-56501575.mp4?v=0"
                        type="video/mp4"
                        muted
                        autoPlay
                        loop
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </section>

            {/* Split Screen "Choose Your Vibe" Section */}
            <section className="h-screen flex flex-col lg:flex-row relative z-20 overflow-hidden">
                <motion.div
                    initial={{ flex: 1 }}
                    whileHover={{ flex: 1.5 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-full lg:w-auto bg-black flex items-center justify-center group cursor-pointer border-b lg:border-b-0 lg:border-r border-white/10"
                    onClick={() => window.location.href = '/headphone'}
                >
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity bg-[url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                    <div className="relative z-10 text-center px-4">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white">HEADPHONES</h2>
                        <p className="text-lg md:text-xl text-gray-300 tracking-[0.5em] group-hover:tracking-[0.8em] transition-all duration-500">IMMERSIVE</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className={`mt-6 lg:mt-8 px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors`}
                        >
                            Explore
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ flex: 1 }}
                    whileHover={{ flex: 1.5 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-full lg:w-auto bg-zinc-900 flex items-center justify-center group cursor-pointer"
                    onClick={() => window.location.href = '/earbuds'}
                >
                    {/* Earbuds Image */}
                    <div
                        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity bg-cover bg-center grayscale group-hover:grayscale-0 duration-700"
                        style={{ backgroundImage: `url(${heroEarbuds})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                    <div className="relative z-10 text-center px-4">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white">EARBUDS</h2>
                        <p className="text-lg md:text-xl text-gray-300 tracking-[0.5em] group-hover:tracking-[0.8em] transition-all duration-500">FREEDOM</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className={`mt-6 lg:mt-8 px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors`}
                        >
                            Explore
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="relative z-20 bg-black text-white pt-24 pb-10 overflow-hidden">
                {/* Decorative Gradient Blob */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b ${selectedColor.gradient} opacity-20 blur-[100px] pointer-events-none`} />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                        <div className="space-y-8">
                            <h3 className="text-3xl font-bold tracking-tight">Stay ahead of the curve.</h3>
                            <div className="flex items-center gap-4 border-b border-white/20 pb-4 focus-within:border-white transition-colors group">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="bg-transparent border-none outline-none w-full placeholder:text-gray-600 text-lg group-focus-within:placeholder:text-white/50"
                                />
                                <button className={`font-bold text-sm tracking-widest uppercase ${selectedColor.text} hover:opacity-80 transition-opacity`}>
                                    JOIN
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:items-end justify-between gap-8">
                            <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
                                {['Instagram', 'Twitter', 'LinkedIn', 'Github'].map((social) => (
                                    <a href="#" key={social} className="hover:text-white text-gray-400 transition-colors uppercase tracking-widest text-xs font-bold">
                                        {social}
                                    </a>
                                ))}
                            </div>
                            <div className="flex gap-8 text-gray-600 text-xs tracking-wide">
                                <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                                <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
                            </div>
                        </div>
                    </div>

                    {/* Massive Footer Brand Name */}
                    <div className="relative border-t border-white/10 pt-10 mt-10">
                        <h1 className="text-[15vw] md:text-[18vw] leading-[0.8] font-black text-center tracking-tighter opacity-10 select-none bg-clip-text text-transparent bg-linear-to-b from-white to-transparent pointer-events-none">
                            ROKERZ
                        </h1>
                        <div>
                            <span>Create by Rishi Biswas</span>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-end md:justify-between items-end px-4 md:px-10">
                            <p className="text-gray-600 text-xs hidden md:block">© 2026 Rokerz Inc. // EST. 2024</p>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="group flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] hover:text-white text-gray-500 transition-colors"
                            >
                                <div className={`p-4 rounded-full ${selectedColor.primary} group-hover:-translate-y-2 transition-transform shadow-lg shadow-${selectedColor.shadow}`}>
                                    <ChevronDown className="w-5 h-5 text-white rotate-180" />
                                </div>
                                Back to Top
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;