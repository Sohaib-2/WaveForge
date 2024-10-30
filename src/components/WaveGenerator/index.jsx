import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WaveControls from '../Controls/WaveControls';
import WaveVisualizer from '../WaveVisualizer';
import useAudioContext from '../../hooks/useAudioContext';

const WaveGenerator = () => {
  const { audioContext, gainNode, createOscillator, initializeAudio } = useAudioContext();
  const [waveSettings, setWaveSettings] = useState({
    type: 'sine',
    frequency: 440,
    amplitude: 0.5,
    volume: 0.5,
    isPlaying: false
  });
  const [activeOscillator, setActiveOscillator] = useState(null);
  const [analyser, setAnalyser] = useState(null);

  // Initialize audio on first user interaction
  const handleStartAudio = useCallback(() => {
    initializeAudio();
  }, [initializeAudio]);

  // Set up audio routing
  useEffect(() => {
    if (!audioContext) return;
    const newAnalyser = audioContext.createAnalyser();
    newAnalyser.fftSize = 2048;
    gainNode.connect(newAnalyser);
    newAnalyser.connect(audioContext.destination);
    setAnalyser(newAnalyser);
    return () => {
      newAnalyser.disconnect();
      gainNode.disconnect();
    };
  }, [audioContext, gainNode]);

  // Handle wave playing/stopping
  useEffect(() => {
    if (!audioContext || !gainNode) return;
    
    if (waveSettings.isPlaying) {
      const osc = createOscillator(waveSettings.type, waveSettings.frequency);
      if (osc) {
        gainNode.gain.setValueAtTime(waveSettings.volume * waveSettings.amplitude, audioContext.currentTime);
        osc.start();
        setActiveOscillator(osc);
      }
    } else if (activeOscillator) {
      activeOscillator.stop();
      setActiveOscillator(null);
    }

    return () => {
      if (activeOscillator) {
        activeOscillator.stop();
      }
    };
  }, [waveSettings.isPlaying, audioContext, gainNode, createOscillator]);

  // Update oscillator parameters
  useEffect(() => {
    if (!activeOscillator || !audioContext) return;
    activeOscillator.type = waveSettings.type;
    activeOscillator.frequency.setValueAtTime(waveSettings.frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(waveSettings.volume * waveSettings.amplitude, audioContext.currentTime);
  }, [waveSettings.type, waveSettings.frequency, waveSettings.amplitude, waveSettings.volume]);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            {!audioContext ? (
              <button 
                onClick={handleStartAudio}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Initialize Audio
              </button>
            ) : (
              <WaveVisualizer analyser={analyser} />
            )}
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            {audioContext ? (
              <WaveControls
                settings={waveSettings}
                onSettingsChange={(newSettings) => setWaveSettings(prev => ({ ...prev, ...newSettings }))}
              />
            ) : (
              <p>Initialize audio to access controls</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaveGenerator;