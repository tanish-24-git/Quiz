import { useRef, useCallback } from 'react';

/**
 * Custom hook for sound effects
 */
export const useSound = () => {
    const soundEnabled = useRef(true);

    const playSound = useCallback((soundType) => {
        if (!soundEnabled.current) return;

        try {
            const audio = new Audio(`/sounds/${soundType}.wav`);
            audio.volume = 0.5;
            audio.play().catch(err => {
                // Silently fail if sound doesn't exist or can't play
            });
        } catch (error) {
            // Sound not available
        }
    }, []);

    const toggleSound = useCallback(() => {
        soundEnabled.current = !soundEnabled.current;
        return soundEnabled.current;
    }, []);

    return { playSound, toggleSound, soundEnabled: soundEnabled.current };
};
