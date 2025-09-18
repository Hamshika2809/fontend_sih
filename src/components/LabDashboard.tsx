import React, { useState } from 'react';
import { FlaskConical, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { User, Batch } from '../App';

interface LabDashboardProps {
  user: User;
  batches: Batch[];
  onUpdateBatchStatus: (batchId: string, newStatus: Batch['status'], updatedBy: string) => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te';
}

const LabDashboard: React.FC<LabDashboardProps> = ({ user, batches, onUpdateBatchStatus, language }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'testing' | 'reports'>('dashboard');

  const testingBatches = batches.filter(batch => 
    batch.status === 'Collected' || batch.status === 'In Transit'
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lab Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user.name}</p>
            <p className="text-sm text-gray-500">{user.labName}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{testingBatches.length}</div>
            <div className="text-sm text-gray-600">Batches for Testing</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FlaskConical },
              { id: 'testing', label: 'Quality Testing', icon: CheckCircle },
              { id: 'reports', label: 'Test Reports', icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {batches.filter(b => b.status === 'Collected').length}
                  </div>
                  <div className="text-sm text-purple-700">Ready for Testing</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {batches.filter(b => b.status === 'In Transit').length}
                  </div>
                  <div className="text-sm text-blue-700">Testing in Progress</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {batches.filter(b => b.status === 'Delivered').length}
                  </div>
                  <div className="text-sm text-green-700">Tests Completed</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">95%</div>
                  <div className="text-sm text-yellow-700">Pass Rate</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Testing Activity</h3>
                <div className="space-y-3">
                  {testingBatches.slice(0, 5).map((batch) => (
                    <div key={batch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{batch.species} - {batch.quantity}kg</div>
                        <div className="text-sm text-gray-600">
                          Farmer: {batch.farmerName}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Ready for Testing
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(batch.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Quality Testing Queue</h3>
              
              {testingBatches.length === 0 ? (
                <div className="text-center py-12">
                  <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No batches for testing</h3>
                  <p className="text-gray-600">Batches will appear here when ready for quality testing</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {testingBatches.map((batch) => (
                    <div key={batch.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{batch.species}</h4>
                          <p className="text-gray-600">Farmer: {batch.farmerName}</p>
                          <p className="text-gray-600">Quantity: {batch.quantity} kg</p>
                          <p className="text-gray-600">Batch ID: {batch.id}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          {batch.status}
                        </span>
                      </div>

                      {batch.photo && (
                        <div className="mb-4">
                          <img
                            src={batch.photo}
                            alt={batch.species}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h5 className="font-medium mb-2">Quality Parameters to Test:</h5>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            Moisture Content
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            Active Compounds
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            Heavy Metals
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            Microbial Load
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => onUpdateBatchStatus(batch.id, 'In Transit', user.name)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Start Testing
                        </button>
                        <button
                          onClick={() => onUpdateBatchStatus(batch.id, 'Delivered', user.name)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Passed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Test Reports</h3>
              
              <div className="grid gap-6">
                {batches.filter(b => b.status === 'Delivered').map((batch) => (
                  <div key={batch.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{batch.species} - Test Report</h4>
                        <p className="text-gray-600">Batch ID: {batch.id}</p>
                        <p className="text-gray-600">Farmer: {batch.farmerName}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Passed
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Moisture Content</div>
                        <div className="font-semibold text-green-600">8.5% ✓</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Active Compounds</div>
                        <div className="font-semibold text-green-600">Within Range ✓</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Heavy Metals</div>
                        <div className="font-semibold text-green-600">Not Detected ✓</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Microbial Load</div>
                        <div className="font-semibold text-green-600">Safe Levels ✓</div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      Test completed on: {new Date(batch.updatedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;