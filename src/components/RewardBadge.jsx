import { motion } from 'framer-motion';
import { Target, Star, Award, ShieldCheck, TrendingUp } from "lucide-react";

const RewardBadge = ({ scorePercentage }) => {
    const isHighHeader = scorePercentage >= 80;
    const isMidHeader = scorePercentage >= 50;

    const badgeVariants = {
        hidden: { scale: 0, rotate: -180, opacity: 0 },
        visible: { 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
            transition: { 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.5
            }
        },
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: 2,
                ease: "easeInOut"
            }
        }
    };

    const glowVariants = {
        animate: {
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1],
            transition: {
                duration: 3,
                repeat: 1,
                ease: "linear"
            }
        }
    };

    const starVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 1 + (i * 0.1),
                type: "spring"
            }
        })
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* Background Glow */}
            <motion.div 
                variants={glowVariants}
                animate="animate"
                className={`absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-2xl ${
                    isHighHeader ? 'bg-yellow-400' : isMidHeader ? 'bg-blue-400' : 'bg-orange-400'
                }`}
            />

            {/* Main Badge */}
            <motion.div
                variants={badgeVariants}
                initial="hidden"
                animate={["visible", "pulse"]}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl z-10 border-4 ${
                    isHighHeader 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-200' 
                        : isMidHeader 
                            ? 'bg-gradient-to-br from-blue-400 to-indigo-600 border-blue-200'
                            : 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-200'
                }`}
            >
                {isHighHeader ? (
                    <Award className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                ) : isMidHeader ? (
                    <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                ) : (
                    <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                )}
                
                {/* Floating Particles/Stars */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={starVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute"
                        style={{
                            top: `${Math.sin(i * 1.2) * 50 + 50}%`,
                            left: `${Math.cos(i * 1.2) * 50 + 50}%`,
                        }}
                    >
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 fill-yellow-300" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Title / Reward Type */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-3 sm:mt-4 text-center px-2"
            >
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/80">
                    Reward Unlocked
                </div>
                <div className="text-base sm:text-xl font-black text-white drop-shadow-md">
                    {isHighHeader ? 'Goal Master Platinum' : isMidHeader ? 'Goal Planner Gold' : 'Goal Starter Silver'}
                </div>
            </motion.div>
        </div>
    );
};

export default RewardBadge;
