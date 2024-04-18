import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';


const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [showStartPopup, setShowStartPopup] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);

    const [questions, setQuestions] = useState([]);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        setIsAnswered(true);

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setIsAnswered(false);
            } else {
                setShowScore(true);
            }
        }, 1000);
    };

    const restartQuiz = () => {
        setShowScore(false);
        setCurrentQuestion(0);
        setScore(0);
        setShowStartPopup(true);
        setIsAnswered(false);
    };

    const startQuiz = () => {
        setShowStartPopup(false);
    };

    const { courseId, contentId, quizId } = useParams();
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const { accessToken } = useSelector(
        state => state.auth
    );

    useEffect(() => {
        const fetch = async () => {
            try {
                // Check if access token exists
                if (!accessToken) {
                    console.error('Access token not found in local storage');
                    return;
                }

                // Set the authorization header with the access token
                const headers = {
                    'Authorization': `Bearer ${accessToken}`
                };


                // Make the HTTP request with the authorization header
                // const response = await axios.get(`${baseUrl}/courses/${courseId}/content/`, { headers });
                const response = await axios.get(`${baseUrl}/courses/quiz-questions/?quiz_id=${quizId}`, { headers });

                const questions = response.data.map(question => ({
                    text: question.question,
                    options: [
                        { id: 0, text: question.op1, isCorrect: question.ans === question.op1 },
                        { id: 1, text: question.op2, isCorrect: question.ans === question.op2 },
                        { id: 2, text: question.op3, isCorrect: question.ans === question.op3 },
                        { id: 3, text: question.op4, isCorrect: question.ans === question.op4 },
                    ],
                }));

                setQuestions(questions);

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetch();
    }, [baseUrl, accessToken, quizId]);

    const markContentProgress = async () => {
        try {

            // Check if access token exists
            if (!accessToken) {
                console.error('Access token not found in local storage');
                return;
            }

            // Set the authorization header with the access token
            const headers = {
                'Authorization': `Bearer ${accessToken}`
            };

            const body = {
            };

            // Make the HTTP request with the authorization header
            const response = await axios.post(`${baseUrl}/courses/post-course/${courseId}/contents/${contentId}/progress/`, body, { headers });

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };


    useEffect(() => {
        if (showScore && score === questions.length) {
            markContentProgress();
        }
    }, [showScore, score, questions.length]);



    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100">
            <AnimatePresence>
                {showStartPopup && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-bold mb-4">Welcome to the Quiz!</h2>
                        <button
                            onClick={startQuiz}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Start Quiz
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showScore ? (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            You scored {score} out of {questions.length}
                        </h2>
                        <button
                            onClick={restartQuiz}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Restart Quiz
                        </button>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        {!showStartPopup && (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
                            >
                                <div className="question-section">
                                    <div className="question-count mb-4 text-gray-600">
                                        <span>Question {currentQuestion + 1}</span>/
                                        {questions.length}
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="question-text text-lg font-bold mb-6"
                                    >
                                        {questions[currentQuestion].text}
                                    </motion.div>
                                </div>
                                <div className="answer-section">
                                    <AnimatePresence>
                                        {isAnswered ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: -100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 100 }}
                                                transition={{ duration: 0.5 }}
                                                className="flex justify-center items-center h-full"
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, y: -100 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="text-blue-500 text-xl font-semibold"
                                                >
                                                    Loading...
                                                </motion.div>
                                            </motion.div>
                                        ) : (
                                            questions[currentQuestion].options.map((answerOption) => (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={answerOption.id}
                                                    onClick={() =>
                                                        handleAnswerOptionClick(answerOption.isCorrect)
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                                                >
                                                    {answerOption.text}
                                                </motion.button>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuizPage;