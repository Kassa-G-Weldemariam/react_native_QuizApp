import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuiz } from '../contexts/QuizContext';
import { COLORS } from '../constants/colors';

export default function Review() {
  const router = useRouter();
  const { currentQuestions, userAnswers } = useQuiz();

  const handleBackToResults = () => {
    router.replace('/results');
  };

  const getAnswerStatus = (questionIndex) => {
    const userAnswer = userAnswers[questionIndex];
    const question = currentQuestions[questionIndex];

    if (!userAnswer) return { status: 'unanswered', color: COLORS.gray };
    if (userAnswer === question.correct)
      return { status: 'correct', color: COLORS.success };
    return { status: 'incorrect', color: COLORS.danger };
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'correct':
        return '✓ Correct';
      case 'incorrect':
        return '✗ Incorrect';
      case 'unanswered':
        return '○ Unanswered';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackToResults}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to Results</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Answers</Text>
        <View style={{ width: 120 }} />
      </View>

      <ScrollView style={styles.content}>
        {currentQuestions.map((question, index) => {
          const answerStatus = getAnswerStatus(index);
          const userAnswer = userAnswers[index];
          const correctOption = question.options.find(
            (opt) => opt.letter === question.correct
          );
          const userOption = userAnswer
            ? question.options.find((opt) => opt.letter === userAnswer)
            : null;

          return (
            <View key={question.id} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>Question {index + 1}</Text>
                <Text
                  style={[styles.statusBadge, { color: answerStatus.color }]}
                >
                  {getStatusText(answerStatus.status)}
                </Text>
              </View>

              <Text style={styles.questionText}>{question.question}</Text>

              <View style={styles.answersSection}>
                {userAnswer && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Your Answer:</Text>
                    <Text
                      style={[styles.answerText, { color: answerStatus.color }]}
                    >
                      {userOption?.letter}: {userOption?.text}
                    </Text>
                  </View>
                )}

                {answerStatus.status === 'incorrect' && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Correct Answer:</Text>
                    <Text
                      style={[styles.answerText, { color: COLORS.success }]}
                    >
                      {correctOption?.letter}: {correctOption?.text}
                    </Text>
                  </View>
                )}

                {answerStatus.status === 'unanswered' && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Correct Answer:</Text>
                    <Text
                      style={[styles.answerText, { color: COLORS.success }]}
                    >
                      {correctOption?.letter}: {correctOption?.text}
                    </Text>
                  </View>
                )}
              </View>

              {question.explanation ? (
                <Text style={styles.explanation}>{question.explanation}</Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    padding: 6,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  answersSection: {
    marginBottom: 12,
  },
  answerRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray,
    width: 100,
  },
  answerText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  explanation: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
