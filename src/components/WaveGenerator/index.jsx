import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Power } from 'lucide-react';
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-600 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-100">Wave Visualizer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!audioContext ? (
              <Button 
                onClick={handleStartAudio}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                size="lg"
              >
                <Power className="mr-2 h-5 w-5" />
                Initialize Audio
              </Button>
            ) : (
              <div className="bg-slate-900 rounded-lg p-4">
                <WaveVisualizer analyser={analyser} />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {oscillators.map((osc) => (
            <Card key={osc.id} className="bg-slate-800 border-slate-600 shadow-xl transition-all hover:border-slate-500">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-slate-100 text-lg">Oscillator {osc.id}</CardTitle>
                  {oscillators.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOscillator(osc.id)}
                      className="text-slate-400 hover:text-red-400 hover:bg-slate-700/50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <WaveControls
                  settings={osc}
                  onSettingsChange={(newSettings) => updateOscillator(osc.id, newSettings)}
                />
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={addOscillator}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Oscillator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaveGenerator;