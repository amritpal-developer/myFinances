import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const AnimatedSlideView = ({ visible, children, style, from = 'bottom' }) => {
  const translateY = useSharedValue(height);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 400 });
    } else {
      translateY.value = withTiming(from === 'bottom' ? height : -height, {
        duration: 400,
      });
    }
  }, [visible, from]);

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedSlideView;
