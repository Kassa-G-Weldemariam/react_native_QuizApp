import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuiz } from '../contexts/QuizContext';
import { fetchQuestions } from '../services/quizService';
import { COLORS } from '../constants/colors';

const CATEGORIES = [
  { id: '', name: 'Any Category' },
  { id: '9', name: 'General Knowledge' },
  { id: '17', name: 'Science & Nature' },
  { id: '18', name: 'Science: Computers' },
  { id: '19', name: 'Science: Mathematics' },
  { id: '22', name: 'Geography' },
  { id: '23', name: 'History' },
  { id: '21', name: 'Sports' },
  { id: '27', name: 'Animals' },
];

const DIFFICULTIES = [
  { id: '', name: 'Any Difficulty' },
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

export default function Home() {
  const router = useRouter();
  const { startQuiz } = useQuiz();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleStartQuiz = async () => {
    setError('');
    setLoading(true);
    try {
      const questions = await fetchQuestions(
        10,
        selectedCategory,
        selectedDifficulty
      );
      startQuiz(questions);
      router.replace('/quiz');
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Unable to load quiz questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Quiz App</Text>
        <Text style={styles.subtitle}>
          Fast mobile quiz flow with large touch targets and clean reading
          space.
        </Text>

        <View style={styles.selectionContainer}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.optionsGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.optionButton,
                  selectedCategory === category.id && styles.optionSelected,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedCategory === category.id &&
                      styles.optionTextSelected,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Difficulty</Text>
          <View style={styles.optionsRow}>
            {DIFFICULTIES.map((difficulty) => (
              <TouchableOpacity
                key={difficulty.id}
                style={[
                  styles.optionButton,
                  selectedDifficulty === difficulty.id && styles.optionSelected,
                ]}
                onPress={() => setSelectedDifficulty(difficulty.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedDifficulty === difficulty.id &&
                      styles.optionTextSelected,
                  ]}
                >
                  {difficulty.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleStartQuiz}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Start Quiz</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hintText}>
          Answer 10 questions, track your score, and get a quick results
          summary.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  selectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -3,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -3,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    minWidth: 70,
    alignItems: 'center',
    marginHorizontal: 3,
    marginBottom: 6,
  },
  optionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#f0f9ff',
  },
  optionText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  hintText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 18,
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 12,
  },
});
