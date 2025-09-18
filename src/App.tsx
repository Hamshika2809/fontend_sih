import React, { useState, useEffect } from 'react';
import { Leaf, Users, Building2, ArrowLeft, LogOut, Eye, EyeOff, FlaskConical, Factory } from 'lucide-react';
import LandingPage from './components/LandingPage';
import FarmerAuth from './components/FarmerAuth';
import AgentAuth from './components/AgentAuth';
import LabAuth from './components/LabAuth';
import ManufacturerAuth from './components/ManufacturerAuth';
import AdminAuth from './components/AdminAuth';
import FarmerDashboard from './components/FarmerDashboard';
import AgentDashboard from './components/AgentDashboard';
import LabDashboard from './components/LabDashboard';
import ManufacturerDashboard from './components/ManufacturerDashboard';
import AdminDashboard from './components/AdminDashboard';

export type UserType = 'farmer' | 'agent' | 'lab' | 'manufacturer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  contactNumber?: string;
  farmLocation?: string;
  crops?: string[];
  labName?: string;
  manufacturerName?: string;
  adminLevel?: string;
}

export interface Batch {
  id: string;
  farmerId: string;
  farmerName: string;
  species: string;
  quantity: number;
  geoTag: {
    lat: number;
    lon: number;
  };
  photo: string;
  status: 'Pending Collection' | 'Assigned to Agency' | 'Collected' | 'In Transit' | 'Delivered';
  agentId?: string;
  createdAt: string;
  updatedAt: string;
  history: {
    status: string;
    timestamp: string;
    updatedBy: string;
  }[];
}

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'farmer-auth' | 'agent-auth' | 'lab-auth' | 'manufacturer-auth' | 'admin-auth' | 'farmer-dashboard' | 'agent-dashboard' | 'lab-dashboard' | 'manufacturer-dashboard' | 'admin-dashboard'>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [language, setLanguage] = useState<'en' | 'hi' | 'kn' | 'ta' | 'te'>('en');

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      if (user.type === 'farmer') {
        setCurrentPage('farmer-dashboard');
      } else if (user.type === 'agent') {
        setCurrentPage('agent-dashboard');
      } else if (user.type === 'lab') {
        setCurrentPage('lab-dashboard');
      } else if (user.type === 'manufacturer') {
        setCurrentPage('manufacturer-dashboard');
      } else if (user.type === 'admin') {
        setCurrentPage('admin-dashboard');
      }
    }

    // Load batches from localStorage
    const savedBatches = localStorage.getItem('batches');
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches));
    }
  }, []);

  // Save batches to localStorage whenever batches change
  useEffect(() => {
    localStorage.setItem('batches', JSON.stringify(batches));
  }, [batches]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user.type === 'farmer') {
      setCurrentPage('farmer-dashboard');
    } else if (user.type === 'agent') {
      setCurrentPage('agent-dashboard');
    } else if (user.type === 'lab') {
      setCurrentPage('lab-dashboard');
    } else if (user.type === 'manufacturer') {
      setCurrentPage('manufacturer-dashboard');
    } else if (user.type === 'admin') {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('landing');
  };

  const handleBack = () => {
    if (currentPage.includes('-auth')) {
      setCurrentPage('landing');
    } else if (currentPage.includes('-dashboard')) {
      handleLogout();
    }
  };

  const addBatch = (batch: Omit<Batch, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => {
    const newBatch: Batch = {
      ...batch,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{
        status: batch.status,
        timestamp: new Date().toISOString(),
        updatedBy: batch.farmerName
      }]
    };
    setBatches(prev => [...prev, newBatch]);
  };

  const updateBatchStatus = (batchId: string, newStatus: Batch['status'], updatedBy: string) => {
    setBatches(prev => prev.map(batch => {
      if (batch.id === batchId) {
        return {
          ...batch,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          history: [
            ...batch.history,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              updatedBy
            }
          ]
        };
      }
      return batch;
    }));
  };

  const renderHeader = () => {
    if (currentPage === 'landing') return null;

    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <div className="flex items-center">
                <img src="https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg" alt="Logo" className="w-8 h-8 rounded-full mr-2" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Ayurvedic Herb Traceability
                </h1>
              </div>
            </div>
            {currentUser && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'landing' && (
          <LandingPage
            onFarmerClick={() => setCurrentPage('farmer-auth')}
            onAgentClick={() => setCurrentPage('agent-auth')}
            onLabClick={() => setCurrentPage('lab-auth')}
            onManufacturerClick={() => setCurrentPage('manufacturer-auth')}
            onAdminClick={() => setCurrentPage('admin-auth')}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}
        
        {currentPage === 'farmer-auth' && (
          <FarmerAuth onLogin={handleLogin} language={language} />
        )}
        
        {currentPage === 'agent-auth' && (
          <AgentAuth onLogin={handleLogin} language={language} />
        )}
        
        {currentPage === 'lab-auth' && (
          <LabAuth onLogin={handleLogin} language={language} />
        )}
        
        {currentPage === 'manufacturer-auth' && (
          <ManufacturerAuth onLogin={handleLogin} language={language} />
        )}
        
        {currentPage === 'admin-auth' && (
          <AdminAuth onLogin={handleLogin} language={language} />
        )}
        
        {currentPage === 'farmer-dashboard' && currentUser && (
          <FarmerDashboard
            user={currentUser}
            batches={batches.filter(batch => batch.farmerId === currentUser.id)}
            onAddBatch={addBatch}
            language={language}
          />
        )}
        
        {currentPage === 'agent-dashboard' && currentUser && (
          <AgentDashboard
            user={currentUser}
            batches={batches.filter(batch => batch.status !== 'Pending Collection')}
            onUpdateBatchStatus={updateBatchStatus}
            language={language}
          />
        )}
        
        {currentPage === 'lab-dashboard' && currentUser && (
          <LabDashboard
            user={currentUser}
            batches={batches}
            onUpdateBatchStatus={updateBatchStatus}
            language={language}
          />
        )}
        
        {currentPage === 'manufacturer-dashboard' && currentUser && (
          <ManufacturerDashboard
            user={currentUser}
            batches={batches}
            onUpdateBatchStatus={updateBatchStatus}
            language={language}
          />
        )}
        
        {currentPage === 'admin-dashboard' && currentUser && (
          <AdminDashboard
            user={currentUser}
            batches={batches}
            onUpdateBatchStatus={updateBatchStatus}
            language={language}
          />
        )}
      </main>
    </div>
  );
}

export default App;