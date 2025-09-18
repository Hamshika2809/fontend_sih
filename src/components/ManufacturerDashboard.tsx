import React, { useState } from 'react';
import { Factory, Package, Truck, BarChart3, Settings } from 'lucide-react';
import { User, Batch } from '../App';

interface ManufacturerDashboardProps {
  user: User;
  batches: Batch[];
  onUpdateBatchStatus: (batchId: string, newStatus: Batch['status'], updatedBy: string) => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te';
}

const ManufacturerDashboard: React.FC<ManufacturerDashboardProps> = ({ user, batches, onUpdateBatchStatus, language }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'production' | 'inventory' | 'analytics'>('dashboard');

  const availableBatches = batches.filter(batch => batch.status === 'Delivered');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manufacturer Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user.name}</p>
            <p className="text-sm text-gray-500">{user.manufacturerName}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{availableBatches.length}</div>
            <div className="text-sm text-gray-600">Available Batches</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Factory },
              { id: 'production', label: 'Production', icon: Package },
              { id: 'inventory', label: 'Inventory', icon: Truck },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-orange-500 text-orange-600'
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
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {availableBatches.length}
                  </div>
                  <div className="text-sm text-orange-700">Raw Materials Available</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">25</div>
                  <div className="text-sm text-blue-700">Products in Production</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">150</div>
                  <div className="text-sm text-green-700">Finished Products</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-purple-700">Quality Score</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Production Activity</h3>
                <div className="space-y-3">
                  {availableBatches.slice(0, 5).map((batch) => (
                    <div key={batch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{batch.species} - {batch.quantity}kg</div>
                        <div className="text-sm text-gray-600">
                          Available for production
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Quality Approved
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

          {activeTab === 'production' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Production Planning</h3>
              
              {availableBatches.length === 0 ? (
                <div className="text-center py-12">
                  <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No raw materials available</h3>
                  <p className="text-gray-600">Quality-approved batches will appear here for production</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {availableBatches.map((batch) => (
                    <div key={batch.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{batch.species}</h4>
                          <p className="text-gray-600">Available Quantity: {batch.quantity} kg</p>
                          <p className="text-gray-600">Source: {batch.farmerName}</p>
                          <p className="text-gray-600">Quality Status: Approved</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Ready for Production
                        </span>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg mb-4">
                        <h5 className="font-medium mb-2">Recommended Products:</h5>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <div>• {batch.species} Powder (500g packs)</div>
                          <div>• {batch.species} Capsules (60 count)</div>
                          <div>• {batch.species} Extract (30ml bottles)</div>
                          <div>• {batch.species} Tea Bags (25 count)</div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center justify-center">
                          <Package className="w-4 h-4 mr-2" />
                          Start Production
                        </button>
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Plan Production
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Inventory Management</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Raw Materials</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Ashwagandha</span>
                      <span className="font-medium">45 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Turmeric</span>
                      <span className="font-medium">32 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Neem</span>
                      <span className="font-medium">28 kg</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Finished Products</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Ashwagandha Powder</span>
                      <span className="font-medium">120 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Turmeric Capsules</span>
                      <span className="font-medium">85 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Neem Extract</span>
                      <span className="font-medium">65 units</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Production Analytics</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-2">Monthly Production</h4>
                  <div className="text-3xl font-bold text-orange-600 mb-2">2,450</div>
                  <div className="text-sm text-gray-600">Units produced</div>
                  <div className="text-sm text-green-600">↑ 12% from last month</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-2">Quality Score</h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
                  <div className="text-sm text-gray-600">Average quality</div>
                  <div className="text-sm text-green-600">↑ 2% from last month</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-2">Efficiency</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                  <div className="text-sm text-gray-600">Production efficiency</div>
                  <div className="text-sm text-green-600">↑ 5% from last month</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Top Performing Products</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Ashwagandha Powder</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Turmeric Capsules</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '72%'}}></div>
                      </div>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Neem Extract</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-orange-600 h-2 rounded-full" style={{width: '68%'}}></div>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;