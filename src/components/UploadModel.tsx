import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Settings, Brain, Check } from 'lucide-react';

interface UploadModelProps {
  onBack: () => void;
}

export default function UploadModel({ onBack }: UploadModelProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [modelData, setModelData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    price: '',
    license: 'single-use',
    file: null as File | null
  });

  const steps = [
    { number: 1, title: 'Upload Model', icon: Upload },
    { number: 2, title: 'Model Details', icon: FileText },
    { number: 3, title: 'Pricing & License', icon: Settings },
    { number: 4, title: 'Review & Deploy', icon: Brain }
  ];

  const categories = [
    { id: 'nlp', label: 'Natural Language Processing' },
    { id: 'computer-vision', label: 'Computer Vision' },
    { id: 'prediction', label: 'Prediction Models' },
    { id: 'classification', label: 'Classification' },
    { id: 'other', label: 'Other' }
  ];

  const licenses = [
    { id: 'single-use', label: 'Single Use', price: 'One-time payment' },
    { id: 'subscription', label: 'Subscription', price: 'Monthly/Yearly' },
    { id: 'commercial', label: 'Commercial License', price: 'Enterprise pricing' },
    { id: 'open-source', label: 'Open Source', price: 'Free to use' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setModelData({ ...modelData, file: e.target.files[0] });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Upload Your AI Model</h2>
              <p className="text-gray-400 mb-8">
                Upload your trained model file to get started with tokenization
              </p>
            </div>

            <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-blue-500/50 transition-colors">
              {modelData.file ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{modelData.file.name}</div>
                    <div className="text-gray-400 text-sm">
                      {(modelData.file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    onClick={() => setModelData({ ...modelData, file: null })}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Choose different file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-2">
                      Drop your model file here, or click to browse
                    </div>
                    <div className="text-gray-400 text-sm">
                      Supports .pkl, .h5, .onnx, .pt files up to 500MB
                    </div>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pkl,.h5,.onnx,.pt"
                    className="hidden"
                    id="model-upload"
                  />
                  <label
                    htmlFor="model-upload"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Model Details</h2>
              <p className="text-gray-400 mb-8">
                Provide information about your model to help users understand its capabilities
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Model Name *
                </label>
                <input
                  type="text"
                  value={modelData.name}
                  onChange={(e) => setModelData({ ...modelData, name: e.target.value })}
                  placeholder="e.g. Advanced Sentiment Analyzer"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={modelData.description}
                  onChange={(e) => setModelData({ ...modelData, description: e.target.value })}
                  placeholder="Describe what your model does, its capabilities, and use cases..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={modelData.category}
                  onChange={(e) => setModelData({ ...modelData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} className="bg-slate-800">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={modelData.tags}
                  onChange={(e) => setModelData({ ...modelData, tags: e.target.value })}
                  placeholder="e.g. sentiment, nlp, transformer (comma separated)"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Pricing & License</h2>
              <p className="text-gray-400 mb-8">
                Set your pricing and choose how users can access your model
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  License Type *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {licenses.map((license) => (
                    <div
                      key={license.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        modelData.license === license.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      onClick={() => setModelData({ ...modelData, license: license.id })}
                    >
                      <div className="text-white font-medium mb-1">{license.label}</div>
                      <div className="text-gray-400 text-sm">{license.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (BDAG) *
                </label>
                <input
                  type="number"
                  value={modelData.price}
                  onChange={(e) => setModelData({ ...modelData, price: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Review & Deploy</h2>
              <p className="text-gray-400 mb-8">
                Review your model details before deploying to the blockchain
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Model Name:</span>
                <span className="text-white">{modelData.name || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">
                  {categories.find(c => c.id === modelData.category)?.label || 'Not specified'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">License:</span>
                <span className="text-white">
                  {licenses.find(l => l.id === modelData.license)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price:</span>
                <span className="text-white">{modelData.price || '0'} BDAG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">File:</span>
                <span className="text-white">{modelData.file?.name || 'No file selected'}</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Deployment Details</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Model will be uploaded to IPFS for decentralized storage</li>
                <li>• Smart contract will be deployed on BlockDAG Primordial Testnet</li>
                <li>• NFT will be minted representing your model ownership</li>
                <li>• Gas fees: ~0.1 BDAG (estimated)</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to dashboard</span>
      </button>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isActive
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-white/20 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className={`font-medium ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500">Step {step.number}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentStep === 4 ? (
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
            Deploy Model
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}