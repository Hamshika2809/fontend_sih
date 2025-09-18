import React, { useState } from 'react';
import { Package, MapPin, Calendar, Clock, CheckCircle, Truck } from 'lucide-react';
import { User, Batch } from '../App';

interface AgentDashboardProps {
  user: User;
  batches: Batch[];
  onUpdateBatchStatus: (batchId: string, newStatus: Batch['status'], updatedBy: string) => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ user, batches, onUpdateBatchStatus }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assigned-batches' | 'batch-details'>('dashboard');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const handleStatusUpdate = (batchId: string, newStatus: Batch['status']) => {
    onUpdateBatchStatus(batchId, newStatus, user.name);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Collection': return 'bg-yellow-100 text-yellow-800';
      case 'Assigned to Agency': return 'bg-blue-100 text-blue-800';
      case 'Collected': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: string): Batch['status'] | null => {
    switch (currentStatus) {
      case 'Assigned to Agency': return 'Collected';
      case 'Collected': return 'In Transit';
      case 'In Transit': return 'Delivered';
      default: return null;
    }
  };

  const assignedBatches = batches.filter(batch => 
    batch.status === 'Assigned to Agency' || 
    batch.status === 'Collected' || 
    batch.status === 'In Transit'
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user.name}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{assignedBatches.length}</div>
            <div className="text-sm text-gray-600">Assigned Batches</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Package },
              { id: 'assigned-batches', label: 'Assigned Batches', icon: Truck }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
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
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {batches.filter(b => b.status === 'Assigned to Agency').length}
                  </div>
                  <div className="text-sm text-blue-700">Assigned to Agency</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {batches.filter(b => b.status === 'Collected').length}
                  </div>
                  <div className="text-sm text-green-700">Collected</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {batches.filter(b => b.status === 'In Transit').length}
                  </div>
                  <div className="text-sm text-purple-700">In Transit</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {batches.filter(b => b.status === 'Delivered').length}
                  </div>
                  <div className="text-sm text-gray-700">Delivered</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {assignedBatches.slice(0, 5).map((batch) => (
                    <div key={batch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{batch.species} - {batch.quantity}kg</div>
                        <div className="text-sm text-gray-600">
                          Farmer: {batch.farmerName}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                          {batch.status}
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

          {/* Assigned Batches Tab */}
          {activeTab === 'assigned-batches' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Assigned Batches</h3>
              
              {assignedBatches.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned batches</h3>
                  <p className="text-gray-600">Batches will appear here when assigned to you</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {assignedBatches.map((batch) => (
                    <div key={batch.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{batch.species}</h4>
                          <p className="text-gray-600">Farmer: {batch.farmerName}</p>
                          <p className="text-gray-600">Quantity: {batch.quantity} kg</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(batch.status)}`}>
                            {batch.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {batch.geoTag.lat.toFixed(4)}, {batch.geoTag.lon.toFixed(4)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Created: {new Date(batch.createdAt).toLocaleDateString()}
                        </div>
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

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedBatch(batch);
                            setActiveTab('batch-details');
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </button>
                        
                        {getNextStatus(batch.status) && (
                          <button
                            onClick={() => handleStatusUpdate(batch.id, getNextStatus(batch.status)!)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Update to {getNextStatus(batch.status)}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Batch Details Tab */}
          {activeTab === 'batch-details' && selectedBatch && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Batch Details</h3>
                <button
                  onClick={() => setActiveTab('assigned-batches')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  ← Back to Batches
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{selectedBatch.species}</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Batch ID:</span> {selectedBatch.id}</p>
                      <p><span className="font-medium">Farmer:</span> {selectedBatch.farmerName}</p>
                      <p><span className="font-medium">Quantity:</span> {selectedBatch.quantity} kg</p>
                      <p><span className="font-medium">Location:</span> {selectedBatch.geoTag.lat.toFixed(4)}, {selectedBatch.geoTag.lon.toFixed(4)}</p>
                      <p><span className="font-medium">Created:</span> {new Date(selectedBatch.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBatch.status)}`}>
                      {selectedBatch.status}
                    </span>
                  </div>
                </div>

                {selectedBatch.photo && (
                  <div className="mb-6">
                    <h5 className="font-medium mb-2">Batch Photo</h5>
                    <img
                      src={selectedBatch.photo}
                      alt={selectedBatch.species}
                      className="w-full max-w-md h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <h5 className="font-medium mb-4">Status History Timeline</h5>
                  <div className="space-y-4">
                    {selectedBatch.history.map((entry, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h6 className="font-medium">{entry.status}</h6>
                            <span className="text-sm text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Updated by: {entry.updatedBy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {getNextStatus(selectedBatch.status) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBatch.id, getNextStatus(selectedBatch.status)!);
                        setActiveTab('assigned-batches');
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Update Status to {getNextStatus(selectedBatch.status)}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;