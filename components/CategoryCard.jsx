// Components
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconWrapper, { backgroundColor: category.bg }]}>
          <Text style={styles.icon}>{category.icon}</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {category.completed}/{category.total}
          </Text>
        </View>
      </View>

      <Text style={styles.name}>{category.name}</Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${category.progress}%` }]}
        />
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.progressText}>{category.progress}%</Text>
        <Text style={styles.start}>START</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 22 },
  countBadge: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  countText: { color: COLORS.gray, fontWeight: '700', fontSize: 12 },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: COLORS.primary },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  progressText: { fontSize: 12, color: COLORS.gray, fontWeight: '700' },
  start: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
});
