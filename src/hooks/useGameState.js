import { useState, useRef, useEffect, useCallback } from 'react';
import { useSound } from './useSound';

export const SCREENS = {
    WELCOME: 'welcome',
    GOAL_SELECTION: 'goal_selection',
    INSTRUCTIONS: 'instructions',
    ASSESSMENT: 'assessment',
    SCORE_RESULTS: 'score_results',
    BOOKING: 'booking',
    LEAD_FORM: 'lead_form',
    THANK_YOU: 'thank_you'
};

export const useGameState = () => {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [score, setScore] = useState(0);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [leadName, setLeadName] = useState('');
    const [lives, setLives] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);

    const { playSound } = useSound();

    // Use a Ref for the timer to avoid re-rendering the component every second
    // Since we don't display the timer anymore, we only need to know when it ends
    const gameTimerRef = useRef(null);

    const handleEndOfGame = useCallback(() => {
        setCurrentScreen(SCREENS.SCORE_RESULTS);
        playSound('complete');
        if (gameTimerRef.current) {
            clearTimeout(gameTimerRef.current);
        }
    }, [playSound]);

    const startGameTimer = useCallback(() => {
        if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
        // 300 seconds = 5 minutes
        gameTimerRef.current = setTimeout(() => {
            handleEndOfGame();
        }, 300000);
    }, [handleEndOfGame]);

    const stopGameTimer = useCallback(() => {
        if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    }, []);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => stopGameTimer();
    }, [stopGameTimer]);

    const startGame = useCallback(() => {
        setCurrentScreen(SCREENS.GOAL_SELECTION);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
        // Timer only starts at assessment, but reset here if needed
    }, []);

    const handleGoalsSelected = useCallback((goals) => {
        setSelectedGoals(goals);
        setCurrentScreen(SCREENS.INSTRUCTIONS);
    }, []);

    const startQuest = useCallback(() => {
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setCurrentScreen(SCREENS.ASSESSMENT);
        startGameTimer();
    }, [startGameTimer]);

    const handleAnswer = useCallback((answer) => {
        setResponses(prev => {
            // Functional update correct, but we need currentGoal to be stable or accessible
            // Since we refrain from adding selectedGoals dependency which might change, 
            // we trust the index is correct. 
            // Ideally we'd pass the goal ID from the UI but let's stick to existing logic structure.
            return prev;
        });

        // We need to construct the response object. 
        // We can access the current goal from the state in the scope if we include dependencies,
        // or calculate it.
        // Let's modify the flow slightly: 
        // The component handles the data, we just update state.
        // Actually, to avoid stale closures, it's better if we update specific state pieces.

        // Re-implementing logic with safety:
        if (answer) {
            setScore(prev => prev + 111);
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        // We can't access selectedGoals[currentGoalIndex] safely inside useCallback without adding it to dependency,
        // which causes function recreation. 
        // For now, let's update the indices.
        // The recording of "responses" is less critical for the game flow than limits.

        // Logic for progression:
        // We need to know if we are at the end of the questions for this goal
        // or at the end of all goals.
        // We can simply update counters and let the side effects handle it? 
        // No, React updates are batched.

        // Simplest optimization: Passing the max values as arguments to avoid dependency on arrays?
        // Or just accept the dependency on selectedGoals.length (primitive) and simple state.

        // To strictly follow "Do not change logic", I will assume we can access state here.
        // But to be "Sr React Architect", I should use a reducer or functional updates.
        // For now, let's keep it simple and clean.
    }, [playSound]);

    // Redefining handleAnswer to fully replicate original logic but cleaner:
    const processAnswer = useCallback((answer, currentGoalId, currentGoalName, maxGoals) => {
        setResponses(prev => [...prev, {
            goalId: currentGoalId,
            goalName: currentGoalName,
            questionIndex: currentQuestionIndex,
            answer
        }]);

        if (answer) {
            setScore(prev => prev + 111);
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        // Use functional state to read latest values if needed, but here we depend on local variables 
        // passed from the UI or current state.

        // We need to defer the index updates to ensure we check against current values?
        // Actually, standard state variables are fine if we include them in deps.
        // But to avoid re-creating this function on every index change, we can use refs or functional updates.

        // Let's stick to the simplest "Refactored" version which accepts the "Is End?" flags from UI 
        // or calculates them.

        // Actually, simpler: just use the state. Functional components re-create functions is cheap.
        // The goal is to avoid *render* cycles.

    }, [currentQuestionIndex]); // This still has deps.

    // Let's use a simpler "Action" pattern for the game progression
    const advanceGame = useCallback((isCorrect, currentGoal, totalGoals) => {
        if (isCorrect) {
            setScore(prev => prev + 111);
            playSound('correct');
        } else {
            playSound('incorrect');
            setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                    setIsGameOver(true);
                    stopGameTimer();
                    // We might want to show a game over screen or just go to results with current score
                    setCurrentScreen(SCREENS.SCORE_RESULTS);
                }
                return newLives;
            });
        }

        setResponses(prev => [...prev, {
            goalId: currentGoal.id,
            goalName: currentGoal.name,
            questionIndex: currentQuestionIndex,
            answer: isCorrect
        }]);

        if (!isCorrect && lives <= 1) return; // Stop progression if game over

        if (currentQuestionIndex < 2) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentGoalIndex < totalGoals - 1) {
            setCurrentGoalIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        } else {
            stopGameTimer();
            handleEndOfGame();
        }
    }, [currentQuestionIndex, currentGoalIndex, lives, playSound, handleEndOfGame, stopGameTimer]);


    const handleCallNow = () => window.location.href = 'tel:+911800209999';
    const handleBookSlot = () => setCurrentScreen(SCREENS.BOOKING);
    const handleTalkToExpert = () => setCurrentScreen(SCREENS.LEAD_FORM);

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
        setTimeout(() => handleRestart(), 3000);
    };

    const handleBackFromBooking = () => setCurrentScreen(SCREENS.SCORE_RESULTS);

    const handleRestart = () => {
        setCurrentScreen(SCREENS.WELCOME);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
        setLives(3);
        setIsGameOver(false);
        stopGameTimer();
    };

    return {
        currentScreen,
        selectedGoals,
        currentGoalIndex,
        currentQuestionIndex,
        score,
        leadName,
        lives,
        isGameOver,
        showSuccessToast,
        successMessage,
        setShowSuccessToast,
        startGame,
        handleGoalsSelected,
        startQuest,
        advanceGame,
        handleCallNow,
        handleBookSlot,
        handleTalkToExpert,
        handleLeadFormSubmit,
        handleSkipLeadForm,
        handleBookingSubmit,
        handleBackFromBooking,
        handleRestart
    };
};
