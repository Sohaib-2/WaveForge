import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Power, AudioWaveform, Save } from 'lucide-react';
import WaveControls from '../Controls/WaveControls';
import WaveVisualizer from '../WaveVisualizer';
import PresetManager from '../Controls/PresetManager';
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
  const [showPresets, setShowPresets] = useState(false);
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

  const handlePresetLoad = (presetSettings) => {
    // Stop all currently playing oscillators
    oscillators.forEach(osc => {
      if (osc.isPlaying) {
        stopOscillator(osc.id);
      }
    });

    // Load new preset settings
    setOscillators(presetSettings.map((settings, index) => ({
      ...settings,
      id: index + 1,
      isPlaying: false
    })));
  };

  return (
    <div className="h-[calc(100vh-16rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
        <div className="lg:col-span-3 flex flex-col">
          <Card className="bg-slate-900/50 border-slate-700/50 shadow-xl flex-grow">
            <CardHeader className="pb-2 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <AudioWaveform className="h-5 w-5 text-blue-400" />
                  Wave Visualizer
                </CardTitle>
                {!audioContext && (
                  <Button 
                    onClick={handleStartAudio}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50"
                    size="sm"
                  >
                    <Power className="mr-2 h-4 w-4" />
                    Initialize Audio
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              {audioContext ? (
                <div className="bg-slate-950/50 rounded-xl p-4 h-full border border-slate-800/50">
                  <WaveVisualizer analyser={analyser} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <AudioWaveform className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Initialize audio to begin</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-3 overflow-auto pr-2">
          {/* Presets Card */}
          <Card className="bg-slate-900/50 border-slate-700/50 shadow-xl">
            <CardHeader className="pb-2 px-3 pt-2">
              <CardTitle className="text-slate-100 text-sm font-medium flex items-center gap-2">
                <Save className="h-4 w-4 text-blue-400" />
                Presets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <PresetManager
                currentSettings={oscillators.map(({ type, frequency, amplitude, volume }) => 
                  ({ type, frequency, amplitude, volume })
                )}
                onPresetLoad={handlePresetLoad}
              />
            </CardContent>
          </Card>

          {/* Oscillators */}
          <div className="space-y-2">
            {oscillators.map((osc) => (
              <Card 
                key={osc.id} 
                className={`
                  bg-slate-900/50 border-slate-700/50 shadow-xl transition-all
                  ${osc.isPlaying ? 'ring-1 ring-blue-500/50 border-blue-500/30' : 'hover:border-slate-600/50'}
                `}
              >
                <CardHeader className="pb-2 px-3 pt-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-slate-100 text-sm font-medium flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${osc.isPlaying ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'}`} />
                      Oscillator {osc.id}
                    </CardTitle>
                    {oscillators.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOscillator(osc.id)}
                        className="text-slate-400 hover:text-red-400 hover:bg-slate-800/50 h-7 w-7 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <WaveControls
                    settings={osc}
                    onSettingsChange={(newSettings) => updateOscillator(osc.id, newSettings)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Add Oscillator Button */}
          <Button
            onClick={addOscillator}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Oscillator
          </Button>
        </div>
      </div>
    </div>
  );
};



export default WaveGenerator;