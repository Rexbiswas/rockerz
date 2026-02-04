import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const BackgroundOrbs = ({ selectedColor }) => {
    // Default color fallback if not provided
    const color = selectedColor || {
        gradient: 'from-slate-950 via-slate-900 to-black',
        primary: 'bg-indigo-600',
        particles: 'bg-white/20'
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for background elements logic
    const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

    // Different movement speeds for depth perception (Parallax)
    const orbX1 = useTransform(springX, (value) => value * 0.03);
    const orbY1 = useTransform(springY, (value) => value * 0.03);

    const orbX2 = useTransform(springX, (value) => value * -0.02);
    const orbY2 = useTransform(springY, (value) => value * -0.02);

    const particleMoveX = useTransform(springX, (value) => value * 0.01);
    const particleMoveY = useTransform(springY, (value) => value * 0.01);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update motion values directly for high performance
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Stable particles configuration created once
    const particles = useMemo(() => [...Array(12)].map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2, // 2px to 6px
        initialX: Math.random() * 100, // vw
        initialY: Math.random() * 100, // vh
        duration: Math.random() * 10 + 10, // 10s to 20s
        delay: Math.random() * 5
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50">
            {/* 1. Deep Base Gradient */}
            <div className={`absolute inset-0 bg-linear-to-br ${color.gradient || 'from-black to-gray-900'} transition-colors duration-1000`} />

            {/* 2. Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* 3. Primary Glowing Orb (Top Left) */}
            <motion.div
                style={{ x: orbX1, y: orbY1 }}
                className={`absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] ${color.primary} rounded-full blur-[140px] opacity-20 mix-blend-screen transition-colors duration-700`}
            />

            {/* 4. Secondary Glowing Orb (Bottom Right) */}
            <motion.div
                style={{ x: orbX2, y: orbY2 }}
                className={`absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] ${color.primary} rounded-full blur-[120px] opacity-15 mix-blend-screen transition-colors duration-700`}
            />

            {/* 5. Floating Particles */}
            <motion.div style={{ x: particleMoveX, y: particleMoveY }} className="absolute inset-0">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className={`absolute rounded-full ${color.particles || 'bg-white/20'} backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                        initial={{
                            left: `${p.initialX}vw`,
                            top: `${p.initialY}vh`,
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            y: [0, -150], // Float upwards
                            scale: [0, 1, 0.5, 0], // Grow and shrink
                            opacity: [0, 0.8, 0] // Fade in and out
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                        style={{
                            width: p.size,
                            height: p.size,
                        }}
                    />
                ))}
            </motion.div>

            {/* 6. Subtle Rotating Geometric Elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="w-[90vw] h-[90vw] border border-white/5 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[60vw] h-[60vw] border border-white/5 rounded-full"
                />
            </div>
        </div>
    );
};

export default BackgroundOrbs;
