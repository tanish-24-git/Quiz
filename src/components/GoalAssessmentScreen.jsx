import { motion } from 'framer-motion';
import { useState } from 'react';
import { assessmentQuestions } from '../data/lifeGoals';
import PixelProgressBar from './PixelProgressBar';
import PixelButton from './PixelButton';
import ParticleEffect from './ParticleEffect';
import { Heart } from "lucide-react";

const GoalAssessmentScreen = ({ 
    currentGoal, 
    currentGoalIndex, 
    currentQuestionIndex, 
    onAnswer,
    totalGoals = 3 
}) => {
    const [particles, setParticles] = useState([]);
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const overallProgress = (currentGoalIndex * 3 + currentQuestionIndex + 1) / 9;

    const handleAnswer = (answer, event) => {
        // Create particle effect at click position
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const particleId = Date.now();
        const color = answer ? '#4ade80' : '#f87171'; // Green/Red consistent with pixel theme
        
        setParticles(prev => [...prev, { id: particleId, x, y, color }]);
        
        // Remove particle after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== particleId));
        }, 800);
        
        // Call parent handler with slight delay for effect
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
            {/* Pixel Card Container */}
            <div className="relative pixel-borders bg-sky-500 border-4 border-sky-700 overflow-hidden min-h-[500px] flex flex-col">
                
                {/* Retro Grid Background */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-100 pointer-events-none" />
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 bg-[length:100%_4px] pointer-events-none z-10 opacity-20" />

                {/* Header Section (HUD) */}
                <div className="relative z-20 p-6 flex justify-between items-start">
                    <div className="text-yellow-400 text-xs sm:text-sm tracking-widest animate-pulse">
                        <div className="mb-2">LEVEL {currentGoalIndex + 1}-{currentQuestionIndex + 1}</div>
                        <div className="text-white drop-shadow-md">SCORE: {Math.floor(overallProgress * 10000)}</div>
                    </div>
                </div>

                {/* Progress Bar (Blue Theme) */}
                <div className="relative z-20 px-6 mb-8">
                    <PixelProgressBar progress={overallProgress} />
                </div>

                {/* Main Content Area */}
                <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center">
                    
                    {/* Question Text (Large Pixel Font) */}
                    <motion.h2 
                        className="text-2xl sm:text-3xl md:text-4xl text-white mb-8 leading-relaxed drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {currentQuestion.text.replace(/this (life )?goal/gi, `"${currentGoal.name}"`)}
                    </motion.h2>

                    {/* Subtext (like "ARE YOU READY?") */}
                    <motion.p
                        className="text-blue-300 text-xs sm:text-sm mb-12 tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        SELECT OPTION
                    </motion.p>

                    {/* Pixel Buttons */}
                    <div className="flex justify-center gap-8 w-full max-w-md">
                        <PixelButton 
                            onClick={(e) => handleAnswer(true, e)} 
                            variant="yes"
                        >
                            YES
                        </PixelButton>
                        <PixelButton 
                            onClick={(e) => handleAnswer(false, e)} 
                            variant="no"
                        >
                            NO
                        </PixelButton>
                    </div>
                </div>

                {/* Footer Lives/Hearts */}
                <div className="relative z-20 p-4 flex justify-end gap-2 text-red-500">
                    {[0, 1, 2].map(idx => (
                        <Heart 
                            key={idx} 
                            className={`w-6 h-6 ${idx < 3 - currentQuestionIndex ? 'fill-current' : 'opacity-30'}`} 
                            style={{ filter: `drop-shadow(2px 2px 0 rgba(0,0,0,0.5))` }}
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
