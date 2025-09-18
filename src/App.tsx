import React, { useState, useEffect } from 'react';
import { Leaf, Users, Building2, ArrowLeft, LogOut, Eye, EyeOff } from 'lucide-react';
import LandingPage from './components/LandingPage';
import FarmerAuth from './components/FarmerAuth';
import AgentAuth from './components/AgentAuth';
import FarmerDashboard from './components/FarmerDashboard';
import AgentDashboard from './components/AgentDashboard';

export type UserType = 'farmer' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  contactNumber?: string;
  farmLocation?: string;
  crops?: string[];
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
  const [currentPage, setCurrentPage] = useState<'landing' | 'farmer-auth' | 'agent-auth' | 'farmer-dashboard' | 'agent-dashboard'>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);

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
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('landing');
  };

  const handleBack = () => {
    if (currentPage === 'farmer-auth' || currentPage === 'agent-auth') {
      setCurrentPage('landing');
    } else if (currentPage === 'farmer-dashboard' || currentPage === 'agent-dashboard') {
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
                <Leaf className="w-8 h-8 text-green-600 mr-2" />
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
          />
        )}
        
        {currentPage === 'farmer-auth' && (
          <FarmerAuth onLogin={handleLogin} />
        )}
        
        {currentPage === 'agent-auth' && (
          <AgentAuth onLogin={handleLogin} />
        )}
        
        {currentPage === 'farmer-dashboard' && currentUser && (
          <FarmerDashboard
            user={currentUser}
            batches={batches.filter(batch => batch.farmerId === currentUser.id)}
            onAddBatch={addBatch}
          />
        )}
        
        {currentPage === 'agent-dashboard' && currentUser && (
          <AgentDashboard
            user={currentUser}
            batches={batches.filter(batch => batch.status !== 'Pending Collection')}
            onUpdateBatchStatus={updateBatchStatus}
          />
        )}
      </main>
    </div>
  );
}

export default App;