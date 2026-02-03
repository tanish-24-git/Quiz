import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { assessmentQuestions } from '../data/lifeGoals';
import PixelProgressBar from './PixelProgressBar';
import PixelButton from './PixelButton';
import ParticleEffect from './ParticleEffect';
import { Heart, Timer } from "lucide-react";

const GoalAssessmentScreen = ({ 
    currentGoal, 
    currentGoalIndex, 
    currentQuestionIndex, 
    onAnswer,
    totalGoals = 3 
}) => {
    const [particles, setParticles] = useState([]);
    const [timeLeft, setTimeLeft] = useState(5);
    const timerRef = useRef(null);
    
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const overallProgress = (currentGoalIndex * 3 + currentQuestionIndex + 1) / 9;

    // Timer Logic
    useEffect(() => {
        setTimeLeft(5); 
        
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    onAnswer(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [currentGoalIndex, currentQuestionIndex]);

    const handleAnswer = (answer, event) => {
        clearInterval(timerRef.current);
        
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const particleId = Date.now();
        // Use Orange for Yes, Light Blue/White for No? Or stick to standard green/red for clarity?
        // Let's use Brand Orange for Yes to match theme.
        const color = answer ? '#ff7900' : '#ffffff'; 
        
        setParticles(prev => [...prev, { id: particleId, x, y, color }]);
        
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== particleId));
        }, 800);
        
        setTimeout(() => {
            onAnswer(answer);
        }, 200);
    };

    return (
        <motion.div
            key={`${currentGoal.id}-${currentQuestionIndex}`}
            className="w-full mx-auto px-4 font-pixel"
            style={{
                maxWidth: 'min(700px, 100%)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
        >
            {/* Main Pixel Container - Light Blue Theme */}
            <div className="relative pixel-borders bg-sky-600 border-4 border-sky-800 overflow-hidden min-h-[500px] flex flex-col shadow-2xl">
                
                {/* Retro Grid Background - Subtle White */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-40 pointer-events-none" />
                
                {/* Scanline Effect - Subtle */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 bg-[length:100%_4px] pointer-events-none z-10 opacity-20" />

                {/* Header Section (HUD) */}
                <div className="relative z-20 p-6 flex justify-between items-start">
                    <div className="text-white text-xs sm:text-sm tracking-widest drop-shadow-md">
                        <div className="mb-2 opacity-80 font-bold">LVL {currentGoalIndex + 1}-{currentQuestionIndex + 1}</div>
                        <div className="text-white font-bold">XP: {Math.floor(overallProgress * 10000)}</div>
                    </div>

                    {/* Timer Gauge - Orange/White */}
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 border-2 border-white/40 pixel-borders-sm">
                            <Timer className={`w-4 h-4 ${timeLeft <= 2 ? 'text-red-400 animate-bounce' : 'text-brand-orange'}`} />
                            <span className={`text-sm font-bold ${timeLeft <= 2 ? 'text-red-400' : 'text-white'}`}>
                                0{timeLeft}s
                            </span>
                        </div>
                        {/* Time Bar */}
                        <div className="w-24 h-2 bg-sky-900/30 border-2 border-sky-900/50 overflow-hidden">
                            <motion.div 
                                className={`h-full ${timeLeft <= 2 ? 'bg-red-500' : 'bg-brand-orange'}`}
                                initial={{ width: "100%" }}
                                animate={{ width: `${(timeLeft / 5) * 100}%` }}
                                transition={{ duration: 1, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Progress Bar (White Theme) */}
                <div className="relative z-20 px-6 mb-8">
                    <PixelProgressBar progress={overallProgress} />
                </div>

                {/* Main Content Area */}
                <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center">
                    
                    {/* Question Text */}
                    <motion.h2 
                        className="text-2xl sm:text-3xl lg:text-4xl text-white mb-8 leading-relaxed drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] uppercase tracking-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {currentQuestion.text.replace(/this (life )?goal/gi, `"${currentGoal.name}"`)}
                    </motion.h2>

                    <motion.p
                        className="text-sky-100 text-[10px] sm:text-xs mb-12 tracking-widest uppercase font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        CHOOSE YOUR PATH!
                    </motion.p>

                    {/* Pixel Buttons - Orange and White */}
                    <div className="flex justify-center gap-8 w-full max-w-md">
                        <PixelButton 
                            onClick={(e) => handleAnswer(true, e)} 
                            className="bg-brand-orange hover:bg-orange-600 text-white shadow-[0_4px_0_#bd5a00]"
                        >
                            YES
                        </PixelButton>
                        <PixelButton 
                            onClick={(e) => handleAnswer(false, e)} 
                            className="bg-white hover:bg-slate-100 !text-sky-900 shadow-[0_4px_0_#cbd5e1]"
                        >
                            NO
                        </PixelButton>
                    </div>
                </div>

                {/* Footer Lives */}
                <div className="relative z-20 p-4 flex justify-end gap-2 text-white">
                    {[0, 1, 2].map(idx => (
                        <Heart 
                            key={idx} 
                            className={`w-6 h-6 ${idx < 3 - currentQuestionIndex ? 'fill-white' : 'opacity-30'}`} 
                        />
                    ))}
                </div>
            </div>

            {/* Particle Effects */}
            {particles.map(particle => (
                <ParticleEffect
                    key={particle.id}
                    x={particle.x}
                    y={particle.y}
                    color={particle.color}
                    onComplete={() => {}}
                />
            ))}
        </motion.div>
    );
};

export default GoalAssessmentScreen;
