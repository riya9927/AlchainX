import React, { useState } from 'react';
import { Plus, TrendingUp, DollarSign, Eye, Star, Clock, MoreVertical } from 'lucide-react';

interface DashboardProps {
  onUploadClick: () => void;
}

export default function Dashboard({ onUploadClick }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('my-models');

  const myModels = [
    {
      id: '1',
      name: 'Advanced Sentiment Analyzer',
      category: 'NLP',
      price: '25.00 BDAG',
      usage: '1,247',
      revenue: '31,175 BDAG',
      rating: 4.9,
      status: 'active',
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      name: 'Image Classification Pro',
      category: 'Computer Vision',
      price: '40.00 BDAG',
      usage: '892',
      revenue: '35,680 BDAG',
      rating: 4.7,
      status: 'active',
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      name: 'Stock Predictor V2',
      category: 'Prediction',
      price: '15.00 BDAG',
      usage: '2,341',
      revenue: '35,115 BDAG',
      rating: 4.8,
      status: 'active',
      lastUpdated: '3 days ago'
    }
  ];

  const transactions = [
    { id: '1', type: 'sale', model: 'Advanced Sentiment Analyzer', amount: '25.00 BDAG', date: '2 hours ago' },
    { id: '2', type: 'sale', model: 'Image Classification Pro', amount: '40.00 BDAG', date: '5 hours ago' },
    { id: '3', type: 'royalty', model: 'Stock Predictor V2', amount: '15.00 BDAG', date: '1 day ago' },
    { id: '4', type: 'sale', model: 'Advanced Sentiment Analyzer', amount: '25.00 BDAG', date: '1 day ago' },
    { id: '5', type: 'sale', model: 'Image Classification Pro', amount: '40.00 BDAG', date: '2 days ago' }
  ];

  const tabs = [
    { id: 'my-models', label: 'My Models', count: myModels.length },
    { id: 'transactions', label: 'Transactions', count: transactions.length },
    { id: 'analytics', label: 'Analytics', count: null }
  ];

  const stats = [
    {
      label: 'Total Revenue',
      value: '101,970 BDAG',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      label: 'Total Usage',
      value: '4,480',
      change: '+8.2%',
      changeType: 'positive',
      icon: Eye
    },
    {
      label: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star
    },
    {
      label: 'Active Models',
      value: '3',
      change: '0',
      changeType: 'neutral',
      icon: TrendingUp
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold text-white mb-2">Creator Dashboard</h1>
          <p className="text-gray-400">Manage your AI models and track performance</p>
        </div>

        <button
          onClick={onUploadClick}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Upload New Model</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-400' : 
                  stat.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="border-b border-white/10">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'my-models' && (
            <div className="space-y-4">
              {myModels.map((model) => (
                <div key={model.id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                        <p className="text-gray-400 text-sm">{model.category}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{model.price}</div>
                      <div className="text-xs text-gray-400">Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{model.usage}</div>
                      <div className="text-xs text-gray-400">Usage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-400">{model.revenue}</div>
                      <div className="text-xs text-gray-400">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-400 flex items-center justify-center">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {model.rating}
                      </div>
                      <div className="text-xs text-gray-400">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-300 flex items-center justify-center">
                        <Clock className="w-4 h-4 mr-1" />
                      </div>
                      <div className="text-xs text-gray-400">{model.lastUpdated}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.type === 'sale' ? 'bg-emerald-400' : 'bg-blue-400'
                    }`}></div>
                    <div>
                      <div className="text-white font-medium">{transaction.model}</div>
                      <div className="text-gray-400 text-sm capitalize">{transaction.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">+{transaction.amount}</div>
                    <div className="text-gray-400 text-sm">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-16">
              <TrendingUp className="w-24 h-24 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Analytics Coming Soon</h3>
              <p className="text-gray-400">Detailed analytics and insights will be available in the next update</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}