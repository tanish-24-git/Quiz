import { motion } from 'framer-motion';
import { Timer, Zap, ShieldAlert } from 'lucide-react';
import PixelButton from './PixelButton';

const QuestInstructions = ({ onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto font-pixel"
        >
            {/* Light Blue background matched with Goal Selection */}
            <div className="relative pixel-borders bg-white border-4 border-sky-600 p-8 shadow-xl overflow-hidden">
                {/* Retro Grid Background - Subtle */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-30 pointer-events-none" />
                
                <div className="relative z-10 text-center">
                    <h2 className="text-xl text-sky-900 mb-6 tracking-widest drop-shadow-sm uppercase">
                        RAPID FIRE QUEST
                    </h2>

                    <div className="space-y-4 mb-8 text-left">
                        <div className="flex items-center gap-4 bg-sky-50 p-3 pixel-borders-sm border-2 border-sky-100">
                            <div className="flex-shrink-0">
                                <Zap className="w-5 h-5 text-brand-orange" />
                            </div>
                            <p className="text-[10px] text-sky-900 leading-tight uppercase font-bold">
                                5 SECONDS PER QUESTION.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-sky-50 p-3 pixel-borders-sm border-2 border-sky-100">
                            <div className="flex-shrink-0">
                                <Timer className="w-5 h-5 text-brand-orange" />
                            </div>
                            <p className="text-[10px] text-sky-900 leading-tight uppercase font-bold">
                                30 SECONDS TOTAL TIME.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-sky-50 p-3 pixel-borders-sm border-2 border-sky-100">
                            <div className="flex-shrink-0">
                                <ShieldAlert className="w-5 h-5 text-red-500" />
                            </div>
                            <p className="text-[10px] text-sky-900 leading-tight uppercase font-bold">
                                DON'T MISS A BEAT!
                            </p>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest animate-pulse">
                            PRESS START TO BEGIN THE CLOCK
                        </p>
                    </div>

                    <PixelButton 
                        onClick={onStart} 
                        className="w-full py-4 bg-brand-orange text-white hover:bg-orange-600 border-none shadow-[0_4px_0_#bd5a00] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                        START QUEST ►
                    </PixelButton>
                </div>
            </div>
        </motion.div>
    );
};

export default QuestInstructions;
