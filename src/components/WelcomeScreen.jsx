import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
            className="w-full h-full flex flex-col items-center justify-center"
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

            {/* Professional Themed Card - White Background with Thick Blue Border */}
            <div className="relative sm:pixel-borders bg-white border-4 border-[#0066B2] w-full h-full sm:h-auto sm:max-w-md sm:min-h-[600px] shadow-[12px_12px_0_rgba(0,102,178,0.1)] p-6 py-6 flex flex-col justify-between overflow-hidden">

                <div className="relative z-10 text-center flex-1 flex flex-col items-center justify-between h-full">
                    {/* Top Content Group */}
                    <div className="w-full flex flex-col items-center">
                        {/* Logo Section */}
                        <div className="flex justify-center mb-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                                className="p-1 px-4 bg-white border-2 border-slate-100 shadow-sm"
                            >
                                <img
                                    src="/bajaj_life.png"
                                    alt="Bajaj Life"
                                    className="w-24 sm:w-32 h-auto"
                                />
                            </motion.div>
                        </div>

                        {/* Professional Header Style */}
                        <div className="mb-4 flex-shrink-0">
                            <motion.h1
                                className="font-pixel text-xl sm:text-2xl text-[#0066B2] mb-1 leading-tight uppercase font-bold"
                            >
                                LIFE GOALS QUEST
                            </motion.h1>
                            <p className="text-slate-500 font-sans text-xs sm:text-sm font-medium">
                                A few steps to secure your future.
                            </p>
                        </div>

                        {/* Game Theme Accent */}
                        <motion.p
                            className="font-pixel text-[#FF6600] text-[10px] sm:text-xs mb-2 tracking-[0.2em] uppercase font-bold"
                            animate={isTransitioning ? { scale: [1, 1.2, 1] } : { opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ARE YOU READY?
                        </motion.p>
                    </div>

                    {/* Instruction Box - Light Blue Background with Border */}
                    <div className="w-full p-4 bg-sky-50/50 border-2 border-[#0066B2] flex flex-col gap-3 my-4">
                        <div className="flex items-center gap-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-[#0066B2] flex items-center justify-center text-[#0066B2] font-bold text-xs">1</span>
                            <span className="font-sans text-slate-700 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-left">SELECT 3 TOP GOALS</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-[#0066B2] flex items-center justify-center text-[#0066B2] font-bold text-xs">2</span>
                            <span className="font-sans text-slate-700 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-left">ANSWER RAPID FIRE QUESTIONS</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-[#0066B2] flex items-center justify-center text-[#0066B2] font-bold text-xs">3</span>
                            <span className="font-sans text-slate-700 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-left text-balance">Calculate Life goal score</span>
                        </div>
                    </div>

                    {/* Orange 'Proceed' Style Button - 3D Effect */}
                    <div className="w-full flex-shrink-0 pt-2 sm:pt-4 max-w-lg">
                        <PixelButton
                            onClick={handleStart}
                            disabled={isTransitioning}
                            className={`w-full py-4 bg-[#FF6600] hover:bg-[#E65C00] text-white font-sans font-extrabold text-base sm:text-lg border-none shadow-[0_6px_0_#993D00] active:translate-y-[2px] active:shadow-[0_4px_0_#993D00] transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-4 ${isTransitioning ? 'opacity-50' : ''}`}
                        >
                            <span>►</span>
                            <span>{isTransitioning ? "LOADING..." : "START QUEST"}</span>
                            <span>◄</span>
                        </PixelButton>

                        {/* Professional Subtext */}
                        <p className="mt-4 text-[8px] sm:text-[10px] text-slate-400 font-sans uppercase tracking-[0.1em] text-center font-medium">
                            Quest data is secured & private
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
