import React from 'react';
import WaveGenerator from './components/WaveGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            WaveForge
          </h1>
          <p className="mt-2 text-slate-400">
            Create and experiment with sound waves in real-time
          </p>
        </header>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
          {/* Add WaveGenerator here with error boundary */}
          <div>
            <WaveGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;