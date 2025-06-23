
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header';
import VideoGrid from '../components/VideoGrid';
import Footer from '../components/Footer';
import MobileProtection from '../components/MobileProtection';

const Index: React.FC = () => {
  const { isAuthenticated, login, logout, checkExpiry } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  // Check expiry periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!checkExpiry()) {
        logout();
        alert('Session expired. Please login again.');
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [checkExpiry, logout]);

  // Handle login
  const handleLogin = (username: string, password: string) => {
    const success = login(username, password);
    if (!success) {
      alert('Invalid credentials or session expired.');
    }
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileProtection />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="min-h-screen">
        <VideoGrid activeTab={activeTab} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
