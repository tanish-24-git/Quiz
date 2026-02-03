import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PixelProgressBar = ({ progress, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            {/* Pixel Border Container */}
            <div className="bg-slate-800 p-1 relative pixel-borders-sm">
                {/* Inner Track */}
                <div className="bg-slate-900 h-6 sm:h-8 relative w-full">
                    {/* Progress Fill - Blue Theme */}
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-brand-blue"
                        style={{
                            boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.3)',
                            imageRendering: 'pixelated'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ 
                            duration: 0.6, 
                            ease: 'steps(10)' 
                        }}
                    >
                        {/* Pixel Shine Effect */}
                        <div 
                            className="absolute top-1 right-1 w-2 h-1 bg-white opacity-40"
                        />
                         <div 
                            className="absolute bottom-1 right-2 w-1 h-1 bg-black opacity-20"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

PixelProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default PixelProgressBar;
