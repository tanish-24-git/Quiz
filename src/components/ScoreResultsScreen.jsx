import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "./ui/input";
import { PhoneCall, CheckCircle, RotateCcw } from "lucide-react";
import Confetti from './Confetti';
import { isValidPhone } from '../utils/helpers';
import confetti from 'canvas-confetti';
import Speedometer from './Speedometer';

import { submitToLMS } from '../utils/api';

const ScoreResultsScreen = ({ score, selectedGoals, onBookSlot, onRestart }) => {
    const [formData, setFormData] = useState({ name: '', mobile: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const updateField = (field, val) => {
        setFormData(p => ({ ...p, [field]: val }));
        if (errors[field]) setErrors(p => ({ ...p, [field]: null }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = "Required";
        if (!isValidPhone(formData.mobile)) errs.mobile = "Invalid Mobile";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        
        try {
            await submitToLMS({
                name: formData.name,
                mobile_no: formData.mobile
            });
            // Transition to Thank You screen
            onBookSlot(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div 
            className="w-full h-full sm:h-auto sm:max-w-md sm:min-h-[600px] sm:shadow-2xl relative font-sans text-white bg-sky-600 overflow-hidden sm:pixel-borders sm:border-4 sm:border-sky-800"
        >
            <Confetti />

            {/* Content */}
            <div className="px-6 pt-2 pb-1 text-center relative z-10">
                
                {/* Speedometer Gauge */}
                <div className="relative mx-auto flex items-center justify-center mb-0 mt-1 scale-90 sm:scale-100">
                     <Speedometer score={Math.round(score)} />
                </div>
                <div className="text-xl font-bold mb-2 -mt-3 text-white">{Math.round(score)}%</div>

                <h1 className="text-xl font-bold mb-1 text-white">Congratulations!</h1>
                <p className="text-blue-50 text-[10px] sm:text-xs font-medium mb-4">You've just aced the quiz!</p>

                <div className="w-full h-px bg-white/20 my-4"></div>

                <p className="text-[10px] sm:text-xs mb-4 leading-relaxed text-white max-w-xs mx-auto">
                    To learn more about our Products, please connect with our Relationship Manager
                </p>

                {/* Call Action */}
                <a href="tel:1800209999" className="block w-full mb-4">
                    <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded-md shadow-[0_2px_0_#cc5500] active:shadow-none active:translate-y-[1px] transition-all flex items-center justify-center gap-2 text-sm">
                        <PhoneCall className="w-4 h-4" /> CALL NOW
                    </button>
                </a>

                <div className="relative py-1 mb-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="px-3 bg-sky-600 text-blue-100 font-medium tracking-widest">Or</span></div>
                </div>

                <div className="font-bold text-base mb-2 text-white">Book a convenient slot</div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-2 text-left">
                    <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-blue-100 uppercase tracking-wider ml-1">Your Name</label>
                        <Input 
                            value={formData.name} onChange={e => updateField('name', e.target.value)}
                            className="bg-white h-9 border-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-white/50 rounded-md text-sm"
                            placeholder="Full Name"
                        />
                         {errors.name && <span className="text-[10px] text-orange-200 ml-1 font-bold">{errors.name}</span>}
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-blue-100 uppercase tracking-wider ml-1">Mobile Number</label>
                        <Input 
                            value={formData.mobile} onChange={e => updateField('mobile', e.target.value)}
                            className="bg-white h-9 border-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-white/50 rounded-md text-sm"
                            placeholder="+91 9876543210"
                        />
                        {errors.mobile && <span className="text-[10px] text-orange-200 ml-1 font-bold">{errors.mobile}</span>}
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white hover:bg-blue-50 text-[#0066B2] font-bold py-2.5 rounded-md shadow-lg mt-2 transition-colors uppercase tracking-wider text-xs"
                    >
                        {isSubmitting ? 'Confirming...' : 'Book a Slot'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ScoreResultsScreen;
