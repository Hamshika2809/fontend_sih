import React, { useState } from 'react';
import { Eye, EyeOff, Factory } from 'lucide-react';
import { User } from '../App';

interface ManufacturerAuthProps {
  onLogin: (user: User) => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te';
}

const ManufacturerAuth: React.FC<ManufacturerAuthProps> = ({ onLogin, language }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    manufacturerName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user: User = {
      id: 'manufacturer-' + Date.now().toString(),
      name: formData.manufacturerName || 'Ayurvedic Manufacturer',
      email: formData.email,
      type: 'manufacturer',
      manufacturerName: formData.manufacturerName || 'Ayurvedic Products Ltd'
    };
    onLogin(user);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Factory className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Manufacturer Login</h2>
        <p className="text-gray-600 mt-2">Access your production dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manufacturer Name
          </label>
          <input
            type="text"
            value={formData.manufacturerName}
            onChange={(e) => setFormData({ ...formData, manufacturerName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter manufacturer name"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="manufacturer@example.com"
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
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
          className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-600">
          <p>Demo credentials:</p>
          <p>Email: manufacturer@example.com</p>
          <p>Password: mfg123</p>
        </div>
      </form>
    </div>
  );
};

export default ManufacturerAuth;