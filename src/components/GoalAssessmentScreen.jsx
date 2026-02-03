import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { assessmentQuestions } from '../data/lifeGoals';
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
    const IconComponent = iconMap[currentGoal.icon];
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const overallProgress = (currentGoalIndex * 3 + currentQuestionIndex + 1) / 9;

    return (
        <motion.div
            key={`${currentGoal.id}-${currentQuestionIndex}`}
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="shadow-xl border-t-4 border-t-brand-blue">
                <CardHeader className="text-center pb-2">
                    {/* Progress Indicator */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Goal {currentGoalIndex + 1} of {totalGoals}</span>
                            <span>Question {currentQuestionIndex + 1} of 3</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-brand-blue to-brand-orange"
                                initial={{ width: 0 }}
                                animate={{ width: `${overallProgress * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Current Goal Display */}
                    <motion.div 
                        className="flex flex-col items-center gap-3 py-4"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                    >
                        <div className="p-4 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full shadow-lg">
                            {IconComponent && <IconComponent className="w-10 h-10 text-white" />}
                        </div>
                        <CardTitle className="text-xl font-bold text-brand-blue">
                            {currentGoal.name}
                        </CardTitle>
                    </motion.div>
                </CardHeader>

                <CardContent className="pt-4">
                    {/* Question */}
                    <motion.div 
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
                            {currentQuestion.text}
                        </p>
                    </motion.div>

                    {/* Yes/No Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                onClick={() => onAnswer(true)}
                                className="w-full h-20 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all"
                            >
                                <ThumbsUp className="w-7 h-7" />
                                Yes
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                onClick={() => onAnswer(false)}
                                className="w-full h-20 text-xl font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all"
                            >
                                <ThumbsDown className="w-7 h-7" />
                                No
                            </Button>
                        </motion.div>
                    </div>

                    {/* Goal Dots */}
                    <div className="flex justify-center gap-3 mt-6">
                        {[0, 1, 2].map((idx) => (
                            <div 
                                key={idx}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    idx < currentGoalIndex 
                                        ? 'bg-green-500' 
                                        : idx === currentGoalIndex 
                                            ? 'bg-brand-orange w-6' 
                                            : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default GoalAssessmentScreen;
