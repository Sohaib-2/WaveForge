import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WaveControls = ({ settings, onSettingsChange }) => {
  const waveTypes = ['sine', 'square', 'sawtooth', 'triangle'];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Wave Type</label>
        <Select
          value={settings.type}
          onValueChange={(value) => onSettingsChange({ type: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {waveTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Frequency (Hz)</label>
        <Slider
          value={[settings.frequency]}
          min={20}
          max={2000}
          step={1}
          onValueChange={([value]) => onSettingsChange({ frequency: value })}
        />
        <span className="text-sm text-slate-400">{settings.frequency} Hz</span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Amplitude</label>
        <Slider
          value={[settings.amplitude]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={([value]) => onSettingsChange({ amplitude: value })}
        />
        <span className="text-sm text-slate-400">{settings.amplitude.toFixed(2)}</span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Volume</label>
        <Slider
          value={[settings.volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={([value]) => onSettingsChange({ volume: value })}
        />
        <span className="text-sm text-slate-400">{settings.volume.toFixed(2)}</span>
      </div>

      <Button
        onClick={() => onSettingsChange({ isPlaying: !settings.isPlaying })}
        className="w-full"
        variant={settings.isPlaying ? "destructive" : "default"}
      >
        {settings.isPlaying ? 'Stop' : 'Play'}
      </Button>
    </div>
  );
};

export default WaveControls;