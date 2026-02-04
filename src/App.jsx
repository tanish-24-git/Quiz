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
                        onRestart={handleRestart}
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
        <div className="h-[100dvh] w-full flex flex-col font-sans transition-colors duration-300 pixel-grid-bg-blue overflow-hidden">
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-0 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    <Suspense fallback={null}>
                        {renderScreen()}
                    </Suspense>
                </AnimatePresence>
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
