import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { IntroAnimation } from './components/layout/IntroAnimation';
import { AmbientBackground } from './components/feed/AmbientBackground';
import { FeedContainer } from './components/feed/FeedContainer';
import { ProgressIndicator } from './components/feed/ProgressIndicator';
import { ExpandedPostModal } from './components/feed/ExpandedPostModal';
import { BreakingNewsStack } from './components/feed/BreakingNewsStack';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative w-full h-full bg-paper-50 text-ink-950 font-sans overflow-hidden select-none">
        {/* Intro Load Sequence */}
        <IntroAnimation />

        {/* Subtle R3F Ambient Canvas */}
        <AmbientBackground />

        {/* Global Masthead Header */}
        <Header />

        {/* Route Views */}
        <main className="relative w-full h-full z-10 pt-16">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FeedContainer />
                  <ProgressIndicator />
                </>
              }
            />
            <Route path="/trending" element={<BreakingNewsStack />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Global Article Reader View */}
        <ExpandedPostModal />
      </div>
    </BrowserRouter>
  );
};

export default App;
