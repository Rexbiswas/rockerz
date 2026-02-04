import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthColorContext } from './AuthWrapper';

const AuthButton = ({ children, onClick, type = 'button', isLoading, className = '' }) => {
    const context = useContext(AuthColorContext);
    const selectedColor = context?.selectedColor;

    // Default gradient if no context (fallback)
    const defaultClasses = "bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-500/20";

    // Use selected color button classes if available, otherwise default
    const colorClasses = selectedColor ? selectedColor.button : defaultClasses;

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={`
        w-full py-3.5 rounded-xl font-semibold text-white
        ${colorClasses}
        shadow-lg
        disabled:opacity-70 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        transition-all duration-300
        ${className}
      `}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                children
            )}
        </motion.button>
    );
};

export default AuthButton;
