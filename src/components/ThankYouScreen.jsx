import { motion } from 'framer-motion';
import { Check, Phone } from "lucide-react";
import Confetti from './Confetti';

import PixelButton from './PixelButton';
import RotatingText from './RotatingText';

const ThankYouScreen = ({ userName = "User", onRestart }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen relative p-4 font-pixel py-4">
            <Confetti />

            <motion.div
                className="w-full max-w-lg mx-auto relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Pixel Card Container - Golden Ratio Style */}
                <div className="relative pixel-borders bg-white border-4 border-slate-200 w-full min-h-[100dvh] sm:min-h-[600px] max-h-screen overflow-y-auto shadow-2xl">
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 pixel-grid-bg-light opacity-10 pointer-events-none" />

                    <div className="relative z-10 p-4 sm:p-6 text-center flex flex-col items-center">

                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            className="bg-green-100 p-2.5 rounded-full mb-4 pixel-borders-sm border-2 border-green-200"
                        >
                            <div className="bg-green-500 rounded-full p-1.5 relative">
                                <Check className="w-5 h-5 sm:w-7 sm:h-7 text-white" strokeWidth={4} />
                            </div>
                        </motion.div>

                        <h2 className="text-lg sm:text-2xl font-bold text-sky-900 mb-1 leading-tight uppercase font-pixel tracking-wide">
                            Thank You!
                        </h2>

                        <p className="text-slate-500 font-sans mb-4 text-[10px] sm:text-base font-medium">
                            {userName}, details recorded safely.
                        </p>

                        {/* Expert Contact Section - Pixel Style */}
                        <div className="w-full bg-blue-50 border-2 border-blue-100 p-3 mb-4 text-left flex gap-3 items-start shadow-[4px_4px_0_rgba(0,0,0,0.05)] pixel-borders-sm">
                            <div className="bg-brand-blue p-1.5 flex-shrink-0 shadow-sm border-2 border-blue-800">
                                <Phone className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sky-900 font-bold text-[10px] uppercase mb-0.5 tracking-wider">
                                    Expert Incoming
                                </h3>
                                <p className="text-sky-700 font-sans text-[9px] leading-relaxed">
                                    Our strategist will contact you within 24 hours.
                                </p>
                            </div>
                        </div>

                        {/* ULIP Banner */}
                        <div className="mb-4 w-full flex flex-col items-center font-sans">
                            <div className="flex flex-wrap items-center justify-center gap-1.5 text-base font-bold text-slate-700">
                                <span>Buy our</span>
                                <RotatingText
                                    texts={['ULIP', 'TERM', 'SAVING']}
                                    mainClassName="px-2 py-0.5 bg-brand-blue text-white rounded shadow-md overflow-hidden relative font-pixel text-[10px]"
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
                            <p className="text-slate-400 text-[9px] italic mt-0.5">
                                For a secure and better future
                            </p>
                        </div>

                        {/* Restart Button */}
                        <PixelButton
                            onClick={onRestart}
                            className="w-full bg-brand-orange hover:bg-orange-600 text-white text-sm py-4 font-bold shadow-[0_4px_0_#cc5500] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-widest border-none font-pixel rounded-none"
                        >
                            Start New Quest
                        </PixelButton>

                        <p className="text-slate-400 font-sans text-[8px] mt-2 uppercase tracking-widest opacity-60">
                            Try different life goals?
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ThankYouScreen;
