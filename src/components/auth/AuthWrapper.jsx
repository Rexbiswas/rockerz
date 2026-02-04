import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const AuthColorContext = createContext();

export const useAuthColor = () => {
    const context = useContext(AuthColorContext);
    if (!context) {
        throw new Error('useAuthColor must be used within an AuthWrapper');
    }
    return context;
};

const colors = [
    {
        id: 'midnight',
        name: 'Midnight Black',
        primary: 'bg-black',
        text: 'text-black',
        accent: 'text-white',
        gradient: 'from-gray-900 via-gray-950 to-black',
        shadow: 'shadow-gray-900/50',
        ring: 'ring-gray-800',
        button: 'bg-white text-black hover:bg-gray-200',
        imgFilter: 'sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%)',
        particles: 'bg-white/20'
    },
    {
        id: 'azure',
        name: 'Azure Blue',
        primary: 'bg-blue-600',
        text: 'text-blue-600',
        accent: 'text-blue-100',
        gradient: 'from-blue-900 via-slate-950 to-blue-950',
        shadow: 'shadow-blue-900/50',
        ring: 'ring-blue-500',
        button: 'bg-blue-500 text-white hover:bg-blue-400',
        imgFilter: 'sepia(100%) saturate(300%) hue-rotate(180deg) brightness(85%) contrast(110%)',
        particles: 'bg-blue-400/30'
    },
    {
        id: 'crimson',
        name: 'Crimson Red',
        primary: 'bg-red-600',
        text: 'text-red-600',
        accent: 'text-red-100',
        gradient: 'from-red-900 via-rose-950 to-red-950',
        shadow: 'shadow-red-900/50',
        ring: 'ring-red-500',
        button: 'bg-red-500 text-white hover:bg-red-400',
        imgFilter: 'sepia(100%) saturate(300%) hue-rotate(320deg) brightness(85%) contrast(110%)',
        particles: 'bg-red-400/30'
    },
    {
        id: 'lavender',
        name: 'Lavender Haze',
        primary: 'bg-purple-600',
        text: 'text-purple-400',
        accent: 'text-purple-200',
        gradient: 'from-purple-900 via-violet-950 to-purple-950',
        shadow: 'shadow-purple-900/50',
        ring: 'ring-purple-500',
        button: 'bg-purple-500 text-white hover:bg-purple-400',
        imgFilter: 'sepia(100%) saturate(300%) hue-rotate(240deg) brightness(95%) contrast(110%)',
        particles: 'bg-purple-400/30'
    }
];

