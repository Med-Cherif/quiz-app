import { Question } from "../context/AppProvider"
import styles from "../styles/Questions.module.css"
import AnwserOption from "./AnwserOption"

interface IProps {
    question: Question
    chosenAnswer: string | null
    chooseAnswer: (answer: string) => void

}

const Main = ({ question, chosenAnswer, chooseAnswer }: IProps) => {
  return (
    <main className={styles.main}>
        <h2 className={styles.title}>{question.question}</h2>
        <ul>
            {question.answers.map((answer) => {
                return <AnwserOption
                    correctAnswer={question.correctAnswer}
                    key={answer} 
                    chosenAnswer={chosenAnswer}
                    option={answer} 
                    handleClick={chooseAnswer} 
                />
            })}
        </ul>
    </main>
  )
}

export default Main