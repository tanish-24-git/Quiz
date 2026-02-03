import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="progress-bar-container">
            <div className="progress-bar-wrapper">
                <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
            <span className="progress-text">{current}/{total}</span>
        </div>
    );
};

export default ProgressBar;
