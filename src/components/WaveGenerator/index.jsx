import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WaveControls from '../Controls/WaveControls';
import WaveVisualizer from '../WaveVisualizer';
import useAudioContext from '../../hooks/useAudioContext';

const WaveGenerator = () => {
  const { audioContext, gainNode, createOscillator, initializeAudio } = useAudioContext();
  const [oscillators, setOscillators] = useState([
    {
      id: 1,
      type: 'sine',
      frequency: 440,
      amplitude: 0.5,
      volume: 0.5,
      isPlaying: false
    }
  ]);
  const [analyser, setAnalyser] = useState(null);
  const activeOscillators = useRef(new Map());

  const handleStartAudio = useCallback(() => {
    initializeAudio();
  }, [initializeAudio]);

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

  const addOscillator = () => {
    setOscillators(prev => [
      ...prev,
      {
        id: Math.max(...prev.map(o => o.id)) + 1,
        type: 'sine',
        frequency: 440,
        amplitude: 0.5,
        volume: 0.5,
        isPlaying: false
      }
    ]);
  };

  const removeOscillator = (id) => {
    const activeOsc = activeOscillators.current.get(id);
    if (activeOsc) {
      activeOsc.oscillator.stop();
      activeOsc.gain.disconnect();
    }
    activeOscillators.current.delete(id);
    setOscillators(prev => prev.filter(o => o.id !== id));
  };

  const updateOscillator = (id, updates) => {
    setOscillators(prev => prev.map(osc => {
      if (osc.id !== id) return osc;
      const newSettings = { ...osc, ...updates };
      
      // Update running oscillator parameters if it exists
      const activeOsc = activeOscillators.current.get(id);
      if (activeOsc) {
        const { oscillator, gain } = activeOsc;
        oscillator.type = newSettings.type;
        oscillator.frequency.setValueAtTime(newSettings.frequency, audioContext.currentTime);
        gain.gain.setValueAtTime(newSettings.volume * newSettings.amplitude, audioContext.currentTime);
      }
      
      return newSettings;
    }));
  };

  const startOscillator = (id) => {
    if (!audioContext || activeOscillators.current.has(id)) return;

    const oscSettings = oscillators.find(o => o.id === id);
    if (!oscSettings) return;

    const osc = createOscillator(oscSettings.type, oscSettings.frequency);
    const oscGain = audioContext.createGain();
    oscGain.gain.setValueAtTime(oscSettings.volume * oscSettings.amplitude, audioContext.currentTime);
    
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    osc.start();
    
    activeOscillators.current.set(id, { oscillator: osc, gain: oscGain });
  };

  const stopOscillator = (id) => {
    const activeOsc = activeOscillators.current.get(id);
    if (activeOsc) {
      activeOsc.oscillator.stop();
      activeOsc.gain.disconnect();
      activeOscillators.current.delete(id);
    }
  };

  // Handle play/stop toggling
  useEffect(() => {
    oscillators.forEach(osc => {
      if (osc.isPlaying && !activeOscillators.current.has(osc.id)) {
        startOscillator(osc.id);
      } else if (!osc.isPlaying && activeOscillators.current.has(osc.id)) {
        stopOscillator(osc.id);
      }
    });

    return () => {
      activeOscillators.current.forEach((value, key) => {
        stopOscillator(key);
      });
    };
  }, [oscillators.map(o => o.isPlaying).join(',')]);

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
        <div className="space-y-4">
          {oscillators.map((osc) => (
            <Card key={osc.id} className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Oscillator {osc.id}</h3>
                  {oscillators.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeOscillator(osc.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <WaveControls
                  settings={osc}
                  onSettingsChange={(newSettings) => updateOscillator(osc.id, newSettings)}
                />
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={addOscillator}
            className="w-full"
            variant="outline"
          >
            Add Oscillator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaveGenerator;