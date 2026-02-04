import { motion } from 'framer-motion';
import { useState } from 'react';

import { lifeGoals } from '../data/lifeGoals';
import {
    GraduationCap, Heart, Sunset, Home, Shield,
    Rocket, Plane, TrendingUp, HeartPulse, Check
} from "lucide-react";
import PixelButton from './PixelButton';
import { useSound } from '../hooks/useSound';

const iconMap = {
    GraduationCap,
    Heart,
    Sunset,
    Home,
    Shield,
    Rocket,
    Plane,
    TrendingUp,
    HeartPulse
};

const GoalSelectionScreen = ({ onProceed }) => {
    const [selectedGoals, setSelectedGoals] = useState([]);
    const { playSound } = useSound();

    const toggleGoal = (goalId) => {
        if (!selectedGoals.includes(goalId)) {
            // Sound for selection removed
        }

        setSelectedGoals(prev => {
            if (prev.includes(goalId)) {
                return prev.filter(id => id !== goalId);
            }
            if (prev.length < 3) {
                return [...prev, goalId];
            }
            return prev;
        });
    };

    const handleProceed = () => {
        const goals = lifeGoals.filter(g => selectedGoals.includes(g.id));
        onProceed(goals);
    };

    return (
        <motion.div
            className="w-full max-w-5xl mx-auto font-pixel px-4 min-h-screen flex items-center justify-center py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {/* Pixel Card Container - Responsive sizing */}
            <div className="relative pixel-borders bg-sky-600 border-4 border-sky-800 w-full min-h-[100dvh] sm:min-h-[700px] max-h-screen overflow-y-auto flex flex-col shadow-2xl">
                {/* Retro Grid Background */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-50 pointer-events-none" />

                <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col justify-between h-full">
                    {/* Header - Compact on Golden Ratio */}
                    <div className="text-center mb-2 flex-shrink-0">
                        <h2 className="text-base sm:text-xl text-white mb-2 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] leading-relaxed">
                            SELECT 3 GOALS
                        </h2>

                        {/* Selected Counter */}
                        <div className="flex justify-center gap-2 mt-1">
                            {[1, 2, 3].map((num) => (
                                <div
                                    key={num}
                                    className={`w-7 h-7 sm:w-9 sm:h-9 border-2 flex items-center justify-center text-[10px] sm:text-xs transition-all duration-300 ${selectedGoals.length >= num
                                        ? 'bg-yellow-400 border-yellow-600 text-black shadow-[2px_2px_0_rgba(0,0,0,0.3)]'
                                        : 'bg-slate-800 border-slate-600 text-slate-500'
                                        }`}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Goals Grid - Responsive 3x3 */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-2 flex-1 content-center">
                        {lifeGoals.map((goal, index) => {
                            const IconComponent = iconMap[goal.icon];
                            const isSelected = selectedGoals.includes(goal.id);
                            const isDisabled = !isSelected && selectedGoals.length >= 3;

                            return (
                                <motion.button
                                    key={goal.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => !isDisabled && toggleGoal(goal.id)}
                                    disabled={isDisabled}
                                    className={`relative p-1.5 sm:p-2 h-full min-h-[4.5rem] sm:min-h-[5.5rem] flex flex-col items-center justify-center gap-1 transition-all duration-200 pixel-borders-sm ${isSelected
                                        ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 translate-y-1'
                                        : isDisabled
                                            ? 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
                                            : 'bg-slate-700 border-slate-900 hover:bg-slate-600 hover:-translate-y-1'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-0.5 right-0.5">
                                            <Check className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white drop-shadow-md" strokeWidth={3} />
                                        </div>
                                    )}

                                    <div className={`p-1 sm:p-1.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-900/50 text-blue-300'
                                        }`}>
                                        {IconComponent && <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5" />}
                                    </div>

                                    <span className={`text-[7px] sm:text-[9px] md:text-[10px] leading-tight uppercase transition-colors ${isSelected ? 'text-white font-bold drop-shadow-sm' : 'text-slate-400'
                                        }`}>
                                        {goal.name}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="w-full">
                        <PixelButton
                            onClick={handleProceed}
                            variant="neutral"
                            className={`w-full py-3 !text-[10px] sm:!text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap
                                ${selectedGoals.length === 3
                                    ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-white translate-x-0 translate-y-0 active:translate-x-1 active:translate-y-1 active:shadow-none'
                                    : 'bg-slate-700 text-slate-400 border-2 border-slate-600 opacity-50 cursor-not-allowed'
                                }
                            `}
                            disabled={selectedGoals.length !== 3}
                        >
                            {selectedGoals.length === 3
                                ? "PROCEED TO QUEST ►"
                                : `SELECT ${3 - selectedGoals.length} MORE`
                            }
                        </PixelButton>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GoalSelectionScreen;
