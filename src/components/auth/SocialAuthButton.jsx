import React from 'react';
import { motion } from 'framer-motion';

const SocialAuthButton = ({ provider, onClick }) => {
    const isGoogle = provider === 'google';

    return (
        <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="
        flex-1 flex items-center justify-center gap-3 py-3 rounded-xl
        bg-white/5 border border-white/10 
        hover:border-white/20 hover:bg-white/10
        transition-all duration-300 backdrop-blur-sm
        group
      "
        >
            {isGoogle ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#EA4335"
                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.065 0 12 0 7.37 0 3.357 2.675 1.486 6.556l3.78 3.209z"
                    />
                    <path
                        fill="#34A853"
                        d="M16.04 18.013c-.886.63-2.186 1.088-4.04 1.088-3.13 0-5.787-2.126-6.732-4.996l-3.794 3.178C4.018 21.033 7.74 24 12 24c3.21 0 5.923-1.045 7.85-2.83l-3.81-3.157z"
                    />
                    <path
                        fill="#4A90E2"
                        d="M19.85 20.97a10.207 10.207 0 0 0 2.68-6.97c0-.622-.054-1.226-.16-1.805H12v4.545h6.056c-.26 1.34-1.01 2.476-2.073 3.19l3.867 3.21z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.266 14.175c-.244-.728-.378-1.503-.378-2.302 0-.8.134-1.574.378-2.302l-3.78-3.21A11.942 11.942 0 0 0 0 11.873c0 1.956.467 3.796 1.286 5.412l3.98-3.11z"
                    />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.7.79 3.44 1.92-3.04 1.83-2.53 5.46.26 6.55-.67 1.74-1.6 3.41-2.29 4.56zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
            )}
            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                {isGoogle ? 'Google' : 'Apple'}
            </span>
        </motion.button>
    );
};

export default SocialAuthButton;
