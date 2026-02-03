import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import GoalSelectionScreen from './components/GoalSelectionScreen';
import GoalAssessmentScreen from './components/GoalAssessmentScreen';
import ScoreResultsScreen from './components/ScoreResultsScreen';
import BookingScreen from './components/BookingScreen';
import LeadCaptureForm from './components/LeadCaptureForm';
import SuccessToast from './components/SuccessToast';
import quizQuestions from './data/questions';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';
import { Button } from "./components/ui/button";
import { Sun, Moon, Building2 } from "lucide-react";
import './index.css';

const SCREENS = {
    WELCOME: 'welcome',
    GOAL_SELECTION: 'goal_selection',
    ASSESSMENT: 'assessment',
    SCORE_RESULTS: 'score_results',
    BOOKING: 'booking',
    LEAD_FORM: 'lead_form',
    THANK_YOU: 'thank_you'
};

function App() {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]); // Array of { goalId, questionIndex, answer: boolean }
    const [score, setScore] = useState(0); // Count of "Yes" answers
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { playSound } = useSound();
    const { toggleTheme, isDark } = useTheme();

    // Start the game
    const startGame = () => {
        setCurrentScreen(SCREENS.GOAL_SELECTION);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
        playSound('start');
    };

    // Handle goal selection complete
    const handleGoalsSelected = (goals) => {
        setSelectedGoals(goals);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setCurrentScreen(SCREENS.ASSESSMENT);
    };

    // Handle answer to assessment question
    const handleAnswer = (answer) => {
        const currentGoal = selectedGoals[currentGoalIndex];
        
        // Record response
        const newResponse = {
            goalId: currentGoal.id,
            goalName: currentGoal.name,
            questionIndex: currentQuestionIndex,
            answer
        };
        setResponses(prev => [...prev, newResponse]);

        // Update score if Yes
        if (answer) {
            setScore(prev => prev + 1);
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        // Navigate to next question or goal
        if (currentQuestionIndex < 2) {
            // Next question for same goal
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentGoalIndex < 2) {
            // Next goal
            setCurrentGoalIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        } else {
            // All questions complete - show results
            setCurrentScreen(SCREENS.SCORE_RESULTS);
            playSound('complete');
        }
    };

    // Handle Call Now CTA
    const handleCallNow = () => {
        // In production, this would use URL parameters to get the LG/SM phone number
        // For now, using a placeholder number
        window.location.href = 'tel:+911800209999';
    };

    // Handle Book Slot CTA
    const handleBookSlot = () => {
        setCurrentScreen(SCREENS.BOOKING);
    };

    // Handle "Talk to Expert" / Lead Form CTA
    const handleTalkToExpert = () => {
        setCurrentScreen(SCREENS.LEAD_FORM);
    };

    // Handle Lead Form submission (Bajaj LMS API)
    const handleLeadFormSubmit = (lmsPayload) => {
        // Add game-specific data to the lead
        ; // Lead generation  point
        console.log('=== LEAD GENERATED ===' );
        console.log('Lead Type: Life Goals Preparedness – Gamified Lead');
        console.log('Preparedness Score:', Math.round((score / 9) * 100) + '%');
        console.log('Selected Goals:', selectedGoals.map(g => g.name));
        console.log('LMS Payload:', lmsPayload);
        console.log('All Responses:', responses);
        console.log('======================');
        
        playSound('success');
        setCurrentScreen(SCREENS.THANK_YOU);
        
        // Reset after showing thank you
        setTimeout(() => {
            handleRestart();
        }, 4000);
    };

    // Skip lead form
    const handleSkipLeadForm = () => {
        handleRestart();
    };

    // Handle booking submission
    const handleBookingSubmit = (bookingData) => {
        console.log('Booking submitted:', bookingData);
        console.log('Lead tagged as: Life Goals Preparedness – Gamified Lead');
        console.log('Score:', Math.round((score / 9) * 100) + '%');
        console.log('Selected Goals:', selectedGoals.map(g => g.name));
        
        playSound('success');
        setCurrentScreen(SCREENS.THANK_YOU);
        
        // Reset after showing thank you
        setTimeout(() => {
            handleRestart();
        }, 3000);
    };

    // Back from booking to results
    const handleBackFromBooking = () => {
        setCurrentScreen(SCREENS.SCORE_RESULTS);
    };

    // Restart the game
    const handleRestart = () => {
        setCurrentScreen(SCREENS.WELCOME);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-brand-blue backdrop-blur supports-[backdrop-filter]:bg-brand-blue/95 dark:bg-slate-900/95 shadow-md">
                <div className="container flex h-16 max-w-screen-2xl items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                        <img 
                            src="/bajaj_life.png" 
                            alt="Bajaj Life Insurance" 
                            className="h-10 w-auto bg-white p-1 rounded"
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-[700px] min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {currentScreen === SCREENS.WELCOME && (
                            <WelcomeScreen key="welcome" onStart={startGame} />
                        )}

                        {currentScreen === SCREENS.GOAL_SELECTION && (
                            <GoalSelectionScreen 
                                key="goal-selection" 
                                onProceed={handleGoalsSelected} 
                            />
                        )}

                        {currentScreen === SCREENS.ASSESSMENT && selectedGoals.length > 0 && (
                            <GoalAssessmentScreen
                                key={`assessment-${currentGoalIndex}-${currentQuestionIndex}`}
                                currentGoal={selectedGoals[currentGoalIndex]}
                                currentGoalIndex={currentGoalIndex}
                                currentQuestionIndex={currentQuestionIndex}
                                onAnswer={handleAnswer}
                            />
                        )}

                        {currentScreen === SCREENS.SCORE_RESULTS && (
                            <ScoreResultsScreen
                                key="score-results"
                                score={score}
                                selectedGoals={selectedGoals}
                                onCallNow={handleCallNow}
                                onBookSlot={handleBookSlot}
                                onTalkToExpert={handleTalkToExpert}
                            />
                        )}

                        {currentScreen === SCREENS.BOOKING && (
                            <BookingScreen
                                key="booking"
                                onSubmit={handleBookingSubmit}
                                onBack={handleBackFromBooking}
                                selectedGoals={selectedGoals}
                                score={score}
                            />
                        )}

                        {currentScreen === SCREENS.LEAD_FORM && (
                            <LeadCaptureForm
                                key="lead-form"
                                onSubmit={handleLeadFormSubmit}
                                onSkip={handleSkipLeadForm}
                            />
                        )}

                        {currentScreen === SCREENS.THANK_YOU && (
                            <div key="thank-you" className="text-center py-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Thank You! 🎉
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We look forward to helping you achieve your life goals.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Success Toast Notification */}
            {showSuccessToast && (
                <SuccessToast
                    message={successMessage}
                    onClose={() => setShowSuccessToast(false)}
                />
            )}
        </div>
    );
}

export default App;