// Reusable Tilt Card Component
const TiltCard = ({ children, className, selectedColor }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
    const shadowX = useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]);
    const shadowY = useTransform(mouseY, [-0.5, 0.5], ["-20px", "20px"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative preserve-3d transition-transform duration-200 ease-out ${className}`}
        >
            {/* Dynamic Shadow Layer */}
            <motion.div
                style={{ x: shadowX, y: shadowY, opacity: 0.4 }}
                className="absolute inset-4 bg-black rounded-[2.5rem] blur-2xl -z-10"
            />
            {children}
        </motion.div>
    );
};

// Separated Background Component to prevent re-renders of the form
const BackgroundEffects = ({ selectedColor }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for background elements
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const orbX1 = useTransform(springX, (value) => value * 0.02);
    const orbY1 = useTransform(springY, (value) => value * 0.02);
    const orbX2 = useTransform(springX, (value) => value * -0.02);
    const orbY2 = useTransform(springY, (value) => value * -0.02);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly without triggering React state updates
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Stable particles configuration
    const particles = useMemo(() => [...Array(8)].map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {/* Large Orb Top Left */}
            <motion.div
                style={{ x: orbX1, y: orbY1 }}
                className={`absolute top-[-10%] left-[-10%] w-[800px] h-[800px] ${selectedColor.primary} rounded-full blur-[150px] transition-colors duration-700 opacity-30`}
            />

            {/* Large Orb Bottom Right */}
            <motion.div
                style={{ x: orbX2, y: orbY2 }}
                className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen transition-colors duration-700 opacity-20`}
            />

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${selectedColor.particles} backdrop-blur-sm`}
                    initial={{ left: `${p.x}vw`, top: `${p.y}vh`, scale: 0, opacity: 0 }}
                    animate={{
                        y: [null, Math.random() * -100],
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay
                    }}
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}

            {/* Wireframe Torus / Geometric Accent */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/5 rounded-full border-dashed opacity-20"
            />
        </div>
    );
};

const AuthWrapper = ({ title, subtitle, children }) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    return (
        <AuthColorContext.Provider value={{ selectedColor, setSelectedColor }}>
            <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-700 ease-in-out text-white`}>

                {/* 1. Full Page Dynamic Background */}
                {/* 1. Full Page Dynamic Background (Matching Home) */}
                <div className={`fixed inset-0 -z-10 bg-linear-to-br ${selectedColor.gradient} transition-colors duration-1000`} />

                {/* 2. Noise Overlay (Matching Home) */}
                <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                {/* 3. Color Picker Sidebar */}
                <div className="color-picker-sidebar">
                    {colors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setSelectedColor(color)}
                            className={`w-6 h-6 rounded-full transition-all duration-300 relative group cursor-pointer ${selectedColor.id === color.id ? 'scale-125' : 'scale-100 hover:scale-110'}`}
                            title={color.name}
                        >
                            <span className={`absolute inset-0 rounded-full ${color.primary} opacity-80 group-hover:opacity-100 transition-opacity`} />
                            {selectedColor.id === color.id && (
                                <motion.span
                                    layoutId="activeColorRingAuth"
                                    className={`absolute -inset-2 rounded-full border-2 border-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* 5. Main Content Grid */}
                <div className="container mx-auto px-6 h-screen relative z-10 hidden lg:flex items-center justify-between gap-24">

                    {/* Left: Typography & Brand */}
                    <div className="flex-1 max-w-2xl relative">
                        {/* Decorative Line */}
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100px" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`absolute -left-8 top-0 w-1 ${selectedColor.primary} rounded-full opacity-50`}
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 180 }}
                                    transition={{ duration: 0.5 }}
                                    className={`w-12 h-12 rounded-2xl ${selectedColor.primary} shadow-lg shadow-${selectedColor.shadow} flex items-center justify-center`}
                                >
                                    <div className="w-1/2 h-1/2 border-2 border-white/80 rounded-full" />
                                </motion.div>
                                <span className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">ROKERZ</span>
                            </div>

                            <motion.h1
                                className="text-8xl font-black tracking-tighter leading-[0.85] mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ staggerChildren: 0.1 }}
                            >
                                <span className="block text-white mix-blend-overlay opacity-50">SOUND</span>
                                <span className={`block text-transparent bg-clip-text bg-linear-to-r ${selectedColor.gradient} brightness-200 drop-shadow-2xl`}>
                                    REDEFINED.
                                </span>
                            </motion.h1>

                            <p className="text-xl text-gray-300 max-w-md leading-relaxed font-light border-l border-white/10 pl-6">
                                Join the elite community of audiophiles. <br />
                                <span className="text-white font-medium">Experience the impossible.</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: 3D Tilt Auth Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotateY: 20 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full max-w-md relative perspective-[2000px]"
                    >
                        <TiltCard className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative group" selectedColor={selectedColor}>
                            {/* Inner Glow Gradient */}
                            <div className={`absolute inset-0 rounded-[2.5rem] bg-linear-to-br ${selectedColor.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 -z-10 blur-xl`} />

                            {/* Glass Reflection Top */}
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/10 to-transparent rounded-t-[2.5rem] pointer-events-none" />

                            <div className="relative z-10">
                                <div className="mb-10 text-center">
                                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>
                                    <p className="text-gray-400 text-sm">{subtitle}</p>
                                </div>
                                {children}
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>

                {/* Mobile View (Simplified) */}
                <div className="lg:hidden container mx-auto px-4 h-full min-h-screen flex flex-col justify-center py-20">
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-black tracking-tighter text-white mb-2">ROKERZ</h1>
                        <p className={`text-sm font-bold tracking-[0.5em] uppercase ${selectedColor.text} brightness-150`}>Redefined</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                            <p className="text-gray-400 text-sm">{subtitle}</p>
                        </div>
                        {children}
                    </div>
                </div>

            </div>
        </AuthColorContext.Provider>
    );
};

export default AuthWrapper;
