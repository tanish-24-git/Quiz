import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';

const WoodenButton = ({ 
    children, 
    onClick, 
    variant = 'neutral', // 'yes', 'no', 'neutral'
    className = '',
    icon: Icon,
    disabled = false 
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const getVariantStyles = () => {
        switch (variant) {
            case 'yes':
                return {
                    fill: 'linear-gradient(135deg, var(--game-green) 0%, var(--game-green-dark) 100%)',
                    shadow: '0 4px 12px rgba(126, 211, 33, 0.4)',
                    glow: '0 0 20px rgba(126, 211, 33, 0.6)',
                };
            case 'no':
                return {
                    fill: 'linear-gradient(135deg, var(--game-red) 0%, #c0392b 100%)',
                    shadow: '0 4px 12px rgba(231, 76, 60, 0.4)',
                    glow: '0 0 20px rgba(231, 76, 60, 0.6)',
                };
            default:
                return {
                    fill: 'linear-gradient(135deg, var(--wood-light) 0%, var(--wood-md) 100%)',
                    shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    glow: '0 0 20px rgba(166, 138, 100, 0.4)',
                };
        }
    };

    const handleClick = (e) => {
        if (disabled) return;
        
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
        
        if (onClick) {
            onClick(e);
        }
    };

    const styles = getVariantStyles();

    return (
        <motion.button
            onClick={handleClick}
            className={`relative wood-border rounded-2xl overflow-hidden ${className} ${
                isClicked ? 'game-shake' : ''
            }`}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            style={{
                boxShadow: styles.shadow,
            }}
        >
            {/* Wooden Border Effect */}
            <div className="wood-texture absolute inset-0 -z-10" />
            
            {/* Inner Button Fill */}
            <div 
                className="relative px-6 py-4 sm:px-8 sm:py-5 rounded-xl m-1"
                style={{
                    background: styles.fill,
                    boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
                }}
            >
                {/* Content */}
                <div className="flex items-center justify-center gap-3 relative z-10">
                    {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md" />}
                    <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                        {children}
                    </span>
                </div>

                {/* Shine overlay */}
                <div 
                    className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    }}
                />
            </div>

            {/* Click ripple effect */}
            {isClicked && (
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        boxShadow: styles.glow,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.4 }}
                />
            )}
        </motion.button>
    );
};

WoodenButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['yes', 'no', 'neutral']),
    className: PropTypes.string,
    icon: PropTypes.elementType,
    disabled: PropTypes.bool,
};

export default WoodenButton;
