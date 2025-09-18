import React, { useState } from 'react';
import { Settings, Users, BarChart3, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { User, Batch } from '../App';

interface AdminDashboardProps {
  user: User;
  batches: Batch[];
  onUpdateBatchStatus: (batchId: string, newStatus: Batch['status'], updatedBy: string) => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, batches, onUpdateBatchStatus, language }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'system' | 'reports' | 'security'>('dashboard');

  const totalUsers = 1247; // Mock data
  const activeUsers = 892;
  const systemHealth = 98.5;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user.name}</p>
            <p className="text-sm text-gray-500">{user.adminLevel}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-600">{systemHealth}%</div>
            <div className="text-sm text-gray-600">System Health</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'system', label: 'System Monitor', icon: Settings },
              { id: 'reports', label: 'Reports', icon: BarChart3 },
              { id: 'security', label: 'Security', icon: Shield }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-gray-500 text-gray-600'
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
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
                  <div className="text-sm text-blue-700">Total Users</div>
                  <div className="text-xs text-green-600 mt-1">↑ 8% this month</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{batches.length}</div>
                  <div className="text-sm text-green-700">Total Batches</div>
                  <div className="text-xs text-green-600 mt-1">↑ 15% this month</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{activeUsers}</div>
                  <div className="text-sm text-purple-700">Active Users</div>
                  <div className="text-xs text-green-600 mt-1">↑ 5% this week</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">99.2%</div>
                  <div className="text-sm text-orange-700">Uptime</div>
                  <div className="text-xs text-green-600 mt-1">Last 30 days</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Database
                      </span>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        API Services
                      </span>
                      <span className="text-green-600 font-medium">Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Blockchain Network
                      </span>
                      <span className="text-green-600 font-medium">Synced</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                        Storage
                      </span>
                      <span className="text-yellow-600 font-medium">85% Full</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-medium">New farmer registration</div>
                      <div className="text-gray-500">2 minutes ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Batch status updated</div>
                      <div className="text-gray-500">5 minutes ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Quality test completed</div>
                      <div className="text-gray-500">12 minutes ago</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Agent login</div>
                      <div className="text-gray-500">18 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">User Management</h3>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                  Add New User
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">856</div>
                  <div className="text-sm text-green-700">Farmers</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <div className="text-sm text-blue-700">Agents</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-purple-700">Labs</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-orange-700">Manufacturers</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Rajesh Kumar</div>
                        <div className="text-sm text-gray-500">rajesh@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Farmer
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 hours ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Suspend</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Priya Sharma</div>
                        <div className="text-sm text-gray-500">priya@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Agent
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1 hour ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Suspend</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">System Monitoring</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Server Performance</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>62%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '62%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Disk Usage</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Network Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Blockchain Nodes</span>
                      <span className="text-green-600 font-medium">12/12 Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>API Endpoints</span>
                      <span className="text-green-600 font-medium">All Healthy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database Connections</span>
                      <span className="text-green-600 font-medium">Stable</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <span className="text-green-600 font-medium">< 200ms</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Security Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>SSL Certificate</span>
                      <span className="text-green-600 font-medium">Valid</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Firewall</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Failed Logins</span>
                      <span className="text-yellow-600 font-medium">3 (24h)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Backup</span>
                      <span className="text-green-600 font-medium">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">System Reports</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Batch Processing Report</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Batches Processed</span>
                      <span className="font-medium">{batches.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Collection</span>
                      <span className="font-medium">{batches.filter(b => b.status === 'Pending Collection').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>In Transit</span>
                      <span className="font-medium">{batches.filter(b => b.status === 'In Transit').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivered</span>
                      <span className="font-medium">{batches.filter(b => b.status === 'Delivered').length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Quality Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Average Quality Score</span>
                      <span className="font-medium text-green-600">96.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tests Passed</span>
                      <span className="font-medium text-green-600">98.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tests Failed</span>
                      <span className="font-medium text-red-600">1.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Processing Time</span>
                      <span className="font-medium">2.3 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Security Dashboard</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Security Events</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-sm">Multiple failed login attempts</span>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Security scan completed</span>
                      </div>
                      <span className="text-xs text-gray-500">6 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">SSL certificate renewed</span>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Access Control</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Active Sessions</span>
                      <span className="font-medium">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Admin Users</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Suspended Accounts</span>
                      <span className="font-medium text-red-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2FA Enabled</span>
                      <span className="font-medium text-green-600">89%</span>
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

export default AdminDashboard;