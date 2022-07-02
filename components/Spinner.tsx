import { useEffect } from "react";
import styles from "../styles/Spinner.module.css";

const Spinner = () => {
    const radius = 14
    const length = radius * 2 + 20
    const circumference = Math.PI * radius * 2

    return (
        <svg width={length} height={length} className={styles.spinner}>
            <circle 
                className={styles.circle}
                r={radius}
                cx={length / 2} 
                cy={length / 2}
                strokeLinecap="round"
                fill="transparent"
                strokeWidth={4}
                strokeDasharray={circumference}
            />
        </svg>
    )
}

export default Spinner