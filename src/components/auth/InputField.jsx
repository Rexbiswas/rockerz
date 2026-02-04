import React, { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AuthColorContext } from './AuthWrapper';

const InputField = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    error,
    icon: Icon
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    // Context for theming
    const context = useContext(AuthColorContext);
    const colorId = context?.selectedColor?.id || 'lavender';

    // Theme mappings
    const colorMap = {
        midnight: {
            ring: 'focus:ring-gray-500/50',
            border: 'focus:border-gray-500/50',
            text: 'group-focus-within:text-white',
            borderError: 'border-red-500/50 focus:ring-red-500/20'
        },
        azure: {
            ring: 'focus:ring-blue-500/50',
            border: 'focus:border-blue-500/50',
            text: 'group-focus-within:text-blue-400',
            borderError: 'border-red-500/50 focus:ring-red-500/20'
        },
        crimson: {
            ring: 'focus:ring-red-500/50',
            border: 'focus:border-red-500/50',
            text: 'group-focus-within:text-red-400',
            borderError: 'border-red-500/50 focus:ring-red-500/20'
        },
        lavender: {
            ring: 'focus:ring-purple-500/50',
            border: 'focus:border-purple-500/50',
            text: 'group-focus-within:text-purple-400',
            borderError: 'border-red-500/50 focus:ring-red-500/20'
        },
    };

    const theme = colorMap[colorId] || colorMap.lavender;

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>}
            <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 ${theme.text} transition-colors`}>
                    {Icon && <Icon size={20} />}
                </div>
                <input
                    name={name}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 
            text-white placeholder-gray-500 focus:outline-none focus:ring-2 
            ${theme.ring} ${theme.border}
            transition-all duration-300 backdrop-blur-sm
            ${error ? theme.borderError : ''}
          `}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
        </div>
    );
};

export default InputField;
