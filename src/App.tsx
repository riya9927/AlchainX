import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import ModelDetail from './components/ModelDetail';
import UploadModel from './components/UploadModel';
import Dashboard from './components/Dashboard';
import Login from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { auth } from './firebaseConfig'; // Firebase Auth instance
import { onAuthStateChanged } from 'firebase/auth';

type Page = 'home' | 'marketplace' | 'upload' | 'dashboard' | 'model-detail' | 'login' | 'signup';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    setCurrentPage('model-detail');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onExploreClick={() => setCurrentPage('marketplace')} onUploadClick={() => setCurrentPage('upload')} />;
      case 'marketplace':
        return <Marketplace onModelSelect={handleModelSelect} />;
      case 'model-detail':
        return selectedModelId ? (
          <ModelDetail modelId={selectedModelId} onBack={() => setCurrentPage('marketplace')} />
        ) : (
          <Marketplace onModelSelect={handleModelSelect} />
        );
      case 'upload':
        return <UploadModel onBack={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
        return <Dashboard onUploadClick={() => setCurrentPage('upload')} />;
      case 'login':
        return <Login onSuccess={() => {
          setIsAuthenticated(true);
          setCurrentPage('dashboard');
        }} onSignupClick={() => setCurrentPage('signup')} />;
      case 'signup':
        return <SignupForm onSuccess={() => {
          setIsAuthenticated(true);
          setCurrentPage('dashboard');
        }} onLoginClick={() => setCurrentPage('login')} />;
      default:
        return <Hero onExploreClick={() => setCurrentPage('marketplace')} onUploadClick={() => setCurrentPage('upload')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isWalletConnected={isWalletConnected}
        onWalletToggle={() => setIsWalletConnected(!isWalletConnected)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
