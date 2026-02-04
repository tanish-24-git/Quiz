import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import GoalSelectionScreen from './components/GoalSelectionScreen';
import GoalAssessmentScreen from './components/GoalAssessmentScreen';
import QuestInstructions from './components/QuestInstructions';
import ScoreResultsScreen from './components/ScoreResultsScreen';
import BookingScreen from './components/BookingScreen';
import LeadCaptureForm from './components/LeadCaptureForm';
import ThankYouScreen from './components/ThankYouScreen';
import SuccessToast from './components/SuccessToast';
import quizQuestions from './data/questions';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';
import { Button } from "./components/ui/button";

import './index.css';

const SCREENS = {
    WELCOME: 'welcome',
    GOAL_SELECTION: 'goal_selection',
    INSTRUCTIONS: 'instructions',
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
    const [responses, setResponses] = useState([]);
    const [score, setScore] = useState(0);
    const [globalTimeLeft, setGlobalTimeLeft] = useState(300);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [leadName, setLeadName] = useState('');

    const { playSound } = useSound();

    // Global Timer Effect
    useEffect(() => {
        let interval = null;
        if (currentScreen === SCREENS.ASSESSMENT && globalTimeLeft > 0) {
            interval = setInterval(() => {
                setGlobalTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        handleEndOfGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [currentScreen, globalTimeLeft]);

    const handleEndOfGame = () => {
        setCurrentScreen(SCREENS.SCORE_RESULTS);
        playSound('complete');
    };

    // Start the game
    const startGame = () => {
        setCurrentScreen(SCREENS.GOAL_SELECTION);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
        setGlobalTimeLeft(300);
    };

    // Handle goal selection complete - now goes to instructions
    const handleGoalsSelected = (goals) => {
        setSelectedGoals(goals);
        setCurrentScreen(SCREENS.INSTRUCTIONS);
    };

    // Start the actual assessment
    const startQuest = () => {
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setCurrentScreen(SCREENS.ASSESSMENT);
        setGlobalTimeLeft(300);
    };

    // Handle answer to assessment question
    const handleAnswer = (answer) => {
        const currentGoal = selectedGoals[currentGoalIndex];

        const newResponse = {
            goalId: currentGoal.id,
            goalName: currentGoal.name,
            questionIndex: currentQuestionIndex,
            answer
        };
        setResponses(prev => [...prev, newResponse]);

        if (answer) {
            setScore(prev => prev + 111);
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        if (currentQuestionIndex < 2) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentGoalIndex < selectedGoals.length - 1) {
            setCurrentGoalIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        } else {
            handleEndOfGame();
        }
    };

    const handleCallNow = () => {
        window.location.href = 'tel:+911800209999';
    };

    const handleBookSlot = () => {
        setCurrentScreen(SCREENS.BOOKING);
    };

    const handleTalkToExpert = () => {
        setCurrentScreen(SCREENS.LEAD_FORM);
    };

    const handleLeadFormSubmit = (lmsPayload) => {
        playSound('success');
        setLeadName(lmsPayload.name);
        setCurrentScreen(SCREENS.THANK_YOU);
    };

    const handleSkipLeadForm = () => {
        handleRestart();
    };

    const handleBookingSubmit = (bookingData) => {
        playSound('success');
        setCurrentScreen(SCREENS.THANK_YOU);

        setTimeout(() => {
            handleRestart();
        }, 3000);
    };

    const handleBackFromBooking = () => {
        setCurrentScreen(SCREENS.SCORE_RESULTS);
    };

    const handleRestart = () => {
        setCurrentScreen(SCREENS.WELCOME);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
        setGlobalTimeLeft(300);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">


            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
                <div
                    className="w-full min-h-[500px]"
                    style={{
                        maxWidth: 'min(900px, 100%)',
                    }}
                >
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

                        {currentScreen === SCREENS.INSTRUCTIONS && (
                            <QuestInstructions
                                key="instructions"
                                onStart={startQuest}
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
                            <ThankYouScreen
                                key="thank-you"
                                userName={leadName || "Adventurer"}
                                onRestart={handleRestart}
                            />
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
