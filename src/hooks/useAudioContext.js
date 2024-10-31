import { useState, useCallback, useRef } from 'react';

const useAudioContext = () => {
  const [audio, setAudio] = useState(() => ({
    audioContext: null,
    gainNode: null
  }));
  const noiseNodes = useRef(new Map());

  const initializeAudio = useCallback(() => {
    if (!audio.audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      setAudio({
        audioContext: ctx,
        gainNode: gain
      });
    }
  }, [audio.audioContext]);

  const createNoiseOscillator = (type) => {
    if (!audio.audioContext) return null;
  
    const bufferSize = 2 * audio.audioContext.sampleRate;
    const noiseBuffer = audio.audioContext.createBuffer(1, bufferSize, audio.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
  
    if (type === 'white') {
      // Improved white noise with better amplitude distribution
      for (let i = 0; i < bufferSize; i++) {
        // Using Box-Muller transform for more natural white noise
        let u1 = Math.random();
        let u2 = Math.random();
        output[i] = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.5;
      }
    } else if (type === 'pink') {
      // Improved pink noise using Voss-McCartney algorithm
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        let white = Math.random() * 2 - 1;
        
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }
  
    const noiseNode = audio.audioContext.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
  
    const noiseGain = audio.audioContext.createGain();
    noiseNode.connect(noiseGain);
    noiseGain.connect(audio.gainNode);
  
    return { oscillator: noiseNode, gainNode: noiseGain };
  };

  const createOscillator = useCallback((type, frequency) => {
    if (!audio.audioContext) return null;

    // Handle noise types
    if (type === 'white' || type === 'pink') {
      return createNoiseOscillator(type);
    }

    // Handle regular oscillator types
    const newOscillator = audio.audioContext.createOscillator();
    newOscillator.type = type;
    newOscillator.frequency.setValueAtTime(frequency, audio.audioContext.currentTime);
    
    // Create a dedicated gain node for this oscillator
    const oscillatorGain = audio.audioContext.createGain();
    newOscillator.connect(oscillatorGain);
    oscillatorGain.connect(audio.gainNode);

    return { oscillator: newOscillator, gainNode: oscillatorGain };
  }, [audio]);

  return {
    audioContext: audio.audioContext,
    gainNode: audio.gainNode,
    createOscillator,
    initializeAudio
  };
};

export default useAudioContext;