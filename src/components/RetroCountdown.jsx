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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white font-pixel overflow-hidden">
            {/* Retro Grid Background - Very subtle gray to visible on white */}
            <div className="absolute inset-0 pixel-grid-bg opacity-5 pointer-events-none" />
            
            {/* Scanline - Subtle Light */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0)_50%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.02))] bg-[size:100%_4px]" />

            <div className="relative flex items-center justify-center w-full h-full">
                {/* Crosshair / Circle Interface - All Orange Theme */}
                <motion.div 
                    className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] border-4 border-brand-orange/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-brand-orange/40" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-brand-orange/40" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-4 bg-brand-orange/40" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-4 bg-brand-orange/40" />
                </motion.div>

                {/* Inner Circle pulse - Orange Accent */}
                <motion.div 
                    className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] border-2 border-brand-orange/30 rounded-full"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Countdown Numbers - Orange with shadow */}
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
                            <span className="text-[120px] sm:text-[200px] font-bold text-brand-orange drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)] tabular-nums block leading-none">
                                {count}
                            </span>
                        ) : (
                            <span className="text-[60px] sm:text-[100px] font-bold text-brand-orange drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)] block leading-none tracking-tighter uppercase">
                                QUEST<br/>START!
                            </span>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Decorative text */}
                <div className="absolute bottom-20 text-slate-300 text-xs sm:text-sm tracking-[0.5em] uppercase animate-pulse font-bold">
                    System Ready
                </div>
            </div>
        </div>
    );
};

export default RetroCountdown;
