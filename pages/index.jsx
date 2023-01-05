import React from "react"
import {useState, useEffect} from "react"
import Question from "../components/Question"
import Categories from "../components/forms/Categories.jsx"
import Difficulties from "../components/forms/Difficulties.jsx"

export default function App() {
    const [startQuiz, setStartQuiz ] = useState(true)
    const [endGame, setEndGame] = useState(false)
    const [questions, setQuestions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState(null)
    const [newPage, setNewPage] = useState(false)
    const [emojiResults, setEmojiResults] = useState("")

    
// ~~~~~~ START PAGE ~~~~~~
    // Forms
    const [category, setCategory] = useState()
    const [difficulty, setDifficulty] = useState()

    
    function decodeArray(arr) {
        const decoded = arr.map((element) => 
            element.replace(/&amp;/g,"&")
            .replace(/&quot;/g,'"').replace(/&#039;/g, "'")
            .replace(/&ndash;/g, "-").replace(/&rsquo;/g, "’")
            .replace(/&ouml;/g, "ö")
        )
        console.log(decoded)
        return decoded
    }

    function decodeItem(item) {
        const decoded = item.replace(/&amp;/g,"&")
        .replace(/&quot;/g,'"').replace(/&#039;/g, "'")
        .replace(/&ndash;/g, "-").replace(/&rsquo;/g, "’")
        .replace(/&ouml;/g, "ö")
        return decoded
    }  

    // Redirects to Question page
    function startBtn() {  
      setStartQuiz(prevState => !prevState)
    }
    
    
// ~~~~~~ QUIZ PAGE ~~~~~~


    // ENDGAME to check answers


    // SHUFFLE FUNCTION for possible answers randomization
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }
    
    // API DATA receiving all questions
        
    
        useEffect(() => {
            fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)   
                .then(res => res.json())
                .then(data =>  {
                    console.log(data.results)
                    setQuestions(data.results.map(result => {
                        return {
                            question: decodeItem(result.question),
                            possibleAnswers: decodeArray(shuffleArray([...result.incorrect_answers, result.correct_answer])),
                            correctAnswer: decodeItem(result.correct_answer),
                            selectedAnswer: ''
                            }
                    }))})
        }, [newPage, category, difficulty])   
   
    
    // SET SELECTED ANSWER function (map through questions to find matching id of selected, then set selectedAnswer to true)
    function setSelectedAnswer(id, answer) {
        setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                return question.question === id ? {...question, selectedAnswer: answer} : question
            })
        })
        
    }
    
    // CHECK ANSWERS + PLAY AGAIN
    
    function checkAnswers() {
        setEndGame(true)
        console.log(questions)
        const reducedToCorrect = questions.reduce((prev, current) => {
            return current.correctAnswer === current.selectedAnswer ? prev + 1 : prev
        }, 0)
        console.log(reducedToCorrect)
        setCorrectAnswers(reducedToCorrect)
        if (reducedToCorrect === 0) {
            setEmojiResults("😭😱💔")
        } else if (reducedToCorrect === 1) {
            setEmojiResults("🥺")
        } else if (reducedToCorrect === 2) {
            setEmojiResults("😪")
        } else if (reducedToCorrect === 3) {
            setEmojiResults("🙂")
        } else if (reducedToCorrect === 4) {
            setEmojiResults("😀😎")
        } else if (reducedToCorrect === 5) {
            setEmojiResults("🤩🥳🎉")
        }
    }
    
    function playAgain() {
        setEndGame(false)
        setStartQuiz(true)
        setNewPage(!newPage)
    }
     
     
    // RENDER QUESTION DATA TO COMPONENT
    const questionElements = questions.map((question) => {
        return <Question
            {...question}
            key={question.question}
            id={question.question}
            endGame={endGame}
            setSelectedAnswer={setSelectedAnswer}
            />      
    })
    
// ****** APP COMPONENT ******
    return (
        <div className="Container">
            {
                startQuiz 
                ?
                <div className="StartContainer">
                    <h1>Quizzical</h1>
                    <h3>Test your knowledge!</h3>

                    <Categories category={category} setCategory={setCategory} />
                    <Difficulties difficulty={difficulty} setDifficulty={setDifficulty} />

                    <button className="StartBtn" onClick={startBtn}>Start quiz</button>
                    <p >Powered by the <a href="https://opentdb.com/" target="_blank" rel="noreferrer">Open Trivia Database API</a>!</p>
                </div>
            :
            <div className="QuestionsContainer">
                <h1>Quizzical</h1>
                {questionElements}
                { 
                    endGame
                    ?
                    <div className="ScoreContainer">
                        <div className="emojis">{emojiResults}</div>
                        <h2 className="Score">You scored {correctAnswers}/5 correct answers!</h2>
                        <button onClick={playAgain} className="PlayAgain">Play Again</button>
                    </div>
                    :
                    <button className="CheckAnswers" onClick={checkAnswers}>Check answers</button>  
                }
            </div>
            }
        </div>
    )
}
