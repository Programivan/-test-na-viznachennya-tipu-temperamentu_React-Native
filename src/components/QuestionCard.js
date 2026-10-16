import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function QuestionCard({
  currentIndex,
  totalQuestions,
  question,
  onAnswer,
  onShowAlert,
  onCancel,
}) {
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressLabel}>Прогрес тестування</Text>
          <Text style={styles.progressCounter}>
            {currentIndex + 1} / {totalQuestions} ({progressPercent}%)
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
          />
        </View>
      </View>

      {/* Question Card */}
      <View style={styles.card}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Запитання № {currentIndex + 1}</Text>
        </View>

        <Text style={styles.questionText}>{question.text}</Text>

        {/* 3 Answer Buttons according to Naurok */}
        <View style={styles.buttonCol}>
          <TouchableOpacity
            style={[styles.answerButton, styles.yesButton]}
            activeOpacity={0.8}
            onPress={() => onAnswer(1)}
          >
            <Text style={styles.buttonTextLight}>✅ ТАК (+1 бал)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.answerButton, styles.maybeButton]}
            activeOpacity={0.8}
            onPress={() => onAnswer(0.5)}
          >
            <Text style={styles.buttonTextLight}>🤔 ІНОДІ (+0.5 бала)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.answerButton, styles.noButton]}
            activeOpacity={0.8}
            onPress={() => onAnswer(0)}
          >
            <Text style={styles.buttonTextLight}>❌ НІ (0 балів)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.alertOptionButton}
          activeOpacity={0.7}
          onPress={onShowAlert}
        >
          <Text style={styles.alertOptionText}>
            🔔 Показати це питання у вікні Alert
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cancel Test */}
      <TouchableOpacity
        style={styles.cancelButton}
        activeOpacity={0.7}
        onPress={onCancel}
      >
        <Text style={styles.cancelText}>Зупинити тестування</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  progressCounter: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 4,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 14,
  },
  tagText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  questionText: {
    fontSize: 18,
    color: '#F8FAFC',
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonCol: {
    gap: 10,
    marginBottom: 14,
  },
  answerButton: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#16A34A',
  },
  maybeButton: {
    backgroundColor: '#D97706',
  },
  noButton: {
    backgroundColor: '#DC2626',
  },
  buttonTextLight: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  alertOptionButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  alertOptionText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  cancelButton: {
    marginTop: 18,
    alignItems: 'center',
    padding: 10,
  },
  cancelText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
