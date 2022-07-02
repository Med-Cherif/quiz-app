import React, { useContext, createContext, useState } from 'react'

const AppContext = createContext({})

const allSteps = 2;

export interface Question {
    question: string 
    correctAnswer: string
    difficulty: string
    id: string
    answers: string[]
    incorrectAnswers: string[]
}

const AppProvider = ({ children }: { children: JSX.Element }) => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [step, setStep] = useState(1);
    const [settings, setSettings] = useState({
        categories: '',
        difficulty: ''
    })
    
    const nextStep = () => setStep(prev => prev + 1 > allSteps ? prev : prev + 1);
    const prevStep = () => setStep(prev => prev - 1 < 0 ? prev : prev - 1);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (setStatus: React.Dispatch<React.SetStateAction<"normal" | "loading">>) => {
        setStatus('loading')
        let api = "https://the-trivia-api.com/api/questions?limit=10"
        Object.entries(settings).forEach(([property, value]) => {
            if (value) {
                api += `&${property}=${value}`
            }
        })
        try {
            const response = await fetch(api);
            const questions = await response.json()
            const updatedQuestions = questions.map((question: Question) => {
                const answers = [...question.incorrectAnswers]
                answers.splice(Math.floor(Math.random() * question.incorrectAnswers.length + 1), 0, question.correctAnswer)
                return { 
                    ...question, 
                    answers
                }}
            );
            setQuestions(updatedQuestions);
            nextStep();
            setStatus('normal');
        } catch (error) {
            setStatus('normal')
        }
    }


    return (
        <AppContext.Provider value={{ 
            step, questions, settings, handleSubmit, handleChange, prevStep
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider

interface GlobalState {
    step: number,
    questions: Question[];
    settings: {
        categories: string
        difficulty: string
    }
    prevStep: () => void;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleSubmit: (setStatus: React.Dispatch<React.SetStateAction<"normal" | "loading">>) => void
}

export const useGlobalState = () => {
    return useContext(AppContext) as GlobalState;
}