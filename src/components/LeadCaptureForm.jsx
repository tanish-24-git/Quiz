
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { isValidEmail, isValidPhone } from '../utils/helpers';
import { Check, ChevronsUpDown } from "lucide-react";

// API function to submit to Bajaj LMS
const submitToLMS = async (data) => {
    // API Call to Bajaj LMS Proxy

    const apiUrl = "https://webpartner.bajajallianz.com/EurekaWSNew/service/pushData";

    // Complete payload with all required fields
    const fullPayload = {
        name: data.name,
        age: data.age || 25,
        mobile_no: data.mobile_no,
        email_id: data.email_id,
        goal_name: data.goal_name || "1",
        param1: null,
        param2: null,
        param3: null,
        param4: data.param4, // pincode
        param5: "",
        param13: "",
        param18: "",
        param19: data.param19, // DOB
        param20: "",
        param23: data.param23, // gender
        param24: data.param24, // occupation
        param25: data.param25, // education
        param26: data.param26, // income
        param36: "manual",
        summary_dtls: "",
        p_user_eml: data.email_id,
        p_data_source: data.p_data_source || "WS_ETOUCH_BUY",
        p_curr_page_path: "https://www.bajajlifeinsurance.com/etouch/",
        p_ip_addsr: "",
        p_remark_url: "",
        prodId: data.prodId || "345",
        medium: "",
        contact_number: "",
        content: "",
        campaign: "",
        source: "",
        keyword: "",
        flag: "",
        parameter: "",
        name1: "",
        param28: "",
        param29: "",
        param30: ""
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fullPayload)
        });

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("LMS Submission Error:", error);
        throw error;
    }
};

const LeadCaptureForm = ({ onSubmit, onSkip }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!isValidEmail(formData.email)) newErrors.email = "Valid email required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        // Map data to LMS JSON structure with null/empty for unused fields
        const lmsPayload = {
            name: formData.name,
            age: "", // Default age
            mobile_no: "", // Not collecting
            email_id: formData.email,
            goal_name: "1",
            param1: null,
            param2: null,
            param3: null,
            param4: "", // pincode
            param5: "",
            param13: "",
            param18: "",
            param19: "", // DOB
            param20: "",
            param23: "", // gender
            param24: "", // occupation
            param25: "", // education
            param26: "", // income
            param36: "online_sales",
            summary_dtls: "",
            p_user_eml: formData.email,
            p_data_source: "WS_BUY_Game1",
            p_curr_page_path: "https://www.bajajlifeinsurance.com/etouch/",
            p_ip_addsr: "",
            p_remark_url: "",
            prodId: "",
            medium: "",
            contact_number: "",
            content: "",
            campaign: "",
            source: "",
            keyword: "",
            flag: "",
            parameter: "",
            name1: "",
            param28: "",
            param29: "",
            param30: ""
        };

        // Simulate API call 
        try {
            await submitToLMS(lmsPayload);
            onSubmit(lmsPayload);
        } catch (error) {
            setErrors({ submit: "Failed to submit. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="w-full max-w-xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Pixel Card Container - Golden Ratio Style */}
            <div className="relative pixel-borders bg-white border-4 border-slate-200 overflow-hidden shadow-2xl">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 pixel-grid-bg-light opacity-10 pointer-events-none" />

                <div className="relative z-10 p-phi-1 sm:p-phi-2">
                    <div className="text-center mb-phi-1">
                        <h2 className="text-xl sm:text-3xl font-pixel text-sky-900 mb-2 leading-tight uppercase font-bold" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.05)' }}>
                            Almost There!
                        </h2>
                        <p className="text-slate-500 font-sans text-xs sm:text-sm">
                            Enter your details to reveal your quest results.
                        </p>
                    </div>

                    <form className="space-y-phi-1" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name" className="text-slate-700 font-bold uppercase text-xs tracking-wider">Full Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    placeholder="Adventurer Name"
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    className={`border-2 rounded-none focus:ring-0 ${errors.name ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'}`}
                                />
                                {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold mt-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="email" className="text-slate-700 font-bold uppercase text-xs tracking-wider">Email Guild ID <span className="text-red-500">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="hero@example.com"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    className={`border-2 rounded-none focus:ring-0 ${errors.email ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'}`}
                                />
                                {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold mt-1">{errors.email}</p>}
                            </div>

                            <PixelButton
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-brand-orange text-white font-bold uppercase tracking-widest hover:bg-orange-600 shadow-[0_4px_0_#cc5500] active:shadow-none active:translate-y-[2px] border-none"
                            >
                                {isLoading ? "Submitting..." : "REVEAL RESULTS ►"}
                            </PixelButton>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                className="text-slate-400 hover:text-slate-600 text-[10px] uppercase tracking-wider font-bold underline decoration-slate-300 underline-offset-4"
                                onClick={onSkip}
                            >
                                Skip and restart quest
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default LeadCaptureForm;
