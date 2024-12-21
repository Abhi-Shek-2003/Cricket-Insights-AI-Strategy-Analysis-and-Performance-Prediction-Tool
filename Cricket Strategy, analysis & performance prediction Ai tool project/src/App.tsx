import React from 'react';
import { Trophy } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { ScorePrediction } from './components/ScorePrediction';
import { TeamSelector } from './components/TeamSelector';
import { PlayerRecommender } from './components/PlayerRecommender';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              Cricket Strategy & Performance Prediction
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ScorePrediction />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <TeamSelector />
              <PlayerRecommender />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-sm sm:text-base text-gray-600">
            Powered by Advanced Cricket Analytics
          </p>
        </div>
      </footer>
    </div>
  );
}