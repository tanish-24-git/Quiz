import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ParticleEffect = ({ x, y, color = 'var(--game-green)', count = 12, onComplete }) => {
    const [particles] = useState(() => 
        Array.from({ length: count }, (_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            return {
                id: i,
                tx: Math.cos(angle) * velocity,
                ty: Math.sin(angle) * velocity,
                size: 4 + Math.random() * 6,
                delay: Math.random() * 0.1,
            };
        })
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 800);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div 
            className="fixed pointer-events-none z-50"
            style={{ left: x, top: y }}
        >
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: color,
                        left: -particle.size / 2,
                        top: -particle.size / 2,
                        boxShadow: `0 0 8px ${color}`,
                    }}
                    initial={{ 
                        x: 0, 
                        y: 0, 
                        scale: 1,
                        opacity: 1,
                    }}
                    animate={{ 
                        x: particle.tx, 
                        y: particle.ty, 
                        scale: 0,
                        opacity: 0,
                    }}
                    transition={{ 
                        duration: 0.6,
                        delay: particle.delay,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
};

ParticleEffect.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string,
    count: PropTypes.number,
    onComplete: PropTypes.func,
};

export default ParticleEffect;
