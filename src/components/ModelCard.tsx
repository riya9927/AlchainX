import React from 'react';
import { Star, TrendingUp, Clock, Shield, Zap } from 'lucide-react';
import type { AIModel } from '../data/mockData';

interface ModelCardProps {
  model: AIModel;
  onClick: () => void;
}

export default function ModelCard({ model, onClick }: ModelCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'nlp': 'from-blue-500 to-cyan-500',
      'computer-vision': 'from-purple-500 to-pink-500',
      'prediction': 'from-emerald-500 to-teal-500',
      'classification': 'from-orange-500 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-gradient-to-r ${getCategoryColor(model.category)} rounded-lg`}>
            <div className="w-6 h-6 bg-white/20 rounded backdrop-blur-sm"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{model.rating}</span>
            </div>
            {model.trending && (
              <div className="flex items-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {model.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{model.description}</p>

        {/* Performance Metrics */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className={`text-lg font-bold ${getPerformanceColor(model.performance.accuracy)}`}>
              {model.performance.accuracy}%
            </div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{model.performance.speed}ms</div>
            <div className="text-xs text-gray-500">Speed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">{model.usage}</div>
            <div className="text-xs text-gray-500">Uses</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {model.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full border border-white/20"
            >
              {tag}
            </span>
          ))}
          {model.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full border border-white/20">
              +{model.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{model.updatedAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Verified</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">{model.price}</div>
            <div className="text-xs text-gray-400">{model.license}</div>
          </div>
        </div>
      </div>
    </div>
  );
}