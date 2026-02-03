import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const WelcomeScreen = ({ onStart }) => {
    return (
        <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="text-center shadow-lg border-t-4 border-t-brand-blue">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                            className="p-4 bg-white rounded-full shadow-lg"
                        >
                            <img 
                                src="/bajaj_life.png" 
                                alt="Bajaj Life" 
                                className="w-20 h-auto"
                            />
                        </motion.div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Life Goals Preparedness
                    </CardTitle>
                    <CardDescription className="text-lg text-brand-blue font-medium">
                        How ready are you for your important life goals?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                        <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand-orange/20 text-brand-orange rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                Select your top 3 life goals
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand-orange/20 text-brand-orange rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                Answer 3 quick questions per goal
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand-orange/20 text-brand-orange rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                Get your preparedness score
                            </li>
                        </ul>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                        Takes less than 2 minutes!
                    </p>
                    <Button
                        variant="cta"
                        size="xl"
                        className="w-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                        onClick={onStart}
                    >
                        Start Game 🎯
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WelcomeScreen;
