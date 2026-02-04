import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { assessmentQuestions } from '../data/lifeGoals';
import PixelProgressBar from './PixelProgressBar';
import PixelButton from './PixelButton';
import ParticleEffect from './ParticleEffect';

const GoalAssessmentScreen = ({
    currentGoal,
    currentGoalIndex,
    currentQuestionIndex,
    onAnswer,
    score,
    lives
}) => {
    const [particles, setParticles] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isAnswering, setIsAnswering] = useState(false);
    const [flash, setFlash] = useState(null); // 'correct' or 'incorrect'
    const timerRef = useRef(null);

    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    if (!currentQuestion || !currentGoal) return null;

    const overallProgress = (currentGoalIndex * 3 + currentQuestionIndex + 1) / 9;

    // Timer Logic
    useEffect(() => {
        // Reset answering state on new question
        setIsAnswering(false);
        setTimeLeft(30);

        const timerCallback = () => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    return 0;
                }
                return prev - 1;
            });
        };

        timerRef.current = setInterval(timerCallback, 1000);

        return () => clearInterval(timerRef.current);
    }, [currentGoalIndex, currentQuestionIndex]);

    // Handle Time Out
    useEffect(() => {
        if (timeLeft === 0 && !isAnswering) {
            clearInterval(timerRef.current);
            setIsAnswering(true);
            onAnswer(false);
        }
    }, [timeLeft, onAnswer, isAnswering]);

    const handleAnswer = (answer, event) => {
        if (isAnswering) return;
        setIsAnswering(true);
        clearInterval(timerRef.current);

        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const particleId = Date.now();
        // Use Orange for No, White for Yes (Inverted per request)
        const color = answer ? '#ffffff' : '#ff7900';

        setParticles(prev => [...prev, { id: particleId, x, y, color }]);

        // Trigger Flash
        setFlash(answer ? 'correct' : 'incorrect');
        setTimeout(() => setFlash(null), 400);

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
            className="w-full h-full flex flex-col items-center justify-center font-pixel sm:p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
        >
            {/* Main Pixel Container - Full Screen Mobile, Centered Card Desktop */}
            <div className="relative pixel-borders bg-sky-600 border-4 border-sky-800 w-full h-full sm:h-auto sm:max-w-[700px] sm:min-h-[600px] flex flex-col shadow-2xl transition-all duration-300 overflow-hidden">

                {/* Retro Grid Background - Subtle White */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-30 pointer-events-none" />

                {/* Scanline Effect - Subtle */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 bg-[length:100%_4px] pointer-events-none z-10 opacity-10" />

                {/* Feedback Flash Overlay */}
                <AnimatePresence>
                    {flash && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 z-50 pointer-events-none ${flash === 'correct' ? 'bg-green-400' : 'bg-red-500'}`}
                        />
                    )}
                </AnimatePresence>

                {/* --- HEADER SECTION (~15%) --- */}
                <div className="relative z-20 p-3 sm:p-4 grid grid-cols-3 items-center">
                    {/* Left Side - Level */}
                    <div className="text-white text-left">
                        <motion.div
                            className="font-bold text-[10px] sm:text-xs text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            LVL {currentGoalIndex + 1}-{currentQuestionIndex + 1}
                        </motion.div>
                    </div>

                    {/* Center - Goal Name */}
                    <div className="flex justify-center w-full">
                        <motion.div
                            className="text-brand-orange font-bold uppercase text-[10px] sm:text-sm tracking-widest text-center leading-tight"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <span
                                className="relative inline-block px-3 py-1 bg-white"
                                style={{
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                {currentGoal.name}
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Side - Timer Bar (no numbers) */}
                    <div className="flex flex-col items-end gap-1.5">
                        <div className="w-16 sm:w-24 h-2.5 sm:h-3.5 bg-sky-900/30 border-2 border-sky-900/50 overflow-hidden">
                            <motion.div
                                className={`h-full ${timeLeft <= 5 ? 'bg-red-500' : 'bg-brand-orange'}`}
                                initial={{ width: "100%" }}
                                animate={{ width: `${(timeLeft / 30) * 100}%` }}
                                transition={{ duration: 1, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative z-20 px-3 sm:px-4 mb-1">
                    <PixelProgressBar progress={overallProgress} />
                </div>

                {/* --- CORE CONTENT AREA (~60%) --- */}
                <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                    <div className="space-y-3 sm:space-y-4 max-w-[90%]">
                        {/* Question Text - Scaled for screens */}
                        <motion.h2
                            className="text-base sm:text-xl md:text-2xl text-white leading-relaxed drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] uppercase tracking-tight"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {currentQuestion.text.replace(/this (life )?goal/gi, `"${currentGoal.name}"`)}
                        </motion.h2>

                        <motion.p
                            className="text-sky-100 text-[6px] sm:text-[8px] tracking-widest uppercase font-bold opacity-80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            CHOOSE YOUR PATH!
                        </motion.p>
                    </div>
                </div>

                {/* --- ACTIONS SECTION (~25%) --- */}
                <div className="relative z-20 p-3 sm:p-6 flex flex-col items-center gap-4 sm:gap-6">
                    {/* Pixel Buttons - Responsive Gap */}
                    <div className="flex justify-center gap-4 sm:gap-6 w-full max-w-sm">
                        <PixelButton
                            onClick={(e) => handleAnswer(true, e)}
                            className="bg-white !text-brand-orange hover:bg-brand-orange hover:!text-white shadow-[0_4px_0_#cbd5e1] hover:shadow-[0_4px_0_#bd5a00] text-sm sm:text-base py-2.5 sm:py-3.5 transition-all duration-200"
                        >
                            YES
                        </PixelButton>
                        <PixelButton
                            onClick={(e) => handleAnswer(false, e)}
                            className="bg-white !text-brand-orange hover:bg-brand-orange hover:!text-white shadow-[0_4px_0_#cbd5e1] hover:shadow-[0_4px_0_#bd5a00] text-sm sm:text-base py-2.5 sm:py-3.5 transition-all duration-200"
                        >
                            NO
                        </PixelButton>
                    </div>
                </div>
            </div>

            {/* Particle Effects */}
            {particles.map(particle => (
                <ParticleEffect
                    key={particle.id}
                    x={particle.x}
                    y={particle.y}
                    color={particle.color}
                    onComplete={() => { }}
                />
            ))}
        </motion.div>
    );
};

export default GoalAssessmentScreen;
