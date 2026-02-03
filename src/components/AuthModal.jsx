import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Github, Twitter, Chrome, Zap, Loader } from 'lucide-react';

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    useEffect(() => {
        animate(color, COLORS, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const endpoint = isLogin ? 'login' : 'register';
        const url = `http://localhost:5000/api/user/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(isLogin ? { email: formData.email, password: formData.password } : formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Success
            localStorage.setItem('auth-token', data.token);
            if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

            // Close and reset
            onClose();
            setFormData({ username: '', email: '', password: '' });
            alert(isLogin ? "Login Successful" : "Registration Successful");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Solid Dark Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#050505]/95"
                    >
                        {/* Grid Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]" />
                    </motion.div>

                    {/* Tech Card Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{ border, boxShadow }}
                        className="relative w-full max-w-md bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl z-10"
                    >
                        {/* Decorative Top Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                        {/* Cyber Circuit Lines */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl pointer-events-none" />

                        {/* Content Container */}
                        <div className="relative z-10 p-10 pb-12">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all text-zinc-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header Section */}
                            <div className="mb-10 pt-2">
                                <motion.div
                                    key={isLogin ? 'login' : 'signup'}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
                                        {isLogin ? 'Welcome Back' : 'Initialize ID'}
                                    </h2>
                                    <p className="text-zinc-400 text-sm">
                                        {isLogin ? 'Enter credentials to authorize access.' : 'Configure your new user parameters.'}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold"
                                >
                                    ⚠ {error}
                                </motion.div>
                            )}

                            {/* Form */}
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <AnimatePresence mode="popLayout">
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <InputField
                                                icon={User}
                                                type="text"
                                                placeholder="Identity Name"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <InputField
                                    icon={Mail}
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={Lock}
                                    type="password"
                                    placeholder="Passcode"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                {/* Modern Tech Button */}
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className="relative w-full group overflow-hidden rounded-lg mt-8 disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-white group-hover:bg-zinc-200 transition-colors" />
                                    <div className="relative py-4 px-6 flex items-center justify-between">
                                        <span className="font-bold text-black uppercase tracking-wider text-sm">
                                            {loading ? 'Processing...' : (isLogin ? 'Authorize Supply' : 'Create Entity')}
                                        </span>
                                        <div className="bg-black/10 p-1.5 rounded-full">
                                            {loading ? <Loader className="w-4 h-4 text-black animate-spin" /> : <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />}
                                        </div>
                                    </div>
                                </motion.button>
                            </form>

                            {/* Footer / Alt Actions */}
                            <div className="mt-10 pt-6 border-t border-zinc-900">
                                <p className="text-zinc-500 text-xs font-medium mb-4 uppercase tracking-wider">Or verify with</p>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <SocialButton icon={Github} label="Github" />
                                    <SocialButton icon={Chrome} label="Google" />
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={() => {
                                            setIsLogin(!isLogin);
                                            setError(null);
                                        }}
                                        className="text-white text-sm font-medium hover:text-zinc-300 transition-colors"
                                    >
                                        {isLogin ? "No ID found? Create one." : "Already authorized? Login."}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const SocialButton = ({ icon: Icon, label }) => (
    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all group">
        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
        <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider transition-colors">
            {label}
        </span>
    </button>
);

const InputField = ({ icon: Icon, type, placeholder, value, onChange, name }) => {
    return (
        <div className="group">
            <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-lg p-1 transition-all duration-300 group-focus-within:border-zinc-600 group-focus-within:bg-zinc-900 group-hover:border-zinc-700">
                <div className="relative flex items-center px-4 py-3">
                    <Icon className="w-5 h-5 text-zinc-500 transition-colors group-focus-within:text-white" />
                    <div className="h-6 w-[1px] bg-zinc-800 mx-4" /> {/* Vertical Divider */}
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-600 font-medium tracking-wide transition-colors"
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthModal;
