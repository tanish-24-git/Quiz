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
            className="w-full h-full flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {/* Professional Themed Card - White Background with Thick Blue Border */}
            <div className="relative sm:pixel-borders bg-white border-4 border-[#0066B2] w-full h-full sm:h-auto sm:max-w-xl sm:min-h-[600px] shadow-[12px_12px_0_rgba(0,102,178,0.1)] flex flex-col overflow-hidden">
                
                <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col h-full">
                    {/* Header - Themed to match Welcome Screen */}
                    <div className="text-center mb-6 flex-shrink-0">
                        <h2 className="text-xl sm:text-2xl text-[#0066B2] mb-4 font-pixel font-bold uppercase tracking-tight">
                            SELECT 3 TOP GOALS
                        </h2>

                        {/* Selection Indicator - White circles with blue borders */}
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3].map((num) => (
                                <motion.div
                                    key={num}
                                    initial={false}
                                    animate={selectedGoals.length >= num ? { scale: 1.1, backgroundColor: "#FF6600", color: "#FFFFFF", borderColor: "#FF6600" } : { scale: 1, backgroundColor: "#FFFFFF", color: "#0066B2", borderColor: "#0066B2" }}
                                    className={`w-10 h-10 border-2 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors`}
                                >
                                    {selectedGoals.length >= num ? <Check className="w-5 h-5" strokeWidth={3} /> : num}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Goals Grid - High Contrast Style */}
                    <div className="flex-1 overflow-y-auto px-1 custom-scrollbar mb-6 py-2">
                        <div className="grid grid-cols-2 gap-4 content-start">
                            {lifeGoals.map((goal, index) => {
                                const IconComponent = iconMap[goal.icon];
                                const isSelected = selectedGoals.includes(goal.id);
                                const isDisabled = !isSelected && selectedGoals.length >= 3;

                                return (
                                    <motion.button
                                        key={goal.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => !isDisabled && toggleGoal(goal.id)}
                                        disabled={isDisabled}
                                        className={`relative p-5 min-h-[120px] flex flex-col items-center justify-center gap-3 transition-all duration-300 border-2 ${isSelected
                                            ? 'bg-sky-50 border-[#0066B2] shadow-[6px_6px_0_#0066B2] -translate-x-1 -translate-y-1'
                                            : isDisabled
                                                ? 'bg-slate-50 border-slate-200 opacity-40 grayscale cursor-not-allowed'
                                                : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/30'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full transition-colors ${isSelected ? 'bg-[#0066B2] text-white' : 'bg-sky-50 text-[#0066B2]'
                                            }`}>
                                            {IconComponent && <IconComponent className="w-8 h-8" />}
                                        </div>

                                        <span className={`text-[11px] sm:text-xs leading-tight uppercase text-center font-bold tracking-wide ${isSelected ? 'text-[#0066B2]' : 'text-slate-600'
                                            }`}>
                                            {goal.name}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Button - 3D Orange Style */}
                    <div className="w-full pb-2">
                        <PixelButton
                            onClick={handleProceed}
                            className={`w-full py-4 !text-base font-extrabold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-4
                                ${selectedGoals.length === 3
                                    ? 'bg-[#FF6600] text-white shadow-[0_6px_0_#993D00] active:translate-y-[2px] active:shadow-[0_4px_0_#993D00]'
                                    : 'bg-slate-200 text-slate-400 border-none cursor-not-allowed shadow-none'
                                }
                            `}
                            disabled={selectedGoals.length !== 3}
                        >
                            <span>►</span>
                            <span>
                                {selectedGoals.length === 3
                                    ? "PROCEED TO QUEST"
                                    : `SELECT ${3 - selectedGoals.length} MORE`
                                }
                            </span>
                            <span>◄</span>
                        </PixelButton>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GoalSelectionScreen;
