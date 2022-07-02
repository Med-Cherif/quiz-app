import styles from "../styles/Questions.module.css"
import { MutableRefObject, useEffect, useRef } from "react"
import { useGlobalState } from "../context/AppProvider";
import Spinner from "./Spinner";

interface IProps {
    gameStatus: 'playing' | 'ending' | 'ended';
    timerWorking: MutableRefObject<boolean>
    questionNumber: number
    isTimerActive: boolean
    nextQuestion: () => void
    gameOver: () => void
    startTimer: () => void
    stopTimer: () => void
}

const gameTime = 15

const Header = ({ 
        questionNumber, gameStatus, timerWorking, nextQuestion, gameOver, startTimer, stopTimer 
    }: IProps) => {
    const { settings, questions } = useGlobalState();

    const timerRef = useRef<HTMLSpanElement>(null)
    const time = useRef(gameTime)

    const timerAnimationRef = useRef<HTMLSpanElement>(null);

    const title = settings.categories === '' ? 'Random Question' : settings.categories.split('_').join(' ');


    useEffect(() => {
        startTimer()
        let intervel = setInterval(() => {
            if (timerWorking.current) {
                time.current--
                const width = 100 - ((time.current - 1) * 100 / gameTime)
                timerAnimationRef.current!.style.width = `${width}%`;
                timerRef.current!.textContent = time.current + ''
                if (time.current === 0) {
                    clearInterval(intervel)
                    if (!(questionNumber + 1 === questions.length)) {
                        nextQuestion()
                    } else {
                        gameOver();
                    }
                }
            }
        }, 1000)

        return () => {
            stopTimer()
            time.current = gameTime
            if (timerRef.current) {
                timerAnimationRef.current!.style.width = "0%"
                timerRef.current.textContent = time.current + ''
            }
            clearInterval(intervel)
        }

    }, [questionNumber])


    return (
        <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {
                gameStatus === 'playing' 
                    ? <p className={styles['time-left']}>Time Left <span ref={timerRef} className={styles['time-left-value']}>{gameTime}</span></p>
                    : gameStatus === 'ending' && <Spinner />

            }
            <span 
                ref={timerAnimationRef}
                className={`${styles["header-timer"]}`} 
            />
        </header>
    )
}

export default Header