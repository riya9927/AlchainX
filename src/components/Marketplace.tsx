import React, { useState } from 'react';
import { Search, Filter, Star, Clock, TrendingUp, Brain } from 'lucide-react';
import ModelCard from './ModelCard';
import { mockModels } from '../data/mockData';

interface MarketplaceProps {
  onModelSelect: (modelId: string) => void;
}

export default function Marketplace({ onModelSelect }: MarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const categories = [
    { id: 'all', label: 'All Models', count: mockModels.length },
    { id: 'nlp', label: 'NLP', count: 12 },
    { id: 'computer-vision', label: 'Computer Vision', count: 8 },
    { id: 'prediction', label: 'Prediction', count: 6 },
    { id: 'classification', label: 'Classification', count: 9 }
  ];

  const sortOptions = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'newest', label: 'Newest', icon: Clock },
    { id: 'rating', label: 'Top Rated', icon: Star },
    { id: 'price-low', label: 'Price: Low to High', icon: null },
    { id: 'price-high', label: 'Price: High to Low', icon: null }
  ];

  const filteredAndSortedModels = mockModels
    .filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending': {
          // Sort by trending status first, then by usage
          if (a.trending !== b.trending) {
            return b.trending ? 1 : -1;
          }
          // Parse usage numbers (e.g., "12.4K" -> 12400)
          const usageA = parseFloat(a.usage.replace('K', '')) * (a.usage.includes('K') ? 1000 : 1);
          const usageB = parseFloat(b.usage.replace('K', '')) * (b.usage.includes('K') ? 1000 : 1);
          return usageB - usageA;
        }
        
        case 'newest': {
          // Sort by update date (newest first) - convert relative time strings to comparable numbers
          const getTimeValue = (timeStr: string): number => {
            if (timeStr.includes('day')) {
              const days = parseInt(timeStr.match(/\d+/)?.[0] || '0');
              return days;
            } else if (timeStr.includes('week')) {
              const weeks = parseInt(timeStr.match(/\d+/)?.[0] || '0');
              return weeks * 7; // convert weeks to days
            } else if (timeStr.includes('month')) {
              const months = parseInt(timeStr.match(/\d+/)?.[0] || '0');
              return months * 30; // convert months to days (approximate)
            }
            return 0; // for "today" or other formats
          };
          
          const timeA = getTimeValue(a.updatedAt);
          const timeB = getTimeValue(b.updatedAt);
          return timeA - timeB; // smaller number = more recent
        }
        
        case 'rating':
          // Sort by rating (highest first)
          return b.rating - a.rating;
        
        case 'price-low': {
          // Sort by price (lowest first)
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        }
        
        case 'price-high': {
          // Sort by price (highest first)
          const priceHighA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceHighB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceHighB - priceHighA;
        }
        
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold text-white mb-2">AI Model Marketplace</h1>
          <p className="text-gray-400">Discover and acquire cutting-edge AI models</p>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-6">
          {/* Categories */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{category.label}</span>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Sort By
            </h3>
            <div className="space-y-2">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
                      sortBy === option.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing {filteredAndSortedModels.length} of {mockModels.length} models
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                onClick={() => onModelSelect(model.id)}
              />
            ))}
          </div>

          {filteredAndSortedModels.length === 0 && (
            <div className="text-center py-16">
              <Brain className="w-24 h-24 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No models found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}