import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TEMPERAMENTS } from '../data/questions';

export default function StartScreen({ onStart, testMode, setTestMode }) {
  const temperamentList = Object.values(TEMPERAMENTS);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🧠</Text>
        <Text style={styles.heroTitle}>Тест на визначення темпераменту</Text>
        <Text style={styles.heroDescription}>
          Методика опитувальника Айзенка (EPI) з платформи «На Урок». Визначає
          особливості нервової системи та співвідношення екстраверсії / інтроверсії.
        </Text>
      </View>

      {/* Mode Selector */}
      <View style={styles.modeContainer}>
        <Text style={styles.sectionTitle}>Оберіть формат тестування:</Text>
        <View style={styles.modeButtonsRow}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              testMode === 'naurok' && styles.modeButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setTestMode('naurok')}
          >
            <Text
              style={[
                styles.modeButtonText,
                testMode === 'naurok' && styles.modeButtonTextActive,
              ]}
            >
              📋 Повний тест (42 питання)
            </Text>
            <Text style={styles.modeSubText}>Точна методика Naurok</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              testMode === 'express' && styles.modeButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setTestMode('express')}
          >
            <Text
              style={[
                styles.modeButtonText,
                testMode === 'express' && styles.modeButtonTextActive,
              ]}
            >
              ⚡ Експрес (12 питань)
            </Text>
            <Text style={styles.modeSubText}>Швидка оцінка</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scoring Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>⚖️ Система оцінювання відповідей:</Text>
        <Text style={styles.infoText}>
          • <Text style={{ color: '#22C55E', fontWeight: '700' }}>ТАК</Text> — 1 бал{'\n'}
          • <Text style={{ color: '#F59E0B', fontWeight: '700' }}>ІНОДІ</Text> — 0.5 балів{'\n'}
          • <Text style={{ color: '#EF4444', fontWeight: '700' }}>НІ</Text> — 0 балів{'\n\n'}
          Кожне питання задається через діалогове вікно <Text style={{ color: '#38BDF8', fontWeight: '700' }}>Alert</Text>.
        </Text>
      </View>

      {/* Temperament Types preview */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Шкала балів та типи:</Text>
      </View>

      <View style={styles.grid}>
        {temperamentList.map((item) => (
          <View
            key={item.id}
            style={[styles.tempItem, { borderLeftColor: item.color }]}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.tempEmoji}>{item.emoji}</Text>
              <Text style={[styles.tempName, { color: item.color }]}>
                {item.name}
              </Text>
              <Text style={styles.rangeBadge}>{item.range}</Text>
            </View>
            <Text style={styles.tempMotto}>{item.motto}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        activeOpacity={0.8}
        onPress={onStart}
      >
        <Text style={styles.startButtonText}>🚀 РОЗПОЧАТИ ТЕСТ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#334155',
  },
  heroEmoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 19,
  },
  modeContainer: {
    marginBottom: 18,
  },
  modeButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  modeButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#334155',
    alignItems: 'center',
  },
  modeButtonActive: {
    borderColor: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  modeButtonText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  modeButtonTextActive: {
    color: '#38BDF8',
  },
  modeSubText: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 4,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  infoBox: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#38BDF8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  grid: {
    gap: 8,
    marginBottom: 20,
  },
  tempItem: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderWidth: 1,
    borderColor: '#334155',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  tempEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  tempName: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  rangeBadge: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  tempMotto: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
  startButton: {
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
  startButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
