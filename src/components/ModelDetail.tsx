import React, { useState } from 'react';
import { ArrowLeft, Star, TrendingUp, Clock, Shield, Zap, Download, Heart, Share2, Code, FileText, BarChart3 } from 'lucide-react';
import { mockModels } from '../data/mockData';

interface ModelDetailProps {
  modelId: string | null;
  onBack: () => void;
}

export default function ModelDetail({ modelId, onBack }: ModelDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const model = mockModels.find(m => m.id === modelId);

  if (!model) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="text-xl text-white">Model not found</div>
          <button onClick={onBack} className="mt-4 text-blue-400 hover:text-blue-300">
            ← Back to marketplace
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'code', label: 'Integration', icon: Code },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'nlp': 'from-blue-500 to-cyan-500',
      'computer-vision': 'from-purple-500 to-pink-500',
      'prediction': 'from-emerald-500 to-teal-500',
      'classification': 'from-orange-500 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to marketplace</span>
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 bg-gradient-to-r ${getCategoryColor(model.category)} rounded-xl`}>
                <div className="w-8 h-8 bg-white/20 rounded backdrop-blur-sm"></div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{model.name}</h1>
            <p className="text-gray-300 text-lg mb-6">{model.description}</p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{model.rating}</span>
                <span className="text-gray-400">(324 reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                <span>Trending</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>Updated {model.updatedAt}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-sm text-gray-300 rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="border-b border-white/10">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                        activeTab === tab.id
                          ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                    <p className="text-gray-300 leading-relaxed">
                      This advanced {model.category} model provides state-of-the-art performance for 
                      real-world applications. Built with cutting-edge techniques and trained on 
                      carefully curated datasets, it offers exceptional accuracy and reliability.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Use Cases</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Real-time data processing and analysis</li>
                      <li>• Enterprise-grade automation solutions</li>
                      <li>• Integration with existing ML pipelines</li>
                      <li>• Custom application development</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Model Architecture</h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <code className="text-sm text-gray-300">
                        Framework: TensorFlow 2.12<br/>
                        Architecture: Transformer-based<br/>
                        Parameters: 175M<br/>
                        Input Format: Text/JSON<br/>
                        Output Format: JSON with confidence scores
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">
                        {model.performance.accuracy}%
                      </div>
                      <div className="text-gray-400">Accuracy</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {model.performance.speed}ms
                      </div>
                      <div className="text-gray-400">Latency</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">
                        99.9%
                      </div>
                      <div className="text-gray-400">Uptime</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Benchmark Results</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">GLUE Score</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '92%'}}></div>
                          </div>
                          <span className="text-white font-medium">92.1</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">SuperGLUE Score</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{width: '88%'}}></div>
                          </div>
                          <span className="text-white font-medium">88.7</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Custom Benchmark</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '95%'}}></div>
                          </div>
                          <span className="text-white font-medium">95.3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Start</h3>
                    <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-gray-300">
{`// Install the SDK
npm install @aichainx/sdk

// Initialize the model
import { AIChainX } from '@aichainx/sdk';

const model = new AIChainX('${model.id}');

// Make predictions
const result = await model.predict({
  input: "Your input data here"
});

console.log(result);`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Smart Contract Integration</h3>
                    <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-gray-300">
{`// Solidity contract example
pragma solidity ^0.8.19;

interface IAIModel {
    function execute(bytes calldata input) external returns (bytes memory);
}

contract MyDApp {
    IAIModel public model = IAIModel(0x${model.id.slice(0, 40)});
    
    function processData(string memory data) public returns (string memory) {
        bytes memory result = model.execute(abi.encode(data));
        return abi.decode(result, (string));
    }
}`}
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Purchase Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-white mb-2">{model.price}</div>
              <div className="text-gray-400">{model.license}</div>
            </div>

            <div className="space-y-4 mb-6">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
                Purchase License
              </button>
              <button className="w-full border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/5 transition-all">
                Try Demo
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Commercial Use</span>
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">API Access</span>
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Source Code</span>
                <Download className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Uses</span>
                <span className="text-white font-medium">{model.usage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Users</span>
                <span className="text-white font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Success Rate</span>
                <span className="text-emerald-400 font-medium">99.2%</span>
              </div>
            </div>
          </div>

          {/* Creator Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Creator</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium">{model.creator}</div>
                <div className="text-gray-400 text-sm">Verified Creator</div>
              </div>
            </div>
            <button className="w-full border border-white/20 text-white py-2 rounded-lg text-sm hover:bg-white/5 transition-all">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}