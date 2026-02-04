import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Phone, Calendar, MessageCircle, Sparkles } from "lucide-react";
import Confetti from './Confetti';
import RetroReward from './RetroReward';
import PixelButton from './PixelButton';
import { useSound } from '../hooks/useSound';

const ScoreResultsScreen = ({
    score,
    selectedGoals,
    onCallNow,
    onBookSlot,
    onTalkToExpert
}) => {
    const percentage = Math.round((score / 100) * 100);
    const { playSound } = useSound();

    useEffect(() => {
        // Play victory sound on mount
        const timer = setTimeout(() => {
            playSound(percentage >= 50 ? 'complete' : 'success');
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Determine detailed message based on score
    const getScoreMessage = () => {
        if (percentage >= 80) return "Master Strategist! Your future is secure!";
        if (percentage >= 50) return "Strong Start! Keep building your goals!";
        return "New Adventurer! Begin your quest today!";
    };

    return (
        <motion.div
            className="w-full max-w-lg mx-auto font-pixel px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Confetti />

            {/* Pixel Card Container - Golden Ratio Width/Padding */}
            <div className="relative pixel-borders bg-slate-900 border-4 border-slate-700 overflow-hidden shadow-2xl">

                {/* Header / Victory Scene */}
                <div className="relative bg-sky-600 p-0 pb-phi-2 overflow-visible">
                    {/* Retro Reward with Spinning Background */}
                    <RetroReward scorePercentage={percentage} />
                </div>

                {/* Content Area - Professional/White Theme */}
                <CardContent className="p-phi-1 relative z-10 -mt-8 bg-white border-t-4 border-slate-900 mx-4 mb-4 shadow-lg flex flex-col gap-phi-1">

                    {/* Message Box */}
                    <div className="bg-blue-50 border-2 border-blue-100 p-3 rounded-none text-center shadow-sm pixel-borders-sm">
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-bold uppercase tracking-wide">
                            {getScoreMessage()}
                        </p>
                    </div>

                    {/* Quest/Goals List */}
                    <div className="mb-2">
                        <p className="text-[10px] text-slate-400 mb-2 text-center uppercase tracking-[0.2em] font-bold">
                            - Quest Requirements -
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {selectedGoals.map((goal, i) => (
                                <motion.div
                                    key={goal.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 2.5 + (i * 0.1) }}
                                    className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] border border-slate-300 font-bold uppercase tracking-wider pixel-borders-sm"
                                >
                                    {goal.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Input/CTA Section */}
                    <div className="space-y-3">
                        <button
                            onClick={onTalkToExpert}
                            className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-6 w-full shadow-[0_4px_0_#cc5500] active:shadow-none active:translate-y-[2px] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm border-none pixel-borders-sm"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>CLAIM REWARD</span>
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={onCallNow}
                                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 text-xs font-bold transition-colors border-2 border-slate-200 shadow-[0_2px_0_#cbd5e1] active:translate-y-[1px] active:shadow-none uppercase tracking-wide pixel-borders-sm"
                            >
                                <Phone className="w-4 h-4" /> CALL
                            </button>

                            <button
                                onClick={onBookSlot}
                                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 text-xs font-bold transition-colors border-2 border-slate-200 shadow-[0_2px_0_#cbd5e1] active:translate-y-[1px] active:shadow-none uppercase tracking-wide pixel-borders-sm"
                            >
                                <Calendar className="w-4 h-4" /> BOOK
                            </button>
                        </div>
                    </div>
                </CardContent>
            </div>
        </motion.div>
    );
};

export default ScoreResultsScreen;

