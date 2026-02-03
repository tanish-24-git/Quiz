import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { assessmentQuestions } from '../data/lifeGoals';
import WoodenProgressBar from './WoodenProgressBar';
import WoodenButton from './WoodenButton';
import ParticleEffect from './ParticleEffect';
import { 
    GraduationCap, Heart, Sunset, Home, Shield, 
    Rocket, Plane, TrendingUp, HeartPulse, 
    ThumbsUp, ThumbsDown 
} from "lucide-react";

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

const GoalAssessmentScreen = ({ 
    currentGoal, 
    currentGoalIndex, 
    currentQuestionIndex, 
    onAnswer,
    totalGoals = 3 
}) => {
    const [particles, setParticles] = useState([]);
    const IconComponent = iconMap[currentGoal.icon];
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const overallProgress = (currentGoalIndex * 3 + currentQuestionIndex + 1) / 9;

    const handleAnswer = (answer, event) => {
        // Create particle effect at click position
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const particleId = Date.now();
        const color = answer ? 'var(--game-green)' : 'var(--game-red)';
        
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
            className="w-full mx-auto px-4"
            style={{
                maxWidth: 'min(700px, 100%)',
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
                <CardHeader className="text-center pb-4" style={{ paddingTop: 'var(--space-lg)' }}>
                    {/* Progress Indicator with Wooden Bar */}
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                            <span>Goal {currentGoalIndex + 1} of {totalGoals}</span>
                            <span>Question {currentQuestionIndex + 1} of 3</span>
                        </div>
                        <WoodenProgressBar progress={overallProgress} />
                    </div>

                    {/* Current Goal Display */}
                    <motion.div 
                        className="flex flex-col items-center gap-4"
                        style={{ paddingTop: 'var(--space-md)' }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                        <motion.div 
                            className="p-5 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full shadow-xl relative"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {IconComponent && <IconComponent className="w-12 h-12 text-white" />}
                            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" 
                                style={{ animationDuration: '2s' }} 
                            />
                        </motion.div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-blue to-indigo-600 bg-clip-text text-transparent">
                            {currentGoal.name}
                        </CardTitle>
                    </motion.div>
                </CardHeader>

                <CardContent style={{ padding: 'var(--space-lg)' }}>
                    {/* Question */}
                    <motion.div 
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg relative overflow-hidden"
                        style={{ 
                            padding: 'var(--space-lg)',
                            marginBottom: 'var(--space-xl)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand-orange/20 to-transparent rounded-bl-full" />
                        
                        <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 text-center leading-relaxed relative z-10">
                            {currentQuestion.text}
                        </p>
                    </motion.div>

                    {/* Yes/No Wooden Buttons */}
                    <div 
                        className="grid grid-cols-2 gap-4 sm:gap-6"
                        style={{ marginBottom: 'var(--space-lg)' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <WoodenButton
                                onClick={(e) => handleAnswer(true, e)}
                                variant="yes"
                                icon={ThumbsUp}
                                className="w-full"
                            >
                                Yes
                            </WoodenButton>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <WoodenButton
                                onClick={(e) => handleAnswer(false, e)}
                                variant="no"
                                icon={ThumbsDown}
                                className="w-full"
                            >
                                No
                            </WoodenButton>
                        </motion.div>
                    </div>

                    {/* Goal Dots Indicator */}
                    <div className="flex justify-center gap-3 mt-6">
                        {[0, 1, 2].map((idx) => (
                            <motion.div 
                                key={idx}
                                className={`rounded-full transition-all duration-300 ${
                                    idx < currentGoalIndex 
                                        ? 'bg-green-500 w-3 h-3' 
                                        : idx === currentGoalIndex 
                                            ? 'bg-brand-orange w-8 h-3' 
                                            : 'bg-gray-300 dark:bg-gray-600 w-3 h-3'
                                }`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

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
