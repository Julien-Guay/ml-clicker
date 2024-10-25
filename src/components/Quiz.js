import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

function Quiz() {
    const { innovationPoints, setInnovationPoints } = useAppContext();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionVisible, setQuestionVisible] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    // Liste des questions, réponses et points d'innovation associés
    const questions = [
        {
            text: 'Quelle est la capitale de la France ?',
            answer: 'Paris',
            points: 12
        },
        {
            text: 'Combien font 2 + 2 ?',
            answer: '4',
            points: 33
        },
        {
            text: 'Quel est le langage de programmation utilisé principalement pour le développement web côté client ?',
            answer: 'JavaScript',
            points: 56
        }
    ];

    const startQuiz = () => {
        setQuestionVisible(true);
        setFeedback('');
    };

    const submitAnswer = () => {
        const currentQuestion = questions[questionIndex];
        if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
            // Si la réponse est correcte, on augmente les points d'innovation
            setInnovationPoints(innovationPoints + currentQuestion.points);
            setFeedback('Bonne réponse ! Vous avez gagné ' + currentQuestion.points + ' points d\'innovation.');
        } else {
            setFeedback('Mauvaise réponse. Essayez encore !');
        }

        // Passer à la question suivante ou terminer le quiz
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            setQuestionVisible(false);
            setQuestionIndex(0); // Réinitialiser l'index des questions
        }

        // Réinitialiser la réponse de l'utilisateur
        setUserAnswer('');
    };

    return (
        <div id="programming-quiz" className="floating-quiz">
            <h3>Quiz de Programmation</h3>
            <button onClick={startQuiz}>Démarrer le Quiz</button>
            {questionVisible && (
                <div id="quiz-question">
                    <p id="question-text">{questions[questionIndex].text}</p>
                    <textarea
                        id="answer-input"
                        rows="2"
                        cols="50"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    ></textarea>
                    <button onClick={submitAnswer}>Soumettre</button>
                </div>
            )}
            {feedback && <div id="quiz-result">{feedback}</div>}
        </div>
    );
}

export default Quiz;
