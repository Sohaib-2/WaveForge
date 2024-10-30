import { useState, useCallback } from 'react';

const useAudioContext = () => {
  const [audio, setAudio] = useState(() => ({
    audioContext: null,
    gainNode: null
  }));

  const initializeAudio = useCallback(() => {
    if (!audio.audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain();
      setAudio({
        audioContext: ctx,
        gainNode: gain
      });
    }
  }, [audio.audioContext]);

  const createOscillator = useCallback((type, frequency) => {
    if (!audio.audioContext) return null;

    const newOscillator = audio.audioContext.createOscillator();
    newOscillator.type = type;
    newOscillator.frequency.setValueAtTime(frequency, audio.audioContext.currentTime);
    newOscillator.connect(audio.gainNode);
    return newOscillator;
  }, [audio]);

  return {
    audioContext: audio.audioContext,
    gainNode: audio.gainNode,
    createOscillator,
    initializeAudio
  };
};

export default useAudioContext;