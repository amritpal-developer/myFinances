// import React, { useEffect } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import {
//   BannerAd,
//   BannerAdSize,
//   InterstitialAd,
//   RewardedAd,
//   RewardedAdEventType,
//   TestIds,
//   AdEventType,
// } from 'react-native-google-mobile-ads';

// // Replace TestIds with your real AdMob unit IDs
// const BANNER_AD_UNIT_ID = __DEV__ ? TestIds.BANNER : 'your-banner-ad-id';
// const INTERSTITIAL_AD_UNIT_ID = __DEV__ ? TestIds.INTERSTITIAL : 'your-interstitial-ad-id';
// const REWARDED_AD_UNIT_ID = __DEV__ ? TestIds.REWARDED : 'your-rewarded-ad-id';

// // Create Interstitial Ad
// const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
//   requestNonPersonalizedAdsOnly: true,
// });

// // Create Rewarded Ad
// const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID, {
//   requestNonPersonalizedAdsOnly: true,
// });

// const GoogleAds = () => {
//   useEffect(() => {
//     const unsubscribeInterstitial = interstitial.addAdEventListener(AdEventType.LOADED, () => {
//       console.log('Interstitial Ad Loaded');
//     });
//     interstitial.load();

//     const unsubscribeRewarded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
//       console.log('Rewarded Ad Loaded');
//     });
//     rewarded.load();

//     return () => {
//       unsubscribeInterstitial();
//       unsubscribeRewarded();
//     };
//   }, []);

//   const showInterstitialAd = () => {
//     if (interstitial.loaded) {
//       interstitial.show();
//     } else {
//       console.log('Interstitial ad not loaded');
//     }
//   };

//   const showRewardedAd = () => {
//     if (rewarded.loaded) {
//       rewarded.show();
//     } else {
//       console.log('Rewarded ad not loaded');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Banner Ad */}
//       <BannerAd unitId={BANNER_AD_UNIT_ID} size={BannerAdSize.BANNER} />

//       {/* Interstitial Ad Button */}
//       <Button title="Show Interstitial Ad" onPress={showInterstitialAd} />

//       {/* Rewarded Ad Button */}
//       <Button title="Show Rewarded Ad" onPress={showRewardedAd} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default GoogleAds;
