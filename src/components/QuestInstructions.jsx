import { motion } from 'framer-motion';
import { Timer, Zap, ShieldAlert } from 'lucide-react';
import PixelButton from './PixelButton';

const QuestInstructions = ({ onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto font-pixel px-4 h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Light Blue background matched with Goal Selection - Responsive Spacing */}
            <div className="relative pixel-borders bg-white border-4 border-sky-600 p-6 sm:p-8 shadow-xl overflow-hidden w-full aspect-[1/1.618] sm:aspect-auto sm:min-h-[500px] flex flex-col">
                {/* Retro Grid Background - Subtle */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-30 pointer-events-none" />
                
                <div className="relative z-10 text-center flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg sm:text-xl text-sky-900 mb-4 sm:mb-6 tracking-widest drop-shadow-sm uppercase font-bold">
                            RAPID FIRE QUEST
                        </h2>

                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left">
                            <div className="flex items-center gap-3 sm:gap-4 bg-sky-50 p-3 pixel-borders-sm border-2 border-sky-100">
                                <div className="flex-shrink-0">
                                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                                </div>
                                <p className="text-[9px] sm:text-[10px] text-sky-900 leading-tight uppercase font-bold">
                                    5 SECONDS PER QUESTION.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 bg-sky-50 p-3 pixel-borders-sm border-2 border-sky-100">
                                <div className="flex-shrink-0">
                                    <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                                </div>
                                <p className="text-[9px] sm:text-[10px] text-sky-900 leading-tight uppercase font-bold">
                                    30 SECONDS TOTAL TIME.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 bg-sky-50 p-3 pixel-borders-sm border-2 border-sky-100">
                                <div className="flex-shrink-0">
                                    <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                                </div>
                                <p className="text-[9px] sm:text-[10px] text-sky-900 leading-tight uppercase font-bold text-balance">
                                    DON'T MISS A BEAT!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-center mb-6 sm:mb-8">
                            <p className="text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-widest animate-pulse font-bold">
                                PRESS START TO BEGIN THE CLOCK
                            </p>
                        </div>

                        <PixelButton 
                            onClick={onStart} 
                            className="w-full py-4 bg-brand-orange text-white hover:bg-orange-600 border-none shadow-[0_4px_0_#bd5a00] active:translate-y-[2px] active:shadow-none transition-all text-xs sm:text-sm"
                        >
                            START QUEST ►
                        </PixelButton>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default QuestInstructions;
