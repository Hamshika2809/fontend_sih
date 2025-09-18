import React, { useState } from 'react';
import { Eye, EyeOff, FlaskConical } from 'lucide-react';
import { User } from '../App';

interface LabAuthProps {
  onLogin: (user: User) => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te';
}

const LabAuth: React.FC<LabAuthProps> = ({ onLogin, language }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    labName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user: User = {
      id: 'lab-' + Date.now().toString(),
      name: formData.labName || 'Quality Lab',
      email: formData.email,
      type: 'lab',
      labName: formData.labName || 'Quality Testing Lab'
    };
    onLogin(user);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FlaskConical className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Lab Login</h2>
        <p className="text-gray-600 mt-2">Access your testing dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lab Name
          </label>
          <input
            type="text"
            value={formData.labName}
            onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter lab name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="lab@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-600">
          <p>Demo credentials:</p>
          <p>Email: lab@example.com</p>
          <p>Password: lab123</p>
        </div>
      </form>
    </div>
  );
};

export default LabAuth;