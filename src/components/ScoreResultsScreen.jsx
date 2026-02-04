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
    const percentage = Math.round((score / 999) * 100);
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
            className="w-full max-w-lg mx-auto font-pixel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Confetti />

            {/* Pixel Card Container */}
            <div className="relative pixel-borders bg-slate-900 border-4 border-slate-700 overflow-hidden">

                {/* Header / Victory Scene */}
                <div className="relative bg-sky-600 p-0 pb-12 overflow-visible">
                    {/* Retro Reward with Spinning Background */}
                    <RetroReward scorePercentage={percentage} />
                </div>

                {/* Content Area - Professional/White Theme */}
                <CardContent className="p-6 relative z-10 -mt-8 bg-white border-t-4 border-slate-900 mx-4 mb-4 shadow-lg rounded-b-lg font-sans">

                    {/* Message Box */}
                    <div className="bg-blue-50 border border-blue-100 p-4 mb-6 rounded-lg text-center shadow-sm">
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                            {getScoreMessage()}
                        </p>
                    </div>

                    {/* Quest/Goals List */}
                    <div className="mb-8">
                        <p className="text-xs text-slate-500 mb-4 text-center uppercase tracking-widest font-bold">
                            - Quest Requirements -
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {selectedGoals.map((goal, i) => (
                                <motion.div
                                    key={goal.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 2.5 + (i * 0.1) }}
                                    className="px-3 py-2 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200 font-semibold"
                                >
                                    {goal.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Input/CTA Section */}
                    <div className="space-y-4">
                        <button
                            onClick={onTalkToExpert}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded w-full shadow-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>CLAIM REWARD</span>
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={onCallNow}
                                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg text-sm font-bold transition-colors border border-slate-200"
                            >
                                <Phone className="w-4 h-4" /> CALL
                            </button>

                            <button
                                onClick={onBookSlot}
                                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg text-sm font-bold transition-colors border border-slate-200"
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

