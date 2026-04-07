import React, { useEffect } from 'react';
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
import { fetchQuestions } from '../services/quizService';

export default function Results() {
  const router = useRouter();
  const {
    currentScore,
    currentQuestions,
    resetQuiz,
    currentUnanswered,
    startQuiz,
  } = useQuiz();
  const total = currentQuestions.length;
  const percentage = total ? Math.round((currentScore / total) * 100) : 0;
  const incorrect = total - currentScore - currentUnanswered;

  useEffect(() => {
    if (total === 0) {
      router.replace('/');
    }
  }, [total, router]);

  const handleRetake = async () => {
    resetQuiz();
    try {
      const questions = await fetchQuestions(10);
      startQuiz(questions);
      router.replace('/quiz');
    } catch (error) {
      console.error('Error retaking quiz:', error);
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.scoreRing}>
            <Text style={styles.scoreText}>
              {currentScore} / {total}
            </Text>
            <Text style={styles.scoreLabel}>Correct</Text>
          </View>
          <Text style={styles.percentage}>{percentage}%</Text>
          <Text style={styles.subtitle}>
            {percentage >= 50 ? 'Nice work!' : 'Keep practicing!'} Your quiz is
            complete.
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✓</Text>
            <Text style={styles.statValue}>{currentScore}</Text>
            <Text style={styles.statLabel}>Correct</Text>
            <View style={styles.statBar}>
              <View
                style={[
                  styles.statFill,
                  {
                    width: `${total ? (currentScore / total) * 100 : 0}%`,
                    backgroundColor: '#10b981',
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✕</Text>
            <Text style={styles.statValue}>{incorrect}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
            <View style={styles.statBar}>
              <View
                style={[
                  styles.statFill,
                  {
                    width: `${total ? (incorrect / total) * 100 : 0}%`,
                    backgroundColor: '#ef4444',
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>○</Text>
            <Text style={styles.statValue}>{currentUnanswered}</Text>
            <Text style={styles.statLabel}>Unanswered</Text>
            <View style={styles.statBar}>
              <View
                style={[
                  styles.statFill,
                  {
                    width: `${total ? (currentUnanswered / total) * 100 : 0}%`,
                    backgroundColor: '#6b7280',
                  },
                ]}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleRetake}>
          <Text style={styles.primaryButtonText}>Retake Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/review')}
        >
          <Text style={styles.secondaryButtonText}>Review Answers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  scoreRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 14,
  },
  scoreText: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  scoreLabel: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
  percentage: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: COLORS.gray, textAlign: 'center' },
  stats: { width: '100%', marginTop: 16 },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 3,
  },
  statIcon: { fontSize: 18, marginBottom: 6 },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: { fontSize: 12, color: COLORS.gray, marginBottom: 8 },
  statBar: {
    height: 5,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  statFill: { height: '100%' },
  primaryButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 5,
  },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 12,
  },
  secondaryButtonText: { color: COLORS.text, fontSize: 15, fontWeight: '700' },
});
