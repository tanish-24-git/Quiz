import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CardContent } from "./ui/card";
import PixelButton from './PixelButton';
import { useSound } from '../hooks/useSound';

const WelcomeScreen = ({ onStart }) => {
    const { playSound } = useSound();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleStart = () => {
        setIsTransitioning(true);
        playSound('start'); // Trigger game start sound

        // Short delay for the "Flash" effect before shifting screen
        setTimeout(() => {
            onStart();
        }, 600);
    };

    return (
        <motion.div
            className="w-full max-w-md mx-auto relative px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
        >
            {/* Transition Flash Overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white pointer-events-none"
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            {/* Professional White Card with Pixel Borders */}
            <div className="relative pixel-borders bg-white border-4 border-slate-200 overflow-hidden shadow-2xl p-phi-1 sm:p-phi-2 py-8 sm:py-12 flex flex-col w-full min-h-[500px] sm:min-h-[600px] justify-between">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-10 pointer-events-none" />

                <div className="relative z-10 text-center flex-1 flex flex-col items-center justify-between h-full">
                    {/* Top Content Group */}
                    <div className="w-full flex flex-col items-center">
                        {/* Logo Section */}
                        <div className="flex justify-center mb-phi-1">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                                className="p-3 sm:p-4 bg-white rounded-xl border-2 border-slate-100 pixel-borders-sm shadow-sm"
                            >
                                <img
                                    src="/bajaj_life.png"
                                    alt="Bajaj Life"
                                    className="w-16 sm:w-24 h-auto"
                                />
                            </motion.div>
                        </div>

                        {/* Professional Header Style */}
                        <div className="mb-phi-1 flex-shrink-0">
                            <motion.h1
                                className="font-pixel text-xl sm:text-2xl md:text-3xl text-sky-900 mb-2 leading-tight uppercase font-bold"
                                style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.05)' }}
                            >
                                LIFE GOALS QUEST
                            </motion.h1>
                            <p className="text-slate-500 font-sans text-xs sm:text-base leading-relaxed max-w-[200px] sm:max-w-none mx-auto opacity-80">
                                A few steps to secure your future.
                            </p>
                        </div>

                        {/* Game Theme Accent */}
                        <motion.p
                            className="font-pixel text-brand-orange text-[8px] sm:text-xs mb-phi-1 tracking-[0.2em] uppercase font-bold"
                            animate={isTransitioning ? { scale: [1, 1.2, 1], filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] } : { opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: isTransitioning ? 0.3 : 2, repeat: isTransitioning ? 0 : Infinity }}
                        >
                            ARE YOU READY, ADVENTURER?
                        </motion.p>
                    </div>

                    {/* Minimalist Professional Instructions - More compact on mobile */}
                    <div className="w-full space-y-3 sm:space-y-4 mb-phi-1 text-left px-1 sm:px-4 flex-1 flex flex-col justify-center max-w-lg">
                        <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-50 pb-2 sm:pb-3">
                            <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-bold text-[10px] sm:text-sm">1</span>
                            <span className="font-sans text-slate-700 text-[10px] sm:text-sm font-medium uppercase tracking-wider">SELECT 3 TOP GOALS</span>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-50 pb-2 sm:pb-3">
                            <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-bold text-[10px] sm:text-sm">2</span>
                            <span className="font-sans text-slate-700 text-[10px] sm:text-sm font-medium uppercase tracking-wider text-balance">ANSWER RAPID FIRE QUESTIONS</span>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-5">
                            <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-bold text-[10px] sm:text-sm">3</span>
                            <span className="font-sans text-slate-700 text-[10px] sm:text-sm font-medium uppercase tracking-wider">Calculate Life goal score</span>
                        </div>
                    </div>

                    {/* Orange 'Proceed' Style Button */}
                    <div className="w-full flex-shrink-0 pt-2 sm:pt-4 max-w-lg">
                        <PixelButton
                            onClick={handleStart}
                            disabled={isTransitioning}
                            className={`w-full py-4 sm:py-5 bg-[#ff6b00] hover:bg-[#e66000] text-white font-sans font-bold text-base sm:text-lg rounded-none border-none shadow-[0_4px_0_#cc5500] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest ${isTransitioning ? 'animate-ping opacity-50' : ''}`}
                        >
                            {isTransitioning ? "LOADING..." : "START QUEST"}
                        </PixelButton>

                        {/* Professional Subtext */}
                        <p className="mt-3 sm:mt-4 text-[8px] sm:text-[10px] text-slate-400 font-sans uppercase tracking-[0.1em] opacity-70">
                            Quest data is secured & private
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
