import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';

const RetroCountdown = ({ onComplete }) => {
    const [count, setCount] = useState(3);
    const { playSound } = useSound();

    useEffect(() => {
        // Initial sound
        // playSound('tick'); // Assuming we might have a tick sound, or use something else

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setTimeout(() => {
                        onComplete();
                    }, 500); // 0.5s delay on "GO!" or "0"
                    return 0; // "GO!" state
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    // Play sound on count change?
    useEffect(() => {
        if (count > 0) {
            // playSound('tick'); 
        } else {
            // playSound('start');
        }
    }, [count]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 font-pixel">
            {/* Retro Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            {/* Scanline */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[size:100%_4px] opacity-20" />

            <div className="relative flex items-center justify-center w-full h-full">
                {/* Crosshair / Circle Interface */}
                <motion.div 
                    className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] border-4 border-brand-orange/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-brand-orange/50" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-brand-orange/50" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-4 bg-brand-orange/50" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-4 bg-brand-orange/50" />
                </motion.div>

                {/* Inner Circle pulse */}
                <motion.div 
                    className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] border-2 border-brand-orange/20 rounded-full"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Countdown Numbers */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={count}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 text-center"
                    >
                        {count > 0 ? (
                            <span className="text-[120px] sm:text-[200px] font-bold text-brand-orange drop-shadow-[0_0_20px_rgba(255,102,0,0.8)] tabular-nums block leading-none">
                                {count}
                            </span>
                        ) : (
                            <span className="text-[60px] sm:text-[100px] font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] block leading-none tracking-tighter">
                                QUEST<br/>START!
                            </span>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Decorative text */}
                <div className="absolute bottom-20 text-brand-orange/60 text-xs sm:text-sm tracking-[0.5em] uppercase animate-pulse">
                    System Ready
                </div>
            </div>
        </div>
    );
};

export default RetroCountdown;
