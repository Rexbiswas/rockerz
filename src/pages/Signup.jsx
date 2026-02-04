import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import AuthWrapper from '../components/auth/AuthWrapper';
import InputField from '../components/auth/InputField';
import AuthButton from '../components/auth/AuthButton';
import SocialAuthButton from '../components/auth/SocialAuthButton';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const setAgreeTerms = (val) => {
        setFormData({ ...formData, agreeTerms: val });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        if (!formData.agreeTerms) {
            setError('You must agree to the Terms & Conditions');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Success
            alert('Account created successfully! Please login.');
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
            subtitle="Join Rokerz for exclusive drops and updates"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <InputField
                        icon={User}
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <InputField
                        icon={Mail}
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        icon={Lock}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 rounded border-gray-600 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-2"
                        checked={formData.agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer select-none">
                        I agree to the <span className="text-purple-400 hover:text-purple-300">Terms & Conditions</span>
                    </label>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <AuthButton type="submit" isLoading={loading}>
                    Create Account
                </AuthButton>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-transparent backdrop-blur-md px-2 text-gray-500">or continue with</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <SocialAuthButton provider="google" onClick={() => { }} />
                    <SocialAuthButton provider="apple" onClick={() => { }} />
                </div>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 font-semibold hover:text-purple-300 hover:underline transition-all">
                        Login
                    </Link>
                </p>
            </form>
        </AuthWrapper>
    );
};

export default Signup;
