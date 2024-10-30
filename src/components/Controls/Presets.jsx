import React from 'react';
import { Button } from '@/components/ui/button';

const PRESETS = {
  'A4 Note': { type: 'sine', frequency: 440, amplitude: 0.5 },
  'Bass': { type: 'sine', frequency: 55, amplitude: 0.7 },
  'Square Lead': { type: 'square', frequency: 880, amplitude: 0.3 },
  'Sawtooth Bass': { type: 'sawtooth', frequency: 110, amplitude: 0.4 },
};

const Presets = ({ onPresetSelect }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Presets</label>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(PRESETS).map(([name, settings]) => (
          <Button
            key={name}
            variant="outline"
            onClick={() => onPresetSelect(settings)}
            className="w-full"
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Presets;