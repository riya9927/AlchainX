import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import ModelDetail from './components/ModelDetail';
import UploadModel from './components/UploadModel';
import Dashboard from './components/Dashboard';

type Page = 'home' | 'marketplace' | 'upload' | 'dashboard' | 'model-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    setCurrentPage('model-detail');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onExploreClick={() => setCurrentPage('marketplace')} />;
      case 'marketplace':
        return <Marketplace onModelSelect={handleModelSelect} />;
      case 'model-detail':
        return <ModelDetail modelId={selectedModelId} onBack={() => setCurrentPage('marketplace')} />;
      case 'upload':
        return <UploadModel onBack={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
        return <Dashboard onUploadClick={() => setCurrentPage('upload')} />;
      default:
        return <Hero onExploreClick={() => setCurrentPage('marketplace')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isWalletConnected={isWalletConnected}
        onWalletToggle={() => setIsWalletConnected(!isWalletConnected)}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;