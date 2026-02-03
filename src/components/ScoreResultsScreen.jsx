import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Phone, Calendar, TrendingUp, MessageCircle, Sparkles } from "lucide-react";
import Confetti from './Confetti';
import RewardBadge from './RewardBadge';

const ScoreResultsScreen = ({ 
    score, 
    selectedGoals, 
    onCallNow, 
    onBookSlot,
    onTalkToExpert 
}) => {
    const percentage = Math.round((score / 9) * 100);
    
    const getScoreColor = () => {
        if (percentage >= 80) return 'text-yellow-400';
        if (percentage >= 50) return 'text-blue-200';
        return 'text-orange-200';
    };

    const getScoreMessage = () => {
        if (percentage >= 80) {
            return "Outstanding achievement! Your financial future looks brilliant! 🌟";
        }
        if (percentage >= 50) {
            return "Impressive progress! You're on the right path to your dreams! 💪";
        }
        return "Great start! Every journey begins with a single step. Let's grow! 🎯";
    };

    return (
        <motion.div
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Confetti />

            <Card className="shadow-2xl border-0 overflow-hidden relative">
                {/* Shine Effect Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -skew-x-12 z-20 pointer-events-none"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />

                {/* Celebration Header */}
                <div className="bg-gradient-to-br from-brand-blue via-blue-700 to-indigo-900 p-4 sm:p-8 text-center text-white relative overflow-hidden">
                    {/* Animated Background Icons */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                animate={{ 
                                    y: [0, -20, 0],
                                    rotate: [0, 360],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ 
                                    duration: 5 + i, 
                                    repeat: Infinity, 
                                    delay: i * 0.5 
                                }}
                                style={{
                                    top: `${Math.random() * 80}%`,
                                    left: `${Math.random() * 90}%`
                                }}
                            >
                                <Sparkles className="w-12 h-12" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative z-10">
                        <RewardBadge scorePercentage={percentage} />
                        
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", delay: 1.5 }}
                            className="mt-4 sm:mt-6 inline-block bg-white/10 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-2 sm:py-3 border border-white/20"
                        >
                            <span className="block text-xs uppercase tracking-widest opacity-70 mb-1">
                                Your Preparedness Score
                            </span>
                            <span className={`text-3xl sm:text-5xl font-black ${getScoreColor()}`}>
                                {percentage}%
                            </span>
                        </motion.div>
                    </div>
                </div>

                <CardContent className="p-4 sm:p-6 relative z-10 bg-white dark:bg-gray-950">
                    {/* Score Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="text-center mb-4 sm:mb-8"
                    >
                        <p className="text-base sm:text-xl text-gray-800 dark:text-gray-100 font-bold leading-tight">
                            {getScoreMessage()}
                        </p>
                    </motion.div>

                    {/* Selected Goals Summary */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 mb-6 border border-gray-100 dark:border-gray-800"
                    >
                        <p className="text-xs uppercase font-bold text-gray-400 mb-3 tracking-wider">Your Priorities:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedGoals.map((goal, i) => (
                                <motion.span 
                                    key={goal.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 2.2 + (i * 0.1) }}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 text-brand-blue dark:text-blue-300 rounded-xl text-sm font-bold shadow-sm border border-blue-50 dark:border-blue-900/30"
                                >
                                    {goal.name}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        className="space-y-4"
                    >
                        <Button
                            onClick={onTalkToExpert}
                            className="w-full h-14 sm:h-16 text-base sm:text-xl font-black bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white rounded-2xl shadow-xl shadow-orange-200 dark:shadow-orange-950/20 flex items-center justify-center gap-2 sm:gap-3 transform transition hover:scale-[1.02] active:scale-95"
                        >
                            <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7" />
                            <span className="text-sm sm:text-xl">Claim My Free Plan 🎁</span>
                        </Button>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <Button
                                onClick={onCallNow}
                                variant="outline"
                                className="h-12 sm:h-14 font-bold border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-xl flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                            >
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Call Now</span>
                                <span className="sm:hidden">Call</span>
                            </Button>
                            
                            <Button
                                onClick={onBookSlot}
                                variant="outline"
                                className="h-12 sm:h-14 font-bold border-2 border-brand-blue text-brand-blue hover:bg-blue-50 rounded-xl flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                            >
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Book Slot</span>
                                <span className="sm:hidden">Book</span>
                            </Button>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ScoreResultsScreen;

