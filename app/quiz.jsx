import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuiz } from '../contexts/QuizContext';
import { COLORS } from '../constants/colors';

const CORAL = '#FF6B6B';

export default function Quiz() {
  const router = useRouter();
  const {
    currentQuestions,
    currentIndex,
    currentScore,
    nextQuestion,
    addScore,
    addUnanswered,
    recordAnswer,
    resetQuiz,
  } = useQuiz();
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [stage, setStage] = useState('quiz');
  const [feedbackState, setFeedbackState] = useState({
    isCorrect: false,
    selected: null,
  });
  const [extraTime, setExtraTime] = useState(false);

  const question = currentQuestions[currentIndex];
  const isLastQuestion = currentIndex + 1 >= currentQuestions.length;

  useEffect(() => {
    if (!question) return;
    setSelected(null);
    if (extraTime) {
      setTimeLeft(35);
      setExtraTime(false);
    } else {
      setTimeLeft(30);
    }
    setStage('quiz');
  }, [currentIndex, question]);

  useEffect(() => {
    if (!question || stage !== 'quiz') return;
    if (timeLeft <= 0) {
      setStage('time-up');
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, question, stage]);

  useEffect(() => {
    if (!question) {
      router.replace('/');
    }
  }, [question, router]);

  const handleSubmit = () => {
    if (!question || !selected) return;
    const isCorrect = selected === question.correct;
    if (isCorrect) {
      addScore();
    }
    recordAnswer(currentIndex, selected);
    setFeedbackState({ isCorrect, selected });
    setStage('answered');
  };

  const handleSkip = () => {
    if (!question) return;
    addUnanswered();
    recordAnswer(currentIndex, null);
    if (isLastQuestion) {
      router.replace('/results');
      return;
    }
    nextQuestion();
  };

  const handleContinue = () => {
    if (stage === 'time-up') {
      addUnanswered();
      recordAnswer(currentIndex, null);
      setExtraTime(true);
    }
    if (isLastQuestion) {
      router.replace('/results');
      return;
    }
    nextQuestion();
    router.replace('/quiz');
  };

  const handleRestart = () => {
    resetQuiz();
    router.replace('/');
  };

  if (!question) {
    return (
      <View style={styles.container}>
        <Text style={styles.fallbackText}>Preparing your quiz...</Text>
      </View>
    );
  }

  const progressText = `${currentIndex + 1} / ${currentQuestions.length}`;
  const scoreText = `${currentScore}/${currentQuestions.length}`;
  const selectedOption = question.options.find(
    (_, index) => String.fromCharCode(65 + index) === selected
  );
  const correctOption = question.options.find(
    (opt) => opt.letter === question.correct
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleRestart} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={styles.scorePill}>
          <Text style={styles.scorePillText}>{scoreText}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.progressText}>Question {progressText}</Text>
        <View style={styles.timerBadge}>
          <Text style={styles.timerValue}>
            {stage === 'quiz' ? timeLeft : 0}
          </Text>
          <Text style={styles.timerLabel}>sec</Text>
        </View>
      </View>

      {stage !== 'time-up' ? (
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            {question.image ? (
              <Image source={{ uri: question.image }} style={styles.image} />
            ) : null}
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          <View style={styles.optionsList}>
            {question.options.map((option) => {
              const isSelected = selected === option.letter;
              const isCorrectOption = option.letter === question.correct;
              const isIncorrectSelection =
                stage === 'answered' && isSelected && !isCorrectOption;
              return (
                <TouchableOpacity
                  key={option.letter}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    stage === 'answered' &&
                      isCorrectOption &&
                      styles.optionCorrect,
                    isIncorrectSelection && styles.optionIncorrect,
                  ]}
                  onPress={() => stage === 'quiz' && setSelected(option.letter)}
                  activeOpacity={stage === 'quiz' ? 0.8 : 1}
                >
                  <View
                    style={[
                      styles.optionMarker,
                      stage === 'answered' &&
                        isCorrectOption &&
                        styles.optionMarkerCorrect,
                      isIncorrectSelection && styles.optionMarkerIncorrect,
                    ]}
                  >
                    <Text style={styles.optionMarkerText}>{option.letter}</Text>
                  </View>
                  <Text style={styles.optionLabel}>{option.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {stage === 'answered' ? (
            <View style={styles.messageCard}>
              <Text
                style={[
                  styles.outcomeTitle,
                  feedbackState.isCorrect
                    ? styles.correctText
                    : styles.incorrectText,
                ]}
              >
                {feedbackState.isCorrect ? 'Correct!' : 'Incorrect'}
              </Text>
              <Text style={styles.outcomeMessage}>
                {feedbackState.isCorrect
                  ? `Correct answer: ${correctOption?.letter}: ${correctOption?.text}`
                  : `The correct answer was ${correctOption?.letter}: ${correctOption?.text}`}
              </Text>
              {question.explanation ? (
                <Text style={styles.subMessage}>{question.explanation}</Text>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <View style={styles.messageCard}>
          <Text style={[styles.outcomeTitle, styles.incorrectText]}>
            Time's Up
          </Text>
          <Text style={styles.outcomeMessage}>
            You ran out of time for this question.
          </Text>
          <Text style={styles.subMessage}>
            The correct answer was {correctOption?.letter}:{' '}
            {correctOption?.text}
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        {stage === 'quiz' ? (
          <>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleSkip}
            >
              <Text style={styles.secondaryText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryButton, !selected && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!selected}
            >
              <Text style={styles.primaryButtonText}>Confirm</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleContinue}>
            <Text style={styles.primaryButtonText}>
              {isLastQuestion ? 'See Results' : 'Next Question'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  scorePill: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  scorePillText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '700',
  },
  timerBadge: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  timerValue: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  timerLabel: { fontSize: 12, color: COLORS.gray },
  content: { flex: 1 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    marginBottom: 14,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 24,
  },
  optionsList: { marginBottom: 12 },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionSelected: {
    backgroundColor: '#ecfdf5',
    borderColor: COLORS.primary,
  },
  optionCorrect: {
    backgroundColor: '#dcfce7',
    borderColor: COLORS.success,
  },
  optionIncorrect: {
    backgroundColor: '#fee2e2',
    borderColor: COLORS.danger,
  },
  optionMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionMarkerCorrect: {
    backgroundColor: COLORS.success,
  },
  optionMarkerIncorrect: {
    backgroundColor: COLORS.danger,
  },
  optionMarkerText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  optionLabel: { flex: 1, fontSize: 15, color: COLORS.text },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 12,
  },
  outcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  correctText: { color: '#16a34a' },
  incorrectText: { color: CORAL },
  outcomeMessage: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  subMessage: { fontSize: 13, color: COLORS.gray, lineHeight: 18 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  nextButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 6,
    marginBottom: 20,
  },
  secondaryText: { color: COLORS.text, fontSize: 15, fontWeight: '700' },
  disabledButton: { opacity: 0.55 },
  fallbackText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 40,
  },
});
