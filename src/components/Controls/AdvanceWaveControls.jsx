import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdvancedWaveControls = ({ settings, onSettingsChange }) => {
  const waveTypes = ['sine', 'square', 'sawtooth', 'triangle', 'white', 'pink'];
  const showFrequency = !['white', 'pink'].includes(settings.type);

  return (
    <div className="space-y-6">
      {/* Basic Controls */}
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

      {/* Advanced Parameters Tabs */}
      <Tabs defaultValue="timing" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="timing" className="text-sm text-slate-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400" >
            Timing
          </TabsTrigger>
          <TabsTrigger value="envelope" className="text-sm  text-slate-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 ">
            Envelope
          </TabsTrigger>
          <TabsTrigger value="modulation" className="text-sm text-slate-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Modulation
          </TabsTrigger>
        </TabsList>

        {/* Timing Controls */}
        <TabsContent value="timing" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Start Delay (ms)</label>
            <Slider
              value={[settings.startDelay || 0]}
              min={0}
              max={5000}
              step={100}
              onValueChange={([value]) => onSettingsChange({ startDelay: value })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
            <span className="text-sm text-slate-300">{settings.startDelay || 0} ms</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Duration (ms)</label>
            <Slider
              value={[settings.duration || 1000]}
              min={100}
              max={10000}
              step={100}
              onValueChange={([value]) => onSettingsChange({ duration: value })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
            <span className="text-sm text-slate-300">{settings.duration || 1000} ms</span>
          </div>
        </TabsContent>

        {/* Envelope Controls */}
        <TabsContent value="envelope" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Attack (s)</label>
            <Slider
              value={[settings.envelope?.attack || 0.1]}
              min={0}
              max={5}
              step={0.1}
              onValueChange={([value]) => onSettingsChange({
                envelope: { ...settings.envelope, attack: value }
              })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
            <span className="text-sm text-slate-300">{settings.envelope?.attack || 0.1}s</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Decay (s)</label>
            <Slider
              value={[settings.envelope?.decay || 0.1]}
              min={0}
              max={5}
              step={0.1}
              onValueChange={([value]) => onSettingsChange({
                envelope: { ...settings.envelope, decay: value }
              })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
            <span className="text-sm text-slate-300">{settings.envelope?.decay || 0.1}s</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Sustain</label>
            <Slider
              value={[settings.envelope?.sustain || 0.5]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={([value]) => onSettingsChange({
                envelope: { ...settings.envelope, sustain: value }
              })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
            <span className="text-sm text-slate-300">{settings.envelope?.sustain || 0.5}</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Release (s)</label>
            <Slider
              value={[settings.envelope?.release || 0.1]}
              min={0}
              max={5}
              step={0.1}
              onValueChange={([value]) => onSettingsChange({
                envelope: { ...settings.envelope, release: value }
              })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
            <span className="text-sm text-slate-300">{settings.envelope?.release || 0.1}s</span>
          </div>
        </TabsContent>

        {/* Modulation Controls */}
        <TabsContent value="modulation" className="space-y-4 mt-4">
          {showFrequency && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">Frequency Modulation</label>
                <Slider
                  value={[settings.frequencyModulation?.depth || 0]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => onSettingsChange({
                    frequencyModulation: { ...settings.frequencyModulation, depth: value }
                  })}
                  className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
                />
                <span className="text-sm text-slate-300">Depth: {settings.frequencyModulation?.depth || 0}Hz</span>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">Modulation Rate</label>
                <Slider
                  value={[settings.frequencyModulation?.frequency || 0]}
                  min={0}
                  max={20}
                  step={0.1}
                  onValueChange={([value]) => onSettingsChange({
                    frequencyModulation: { ...settings.frequencyModulation, frequency: value }
                  })}
                  className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
                />
                <span className="text-sm text-slate-300">Rate: {settings.frequencyModulation?.frequency || 0}Hz</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">Amplitude Modulation</label>
            <Slider
              value={[settings.amplitudeModulation?.depth || 0]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={([value]) => onSettingsChange({
                amplitudeModulation: { ...settings.amplitudeModulation, depth: value }
              })}
              className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
            />
            <span className="text-sm text-slate-300">Depth: {settings.amplitudeModulation?.depth || 0}</span>
          </div>
        </TabsContent>
      </Tabs>

      {/* Base Controls */}
      {showFrequency && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Base Frequency (Hz)</label>
          <Slider
            value={[settings.frequency]}
            min={20}
            max={2000}
            step={1}
            onValueChange={([value]) => onSettingsChange({ frequency: value })}
            className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
          />
          <span className="text-sm text-slate-300">{settings.frequency} Hz</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Base Amplitude</label>
        <Slider
          value={[settings.amplitude]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={([value]) => onSettingsChange({ amplitude: value })}
          className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
        />
        <span className="text-sm text-slate-300">{settings.amplitude.toFixed(2)}</span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Master Volume</label>
        <Slider
          value={[settings.volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={([value]) => onSettingsChange({ volume: value })}
          className="py-4 [&>.relative>span]:bg-blue-500 [&>.relative>span]:h-2 [&>.relative>span:first-child]:bg-slate-600 [&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4 [&_span[role=slider]]:bg-blue-500"
        />
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

export default AdvancedWaveControls;