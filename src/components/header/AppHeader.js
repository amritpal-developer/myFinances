import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ImagePickerModal from '../../components/ImagePickerModal';
import CustomDialog from '../CustomDialog';
import CommonText from '../../components/CommonText';
import {logout} from '../../utils/auth';
import ProfileDark from '../../assets/svg/darkTheme/darkProfile.svg';
import ProfileLight from '../../assets/svg/lightTheme/profile.svg';
import colors from '../../utils/colors';
import {String} from '../../utils/String';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

const AppHeader = ({screen, isDarkMode, navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const handleImageSelection = data => {
    if (data.success) {
      setImageUri(data.uri);
    } else {
      Alert.alert(String.error, data.error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDialogOpen(false);
      navigation.reset({
        index: 0,
        routes: [{name: String.LoginScreen}],
      });
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  if (screen !== String.tabScreen) return null;

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.headerContainer,
        {
          // paddingTop: insets.top,
          backgroundColor: isDarkMode ? colors.black : colors.white,
        },
      ]}>
      <View style={styles.innerContainer}>
        {/* Left */}
        <View style={styles.leftSection}>
          <ImagePickerModal
            modalVisible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            onImageSelected={handleImageSelection}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.profileIcon}>
            {!imageUri ? (
              !isDarkMode ? (
                <ProfileDark width={45} height={45} />
              ) : (
                <ProfileLight width={45} height={45} />
              )
            ) : (
              <Avatar.Image size={45} source={{uri: imageUri}} />
            )}
          </TouchableOpacity>

          <CommonText
            variant="body2"
            style={[
              styles.welcomeText,
              {color: isDarkMode ? colors.white : colors.black},
            ]}>
            {`${String.hi} AMRITPAL\n${String.budgetText}`}
          </CommonText>
        </View>

        {/* Right */}
        <View style={styles.rightSection}>
          <CustomDialog
            visible={isDialogOpen}
            type="delete"
            title="Logout"
            message="Are you sure you want to logout?"
            onConfirm={handleLogout}
            onCancel={() => setIsDialogOpen(false)}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate(String.MyTransactionsScreen)}
            style={styles.headerButton}>
            <CommonText
              variant="body2"
              style={{color: isDarkMode ? colors.white : colors.black}}>
              {" "+String.MyTransactions}
            </CommonText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsDialogOpen(true)}>
            <Ionicons
              name="exit-outline"
              size={26}
              color={isDarkMode ? colors.white : colors.black}
              style={styles.exitIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.gray,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  profileIcon: {
    marginRight: 8,
  },
  welcomeText: {
    fontSize: 14,
    flexShrink: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  headerButton: {
    marginRight: 12,
    borderWidth: 2,
    borderRadius: responsiveScreenFontSize(1),
    borderStyle: 'dotted',
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitIcon: {
    marginLeft: 8,
  },
});
