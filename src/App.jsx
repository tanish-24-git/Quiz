import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameState, SCREENS } from './hooks/useGameState';
import SuccessToast from './components/SuccessToast';
import './index.css';

// Lazy load screens for performance optimization
const WelcomeScreen = lazy(() => import('./components/WelcomeScreen'));
const GoalSelectionScreen = lazy(() => import('./components/GoalSelectionScreen'));
const GoalAssessmentScreen = lazy(() => import('./components/GoalAssessmentScreen'));
const ScoreResultsScreen = lazy(() => import('./components/ScoreResultsScreen'));
const BookingScreen = lazy(() => import('./components/BookingScreen'));
const LeadCaptureForm = lazy(() => import('./components/LeadCaptureForm'));
const ThankYouScreen = lazy(() => import('./components/ThankYouScreen'));
const RetroCountdown = lazy(() => import('./components/RetroCountdown'));

function App() {
    const {
        currentScreen,
        selectedGoals,
        currentGoalIndex,
        currentQuestionIndex,
        score,
        leadName,
        lives,
        showSuccessToast,
        successMessage,
        setShowSuccessToast,
        startGame,
        handleGoalsSelected,
        startAssessment,

        advanceGame,
        handleCallNow,
        handleBookSlot,
        handleTalkToExpert,
        handleLeadFormSubmit,
        handleSkipLeadForm,
        handleBookingSubmit,
        handleBackFromBooking,
        handleRestart
    } = useGameState();

    const renderScreen = () => {
        switch (currentScreen) {
            case SCREENS.WELCOME:
                return <WelcomeScreen key="welcome" onStart={startGame} />;
            case SCREENS.GOAL_SELECTION:
                return <GoalSelectionScreen key="goal-selection" onProceed={handleGoalsSelected} />;
            case SCREENS.COUNTDOWN:
                return <RetroCountdown key="countdown" onComplete={startAssessment} />;
            case SCREENS.ASSESSMENT:
                return selectedGoals.length > 0 && (
                    <GoalAssessmentScreen
                        key={`assessment-${currentGoalIndex}-${currentQuestionIndex}`}
                        currentGoal={selectedGoals[currentGoalIndex]}
                        currentGoalIndex={currentGoalIndex}
                        currentQuestionIndex={currentQuestionIndex}
                        score={score}
                        lives={lives}
                        onAnswer={(ans) => advanceGame(ans, selectedGoals[currentGoalIndex], selectedGoals.length)}
                    />
                );
            case SCREENS.SCORE_RESULTS:
                return (
                    <ScoreResultsScreen
                        key="score-results"
                        score={score}
                        selectedGoals={selectedGoals}
                        onCallNow={handleCallNow}
                        onBookSlot={handleBookSlot}
                        onTalkToExpert={handleTalkToExpert}
                    />
                );
            case SCREENS.BOOKING:
                return (
                    <BookingScreen
                        key="booking"
                        onSubmit={handleBookingSubmit}
                        onBack={handleBackFromBooking}
                        selectedGoals={selectedGoals}
                        score={score}
                    />
                );
            case SCREENS.LEAD_FORM:
                return (
                    <LeadCaptureForm
                        key="lead-form"
                        onSubmit={handleLeadFormSubmit}
                        onSkip={handleSkipLeadForm}
                    />
                );
            case SCREENS.THANK_YOU:
                return (
                    <ThankYouScreen
                        key="thank-you"
                        userName={leadName || "Adventurer"}
                        onRestart={handleRestart}
                    />
                );
            default:
                return null;
        }
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
                        <Suspense fallback={<div className="flex items-center justify-center h-full text-brand-orange font-pixel animate-pulse">Loading...</div>}>
                            {renderScreen()}
                        </Suspense>
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
