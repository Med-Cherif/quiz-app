import styles from  "../styles/Questions.module.css"

interface IProps {
    option: string;
    chosenAnswer: string | null;
    correctAnswer: string;
    handleClick: (answer: string) => void
}

const AnwserOption = ({ option, chosenAnswer, correctAnswer, handleClick }: IProps) => {
    let style = chosenAnswer 
        ? (option === correctAnswer)
            ? styles.correct : (option === chosenAnswer && correctAnswer !== option) 
                ? styles.wrong : null
        : null;
    
    return (
        <li 
            onClick={() => handleClick(option)}
            className={`${styles.answer} ${style ? style : ""}`}
        >
            {option}
        </li>
    )
}

export default AnwserOption