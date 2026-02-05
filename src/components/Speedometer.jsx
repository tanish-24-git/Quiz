import { motion } from "framer-motion";

const Speedometer = ({ score }) => {
  // Ensure score is between 0 and 100
  const clampedScore = Math.min(Math.max(score, 0), 100);
  
  // Calculate rotation: 
  // -90deg is 0% (left)
  // 90deg is 100% (right)
  // Range is 180 degrees
  const rotation = (clampedScore / 100) * 180 - 90;

  return (
    <div className="relative w-48 h-24 mx-auto mb-6 overflow-hidden">
        {/* Gauge Background (Semi-circle) */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-white/20 border-b-0" style={{ clipPath: "bg-white inset(0 0 50% 0)" }}></div>
        
        {/* Gradient Arc (Using mask or conic gradient) */}
         <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-transparent border-t-0"
             style={{
                 background: "conic-gradient(from 180deg, #ef4444 0deg, #eab308 90deg, #22c55e 180deg)",
                 WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 12px), black calc(100% - 12px))",
                 mask: "radial-gradient(farthest-side, transparent calc(100% - 12px), black calc(100% - 12px))",
                 clipPath: "inset(0 0 50% 0)"
             }}
         ></div>

        {/* Needle Container (Rotates) */}
        <motion.div 
            className="absolute bottom-0 left-1/2 w-0 h-0"
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 }}
            style={{ transformOrigin: "bottom center" }}
        >
            {/* The Needle itself */}
            <div className="absolute bottom-0 -left-1 w-2 h-20 bg-white rounded-[50%_50%_0_0] -translate-x-1/2 origin-bottom shadow-lg"></div>
            {/* Needle Center Cap */}
            <div className="absolute -bottom-2 -left-3 w-6 h-6 bg-white rounded-full shadow-md border-2 border-blue-600"></div>
        </motion.div>

        {/* Labels */}
        <div className="absolute bottom-1 left-2 text-[10px] font-bold text-white/60">0</div>
        <div className="absolute bottom-1 right-2 text-[10px] font-bold text-white/60">100</div>
    </div>
  );
};

export default Speedometer;
