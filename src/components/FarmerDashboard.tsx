import React, { useState } from 'react';
import { Plus, Package, MapPin, Calendar, Camera, Upload } from 'lucide-react';
import { User, Batch } from '../App';

interface FarmerDashboardProps {
  user: User;
  batches: Batch[];
  onAddBatch: (batch: Omit<Batch, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te';
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ user, batches, onAddBatch, language }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'add-batch' | 'my-batches'>('overview');
  const [newBatch, setNewBatch] = useState({
    species: 'Ashwagandha',
    quantity: '',
    lat: '',
    lon: '',
    photo: ''
  });

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const batch: Omit<Batch, 'id' | 'createdAt' | 'updatedAt' | 'history'> = {
      farmerId: user.id,
      farmerName: user.name,
      species: newBatch.species,
      quantity: parseFloat(newBatch.quantity),
      geoTag: {
        lat: parseFloat(newBatch.lat),
        lon: parseFloat(newBatch.lon)
      },
      photo: newBatch.photo || 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg',
      status: 'Pending Collection'
    };

    onAddBatch(batch);
    setNewBatch({
      species: 'Ashwagandha',
      quantity: '',
      lat: '',
      lon: '',
      photo: ''
    });
    setActiveTab('my-batches');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      // For demo, we'll use a placeholder
      setNewBatch({ ...newBatch, photo: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg' });
    }
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

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="text-gray-600 mt-1">
              Farm Location: {user.farmLocation} | Crops: {user.crops?.join(', ')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{batches.length}</div>
            <div className="text-sm text-gray-600">Total Batches</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Package },
              { id: 'add-batch', label: 'Add Batch', icon: Plus },
              { id: 'my-batches', label: 'My Batches', icon: Package }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-green-500 text-green-600'
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {batches.filter(b => b.status === 'Pending Collection').length}
                  </div>
                  <div className="text-sm text-yellow-700">Pending Collection</div>
                </div>
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
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {batches.slice(0, 5).map((batch) => (
                    <div key={batch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{batch.species} - {batch.quantity}kg</div>
                        <div className="text-sm text-gray-600">
                          {new Date(batch.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add Batch Tab */}
          {activeTab === 'add-batch' && (
            <form onSubmit={handleAddBatch} className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-semibold">Add New Batch</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Species *
                  </label>
                  <select
                    value={newBatch.species}
                    onChange={(e) => setNewBatch({ ...newBatch, species: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Ashwagandha">Ashwagandha</option>
                    <option value="Turmeric">Turmeric</option>
                    <option value="Neem">Neem</option>
                    <option value="Brahmi">Brahmi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (kg) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.1"
                    value={newBatch.quantity}
                    onChange={(e) => setNewBatch({ ...newBatch, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    required
                    step="any"
                    value={newBatch.lat}
                    onChange={(e) => setNewBatch({ ...newBatch, lat: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 12.9716"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    required
                    step="any"
                    value={newBatch.lon}
                    onChange={(e) => setNewBatch({ ...newBatch, lon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 77.5946"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-600 mb-4">
                    Upload a photo of your herb batch
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Add Batch
              </button>
            </form>
          )}

          {/* My Batches Tab */}
          {activeTab === 'my-batches' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">My Batches</h3>
              
              {batches.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No batches yet</h3>
                  <p className="text-gray-600 mb-4">Start by adding your first herb batch</p>
                  <button
                    onClick={() => setActiveTab('add-batch')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add First Batch
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {batches.map((batch) => (
                    <div key={batch.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{batch.species}</h4>
                          <p className="text-gray-600">Quantity: {batch.quantity} kg</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(batch.status)}`}>
                          {batch.status}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {batch.geoTag.lat.toFixed(4)}, {batch.geoTag.lon.toFixed(4)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(batch.createdAt).toLocaleDateString()}
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

                      <div>
                        <h5 className="font-medium mb-2">Status History</h5>
                        <div className="space-y-2">
                          {batch.history.map((entry, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{entry.status}</span>
                              <span className="text-gray-500">
                                {new Date(entry.timestamp).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;