import { motion } from 'framer-motion';
import { CardContent } from "./ui/card";
import PixelButton from './PixelButton';
import { useSound } from '../hooks/useSound';

const WelcomeScreen = ({ onStart }) => {
    const { playSound } = useSound();

    const handleStart = () => {
        onStart();
    };

    return (
        <motion.div
            className="w-full max-w-md mx-auto font-pixel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {/* Pixel Card Container */}
            <div className="relative pixel-borders bg-sky-600 border-4 border-sky-800 overflow-hidden">
                {/* Retro Grid Background */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-50 pointer-events-none" />

                <div className="relative z-10 p-8 text-center">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                            className="p-4 bg-white rounded-xl pixel-borders-sm"
                        >
                            <img 
                                src="/bajaj_life.png" 
                                alt="Bajaj Life" 
                                className="w-24 h-auto"
                            />
                        </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h1 
                        className="text-2xl sm:text-3xl text-white mb-4 leading-relaxed drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        LIFE GOALS QUEST
                    </motion.h1>

                    <p className="text-yellow-300 text-xs sm:text-sm mb-8 tracking-widest uppercase shadow-black drop-shadow-md">
                        Are you ready, adventurer?
                    </p>

                    {/* Instructions Box */}
                    <div className="bg-slate-800/90 p-4 mb-8 pixel-borders-sm text-left">
                        <ul className="text-gray-300 space-y-4 text-xs">
                            <li className="flex items-center gap-3">
                                <span className="text-yellow-400">►</span>
                                <span>SELECT 3 TOP GOALS</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-yellow-400">►</span>
                                <span>ANSWER QUICK QUESTIONS</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-yellow-400">►</span>
                                <span>EARN YOUR REWARD</span>
                            </li>
                        </ul>
                    </div>

                    <PixelButton
                        onClick={handleStart}
                        variant="yes"
                        className="w-full text-sm sm:text-base py-4"
                    >
                        START GAME
                    </PixelButton>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
