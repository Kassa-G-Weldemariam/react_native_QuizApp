import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentUnanswered, setCurrentUnanswered] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = (questions) => {
    setCurrentQuestions(questions);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCurrentUnanswered(0);
    setUserAnswers([]);
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, currentQuestions.length - 1));
  };

  const addScore = () => {
    setCurrentScore((prev) => prev + 1);
  };

  const addUnanswered = () => {
    setCurrentUnanswered((prev) => prev + 1);
  };

  const recordAnswer = (questionIndex, answer) => {
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
  };

  const resetQuiz = () => {
    setCurrentQuestions([]);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCurrentUnanswered(0);
    setUserAnswers([]);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestions,
        currentIndex,
        currentScore,
        currentUnanswered,
        userAnswers,
        startQuiz,
        nextQuestion,
        addScore,
        addUnanswered,
        recordAnswer,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
