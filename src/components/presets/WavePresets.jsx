const WAVE_PRESETS = {
  // Enhanced Bass Presets
  'Warm Bass': {
    category: 'Bass',
    settings: [
      { type: 'sine', frequency: 55, amplitude: 0.7, volume: 0.8 },
      { type: 'sine', frequency: 110, amplitude: 0.3, volume: 0.5 },
      { type: 'triangle', frequency: 165, amplitude: 0.1, volume: 0.3 }
    ]
  },
  'Deep Sub': {
    category: 'Bass',
    settings: [
      { type: 'sine', frequency: 30, amplitude: 0.8, volume: 0.7 },
      { type: 'triangle', frequency: 60, amplitude: 0.2, volume: 0.4 },
      { type: 'sine', frequency: 45, amplitude: 0.1, volume: 0.3 }
    ]
  },
  'Pluck Bass': {
    category: 'Bass',
    settings: [
      { type: 'triangle', frequency: 80, amplitude: 0.6, volume: 0.7 },
      { type: 'square', frequency: 160, amplitude: 0.3, volume: 0.4 },
      { type: 'sine', frequency: 120, amplitude: 0.2, volume: 0.3 }
    ]
  },
  'Growl Bass': {
    category: 'Bass',
    settings: [
      { type: 'sawtooth', frequency: 65, amplitude: 0.6, volume: 0.7 },
      { type: 'square', frequency: 130, amplitude: 0.3, volume: 0.4 },
      { type: 'triangle', frequency: 195, amplitude: 0.2, volume: 0.3 }
    ]
  },

  // Enhanced Lead Presets
  'Square Lead': {
    category: 'Lead',
    settings: [
      { type: 'square', frequency: 440, amplitude: 0.4, volume: 0.6 },
      { type: 'square', frequency: 443, amplitude: 0.2, volume: 0.3 },
      { type: 'sine', frequency: 880, amplitude: 0.1, volume: 0.2 }
    ]
  },
  'Crystal Lead': {
    category: 'Lead',
    settings: [
      { type: 'sine', frequency: 880, amplitude: 0.5, volume: 0.6 },
      { type: 'triangle', frequency: 1760, amplitude: 0.3, volume: 0.4 },
      { type: 'sine', frequency: 2640, amplitude: 0.1, volume: 0.2 }
    ]
  },

  // Enhanced Pad Presets
  'Warm Pad': {
    category: 'Pad',
    settings: [
      { type: 'sine', frequency: 220, amplitude: 0.4, volume: 0.6 },
      { type: 'sine', frequency: 440, amplitude: 0.3, volume: 0.4 },
      { type: 'triangle', frequency: 880, amplitude: 0.2, volume: 0.3 }
    ]
  },

  // Enhanced and New Natural Sound Simulations
  'Ocean Waves': {
    category: 'Nature',
    settings: [
      { type: 'pink', frequency: 0, amplitude: 0.4, volume: 0.5 },
      { type: 'white', frequency: 0, amplitude: 0.3, volume: 0.4 },
      { type: 'sine', frequency: 0.8, amplitude: 0.2, volume: 0.3 },
      { type: 'sine', frequency: 1.2, amplitude: 0.1, volume: 0.2 }
    ]
  },
  'Tropical Beach': {
    category: 'Nature',
    settings: [
      { type: 'pink', frequency: 0, amplitude: 0.35, volume: 0.4 },
      { type: 'white', frequency: 0, amplitude: 0.25, volume: 0.3 },
      { type: 'sine', frequency: 1.5, amplitude: 0.15, volume: 0.2 },
      { type: 'triangle', frequency: 2200, amplitude: 0.05, volume: 0.1 }
    ]
  },
  'Jungle Ambience': {
    category: 'Nature',
    settings: [
      { type: 'pink', frequency: 0, amplitude: 0.3, volume: 0.4 },
      { type: 'triangle', frequency: 1500, amplitude: 0.15, volume: 0.2 },
      { type: 'sine', frequency: 2500, amplitude: 0.1, volume: 0.15 },
      { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.15 }
    ]
  },
  'Mountain Stream': {
    category: 'Nature',
    settings: [
      { type: 'white', frequency: 0, amplitude: 0.25, volume: 0.3 },
      { type: 'pink', frequency: 0, amplitude: 0.2, volume: 0.25 },
      { type: 'triangle', frequency: 800, amplitude: 0.1, volume: 0.15 },
      { type: 'sine', frequency: 1200, amplitude: 0.05, volume: 0.1 }
    ]
  },
  'Desert Wind': {
    category: 'Nature',
    settings: [
      { type: 'pink', frequency: 0, amplitude: 0.3, volume: 0.35 },
      { type: 'sine', frequency: 100, amplitude: 0.15, volume: 0.2 },
      { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.15 }
    ]
  },
  'Forest Canopy': {
    category: 'Nature',
    settings: [
      { type: 'pink', frequency: 0, amplitude: 0.2, volume: 0.25 },
      { type: 'triangle', frequency: 2200, amplitude: 0.1, volume: 0.15 },
      { type: 'sine', frequency: 1800, amplitude: 0.08, volume: 0.12 },
      { type: 'white', frequency: 0, amplitude: 0.05, volume: 0.1 }
    ]
  },
  'Dawn Chorus': {
    category: 'Nature',
    settings: [
      { type: 'sine', frequency: 2000, amplitude: 0.15, volume: 0.2 },
      { type: 'triangle', frequency: 1500, amplitude: 0.12, volume: 0.18 },
      { type: 'sine', frequency: 2500, amplitude: 0.1, volume: 0.15 },
      { type: 'pink', frequency: 0, amplitude: 0.05, volume: 0.1 }
    ]
  },
  'Waterfall': {
    category: 'Nature',
    settings: [
      { type: 'white', frequency: 0, amplitude: 0.35, volume: 0.4 },
      { type: 'pink', frequency: 0, amplitude: 0.25, volume: 0.3 },
      { type: 'sine', frequency: 100, amplitude: 0.15, volume: 0.2 },
      { type: 'triangle', frequency: 50, amplitude: 0.1, volume: 0.15 }
    ]
  },
  'Arctic Wind': {
    category: 'Nature',
    settings: [
      { type: 'white', frequency: 0, amplitude: 0.25, volume: 0.3 },
      { type: 'sine', frequency: 150, amplitude: 0.2, volume: 0.25 },
      { type: 'pink', frequency: 0, amplitude: 0.15, volume: 0.2 }
    ]
  },
  'Underground Cave': {
    category: 'Nature',
    settings: [
      { type: 'pink', frequency: 0, amplitude: 0.2, volume: 0.25 },
      { type: 'sine', frequency: 60, amplitude: 0.15, volume: 0.2 },
      { type: 'triangle', frequency: 30, amplitude: 0.1, volume: 0.15 },
      { type: 'sine', frequency: 1200, amplitude: 0.05, volume: 0.1 }
    ]
  },
  'Meadow Breeze': {
    category: 'Nature',
    settings: [
      { type: 'pink', frequency: 0, amplitude: 0.2, volume: 0.25 },
      { type: 'sine', frequency: 200, amplitude: 0.1, volume: 0.15 },
      { type: 'triangle', frequency: 2000, amplitude: 0.08, volume: 0.12 },
      { type: 'sine', frequency: 1500, amplitude: 0.05, volume: 0.1 }
    ]
  },

  // New Healing Presets
  'Meditation Om': {
    category: 'Healing',
    settings: [
      { type: 'sine', frequency: 136.1, amplitude: 0.4, volume: 0.5 }, // Om frequency
      { type: 'sine', frequency: 272.2, amplitude: 0.2, volume: 0.3 },
      { type: 'triangle', frequency: 408.3, amplitude: 0.1, volume: 0.2 }
    ]
  },
  'Theta Waves': {
    category: 'Healing',
    settings: [
      { type: 'sine', frequency: 6, amplitude: 0.5, volume: 0.6 },
      { type: 'sine', frequency: 4, amplitude: 0.3, volume: 0.4 },
      { type: 'triangle', frequency: 7.83, amplitude: 0.2, volume: 0.3 } // Schumann resonance
    ]
  },
  'Crystal Bowls': {
    category: 'Healing',
    settings: [
      { type: 'sine', frequency: 432, amplitude: 0.4, volume: 0.5 }, // A=432Hz
      { type: 'sine', frequency: 648, amplitude: 0.2, volume: 0.3 },
      { type: 'sine', frequency: 864, amplitude: 0.1, volume: 0.2 }
    ]
  },
  'Heart Chakra': {
    category: 'Healing',
    settings: [
      { type: 'sine', frequency: 341.3, amplitude: 0.4, volume: 0.5 }, // F4 chakra tone
      { type: 'triangle', frequency: 682.6, amplitude: 0.2, volume: 0.3 },
      { type: 'sine', frequency: 170.65, amplitude: 0.2, volume: 0.3 }
    ]
  },

  // New Animals Category
  'Whale Song': {
    category: 'Animals',
    settings: [
      { type: 'sine', frequency: 100, amplitude: 0.4, volume: 0.5 },
      { type: 'sine', frequency: 150, amplitude: 0.3, volume: 0.4 },
      { type: 'triangle', frequency: 80, amplitude: 0.2, volume: 0.3 }
    ]
  },
  'Cricket Night': {
    category: 'Animals',
    settings: [
      { type: 'square', frequency: 2000, amplitude: 0.2, volume: 0.3 },
      { type: 'square', frequency: 2200, amplitude: 0.15, volume: 0.25 },
      { type: 'sine', frequency: 1800, amplitude: 0.1, volume: 0.2 }
    ]
  },
  'Wolf Howl': {
    category: 'Animals',
    settings: [
      { type: 'sawtooth', frequency: 350, amplitude: 0.3, volume: 0.4 },
      { type: 'sine', frequency: 700, amplitude: 0.2, volume: 0.3 },
      { type: 'triangle', frequency: 175, amplitude: 0.15, volume: 0.25 }
    ]
  },
  'Bird Sanctuary': {
    category: 'Animals',
    settings: [
      { type: 'sine', frequency: 2500, amplitude: 0.25, volume: 0.35 },
      { type: 'triangle', frequency: 3000, amplitude: 0.2, volume: 0.3 },
      { type: 'sine', frequency: 2000, amplitude: 0.15, volume: 0.25 },
      { type: 'pink', frequency: 0, amplitude: 0.1, volume: 0.15 }
    ]
  },

  // Enhanced FX Presets
  'Sci-Fi Scanner': {
    category: 'FX',
    settings: [
      { type: 'sawtooth', frequency: 880, amplitude: 0.3, volume: 0.4 },
      { type: 'sine', frequency: 440, amplitude: 0.2, volume: 0.3 },
      { type: 'square', frequency: 1760, amplitude: 0.1, volume: 0.2 }
    ]
  },
  'Alien Transmission': {
    category: 'FX',
    settings: [
      { type: 'square', frequency: 1200, amplitude: 0.3, volume: 0.4 },
      { type: 'sawtooth', frequency: 2400, amplitude: 0.2, volume: 0.3 },
      { type: 'triangle', frequency: 600, amplitude: 0.15, volume: 0.2 }
    ]
  },
  'Time Portal': {
    category: 'FX',
    settings: [
      { type: 'sine', frequency: 500, amplitude: 0.3, volume: 0.4 },
      { type: 'sawtooth', frequency: 1000, amplitude: 0.2, volume: 0.3 },
      { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.2 }
    ]
  },

  // Enhanced Experimental Presets
  'Quantum Fluctuation': {
    category: 'Experimental',
    settings: [
      { type: 'sine', frequency: 440, amplitude: 0.3, volume: 0.4 },
      { type: 'white', frequency: 0, amplitude: 0.15, volume: 0.2 },
      { type: 'triangle', frequency: 442, amplitude: 0.2, volume: 0.3 },
      { type: 'sawtooth', frequency: 438, amplitude: 0.1, volume: 0.2 }
    ]
  },
  'Neural Network': {
    category: 'Experimental',
    settings: [
      { type: 'square', frequency: 220, amplitude: 0.25, volume: 0.3 },
      { type: 'sine', frequency: 440, amplitude: 0.2, volume: 0.25 },
      { type: 'triangle', frequency: 880, amplitude: 0.15, volume: 0.2 },
      { type: 'pink', frequency: 0, amplitude: 0.1, volume: 0.15 }
    ]
  },
  'Root Chakra': {
  category: 'Healing',
  settings: [
    { type: 'sine', frequency: 256, amplitude: 0.4, volume: 0.5 },     // C4 chakra tone
    { type: 'triangle', frequency: 128, amplitude: 0.3, volume: 0.4 }, // Sub-harmonic
    { type: 'sine', frequency: 512, amplitude: 0.2, volume: 0.3 }      // Harmonic
  ]
},
'Third Eye': {
  category: 'Healing',
  settings: [
    { type: 'sine', frequency: 852, amplitude: 0.4, volume: 0.5 },    // Solfeggio frequency
    { type: 'triangle', frequency: 426, amplitude: 0.2, volume: 0.3 }, // Sub-harmonic
    { type: 'sine', frequency: 1704, amplitude: 0.1, volume: 0.2 }    // Harmonic
  ]
},
'Delta Sleep': {
  category: 'Healing',
  settings: [
    { type: 'sine', frequency: 2, amplitude: 0.5, volume: 0.6 },      // Delta wave
    { type: 'sine', frequency: 3.5, amplitude: 0.3, volume: 0.4 },    // Delta wave variation
    { type: 'triangle', frequency: 396, amplitude: 0.1, volume: 0.2 } // Solfeggio healing frequency
  ]
},
'DNA Repair': {
  category: 'Healing',
  settings: [
    { type: 'sine', frequency: 528, amplitude: 0.4, volume: 0.5 },    // DNA repair frequency
    { type: 'sine', frequency: 264, amplitude: 0.2, volume: 0.3 },    // Sub-harmonic
    { type: 'triangle', frequency: 1056, amplitude: 0.1, volume: 0.2 } // Harmonic
  ]
},
'Solar Plexus': {
  category: 'Healing',
  settings: [
    { type: 'sine', frequency: 384, amplitude: 0.4, volume: 0.5 },    // Solar plexus frequency
    { type: 'triangle', frequency: 768, amplitude: 0.2, volume: 0.3 }, // Harmonic
    { type: 'sine', frequency: 192, amplitude: 0.2, volume: 0.3 }     // Sub-harmonic
  ]
},

// Additional Animals Presets
'Dolphin Pod': {
  category: 'Animals',
  settings: [
    { type: 'sine', frequency: 8000, amplitude: 0.3, volume: 0.4 },    // High-frequency clicks
    { type: 'triangle', frequency: 12000, amplitude: 0.2, volume: 0.3 }, // Whistles
    { type: 'sine', frequency: 4000, amplitude: 0.2, volume: 0.3 },    // Lower frequency calls
    { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.2 }       // Water ambient
  ]
},
'Frog Pond': {
  category: 'Animals',
  settings: [
    { type: 'sawtooth', frequency: 400, amplitude: 0.3, volume: 0.4 }, // Deep croaks
    { type: 'triangle', frequency: 800, amplitude: 0.2, volume: 0.3 }, // Higher peeps
    { type: 'pink', frequency: 0, amplitude: 0.15, volume: 0.2 },     // Night ambient
    { type: 'sine', frequency: 200, amplitude: 0.1, volume: 0.2 }     // Water ripples
  ]
},
'Eagle Call': {
  category: 'Animals',
  settings: [
    { type: 'sawtooth', frequency: 2800, amplitude: 0.3, volume: 0.4 }, // Primary screech
    { type: 'triangle', frequency: 3200, amplitude: 0.2, volume: 0.3 }, // Harmonic overtone
    { type: 'pink', frequency: 0, amplitude: 0.1, volume: 0.2 }        // Wind ambient
  ]
},
'Lion Pride': {
  category: 'Animals',
  settings: [
    { type: 'sawtooth', frequency: 200, amplitude: 0.4, volume: 0.5 }, // Deep roar
    { type: 'triangle', frequency: 400, amplitude: 0.2, volume: 0.3 }, // Harmonic
    { type: 'pink', frequency: 0, amplitude: 0.15, volume: 0.2 }      // Savanna ambient
  ]
},
'Bee Hive': {
  category: 'Animals',
  settings: [
    { type: 'triangle', frequency: 250, amplitude: 0.3, volume: 0.4 }, // Wing beats
    { type: 'sine', frequency: 500, amplitude: 0.2, volume: 0.3 },    // Buzzing
    { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.2 },     // Swarm effect
    { type: 'pink', frequency: 0, amplitude: 0.1, volume: 0.15 }      // Background ambient
  ]
},
'Earthquake': {
  category: 'Bass',
  settings: [
    { type: 'sine', frequency: 20, amplitude: 0.9, volume: 0.8 },     // Ultra-low sub
    { type: 'triangle', frequency: 40, amplitude: 0.4, volume: 0.6 },  // Sub harmonics
    { type: 'sine', frequency: 80, amplitude: 0.2, volume: 0.4 }      // Upper harmonics
  ]
},
'Bass Cannon': {
  category: 'Bass',
  settings: [
    { type: 'sawtooth', frequency: 35, amplitude: 0.8, volume: 0.8 }, // Aggressive sub
    { type: 'square', frequency: 70, amplitude: 0.4, volume: 0.6 },   // Sharp harmonic
    { type: 'sine', frequency: 140, amplitude: 0.2, volume: 0.4 }     // Smooth upper
  ]
},
'Titan Sub': {
  category: 'Bass',
  settings: [
    { type: 'sine', frequency: 25, amplitude: 0.9, volume: 0.9 },     // Massive sub
    { type: 'sine', frequency: 50, amplitude: 0.3, volume: 0.5 },     // Sub octave
    { type: 'triangle', frequency: 75, amplitude: 0.2, volume: 0.3 }  // Warmth layer
  ]
},
'Tectonic Plate': {
  category: 'Bass',
  settings: [
    { type: 'sine', frequency: 28, amplitude: 0.85, volume: 0.8 },    // Deep rumble
    { type: 'sawtooth', frequency: 56, amplitude: 0.4, volume: 0.6 }, // Grit layer
    { type: 'triangle', frequency: 84, amplitude: 0.2, volume: 0.4 }  // Definition
  ]
},
'Seismic Wave': {
  category: 'Bass',
  settings: [
    { type: 'sine', frequency: 32, amplitude: 0.8, volume: 0.8 },     // Moving sub
    { type: 'triangle', frequency: 48, amplitude: 0.4, volume: 0.6 }, // Texture
    { type: 'sine', frequency: 96, amplitude: 0.2, volume: 0.4 }      // Upper detail
  ]
},
'Bass Destroyer': {
  category: 'Bass',
  settings: [
    { type: 'sawtooth', frequency: 30, amplitude: 0.9, volume: 0.8 }, // Aggressive fundamental
    { type: 'square', frequency: 45, amplitude: 0.4, volume: 0.6 },   // Grit layer
    { type: 'triangle', frequency: 90, amplitude: 0.2, volume: 0.4 }  // Definition
  ]
},
'Megalodon': {
  category: 'Bass',
  settings: [
    { type: 'sine', frequency: 22, amplitude: 0.95, volume: 0.9 },    // Deepest sub
    { type: 'triangle', frequency: 44, amplitude: 0.3, volume: 0.5 }, // Warm layer
    { type: 'sawtooth', frequency: 88, amplitude: 0.1, volume: 0.3 }  // Bite
  ]
},
'Thunder Bass': {
  category: 'Bass',
  settings: [
    { type: 'sine', frequency: 38, amplitude: 0.8, volume: 0.8 },     // Rolling sub
    { type: 'sawtooth', frequency: 76, amplitude: 0.4, volume: 0.5 }, // Crack
    { type: 'white', frequency: 0, amplitude: 0.1, volume: 0.2 }      // Air
  ]
}
};


export const CATEGORIES = ['All', 'Bass', 'Lead', 'Pad', 'Nature', 'FX', 'Experimental',  'Healing', 'Animals','Custom'];

export default WAVE_PRESETS;