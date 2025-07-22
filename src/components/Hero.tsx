import React from 'react';
import { ArrowRight, Brain, Shield, Zap, TrendingUp } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onUploadClick: () => void;
}

export default function Hero({ onExploreClick, onUploadClick }: HeroProps) {
  const features = [
    {
      icon: Brain,
      title: 'AI Model Tokenization',
      description:
        'Transform your AI models into unique digital assets with verified performance metrics',
    },
    {
      icon: Shield,
      title: 'Smart Contract Security',
      description:
        'Automated licensing, royalties, and usage rights enforced by blockchain technology',
    },
    {
      icon: Zap,
      title: 'BlockDAG Integration',
      description:
        'Lightning-fast transactions and parallel execution on next-gen blockchain infrastructure',
    },
    {
      icon: TrendingUp,
      title: 'Dynamic Pricing',
      description:
        'Model prices adjust based on real-time performance and demand analytics',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Decentralized
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent block">
              AI Model Marketplace
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Tokenize, trade, and execute AI models through smart contracts.
            Built on BlockDAG for unparalleled speed and scalability.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onExploreClick}
              className="group flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onUploadClick}
              className="flex items-center space-x-2 border border-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/5 transition-all duration-200"
            >
              <Brain className="w-5 h-5" />
              <span>Upload Model</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: '1,247', label: 'AI Models' },
              { value: '$2.4M', label: 'Trading Volume' },
              { value: '8.9K', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
