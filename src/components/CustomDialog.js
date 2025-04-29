import React, {useEffect, useState} from 'react';
import {Modal, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../utils/ThemeProvider';
import colors from '../utils/colors';
import CommonText from './CommonText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedBounceView from './animationsView/AnimatedBounceView';

const TYPE_COLORS = {
  success: '#4BB543',
  warning: '#FFC107',
  info: '#2196F3',
  delete: '#F44336',
};

const TYPE_ICONS = {
  success: 'checkmark-circle-outline',
  warning: 'warning-outline',
  info: 'information-circle-outline',
  delete: 'trash-bin-outline',
};

const CustomDialog = ({
  visible,
  title = '',
  message = '',
  type = 'info',
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  const {isDarkMode} = useTheme();
  const [show, setShow] = useState(visible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const themeBackground = isDarkMode ? colors.black : colors.white;
  const iconColor = TYPE_COLORS[type] || TYPE_COLORS.info;
  const iconName = TYPE_ICONS[type] || TYPE_ICONS.info;

  // Sync with external visible state
  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsAnimatingOut(false);
        setShow(false);
      }, 200); // Match animation duration
    }
  }, [visible]);

  if (!show) return null;

  const handleClose = callback => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      setShow(false);
      callback?.();
    }, 200);
  };

  return (
    <Modal visible={show} transparent animationType="none">
      <View style={styles.overlay}>
        <AnimatedBounceView visible={!isAnimatingOut}>
          <View style={[styles.dialog, {backgroundColor: themeBackground}]}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={48} color={iconColor} />
            </View>

            {/* Title */}
            <CommonText variant="h2" style={styles.title}>
              {title}
            </CommonText>

            {/* Message */}
            <CommonText variant="body1" style={styles.message}>
              {message}
            </CommonText>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: iconColor}]}
                onPress={() => handleClose(onConfirm)}>
                <CommonText variant="body1" color="white">
                  {confirmText}
                </CommonText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.grey}]}
                onPress={() => handleClose(onCancel)}>
                <CommonText
                  variant="body1"
                  color={!isDarkMode ? colors.grey : colors?.white}>
                  {cancelText}
                </CommonText>
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedBounceView>
      </View>
    </Modal>
  );
};

export default CustomDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
    paddingBottom: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
