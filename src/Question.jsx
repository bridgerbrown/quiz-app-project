import React from "react"

export default function Question(props) {
    const answers = props.possibleAnswers.map(answer => {
        let styles
        let click
        
        if (props.endGame) {
            if (props.selectedAnswer === props.correctAnswer) {
                styles = {
                    backgroundColor: props.selectedAnswer === answer ? '#94D7A2' : '#F5F7FB'
                }
            } else if (props.selectedAnswer !== props.correctAnswer) {
                styles = {
                    backgroundColor: props.selectedAnswer === answer ? '#F8BCBC' 
                        : answer === props.correctAnswer ? '#94D7A2' : '#F5F7FB' 
                }
            }
        } else {
            styles = {
                backgroundColor: props.selectedAnswer === answer ? '#D6DBF5' : '#F5F7FB'
            }
            click = () => props.setSelectedAnswer(props.id, answer)
        }
        
        return <div>
                    <button 
                    onClick={click}
                    key={answer}
                    style={styles}
                    >
                    {answer}
                    </button>
               </div>
        
    })
        
    return (
            <div className="Question">
                <h3>{props.question}</h3>
                <div className="Answers">
                    {answers}
                </div>
            </div>            
    )
}
