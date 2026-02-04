import { motion } from 'framer-motion';
import { Check, Phone } from "lucide-react";
import Confetti from './Confetti';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import RotatingText from './RotatingText';

const ThankYouScreen = ({ userName = "User", onRestart }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] relative p-4">
            <Confetti />

            <motion.div
                className="w-full max-w-lg mx-auto relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="shadow-2xl border-none bg-white dark:bg-slate-900 overflow-hidden">
                    <CardContent className="p-6 sm:p-10 text-center flex flex-col items-center">

                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6"
                        >
                            <div className="bg-green-500 rounded-full p-3 shadow-lg shadow-green-200 dark:shadow-green-900/50">
                                <Check className="w-10 h-10 text-white" strokeWidth={3} />
                            </div>
                        </motion.div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">
                            Thank You, {userName}! 🎉
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium">
                            Your details have been submitted successfully
                        </p>

                        {/* Expert Contact Section */}
                        <div className="w-full bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-5 mb-8 text-left flex gap-4 items-start shadow-sm">
                            <div className="bg-brand-blue p-2.5 rounded-lg flex-shrink-0 shadow-md">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-blue-900 dark:text-blue-100 font-bold text-lg mb-1">
                                    Our Expert Will Contact You
                                </h3>
                                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                                    We'll reach out within 24 hours to discuss your insurance needs.
                                </p>
                            </div>
                        </div>

                        {/* ULIP Banner */}
                        <div className="mb-8 w-full flex flex-col items-center">
                            <div className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-300">
                                <span>Buy our</span>
                                <RotatingText
                                    texts={['ULIP', 'TERM', 'SAVING']}
                                    mainClassName="px-3 py-1 bg-brand-blue text-white rounded shadow-md overflow-hidden relative"
                                    staggerFrom={"last"}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden"
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={2000}
                                />
                                <span>Insurance</span>
                            </div>
                            <p className="text-slate-400 dark:text-slate-500 text-sm italic mt-2">
                                For a secure and better future
                            </p>
                        </div>

                        {/* Restart Button */}
                        <Button
                            onClick={onRestart}
                            className="w-full bg-brand-orange hover:bg-orange-600 text-white text-lg py-6 rounded-lg font-bold shadow-lg shadow-orange-100 dark:shadow-none transition-all uppercase tracking-wide"
                        >
                            Take Quiz Again
                        </Button>

                        <p className="text-slate-400 text-xs mt-6 px-4">
                            Want to learn more? Retake the quiz to test your knowledge!
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default ThankYouScreen;
