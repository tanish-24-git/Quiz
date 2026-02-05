import { motion } from 'framer-motion';
import { Check, Phone } from "lucide-react";
import Confetti from './Confetti';

import PixelButton from './PixelButton';
import RotatingText from './RotatingText';

const ThankYouScreen = ({ userName = "User", onRestart }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full relative font-pixel overflow-hidden">
            <Confetti />

            <motion.div
                className="w-full h-full sm:h-auto sm:max-w-lg mx-auto relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Professional Themed Card - White Background with Thick Blue Border */}
                <div className="relative sm:pixel-borders bg-white border-4 border-[#0066B2] w-full h-full sm:h-auto sm:min-h-[600px] sm:shadow-[12px_12px_0_rgba(0,102,178,0.1)] overflow-hidden">

                    <div className="relative z-10 p-6 sm:p-8 text-center flex flex-col items-center">

                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            className="bg-green-50 p-2.5 rounded-full mb-6 border-2 border-green-100 shadow-sm"
                        >
                            <div className="bg-green-500 rounded-full p-2 relative shadow-inner">
                                <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={4} />
                            </div>
                        </motion.div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0066B2] mb-1 leading-tight uppercase font-pixel tracking-tight">
                            Thank You!
                        </h2>

                        <p className="text-slate-500 font-sans mb-6 text-sm sm:text-lg font-medium">
                            {userName}, details recorded safely.
                        </p>

                        {/* Expert Contact Section - Themed Box */}
                        <div className="w-full bg-sky-50/50 border-2 border-[#0066B2] p-4 mb-6 text-left flex gap-4 items-start shadow-sm shadow-sky-100">
                            <div className="bg-[#0066B2] p-2 flex-shrink-0 shadow-md border-2 border-white/20">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-[#0066B2] font-bold text-xs uppercase mb-0.5 tracking-wider font-pixel">
                                    Expert Incoming
                                </h3>
                                <p className="text-slate-600 font-sans text-xs leading-relaxed font-medium">
                                    Our strategist will contact you within 24 hours.
                                </p>
                            </div>
                        </div>

                        {/* Banner Section */}
                        <div className="mb-8 w-full flex flex-col items-center font-sans">
                            <div className="flex flex-wrap items-center justify-center gap-2 text-lg sm:text-xl font-bold text-slate-800">
                                <span>Buy our</span>
                                <div className="inline-block min-w-[70px]">
                                    <RotatingText
                                        texts={['ULIP', 'TERM', 'SAVING']}
                                        mainClassName="px-3 py-1 bg-[#FF6600] text-white shadow-md overflow-hidden relative font-pixel text-xs rounded-sm"
                                        staggerFrom={"last"}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-120%" }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden"
                                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                        rotationInterval={2000}
                                    />
                                </div>
                                <span className="text-[#0066B2]">Insurance</span>
                            </div>
                            <p className="text-slate-400 text-xs italic mt-2 font-pixel tracking-wide">
                                For a secure and better future
                            </p>
                        </div>

                        {/* Restart Button - 3D Orange Style */}
                        <PixelButton
                            onClick={onRestart}
                            className="w-full py-4 bg-[#FF6600] hover:bg-[#E65C00] text-white font-sans font-extrabold text-base sm:text-lg border-none shadow-[0_6px_0_#993D00] active:translate-y-[2px] active:shadow-[0_4px_0_#993D00] transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-4"
                        >
                            <span>►</span>
                            <span>Start New Quest</span>
                            <span>◄</span>
                        </PixelButton>

                        <p className="text-slate-400 font-sans text-[10px] mt-4 uppercase tracking-[0.2em] opacity-60 font-bold">
                            Try different life goals?
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ThankYouScreen;
