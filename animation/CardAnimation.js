import { useRef } from 'react';
import { Animated } from 'react-native';

const createCardScaleAnimation = () => {
  const cardScale = useRef(new Animated.Value(1.0)).current;

  const startAnimation = () => {
    Animated.timing(cardScale, {
      toValue: 1.4,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(cardScale, {
        toValue: 1.0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return { cardScale, startAnimation };
};

export { createCardScaleAnimation };
