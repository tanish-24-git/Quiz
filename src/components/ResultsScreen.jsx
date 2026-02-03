import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trophy, RotateCcw, MessageCircle } from "lucide-react";
import ScoreCard from './ScoreCard';
import Confetti from './Confetti';

const ResultsScreen = ({ score, total, onRestart, onTalkToExpert }) => {
    const percentage = (score / total) * 100;

    const getMotivationalMessage = (pct) => {
        if (pct === 100) return "Outstanding! You're a GST Expert! 🏆";
        if (pct >= 80) return "Great job! You know your stuff! 🌟";
        if (pct >= 60) return "Good effort! You're getting there! 👍";
        return "Keep learning! Knowledge is power! 📚";
    };

    return (
        <motion.div
            className="w-full max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {percentage >= 80 && <Confetti />}

            <div className="mb-8 flex justify-center">
                <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                    className="p-4 bg-yellow-50 rounded-full shadow-inner"
                >
                    <Trophy className="w-16 h-16 text-yellow-500" />
                </motion.div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-500 mb-8">{getMotivationalMessage(percentage)}</p>

            <ScoreCard score={score} total={total} percentage={percentage} />

            <Card className="bg-orange-50 border-brand-orange/30 mb-8">
                <CardContent className="p-4 flex items-center gap-4 text-left">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Have questions about GST?</h4>
                        <p className="text-sm text-gray-600">Our experts can clarify your doubts instantly.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-3">
                <Button
                    variant="cta"
                    size="lg"
                    className="w-full text-lg shadow-lg"
                    onClick={onTalkToExpert}
                >
                    Yes, Talk to Our Expert 💬
                </Button>

                <Button
                    variant="ghost"
                    className="w-full text-brand-blue hover:bg-blue-50"
                    onClick={onRestart}
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                </Button>
            </div>
        </motion.div>
    );
};

export default ResultsScreen;
