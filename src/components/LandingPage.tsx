import React from 'react';
import { Leaf, Users, Building2, Shield, Truck, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onFarmerClick: () => void;
  onAgentClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onFarmerClick, onAgentClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Leaf className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Blockchain-based
              <span className="text-green-600 block">Ayurvedic Herb</span>
              Traceability System
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Ensuring authenticity and quality of Ayurvedic herbs through transparent, 
              secure blockchain technology from farm to consumer.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farm Registration</h3>
              <p className="text-gray-600">
                Farmers register their herbs with location data, photos, and quality metrics
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Supply Chain Tracking</h3>
              <p className="text-gray-600">
                Real-time tracking through collection, processing, and distribution
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Immutable records ensure authenticity and prevent counterfeiting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Access Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Access Portal
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Farmer Portal */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Farmer Portal</h3>
                <p className="text-gray-600 mb-6">
                  Register your herbs, track batches, and manage your farm's contribution 
                  to the supply chain.
                </p>
                <ul className="text-left text-sm text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Register herb batches with geo-location
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Upload quality photos and documentation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Track batch status in real-time
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    View collection and payment history
                  </li>
                </ul>
                <button
                  onClick={onFarmerClick}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Access Farmer Portal
                </button>
              </div>
            </div>

            {/* Agent Portal */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Agent Portal</h3>
                <p className="text-gray-600 mb-6">
                  Manage collection operations, update batch statuses, and oversee 
                  the supply chain process.
                </p>
                <ul className="text-left text-sm text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    View assigned batch collections
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Update batch status and location
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Access complete batch history
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Generate collection reports
                  </li>
                </ul>
                <button
                  onClick={onAgentClick}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Access Agent Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure & Transparent</h3>
              <p className="text-sm text-gray-600">Blockchain ensures data integrity</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">End-to-end quality tracking</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Farmer Empowerment</h3>
              <p className="text-sm text-gray-600">Direct market access</p>
            </div>
            <div className="text-center">
              <Truck className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">Live supply chain visibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;