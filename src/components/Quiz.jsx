import React, { useState, useEffect } from "react";
import { questions } from "../data/questions";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import AttemptHistory from "./AttemptHistory";
import { useIndexedDB } from "../utils/useIndexedDB";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [attempts, setAttempts] = useState([]);
    const [quizEnded, setQuizEnded] = useState(false);
    const { addAttempt, getAttempts } = useIndexedDB();

    const optionLabels = ["A", "B", "C", "D"]; // Labels for options

    useEffect(() => {
        getAttempts().then(setAttempts);
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            nextQuestion();
        }
    }, [timer]);

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestion].correct) {
            setScore(score + 1);
        }

        setTimeout(() => nextQuestion(), 1000);
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimer(30);
        } else {
            saveAttempt();
            setQuizEnded(true);
        }
    };

    const saveAttempt = () => {
        const attempt = { score, timestamp: new Date().toLocaleString() };
        addAttempt(attempt);
        setAttempts([...attempts, attempt]);
    };

    if (quizEnded) {
        const percentage = ((score / questions.length) * 100).toFixed(2);
        let messageClass = "poor";
        let message = "Better luck next time!";

        if (percentage >= 80) {
            message = "Excellent job!";
            messageClass = "excellent";
        } else if (percentage >= 50) {
            message = "Good effort!";
            messageClass = "good";
        }

        return (
            <div className="result-container">
                <h2>Quiz Completed!</h2>
                <p>Final Score: {score} / {questions.length}</p>
                <p>Accuracy: {percentage}%</p>
                <p className={`result-message ${messageClass}`}>{message}</p>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            {/* Timer centered at the top */}
            <div className="timer"><Timer timeLeft={timer} /></div>

            {/* Question aligned left */}
            <div className="question-container">
                <span>Q{currentQuestion + 1}: {questions[currentQuestion].question}</span>
            </div>

            {/* Options aligned directly below the question */}
            <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => (
                    <button 
                        key={index} 
                        className={`option-button ${selectedAnswer === option ? 
                        (option === questions[currentQuestion].correct ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => handleAnswer(option)}
                    >
                        <strong>{optionLabels[index]}.</strong> {option} 
                    </button>
                ))}
            </div>

            {/* Score at the bottom-center */}
            <div className="scoreboard">
                <span>Score: {score}</span>
            </div>

            {/* Attempt History at bottom-right */}
            <div className="attempt-history">
                <AttemptHistory attempts={attempts} />
            </div>
        </div>
    );
};

export default Quiz;
