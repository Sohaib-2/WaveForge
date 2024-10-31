import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Save, Trash2, Star, Folder } from 'lucide-react';

// Built-in presets
const DEFAULT_PRESETS = {
  'Bass': {
    category: 'Bass',
    settings: [
      { type: 'sine', frequency: 55, amplitude: 0.7, volume: 0.8 },
      { type: 'sine', frequency: 110, amplitude: 0.3, volume: 0.5 }
    ]
  },
  'Warm Pad': {
    category: 'Pad',
    settings: [
      { type: 'sine', frequency: 220, amplitude: 0.4, volume: 0.6 },
      { type: 'sine', frequency: 440, amplitude: 0.3, volume: 0.4 },
      { type: 'triangle', frequency: 880, amplitude: 0.2, volume: 0.3 }
    ]
  },
  'Square Lead': {
    category: 'Lead',
    settings: [
      { type: 'square', frequency: 440, amplitude: 0.4, volume: 0.6 },
      { type: 'square', frequency: 443, amplitude: 0.2, volume: 0.3 }
    ]
  },
  'Rich Texture': {
    category: 'Pad',
    settings: [
      { type: 'sine', frequency: 220, amplitude: 0.3, volume: 0.6 },
      { type: 'triangle', frequency: 330, amplitude: 0.2, volume: 0.4 },
      { type: 'sawtooth', frequency: 440, amplitude: 0.1, volume: 0.3 }
    ]
  },
};

// Load presets from localStorage
const loadCustomPresets = () => {
  try {
    const saved = localStorage.getItem('waveforge-presets');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error loading presets:', error);
    return {};
  }
};

// Save presets to localStorage
const saveCustomPresets = (presets) => {
  try {
    localStorage.setItem('waveforge-presets', JSON.stringify(presets));
  } catch (error) {
    console.error('Error saving presets:', error);
  }
};

const PresetManager = ({ currentSettings, onPresetLoad }) => {
  const [customPresets, setCustomPresets] = useState({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Load custom presets on mount
  useEffect(() => {
    setCustomPresets(loadCustomPresets());
  }, []);

  const categories = ['All', 'Bass', 'Lead', 'Pad', 'Custom'];

  const saveNewPreset = () => {
    if (!newPresetName.trim()) return;
    
    const newPresets = {
      ...customPresets,
      [newPresetName]: {
        category: 'Custom',
        settings: currentSettings,
        created: new Date().toISOString()
      }
    };
    
    setCustomPresets(newPresets);
    saveCustomPresets(newPresets);
    setSaveDialogOpen(false);
    setNewPresetName('');
  };

  const deletePreset = (name) => {
    const newPresets = { ...customPresets };
    delete newPresets[name];
    setCustomPresets(newPresets);
    saveCustomPresets(newPresets);
  };

  const filteredPresets = {
    ...DEFAULT_PRESETS,
    ...customPresets
  };

  // Filter presets by category
  const displayPresets = selectedCategory === 'All' 
    ? filteredPresets 
    : Object.fromEntries(
        Object.entries(filteredPresets).filter(([_, preset]) => 
          preset.category === selectedCategory
        )
      );

      return (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50" 
                    : "text-slate-300 hover:text-blue-400"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
    
          {/* Presets Grid */}
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(displayPresets).map(([name, preset]) => (
              <div
                key={name}
                className="relative group bg-slate-800/30 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-200">{name}</h3>
                    <span className="text-xs text-slate-400">{preset.category}</span>
                  </div>
                  {'created' in preset && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePreset(name);
                      }}
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-950/30"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  className="mt-2 w-full bg-slate-900/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400"
                  onClick={() => onPresetLoad(preset.settings)}
                >
                  Load Preset
                </Button>
              </div>
            ))}
          </div>
    
          {/* Save New Preset Button */}
          <Button
            onClick={() => setSaveDialogOpen(true)}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Current Settings
          </Button>
    
          {/* Save Preset Dialog */}
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogContent className="bg-slate-900/95 border-slate-700/50">
              <DialogHeader>
                <DialogTitle className="text-slate-200">Save Preset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Preset Name</label>
                  <Input
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="My Awesome Preset"
                    className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setSaveDialogOpen(false)}
                  className="text-slate-300 hover:text-slate-200 hover:bg-slate-800/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveNewPreset}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50"
                >
                  Save Preset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    };

export default PresetManager;