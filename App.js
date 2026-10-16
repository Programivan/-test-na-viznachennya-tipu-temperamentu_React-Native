import React, { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Header from './src/components/Header';
import StartScreen from './src/components/StartScreen';
import QuestionCard from './src/components/QuestionCard';
import ResultScreen from './src/components/ResultScreen';
import CustomAlertModal from './src/components/CustomAlertModal';
import {
  QUESTIONS_NAUROK,
  QUESTIONS_EXPRESS,
  calculateTemperamentByScore,
} from './src/data/questions';

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start' | 'quiz' | 'result'
  const [testMode, setTestMode] = useState('naurok'); // 'naurok' | 'express'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const activeQuestions =
    testMode === 'naurok' ? QUESTIONS_NAUROK : QUESTIONS_EXPRESS;

  // Modal alert state for Web
  const [modalAlert, setModalAlert] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
  });

  // Cross-platform Alert helper
  const triggerAlert = (title, message, buttons = [{ text: 'OK' }]) => {
    if (Platform.OS === 'web') {
      setModalAlert({
        visible: true,
        title,
        message,
        buttons: buttons.map((btn) => ({
          ...btn,
          onPress: () => {
            setModalAlert((prev) => ({ ...prev, visible: false }));
            if (btn.onPress) btn.onPress();
          },
        })),
      });
    } else {
      Alert.alert(title, message, buttons, { cancelable: false });
    }
  };

  // Start test
  const handleStart = () => {
    setTotalScore(0);
    setCurrentIndex(0);
    setScreen('quiz');

    // Trigger first question in Alert
    setTimeout(() => {
      askQuestionAlert(0, 0);
    }, 250);
  };

  // Ask question via Alert dialog
  const askQuestionAlert = (index, currentScore = totalScore) => {
    const q = activeQuestions[index];
    if (!q) return;

    triggerAlert(
      `Питання ${index + 1} з ${activeQuestions.length}`,
      q.text,
      [
        {
          text: '❌ Ні (0)',
          style: 'cancel',
          onPress: () => handleAnswer(0, index, currentScore),
        },
        {
          text: '🤔 Іноді (+0.5)',
          onPress: () => handleAnswer(0.5, index, currentScore),
        },
        {
          text: '✅ Так (+1)',
          onPress: () => handleAnswer(1, index, currentScore),
        },
      ]
    );
  };

  // Handle user answer
  const handleAnswer = (points, index = currentIndex, currentScore = totalScore) => {
    const newScore = currentScore + points;
    setTotalScore(newScore);

    const nextIndex = index + 1;
    if (nextIndex < activeQuestions.length) {
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        askQuestionAlert(nextIndex, newScore);
      }, 300);
    } else {
      // Completed!
      setScreen('result');
      setTimeout(() => {
        showFinalResultAlert(newScore);
      }, 300);
    }
  };

  // Show final result in Alert
  const showFinalResultAlert = (score = totalScore) => {
    const dominant = calculateTemperamentByScore(score, activeQuestions.length);

    triggerAlert(
      `🎉 Результат: ${dominant.name} ${dominant.emoji}`,
      `Ваш бал: ${score} (${dominant.range})\n\n${dominant.motto}\n\n${dominant.description}`,
      [
        {
          text: 'Пройти ще раз',
          onPress: handleRestart,
        },
        {
          text: 'Переглянути деталі',
          style: 'default',
        },
      ]
    );
  };

  // Cancel test
  const handleCancel = () => {
    triggerAlert(
      'Зупинити тестування?',
      'Ваш поточний прогрес буде втрачено. Ви впевнені?',
      [
        { text: 'Продовжити тест', style: 'cancel' },
        {
          text: 'Так, вийти',
          style: 'destructive',
          onPress: () => {
            setScreen('start');
            setCurrentIndex(0);
            setTotalScore(0);
          },
        },
      ]
    );
  };

  // Restart
  const handleRestart = () => {
    setScreen('start');
    setCurrentIndex(0);
    setTotalScore(0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />
      <Header />

      <View style={styles.content}>
        {screen === 'start' && (
          <StartScreen
            onStart={handleStart}
            testMode={testMode}
            setTestMode={setTestMode}
          />
        )}

        {screen === 'quiz' && (
          <QuestionCard
            currentIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            question={activeQuestions[currentIndex]}
            onAnswer={(points) => handleAnswer(points)}
            onShowAlert={() => askQuestionAlert(currentIndex)}
            onCancel={handleCancel}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            totalScore={totalScore}
            totalQuestions={activeQuestions.length}
            onRestart={handleRestart}
            onShowAlertResult={() => showFinalResultAlert(totalScore)}
          />
        )}
      </View>

      {/* Cross-platform Modal Alert for Web */}
      <CustomAlertModal
        visible={modalAlert.visible}
        title={modalAlert.title}
        message={modalAlert.message}
        buttons={modalAlert.buttons}
        onClose={() => setModalAlert((prev) => ({ ...prev, visible: false }))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});
