import { useState } from "react";
import { useGlobalState } from "../context/AppProvider";
import styles from "../styles/QuestionsSetting.module.css";
import Spinner from "./Spinner";

const categories = [
  "arts_and_literature",
  "film_and_tv",
  "food_and_drink",
  "general_knowledge",
  "geography",
  "history",
  "music",
  "science",
  "society_and_culture",
  "sport_and_leisure",
]

const QuestionsSetting = () => {
    
    const [status, setStatus] = useState<'normal' | 'loading'>('normal')
    const { settings, handleChange, handleSubmit } = useGlobalState();

    return (
      <div>
          <h2 className={styles.title}>Category and Difficulty</h2>
          <div className={styles["select-wrapper"]}>
            <select onChange={handleChange} name="categories" className={styles.select} defaultValue={settings.categories}>
                <option value="">Random</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
            </select>
          </div>

          <div className={styles["select-wrapper"]}>
            <select onChange={handleChange} name="difficulty" className={styles.select} defaultValue={settings.difficulty}>
                <option value="">Random</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
          </div>

          <div className={styles.footer}>
              {
                status === 'normal' ? <button onClick={() => handleSubmit(setStatus)} className={styles.button}>Start</button> : <Spinner />
              }
          </div>

          
      </div>
    )
}

export default QuestionsSetting