import React from "react";

const AttemptHistory = ({ attempts }) => {
    return (
        <div>
            <h2>Attempt History</h2>
            <ul>
                {attempts.map((attempt, index) => (
                    <li key={index}>{`Score: ${attempt.score}, Time: ${attempt.timestamp}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default AttemptHistory;
