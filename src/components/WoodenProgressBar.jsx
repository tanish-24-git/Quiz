import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const WoodenProgressBar = ({ progress, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            {/* Wooden Border Container */}
            <div className="wood-texture wood-border rounded-full h-12 sm:h-14 p-1.5 relative overflow-hidden">
                {/* Inner Track (inset) */}
                <div className="wood-inset rounded-full h-full relative overflow-hidden">
                    {/* Progress Fill */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, var(--game-green) 0%, var(--game-cyan) 100%)',
                            boxShadow: '0 2px 8px rgba(126, 211, 33, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ 
                            duration: 0.6, 
                            ease: [0.43, 0.13, 0.23, 0.96] 
                        }}
                    >
                        {/* Shine effect */}
                        <div 
                            className="absolute inset-0 rounded-full opacity-40"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'wood-shine 2s linear infinite',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

WoodenProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default WoodenProgressBar;
