import styles from "../styles/Box.module.css";

const Box = ({ children }: { children: JSX.Element }) => {
    return (
        <div className={styles.box}>
            {children}
        </div>
    )
}

export default Box