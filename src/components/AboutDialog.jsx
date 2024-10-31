import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github } from 'lucide-react';

const AboutDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border-slate-700/50 text-slate-200">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 mb-2">
            WaveForge
          </DialogTitle>
          <div className="text-slate-400 italic text-sm">Explore the Universe Through Sound</div>
        </DialogHeader>
        
        {/* Tesla Quote Section */}
        <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700/50 mb-6">
          <blockquote className="text-center">
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 mb-2">
              "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration"
            </p>
            <footer className="text-slate-400">- Nikola Tesla</footer>
          </blockquote>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">About</h3>
            <p className="text-slate-300 mb-4">
              WaveForge is an immersive journey into the world of sound synthesis, where physics meets creativity. 
              Through interactive wave manipulation, you can explore the fundamental building blocks of sound and music.
            </p>
            
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Core Features</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-2"></span>
                Multiple oscillator types
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-2"></span>
                Real-time waveform visualization
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-2"></span>
                Precise frequency control (20Hz - 2000Hz)
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-2"></span>
                Dynamic amplitude modulation
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Getting Started</h3>
            <ol className="space-y-2 text-slate-300">
              <li className="flex gap-2">
                <span className="text-blue-400">1.</span>
                Initialize the audio system
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">2.</span>
                Select your preferred wave type
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">3.</span>
                Adjust frequency and amplitude
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">4.</span>
                Layer multiple oscillators for complex sounds
              </li>
            </ol>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Connect</h3>
              <a 
                href="https://github.com/Sohaib-2/WaveForge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/50 text-center text-slate-400 text-sm">
          Built with React, Web Audio API, and a passion for sound exploration
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;