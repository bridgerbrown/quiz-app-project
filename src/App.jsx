import React from "react"
import {useState, useEffect} from "react"
import Start from "./Start.jsx"
import Question from "./Question.jsx"

export default function App() {
    const [startQuiz, setStartQuiz ] = useState(true)
    const [endGame, setEndGame] = useState(false)
    const [questions, setQuestions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [newPage, setNewPage] = useState(false)

    
// ~~~~~~ START PAGE ~~~~~~
    // Form dropdowns
    const [category, setCategory] = useState({
        value: 9
    })
    const [difficulty, setDifficulty] = useState({
        value: "easy"
    })

    handleCategoryCallback = (childData) => {
        setCategory({value: childData})
    }

    handleDifficultyCallback = (childData) => {
        setDifficulty({value: childData})
    }

    // Redirects to Question page
    function startBtn() {  
      setStartQuiz(prevState => !prevState)
    }
    
    
// ~~~~~~ QUIZ PAGE ~~~~~~


    // ENDGAME to check answers
    useEffect(() => {
        if (endGame) {
            const reducedToCorrect = questions.reduce((prev, current) => {
                return current.correctAnswer === current.selectedAnswer ? prev + 1 : prev
            }, 0)
            setCorrectAnswers(reducedToCorrect)
        }
    })

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
            fetch(`https://opentdb.com/api.php?amount=5&category=${category.value}&difficulty=${difficulty.value}&type=multiple`)   
                .then(res => res.json())
                .then(data =>  {
                    setQuestions(data.results.map(result => {
                        return {
                            question: result.question.replace(/&amp;/g,"&").replace(/&quot;/g,'"')          .replace(/&#039;/g, "'"),
                            possibleAnswers: shuffleArray([...result.incorrect_answers, result.correct_answer]),
                            correctAnswer: result.correct_answer,
                            selectedAnswer: ''
                            }
                    }))})
        }, [newPage])   
                       
    
   
    
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
                startQuiz ?
                <Start handleClick={startBtn} 
                    categoryCallback={handleCategoryCallback} 
                    categoryProp={category}
                    difficultyCallback={handleDifficultyCallback} 
                    difficultyProp={difficulty}
                />
                :
                <div className="QuestionsContainer">
                  <h1>Quizzical</h1>
                  {questionElements}
                {
                    endGame
                    ?
                    <div>
                        <h2 className="Score">You scored {correctAnswers}/5 correct answers!</h2>
                        <button onClick={playAgain} className="CheckAnswers">Play Again</button>
                    </div>
                    :
                    <button className="CheckAnswers" onClick={checkAnswers}>Check answers</button>  
                }
                </div>
            }
        </div>
    )
}
