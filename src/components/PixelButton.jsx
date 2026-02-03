import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';

const PixelButton = ({ 
    children, 
    onClick, 
    variant = 'neutral', // 'yes', 'no', 'neutral'
    className = '',
    disabled = false 
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const getVariantStyles = () => {
        switch (variant) {
            case 'yes':
                return 'text-green-400 hover:text-green-300';
            case 'no':
                return 'text-red-400 hover:text-red-300';
            default:
                return 'text-white hover:text-brand-orange';
        }
    };

    const handleClick = (e) => {
        if (disabled) return;
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 150);
        if (onClick) onClick(e);
    };

    return (
        <motion.button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative group font-pixel text-lg sm:text-xl md:text-2xl 
                flex items-center justify-center gap-4 py-4 px-6 w-full
                transition-colors duration-200 outline-none
                ${getVariantStyles()} ${className}
            `}
            disabled={disabled}
            animate={{ scale: isPressed ? 0.95 : 1 }}
        >
            {/* Retro Arrow Indicator */}
            <span className={`
                inline-block transform transition-opacity duration-200
                ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
                ►
            </span>

            <span className="relative z-10 text-shadow-sm uppercase tracking-widest">
                {children}
            </span>

            {/* Right Arrow (for symmetry if needed, or visual balance) */}
            <span className={`
                inline-block transform transition-opacity duration-200
                ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
                ◄
            </span>
            
            {/* Scanline/Grid effect overlay (optional, subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-repeat bg-[length:4px_4px] 
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)' }}" 
            />
        </motion.button>
    );
};

PixelButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['yes', 'no', 'neutral']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default PixelButton;
