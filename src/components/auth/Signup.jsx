import React, { useState } from 'react';
import { Mail, Lock, User, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import InputField from './InputField';
import AuthButton from './AuthButton';
import SocialAuthButton from './SocialAuthButton';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            setError('You must agree to the Terms & Conditions');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Successfully registered
            // Maybe auto-login or redirect to login
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthWrapper
            title="Create an account"
            subtitle="Join us today and experience premium audio"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded-xl text-center">
                        {error}
                    </div>
                )}

                <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    icon={User}
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    icon={Mail}
                />

                <div className="flex flex-col gap-2">
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        icon={Lock}
                    />

                    <div className="flex items-center gap-2 mt-1 px-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`
                                w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 shrink-0
                                ${agreeTerms ? 'bg-purple-600 border-purple-600' : 'border-gray-500 bg-transparent group-hover:border-gray-400'}
                            `}>
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="hidden"
                                />
                                {agreeTerms && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms & Conditions</a>
                            </span>
                        </label>
                    </div>
                </div>

                <AuthButton type="submit" isLoading={loading}>
                    Create Account
                </AuthButton>

                <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-sm text-gray-500 bg-transparent">Or continue with</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <div className="flex gap-4">
                    <SocialAuthButton provider="google" onClick={() => console.log('Google login')} />
                    <SocialAuthButton provider="apple" onClick={() => console.log('Apple login')} />
                </div>

                <p className="text-center text-gray-400 text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white hover:text-purple-400 font-semibold transition-colors">
                        Login
                    </Link>
                </p>
            </form>
        </AuthWrapper>
    );
};

export default Signup;
