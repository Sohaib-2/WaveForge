const WAVE_PRESETS = {
    // Basic Synth Presets
    'Warm Bass': {
      category: 'Bass',
      settings: [
        { type: 'sine', frequency: 55, amplitude: 0.7, volume: 0.8 },
        { type: 'sine', frequency: 110, amplitude: 0.3, volume: 0.5 }
      ]
    },
    'Deep Sub': {
      category: 'Bass',
      settings: [
        { type: 'sine', frequency: 30, amplitude: 0.8, volume: 0.7 },
        { type: 'triangle', frequency: 60, amplitude: 0.2, volume: 0.4 }
      ]
    },
    'Pluck Bass': {
      category: 'Bass',
      settings: [
        { type: 'triangle', frequency: 80, amplitude: 0.6, volume: 0.7 },
        { type: 'square', frequency: 160, amplitude: 0.3, volume: 0.4 }
      ]
    },
  
    // Lead Presets
    'Square Lead': {
      category: 'Lead',
      settings: [
        { type: 'square', frequency: 440, amplitude: 0.4, volume: 0.6 },
        { type: 'square', frequency: 443, amplitude: 0.2, volume: 0.3 }
      ]
    },
    'Crystal Lead': {
      category: 'Lead',
      settings: [
        { type: 'sine', frequency: 880, amplitude: 0.5, volume: 0.6 },
        { type: 'triangle', frequency: 1760, amplitude: 0.3, volume: 0.4 }
      ]
    },
    'Sharp Lead': {
      category: 'Lead',
      settings: [
        { type: 'sawtooth', frequency: 440, amplitude: 0.5, volume: 0.6 },
        { type: 'square', frequency: 442, amplitude: 0.3, volume: 0.4 }
      ]
    },
  
    // Pad Presets
    'Warm Pad': {
      category: 'Pad',
      settings: [
        { type: 'sine', frequency: 220, amplitude: 0.4, volume: 0.6 },
        { type: 'sine', frequency: 440, amplitude: 0.3, volume: 0.4 },
        { type: 'triangle', frequency: 880, amplitude: 0.2, volume: 0.3 }
      ]
    },
    'Ethereal Pad': {
      category: 'Pad',
      settings: [
        { type: 'sine', frequency: 330, amplitude: 0.4, volume: 0.5 },
        { type: 'sine', frequency: 497, amplitude: 0.3, volume: 0.4 },
        { type: 'triangle', frequency: 660, amplitude: 0.2, volume: 0.3 }
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
  
    // Natural Sound Simulations
    'Ocean Waves': {
      category: 'Nature',
      settings: [
        { type: 'white', frequency: 0, amplitude: 0.3, volume: 0.4 },
        { type: 'pink', frequency: 0, amplitude: 0.4, volume: 0.5 }
      ]
    },
    'Wind': {
      category: 'Nature',
      settings: [
        { type: 'pink', frequency: 0, amplitude: 0.3, volume: 0.4 },
        { type: 'white', frequency: 0, amplitude: 0.2, volume: 0.3 }
      ]
    },
    'Rain': {
      category: 'Nature',
      settings: [
        { type: 'white', frequency: 0, amplitude: 0.2, volume: 0.3 },
        { type: 'pink', frequency: 0, amplitude: 0.1, volume: 0.2 }
      ]
    },
  
    // FX Presets
    'Sci-Fi Scanner': {
      category: 'FX',
      settings: [
        { type: 'sawtooth', frequency: 880, amplitude: 0.3, volume: 0.4 },
        { type: 'sine', frequency: 440, amplitude: 0.2, volume: 0.3 }
      ]
    },
    'Robot Voice': {
      category: 'FX',
      settings: [
        { type: 'square', frequency: 200, amplitude: 0.4, volume: 0.5 },
        { type: 'sawtooth', frequency: 400, amplitude: 0.3, volume: 0.4 }
      ]
    },
    'Space Wind': {
      category: 'FX',
      settings: [
        { type: 'pink', frequency: 0, amplitude: 0.3, volume: 0.4 },
        { type: 'sine', frequency: 220, amplitude: 0.2, volume: 0.3 }
      ]
    },
  
    // Experimental
    'Chaos Theory': {
      category: 'Experimental',
      settings: [
        { type: 'sawtooth', frequency: 440, amplitude: 0.3, volume: 0.4 },
        { type: 'square', frequency: 443, amplitude: 0.2, volume: 0.3 },
        { type: 'triangle', frequency: 437, amplitude: 0.2, volume: 0.3 }
      ]
    },
    'Digital Rain': {
      category: 'Experimental',
      settings: [
        { type: 'square', frequency: 880, amplitude: 0.2, volume: 0.3 },
        { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.2 }
      ]
    },
    'Quantum Fluctuation': {
      category: 'Experimental',
      settings: [
        { type: 'sine', frequency: 440, amplitude: 0.3, volume: 0.4 },
        { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.2 },
        { type: 'triangle', frequency: 442, amplitude: 0.2, volume: 0.3 }
      ]
    }
  };
  
  export const CATEGORIES = ['All', 'Bass', 'Lead', 'Pad', 'Nature', 'FX', 'Experimental', 'Custom'];
  
  export default WAVE_PRESETS;