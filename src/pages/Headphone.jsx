import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroHeadphone from '../assets/hero-headphone.png';

const colors = [
  {
    id: 'midnight',
    name: 'Midnight Black',
    primary: 'bg-black',
    text: 'text-black',
    accent: 'text-white',
    gradient: 'from-gray-900 to-black',
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
    button: 'bg-purple-500 text-white hover:bg-purple-400',
    imgFilter: 'sepia(100%) saturate(300%) hue-rotate(240deg) brightness(95%) contrast(110%)'
  }
];

function Headphone() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

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
        <div className="flex-1 text-center md:text-left z-10 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter"
          >
            ROKERZ <br />
            <span className={`text-transparent bg-clip-text bg-linear-to-r ${selectedColor.gradient} brightness-200`}>
              HEADPHONES
            </span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-lg">
            Studio-quality precision. Wireless freedom. The ultimate over-ear experience tailored to your vibe.
          </p>
          <button className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 ${selectedColor.button}`}>
            Buy Now
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex justify-center relative mt-10 md:mt-0"
        >
          <motion.img
            src={heroHeadphone}
            alt="Headphones"
            className="w-full max-w-lg object-contain drop-shadow-2xl"
            animate={{
              y: [-15, 15, -15],
              filter: `${selectedColor.imgFilter} drop-shadow(0 20px 50px rgba(0,0,0,0.5))`
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              filter: { duration: 0.5 }
            }}
          />
        </motion.div>
      </section>
    </div>
  )
}

export default Headphone