import { motion } from 'framer-motion';
import { Star } from "lucide-react";

/**
 * RetroReward Component
 * Displays a "Clash of Clans" style victory screen with:
 * - Spinning sunburst background
 * - 3-Star scoring animation
 * - Pixelated Victory Banner
 */
const RetroReward = ({ scorePercentage }) => {
    // Determine stars based on percentage
    const stars = scorePercentage >= 80 ? 3 : scorePercentage >= 50 ? 2 : 1;

    // Variants for animations
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.5 }
        }
    };

    const starVariants = {
        hidden: { scale: 0, opacity: 0, rotate: -180 },
        visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }
    };

    const bannerVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 200 }
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center p-8 font-pixel overflow-visible">

            {/* 1. Spinning Sunburst Background (Rays) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden">
                <div
                    className="w-[500px] h-[500px] opacity-30"
                    style={{ animation: 'spin 10s linear infinite' }}
                >
                    {/* Creating rays using conic gradient */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'repeating-conic-gradient(from 0deg, var(--pixel-gold) 0deg 15deg, transparent 15deg 30deg)',
                        filter: 'blur(2px)',
                    }} />
                </div>
            </div>

            {/* 2. Victory Banner */}
            <motion.div
                variants={bannerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 mb-8"
            >
                <div className="bg-gradient-to-b from-yellow-400 to-orange-600 px-8 py-4 border-4 border-white shadow-[0_8px_0_rgba(0,0,0,0.5)] transform -skew-x-6">
                    <h2 className="text-2xl sm:text-4xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase tracking-widest skew-x-6">
                        {scorePercentage >= 50 ? 'VICTORY!' : 'COMPLETE!'}
                    </h2>
                </div>
            </motion.div>

            {/* 3. Star Container */}
            <motion.div
                className="relative z-10 flex gap-4 sm:gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {[1, 2, 3].map((starIndex) => (
                    <div key={starIndex} className="relative w-12 h-12 sm:w-16 sm:h-16">
                        {/* Empty Star Placeholder */}
                        <Star className="w-12 h-12 sm:w-16 sm:h-16 text-slate-700 opacity-50 absolute inset-0" strokeWidth={3} />

                        {/* Fill Star Animation */}
                        {starIndex <= stars && (
                            <motion.div variants={starVariants}>
                                <Star
                                    className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 fill-yellow-400 drop-shadow-[0_4px_0_rgba(180,83,9,1)]"
                                    strokeWidth={3}
                                />
                                {/* Sparkle Effect on Star */}
                                <motion.div
                                    className="absolute inset-0 z-20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-ping" />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </motion.div>

            {/* 4. Score Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="relative z-10 bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-white/20"
            >
                <div className="text-white text-sm sm:text-base">
                    SCORE: <span className="text-yellow-400">{Math.floor(scorePercentage * 10)}</span>
                </div>
            </motion.div>

        </div>
    );
};

export default RetroReward;
