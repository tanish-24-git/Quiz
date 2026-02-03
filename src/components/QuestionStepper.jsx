import { Check } from 'lucide-react';

const QuestionStepper = ({ currentQuestion, totalQuestions }) => {
    return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-6">
            {Array.from({ length: totalQuestions }).map((_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentQuestion;
                const isCurrent = stepNumber === currentQuestion;
                const isUpcoming = stepNumber > currentQuestion;

                return (
                    <div key={stepNumber} className="flex items-center">
                        {/* Step Circle */}
                        <div
                            className={`
                                flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
                                transition-all duration-300
                                ${isCompleted ? 'bg-bajaj-blue text-white' : ''}
                                ${isCurrent ? 'bg-bajaj-blue text-white ring-4 ring-bajaj-blue/30' : ''}
                                ${isUpcoming ? 'bg-gray-600 text-gray-300' : ''}
                            `}
                        >
                            {isCompleted ? (
                                <Check className="w-5 h-5" strokeWidth={3} />
                            ) : (
                                stepNumber
                            )}
                        </div>

                        {/* Connecting Line */}
                        {stepNumber < totalQuestions && (
                            <div
                                className={`
                                    h-0.5 w-12 sm:w-16 mx-1 transition-all duration-300
                                    ${stepNumber < currentQuestion ? 'bg-bajaj-blue' : 'bg-gray-600'}
                                `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default QuestionStepper;
