import { useEffect, useRef, useState } from 'react'
import { useGlobalState } from "../context/AppProvider"
import Model from "./Model";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Questions = () => {

    const [isTimerActive, setIsTimerActive] = useState(false);

    const { questions } = useGlobalState();

    const [questionNumber, setQuestionNumber] = useState(0);
    const [gameStatus, setGameStatus] = useState<'playing' | 'ending' | 'ended'>('playing');
    const [chosenAnswer, setChosenAnswer] = useState<null | string>(null);
    
    const rightAnswers = useRef(0);
    
    const timerWorking = useRef(false);
    const timeout = useRef<NodeJS.Timeout>()

    const question = questions[questionNumber];

    const nextQuestion = () => {
        setChosenAnswer(null)
        setQuestionNumber(prev => prev + 1 < questions.length ? prev + 1 : prev)
    };

    const startTimer = () => {
        timerWorking.current = true;
        setIsTimerActive(true);
    }

    const stopTimer = () => {
        timerWorking.current = false;
        setIsTimerActive(false);
    }
    
    const chooseAnswer = (answer: string) => {
        stopTimer()

        if (answer === question.correctAnswer) {
            rightAnswers.current++;
        }

        setChosenAnswer(prevAnswer => {
            if (!prevAnswer) {
                return answer;
            }
            return prevAnswer
        })
    }

    const gameOver = () => {
        if (questionNumber + 1 === questions.length) {
            setGameStatus('ending')
            timeout.current = setTimeout(() => {
                setGameStatus('ended')
            }, 2000)
        }
    }

    useEffect(() => {
        if (chosenAnswer) {
            gameOver()
        }

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
    }, [chosenAnswer])

    return (
        <div>
            <Header
                startTimer={startTimer}
                stopTimer={stopTimer}
                isTimerActive={isTimerActive}
                gameOver={gameOver}
                nextQuestion={nextQuestion}
                timerWorking={timerWorking}
                gameStatus={gameStatus}
                questionNumber={questionNumber}
            />

            <Main 
                question={question}
                chosenAnswer={chosenAnswer}
                chooseAnswer={chooseAnswer}
            />
            
            <Footer 
                chosenAnswer={chosenAnswer} 
                questionNumber={questionNumber} 
                nextQuestion={nextQuestion} 
            />
            
            { gameStatus === 'ended' && <Model rightAnswers={rightAnswers.current} totalQuestions={questions.length} /> }
        </div>
    )
}

export default Questions