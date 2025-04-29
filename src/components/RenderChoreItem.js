import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import CommonText from './CommonText';
import colors from '../utils/colors';
import {height, width} from '../utils/data';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AnimatedBounceView from './animationsView/AnimatedBounceView'; // import your bounce wrapper

const RenderChoreItem = React.memo(
  ({item, index, isDarkMode, openModal, deleteItem}) => {
    const scale = useSharedValue(1);
    const [show, setShow] = useState(false);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{scale: scale.value}],
    }));

    // 👇 make item appear with delay
    useEffect(() => {
      const timeout = setTimeout(() => {
        setShow(true);
      }, index * 150); // Each item delayed by 150ms * index (adjust timing if needed)

      return () => clearTimeout(timeout);
    }, [index]);

    const confirmDelete = useCallback(() => {
      Vibration.vibrate(50);
      Alert.alert(
        'Delete Expenses',
        `Are you sure you want to delete "${item.name}"?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            onPress: () => deleteItem(item),
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    }, [item, deleteItem]);

    const handlePressIn = useCallback(() => {
      Vibration.vibrate(20);
      scale.value = withSpring(0.9, {damping: 8, stiffness: 200});
    }, []);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, {damping: 10});
    }, []);

    const handleLongPress = useCallback(() => {
      confirmDelete();
    }, [confirmDelete]);
console.log('item',item)
    const textColor = index !== 1 ? colors.black : colors.white;
    const amount = item?.amount?.split('.') ?? ['0', '00'];
    if (index === 0) {
      return (
        <TouchableOpacity onPress={openModal}>
          <Animated.View
            style={[
              styles.addBox,
              {borderColor: isDarkMode ? colors.white : colors.black},
            ]}>
            <CommonText
              label={'+'}
              style={[
                styles.plus,
                {color: isDarkMode ? colors.white : colors.black},
              ]}
            />
          </Animated.View>
        </TouchableOpacity>
      );
    }

    return (
      <AnimatedBounceView visible={show} delay={index * 120}>
        <Pressable
          onPress={() => {
            console.log('Tapped:', item.name);
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={handleLongPress}
          delayLongPress={300}
          style={{flex: 1}} // Important: makes sure pressable covers full card
        >
          <Animated.View
            style={[
              styles.choresBox,
              {backgroundColor: item?.color ?? colors.grey},
              animatedStyle,
            ]}>
            <CommonText
              label={item?.name}
              style={[styles.choresText, {color: textColor}]}
            />
            <CommonText style={[styles.choresText, {color: textColor}]}>
              {amount[0]}.
              <CommonText style={[styles.smallText, {color: textColor}]}>
                {amount[1]}
              </CommonText>
            </CommonText>
            <CommonText
              label={item?.percentage}
              style={[styles.percentageText, {color: textColor}]}
            />
          </Animated.View>
        </Pressable>
      </AnimatedBounceView>
    );
  },
);

export default RenderChoreItem;

const styles = StyleSheet.create({
  addBox: {
    borderRadius: 10,
    height: responsiveScreenHeight(16),
    width: responsiveScreenWidth(17),
    marginRight: '5%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '18%',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  plus: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: responsiveScreenFontSize(3),
  },
  choresBox: {
    borderRadius: 16,
    height: responsiveScreenHeight(16),
    width: responsiveScreenWidth(30),
    marginRight: '5%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '10%',
  },
  choresText: {
    marginHorizontal: '5%',
    fontSize: 17,
  },
  smallText: {
    fontSize: responsiveScreenFontSize(1.5),
  },
  percentageText: {
    padding: '2%',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: '8%',
  },
});
