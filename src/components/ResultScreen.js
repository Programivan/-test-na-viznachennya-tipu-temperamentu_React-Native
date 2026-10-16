import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TEMPERAMENTS, calculateTemperamentByScore } from '../data/questions';

export default function ResultScreen({
  totalScore,
  totalQuestions,
  onRestart,
  onShowAlertResult,
}) {
  const dominant = calculateTemperamentByScore(totalScore, totalQuestions);
  const temperamentList = Object.values(TEMPERAMENTS);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Winner Hero Card */}
      <View style={[styles.resultCard, { borderColor: dominant.color }]}>
        <Text style={styles.congratsBadge}>РЕЗУЛЬТАТ ТЕСТУВАННЯ</Text>
        <Text style={styles.dominantEmoji}>{dominant.emoji}</Text>
        <Text style={[styles.dominantName, { color: dominant.color }]}>
          {dominant.name}
        </Text>
        <Text style={styles.dominantMotto}>{dominant.motto}</Text>

        <View style={styles.scoreBadgeBox}>
          <Text style={styles.scoreBadgeText}>
            Ваш результат: <Text style={{ color: dominant.color, fontWeight: '900' }}>{totalScore}</Text> балів ({dominant.range})
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.descriptionText}>{dominant.description}</Text>

        <View style={styles.traitsContainer}>
          <Text style={styles.traitsTitle}>Характерні ознаки:</Text>
          {dominant.traits.map((trait, index) => (
            <View key={index} style={styles.traitRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.traitText}>{trait}</Text>
            </View>
          ))}
        </View>

        <View style={styles.adviceBox}>
          <Text style={styles.adviceTitle}>💡 Порада для розвитку:</Text>
          <Text style={styles.adviceText}>{dominant.advice}</Text>
        </View>
      </View>

      {/* Scale Comparison Card */}
      <View style={styles.breakdownCard}>
        <Text style={styles.breakdownTitle}>Шкала оцінювання (Айзенк EPI)</Text>
        <Text style={styles.breakdownSubtitle}>
          Ваше положення на шкалі типів темпераменту:
        </Text>

        {temperamentList.map((item) => {
          const isSelected = item.id === dominant.id;
          return (
            <View
              key={item.id}
              style={[
                styles.scaleItem,
                isSelected && {
                  borderColor: item.color,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderWidth: 2,
                },
              ]}
            >
              <View style={styles.scaleRow}>
                <Text style={styles.scaleEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.scaleName,
                    isSelected && { color: item.color, fontWeight: '800' },
                  ]}
                >
                  {item.shortName}
                </Text>
                <Text style={styles.scaleRange}>{item.range}</Text>
                {isSelected && (
                  <View
                    style={[styles.activeTag, { backgroundColor: item.color }]}
                  >
                    <Text style={styles.activeTagText}>Ваш тип</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.alertResultButton}
        activeOpacity={0.8}
        onPress={onShowAlertResult}
      >
        <Text style={styles.alertResultButtonText}>
          🔔 Показати резюме в Alert
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.restartButton}
        activeOpacity={0.8}
        onPress={onRestart}
      >
        <Text style={styles.restartButtonText}>🔄 Пройти тест ще раз</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  congratsBadge: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  dominantEmoji: {
    fontSize: 50,
    marginBottom: 6,
  },
  dominantName: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 4,
  },
  dominantMotto: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 14,
    fontStyle: 'italic',
  },
  scoreBadgeBox: {
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  scoreBadgeText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#334155',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#E2E8F0',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 16,
  },
  traitsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  traitsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  traitRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  bullet: {
    color: '#38BDF8',
    fontSize: 16,
    marginRight: 8,
    lineHeight: 20,
  },
  traitText: {
    color: '#CBD5E1',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  adviceBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#38BDF8',
  },
  adviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
    marginBottom: 4,
  },
  adviceText: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 19,
  },
  breakdownCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  breakdownSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 14,
  },
  scaleItem: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scaleEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  scaleName: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  scaleRange: {
    color: '#64748B',
    fontSize: 12,
    marginRight: 8,
  },
  activeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  alertResultButton: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  alertResultButtonText: {
    color: '#38BDF8',
    fontSize: 15,
    fontWeight: '700',
  },
  restartButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  restartButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
