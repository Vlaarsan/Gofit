import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { getDay } from 'date-fns';

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [lastResetDay, setLastResetDay] = useState(getDay(new Date()));

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      detectStep(accelerometerData);
      resetStepCount();
    }));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const detectStep = ({ x, y, z }) => {
    const threshold = 1.1; // Seuil pour détecter un pas
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    if (acceleration > threshold) {
      setStepCount(prevCount => prevCount + 1);
    }
  };

  const resetStepCount = () => {
    const currentDay = getDay(new Date());
    if (currentDay !== lastResetDay) {
      setStepCount(0);
      setLastResetDay(currentDay);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.counter}>{stepCount}</Text>
        <Text style={styles.counterLabel}>Pas aujourd'hui</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  counterContainer: {
    backgroundColor: '#8b50de',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  counterLabel: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
});
