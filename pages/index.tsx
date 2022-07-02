import Head from 'next/head'
import Box from '../components/Box'
import Model from '../components/Model'
import Questions from '../components/Questions'
import QuestionsSetting from '../components/QuestionsSetting'
import { useGlobalState } from '../context/AppProvider'
import styles from '../styles/Home.module.css'


interface IProps {
  [property: string]: any
}

const Home = () => {

  const { step } = useGlobalState();

  return (
    <div className={styles.home}>
      <Head>
        <title>Quiz Game</title>
        <meta name="description" content="Quiz application to improve your knowledge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box>
        { step === 1 ? <QuestionsSetting /> : <Questions /> }
      </Box>

    </div>
  )
}

export default Home