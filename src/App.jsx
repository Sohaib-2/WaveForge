import React, { useState } from 'react';
import { AudioWaveform, Menu, Info, Github } from 'lucide-react';
import WaveGenerator from './components/WaveGenerator';
import AboutDialog from './components/AboutDialog';

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-900 flex">
      {/* Sidebar */}
      <div className="w-16 h-full bg-slate-950/50 border-r border-slate-800/50 flex flex-col items-center py-4 gap-4">
        <div className="relative group">
          <AudioWaveform className="h-8 w-8 text-blue-400" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 rounded text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            WaveForge
          </div>
        </div>
        <div className="h-px w-8 bg-slate-800/50" />
        <div className="mt-auto flex flex-col gap-2">
        <a 
            href="https://github.com/Sohaib-2/WaveForge" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/30 rounded-lg transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <button 
            onClick={() => setAboutOpen(true)}
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/30 rounded-lg transition-colors relative group"
          >
            <Info className="h-6 w-6" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 rounded text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              About
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-950/30 border-b border-slate-800/50 p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              WaveForge
            </h1>
            <div className="relative">
              <div className="wave-quote text-xl font-medium tracking-wide">
                <span className="wave-text bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  "If you want to find the secrets of the universe,
                </span>
              </div>
              <div className="wave-quote-delayed text-xl font-medium tracking-wide">
                <span className="wave-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  think in terms of energy, frequency and vibration"
                </span>
              </div>
              <p className="text-sm text-slate-500 text-center mt-1 tracking-wider">- Nikola Tesla</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-4">
          <div className="h-full rounded-xl border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm overflow-hidden">
            <WaveGenerator />
          </div>
        </div>
      </div>

      {/* About Dialog */}
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />

      <style jsx global>{`
        .wave-quote, .wave-quote-delayed {
          animation: wave 4s ease-in-out infinite;
          transform-origin: center;
          display: inline-block;
        }

        .wave-quote-delayed {
          animation-delay: 0.2s;
        }

        .wave-text {
          background-size: 200% auto;
          animation: shine 6s linear infinite;
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes shine {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .group:hover .absolute {
          transform: translateX(0.5rem);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default App;