// Quiz questions data
export const quizQuestions = [
    {
        id: 1,
        category: 'GST',
        difficulty: 'medium',
        question: 'Does the 0% GST exemption apply to riders attached to life insurance policies?',
        options: [
            'Yes, all riders are also 0% GST',
            'No, riders still attract 18% GST',
            'Only critical illness riders are 0% GST',
            'It depends on the insurance company'
        ],
        correctAnswer: 0,
        explanation: 'The 0% GST exemption extends to all riders (critical illness, accidental death, disability) attached to life insurance policies.'
    },
    {
        id: 2,
        category: 'GST',
        difficulty: 'easy',
        question: 'As of 2023, what is the GST rate on life insurance premiums in India?',
        options: [
            '18% GST',
            '5% GST',
            '0% GST (Tax-Free)',
            '12% GST'
        ],
        correctAnswer: 2,
        explanation: 'Life insurance premiums in India are now 0% GST (tax-free) as per the latest policy changes, making insurance more affordable for everyone.'
    },
    {
        id: 3,
        category: 'GST',
        difficulty: 'medium',
        question: 'Which type of insurance policy does NOT qualify for 0% GST?',
        options: [
            'Term Life Insurance',
            'Whole Life Insurance',
            'Unit Linked Insurance Plans (ULIPs)',
            'Health Insurance'
        ],
        correctAnswer: 3,
        explanation: 'Health insurance still attracts 18% GST. The 0% GST exemption specifically applies to life insurance products only.'
    },
    {
        id: 4,
        category: 'GST',
        difficulty: 'hard',
        question: 'If you bought a life insurance policy before the GST exemption, what happens to your existing policy?',
        options: [
            'You continue paying 18% GST',
            'Automatically adjusted to 0% GST from the date of change',
            'You need to renew the policy to get 0% GST',
            'Only new premiums are 0% GST, not existing ones'
        ],
        correctAnswer: 1,
        explanation: 'The GST exemption is automatically applied to all existing life insurance policies from the effective date, reducing the cost for current policyholders too.'
    },
    {
        id: 5,
        category: 'GST',
        difficulty: 'medium',
        question: 'How much can a family of 4 save annually on life insurance with 0% GST (assuming ₹50,000 annual premium)?',
        options: [
            '₹2,500',
            '₹5,000',
            '₹9,000',
            '₹12,000'
        ],
        correctAnswer: 2,
        explanation: 'With 0% GST instead of 18%, on a ₹50,000 premium, you save ₹9,000 annually (18% of ₹50,000). This is significant savings for families!'
    }
];

// Additional quiz categories (bonus feature)
export const categoryQuestions = {
    gst: quizQuestions,
    // Can add more categories here
};

export default quizQuestions;
