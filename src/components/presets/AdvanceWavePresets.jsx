export const ADVANCED_WAVE_PRESETS = {
    'Cinematic Rise': {
      category: 'FX',
      settings: [
        {
          type: 'sine',
          frequency: 220,
          amplitude: 0.6,
          volume: 0.7,
          startDelay: 0,
          duration: 3000,
          envelope: {
            attack: 1.5,
            decay: 0.5,
            sustain: 0.7,
            release: 1.0
          },
          frequencyModulation: {
            startFreq: 220,
            endFreq: 880,
            duration: 3000
          }
        },
        {
          type: 'sawtooth',
          frequency: 440,
          amplitude: 0.3,
          volume: 0.4,
          startDelay: 500,
          duration: 2500,
          envelope: {
            attack: 1.0,
            decay: 0.3,
            sustain: 0.5,
            release: 0.8
          }
        }
      ]
    },
    'Ocean Waves': {
      category: 'Nature',
      settings: [
        {
          type: 'white',
          amplitude: 0.3,
          volume: 0.4,
          startDelay: 0,
          duration: -1, // Infinite duration
          envelope: {
            attack: 2.0,
            decay: 1.0,
            sustain: 0.6,
            release: 2.0
          },
          amplitudeModulation: {
            frequency: 0.1, // Very slow modulation
            depth: 0.5
          }
        },
        {
          type: 'sine',
          frequency: 60,
          amplitude: 0.4,
          volume: 0.5,
          startDelay: 1000,
          duration: -1,
          envelope: {
            attack: 2.5,
            decay: 1.5,
            sustain: 0.7,
            release: 2.0
          }
        }
      ]
    },
    'Alien Transmission': {
      category: 'Experimental',
      settings: [
        {
          type: 'sine',
          frequency: 880,
          amplitude: 0.5,
          volume: 0.6,
          startDelay: 0,
          duration: 2000,
          envelope: {
            attack: 0.1,
            decay: 0.2,
            sustain: 0.8,
            release: 0.3
          },
          frequencyModulation: {
            frequency: 5,
            depth: 100
          }
        },
        {
          type: 'square',
          frequency: 440,
          amplitude: 0.3,
          volume: 0.4,
          startDelay: 200,
          duration: 1800,
          envelope: {
            attack: 0.05,
            decay: 0.1,
            sustain: 0.7,
            release: 0.2
          }
        }
      ]
    }
  };
  
  export const ADVANCED_CATEGORIES = [
    'All',
    'Cinematic',
    'Nature',
    'FX',
    'Experimental',
    'Modulation',
    'Complex',
    'Custom'
  ];
  
  export default ADVANCED_WAVE_PRESETS;