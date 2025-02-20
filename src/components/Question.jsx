import React from "react";

const Question = ({ question, options, handleAnswer, selectedAnswer, correctAnswer }) => {
    return (
        <div>
            <h3>{question}</h3>
            <div className="options">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`option-btn 
                            ${selectedAnswer === option ? 
                                (option === correctAnswer ? "correct" : "wrong") 
                                : ""}`}
                        disabled={selectedAnswer !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
