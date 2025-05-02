import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const endpoint = isLogin ? 'login' : 'signup';
    const payload = isLogin ? { username, password } : { username, email, password };

    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
        return;
      }

      if (isLogin) {
        setIsAuthenticated(true);
        navigate('/HealthDashboard');
      } else {
        alert('Signup successful! You can log in now.');
        setIsLogin(true);
        setEmail('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">
          {isLogin ? 'Welcome Back!' : 'Create Your Account'}
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          {isLogin
            ? 'Log in to access your personalized health dashboard.'
            : 'Sign up to track your health, monitor goals, and receive wellness tips.'}
        </p>

        {/* Username Field */}
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Email Field (Only for Signup) */}
        {!isLogin && (
          <>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}

        {/* Password Field */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder={isLogin ? "Enter your password" : "Create a secure password"}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password (Only for Signup) */}
        {!isLogin && (
          <>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-6"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
