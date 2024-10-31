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

    // Generate noise based on type
    for (let i = 0; i < bufferSize; i++) {
      if (type === 'white') {
        output[i] = Math.random() * 2 - 1;
      } else if (type === 'pink') {
        // Improved pink noise approximation
        output[i] = (Math.random() * 2 - 1) * 0.5 + 
                    (Math.random() * 2 - 1) * 0.25 + 
                    (Math.random() * 2 - 1) * 0.125;
      }
    }

    const noiseNode = audio.audioContext.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Create a dedicated gain node for this noise source
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