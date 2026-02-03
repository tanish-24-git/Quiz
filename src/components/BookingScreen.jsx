import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { isValidPhone } from '../utils/helpers';
import { Calendar, Clock, User, Phone, CheckCircle, ArrowLeft } from "lucide-react";

const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM"
];

const BookingScreen = ({ onSubmit, onBack, selectedGoals, score }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        preferredDate: '',
        preferredTime: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!isValidPhone(formData.mobile)) newErrors.mobile = "Valid 10-digit number required";
        if (!formData.preferredDate) newErrors.preferredDate = "Please select a date";
        if (!formData.preferredTime) newErrors.preferredTime = "Please select a time slot";

        // Validate date is in the future
        if (formData.preferredDate) {
            const selectedDate = new Date(formData.preferredDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.preferredDate = "Please select a future date";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        // Prepare lead data
        const leadData = {
            ...formData,
            leadType: "Life Goals Preparedness – Gamified Lead",
            score: Math.round((score / 9) * 100),
            selectedGoals: selectedGoals.map(g => g.name),
            timestamp: new Date().toISOString()
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Lead submitted:", leadData);
        setIsSuccess(true);
        
        setTimeout(() => {
            onSubmit(leadData);
        }, 2000);
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    if (isSuccess) {
        return (
            <motion.div
                className="w-full max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Card className="shadow-xl text-center py-12">
                    <CardContent>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="mb-6"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                        </motion.div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Booking Confirmed!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Our Relationship Manager will connect with you on<br/>
                            <strong className="text-brand-blue">{formData.preferredDate}</strong> during<br/>
                            <strong className="text-brand-blue">{formData.preferredTime}</strong>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="shadow-xl border-t-4 border-t-brand-orange">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Book Your Appointment
                    </CardTitle>
                    <CardDescription>
                        Schedule a convenient time for a personalized consultation
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>

                        {/* Mobile Field */}
                        <div className="space-y-1">
                            <Label htmlFor="mobile" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Mobile Number <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex gap-2">
                                <div className="bg-muted flex items-center px-3 rounded-md border border-input text-muted-foreground text-sm font-medium">
                                    +91
                                </div>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    maxLength={10}
                                    placeholder="9876543210"
                                    value={formData.mobile}
                                    onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, ''))}
                                    className={errors.mobile ? 'border-red-500' : ''}
                                />
                            </div>
                            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                        </div>

                        {/* Date Field */}
                        <div className="space-y-1">
                            <Label htmlFor="preferredDate" className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Preferred Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="preferredDate"
                                type="date"
                                min={today}
                                value={formData.preferredDate}
                                onChange={(e) => updateField('preferredDate', e.target.value)}
                                className={errors.preferredDate ? 'border-red-500' : ''}
                            />
                            {errors.preferredDate && <p className="text-red-500 text-xs">{errors.preferredDate}</p>}
                        </div>

                        {/* Time Slot Selection */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Preferred Time <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-1 gap-2">
                                {timeSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        type="button"
                                        onClick={() => updateField('preferredTime', slot)}
                                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                            formData.preferredTime === slot
                                                ? 'border-brand-orange bg-orange-50 dark:bg-orange-900/20 text-brand-orange'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-brand-blue'
                                        }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                            {errors.preferredTime && <p className="text-red-500 text-xs">{errors.preferredTime}</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={onBack}
                                disabled={isSubmitting}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex-[2] bg-brand-orange hover:bg-orange-600 text-white text-lg font-bold"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Booking..." : "Confirm Booking"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default BookingScreen;
