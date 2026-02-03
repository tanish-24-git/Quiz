import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from 'react';

const FeedbackScreen = ({ isCorrect, explanation, onNext }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onNext();
        }, 1000); // Auto-advance after 1 second
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="absolute inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                className="w-full max-w-md"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
            >
                <Card className={`border-l-8 shadow-2xl ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                    <CardContent className="p-6 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mb-4 inline-block"
                        >
                            {isCorrect ? (
                                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                            ) : (
                                <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                            )}
                        </motion.div>

                        <h3 className={`text-2xl font-bold mb-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrect ? 'Correct! Great job!' : "Not quite! But here's the truth..."}
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            {explanation}
                        </p>

                        <div className="mt-6 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gray-400"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, ease: "linear" }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default FeedbackScreen;
