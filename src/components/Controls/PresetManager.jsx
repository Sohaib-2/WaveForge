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
import { Save, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import WAVE_PRESETS, { CATEGORIES } from '../presets/WavePresets';
import ADVANCED_WAVE_PRESETS, { ADVANCED_CATEGORIES } from '../presets/AdvanceWavePresets';

const PRESETS_PER_PAGE = 4;

const loadCustomPresets = (isAdvanced) => {
  try {
    const key = isAdvanced ? 'waveforge-advanced-presets' : 'waveforge-presets';
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error loading presets:', error);
    return {};
  }
};

const saveCustomPresets = (presets, isAdvanced) => {
  try {
    const key = isAdvanced ? 'waveforge-advanced-presets' : 'waveforge-presets';
    localStorage.setItem(key, JSON.stringify(presets));
  } catch (error) {
    console.error('Error saving presets:', error);
  }
};

const PresetManager = ({ currentSettings, onPresetLoad, isAdvanced = false }) => {
  const [customPresets, setCustomPresets] = useState({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newPresetCategory, setNewPresetCategory] = useState('Custom');
  const [currentPage, setCurrentPage] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Use the appropriate presets and categories based on mode
  const defaultPresets = isAdvanced ? ADVANCED_WAVE_PRESETS : WAVE_PRESETS;
  const allCategories = isAdvanced ? ADVANCED_CATEGORIES : CATEGORIES;
  
  useEffect(() => {
    setCustomPresets(loadCustomPresets(isAdvanced));
    setCurrentPage(0);
    setSelectedCategory('All');
  }, [isAdvanced]);

  const mainCategories = ['All', ...allCategories.slice(1, 5)];
  const visibleCategories = showAllCategories ? allCategories : mainCategories;

  // Get filtered and paginated presets
  const filteredPresets = {
    ...defaultPresets,
    ...customPresets
  };

  const displayPresets = selectedCategory === 'All' 
    ? filteredPresets 
    : Object.fromEntries(
        Object.entries(filteredPresets).filter(([_, preset]) => 
          preset.category === selectedCategory
        )
      );

  const presetEntries = Object.entries(displayPresets);
  const totalPages = Math.ceil(presetEntries.length / PRESETS_PER_PAGE);
  const paginatedPresets = presetEntries.slice(
    currentPage * PRESETS_PER_PAGE,
    (currentPage + 1) * PRESETS_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const saveNewPreset = () => {
    if (!newPresetName.trim()) return;
    
    const newPresets = {
      ...customPresets,
      [newPresetName]: {
        category: newPresetCategory,
        settings: currentSettings,
        created: new Date().toISOString()
      }
    };
    
    setCustomPresets(newPresets);
    saveCustomPresets(newPresets, isAdvanced);
    setSaveDialogOpen(false);
    setNewPresetName('');
  };

  const deletePreset = (name) => {
    const newPresets = { ...customPresets };
    delete newPresets[name];
    setCustomPresets(newPresets);
    saveCustomPresets(newPresets, isAdvanced);
  };

  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">Categories</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-xs text-slate-400 hover:text-blue-400 h-6 px-2"
          >
            {showAllCategories ? 'Show Less' : 'Show All'}
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {visibleCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className={`text-xs px-2.5 h-7 ${
                selectedCategory === category 
                  ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50" 
                  : "text-slate-300 hover:text-blue-400"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-2 gap-2">
        {paginatedPresets.map(([name, preset]) => (
          <div
            key={name}
            className="relative group bg-slate-800/30 rounded-lg p-2.5 border border-slate-700/50 hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-200 flex items-center gap-2">
                  {name}
                  {'created' in preset && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                      Custom
                    </span>
                  )}
                </h3>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="text-slate-400 hover:text-blue-400 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-400">
            {currentPage + 1} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="text-slate-400 hover:text-blue-400 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Save Button and Dialog remain the same */}
      <Button
        onClick={() => setSaveDialogOpen(true)}
        className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Current Settings
      </Button>

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
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(cat => cat !== 'All').map(category => (
                  <Button
                    key={category}
                    variant={newPresetCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewPresetCategory(category)}
                    className={`${
                      newPresetCategory === category 
                        ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50" 
                        : "text-slate-300 hover:text-blue-400"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
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