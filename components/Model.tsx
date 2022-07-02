import { useGlobalState } from "../context/AppProvider";
import styles from "../styles/Model.module.css";
import questionstyles from  "../styles/Questions.module.css"

interface IProps {
    totalQuestions: number
    rightAnswers: number
}

const Model = ({ rightAnswers, totalQuestions }: IProps) => {
    const { prevStep } = useGlobalState();

    const text = rightAnswers === 1 ? 'One correct answer' : `${rightAnswers} correct answers`;

    return (
        <div className={styles['model-overlay']}>
            <div className={styles['model-box']}>
                <p className={styles.text}>You got {text} from {totalQuestions} Questions</p>
                <button onClick={prevStep} className={questionstyles.button}>Play again</button>
            </div>
        </div>
    )
}

export default Model