
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
    ; //   point 1: Before API call

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
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Origin": "https://www.bajajlifeinsurance.com",
                "Referer": "https://www.bajajlifeinsurance.com/"
            },
            body: JSON.stringify(fullPayload)
        });

        ; //   point 2: After API response

        const result = await response.json();

        return result;
    } catch (error) {
        // LMS API Error
        ; //   point 3: On error
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
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="shadow-2xl border-brand-blue/10 dark:border-brand-blue/20">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Almost there!
                    </CardTitle>
                    <CardDescription>
                        Enter your details to see your results.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    placeholder="As per Govt ID"
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="email">Email ID <span className="text-red-500">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                            </div>

                            <Button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-lg text-white" disabled={isLoading}>
                                {isLoading ? "Submitting..." : "Get Quote"}
                            </Button>
                        </div>

                        <div className="text-center">
                            <Button
                                type="button"
                                variant="link"
                                className="text-muted-foreground text-xs mt-2"
                                onClick={onSkip}
                            >
                                Skip and restart quiz
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default LeadCaptureForm;
