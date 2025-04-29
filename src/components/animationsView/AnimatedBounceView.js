import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

const AnimatedBounceView = ({
  visible,
  children,
  style,
  bounceDuration = 150, // 👈 Allow custom duration
}) => {
  const scale = useRef(new Animated.Value(visible ? 1 : 0.5)).current;
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [render, setRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRender(true);
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          speed: 12,   // 👈 Faster bounce speed
          bounciness: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: bounceDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.5,
          duration: bounceDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: bounceDuration,
          useNativeDriver: true,
        }),
      ]).start(() => setRender(false));
    }
  }, [visible, bounceDuration, scale, opacity]);

  if (!render) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedBounceView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
