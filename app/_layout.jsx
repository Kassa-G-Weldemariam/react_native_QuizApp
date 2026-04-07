import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { QuizProvider } from '../contexts/QuizContext';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QuizProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </QuizProvider>
    </ErrorBoundary>
  );
}
