import { useGlobalState } from "../context/AppProvider";
import styles from "../styles/Questions.module.css"

interface IProps {
    chosenAnswer: string | null
    questionNumber: number
    nextQuestion: () => void;
}

const Footer = ({ chosenAnswer, questionNumber, nextQuestion }: IProps) => {
    const { questions } = useGlobalState();
    return (
        <footer className={styles.footer}>
            <p className={styles['left-questions']}>{questionNumber + 1} of {questions.length} Questions</p>
            {
                (chosenAnswer && questionNumber + 1 !== questions.length && <button onClick={nextQuestion} className={styles.button}>Next</button>)
            }
        </footer>
    )
}

export default Footer