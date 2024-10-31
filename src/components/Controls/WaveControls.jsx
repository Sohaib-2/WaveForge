import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square } from 'lucide-react';

const WaveControls = ({ settings, onSettingsChange }) => {
  const waveTypes = ['sine', 'square', 'sawtooth', 'triangle', 'white', 'pink'];
  
  // Determine if frequency control should be shown
  const showFrequency = !['white', 'pink'].includes(settings.type);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Wave Type</label>
        <Select
          value={settings.type}
          onValueChange={(value) => onSettingsChange({ type: value })}
        >
          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 focus:ring-slate-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            {waveTypes.map((type) => (
              <SelectItem 
                key={type} 
                value={type}
                className="text-slate-200 hover:bg-slate-600 focus:bg-slate-600 focus:text-slate-200"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} {type === 'white' || type === 'pink' ? 'Noise' : 'Wave'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showFrequency && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Frequency (Hz)</label>
          <div className="px-1">
            <Slider
              value={[settings.frequency]}
              min={20}
              max={2000}
              step={1}
              onValueChange={([value]) => onSettingsChange({ frequency: value })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
          </div>
          <span className="text-sm text-slate-300">{settings.frequency} Hz</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Amplitude</label>
        <div className="px-1">
          <Slider
            value={[settings.amplitude]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={([value]) => onSettingsChange({ amplitude: value })}
            className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
          />
        </div>
        <span className="text-sm text-slate-300">{settings.amplitude.toFixed(2)}</span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Volume</label>
        <div className="px-1">
          <Slider
            value={[settings.volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={([value]) => onSettingsChange({ volume: value })}
            className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
          />
        </div>
        <span className="text-sm text-slate-300">{settings.volume.toFixed(2)}</span>
      </div>

      <Button
        onClick={() => onSettingsChange({ isPlaying: !settings.isPlaying })}
        className={`w-full ${settings.isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
        size="lg"
      >
        {settings.isPlaying ? (
          <><Square className="w-4 h-4 mr-2" /> Stop</>
        ) : (
          <><Play className="w-4 h-4 mr-2" /> Play</>
        )}
      </Button>
    </div>
  );
};

export default WaveControls;