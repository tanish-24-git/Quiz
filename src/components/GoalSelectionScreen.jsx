import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { lifeGoals } from '../data/lifeGoals';
import { 
    GraduationCap, Heart, Sunset, Home, Shield, 
    Rocket, Plane, TrendingUp, HeartPulse, Check 
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

const GoalSelectionScreen = ({ onProceed }) => {
    const [selectedGoals, setSelectedGoals] = useState([]);

    const toggleGoal = (goalId) => {
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
            className="w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="shadow-xl border-t-4 border-t-brand-blue">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Select Your Top 3 Life Goals
                    </CardTitle>
                    <CardDescription className="text-brand-blue font-medium">
                        Choose the goals most important to you
                    </CardDescription>
                    <div className="flex justify-center gap-2 mt-2">
                        {[1, 2, 3].map((num) => (
                            <div 
                                key={num}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                    selectedGoals.length >= num 
                                        ? 'bg-brand-orange text-white' 
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-3 mb-6">
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
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 text-center ${
                                        isSelected 
                                            ? 'border-brand-orange bg-orange-50 dark:bg-orange-900/20 shadow-lg scale-105' 
                                            : isDisabled 
                                                ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed' 
                                                : 'border-gray-200 dark:border-gray-700 hover:border-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div className={`p-3 rounded-full ${
                                        isSelected 
                                            ? 'bg-brand-orange text-white' 
                                            : 'bg-gray-100 dark:bg-gray-800 text-brand-blue'
                                    }`}>
                                        {IconComponent && <IconComponent className="w-6 h-6" />}
                                    </div>
                                    <span className={`text-xs font-medium leading-tight ${
                                        isSelected 
                                            ? 'text-brand-orange' 
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                        {goal.name}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                    
                    <Button
                        variant="cta"
                        size="xl"
                        className="w-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleProceed}
                        disabled={selectedGoals.length !== 3}
                    >
                        {selectedGoals.length === 3 
                            ? "Proceed to Assessment 🎯" 
                            : `Select ${3 - selectedGoals.length} more goal${3 - selectedGoals.length > 1 ? 's' : ''}`
                        }
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default GoalSelectionScreen;
