import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export function OptionButton({ letter, text, onPress, selected, correct }) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        selected && styles.selected,
        correct && styles.correct,
      ]}
      onPress={onPress}
    >
      <Text style={styles.letter}>{letter}</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  letter: { width: 30, fontSize: 20, fontWeight: '700', color: COLORS.primary },
  text: { flex: 1, fontSize: 17 },
  selected: { borderColor: COLORS.primary, backgroundColor: '#f0f9ff' },
  correct: { borderColor: COLORS.success, backgroundColor: '#f0fdf4' },
});
