// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Animated,
//   Platform,
//   Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   AdMobRewarded,
//   setTestDeviceIDAsync,
// } from 'expo-ads-admob';

// // Replace these with your actual AdMob IDs
// const ADMOB_CONFIG = {
//   // Test IDs - Replace with your actual IDs in production
//   bannerAdUnitID: Platform.select({
//     ios: 'ca-app-pub-3940256099942544/2934735716',
//     android: 'ca-app-pub-3940256099942544/6300978111',
//   }),
//   interstitialAdUnitID: Platform.select({
//     ios: 'ca-app-pub-3940256099942544/4411468910',
//     android: 'ca-app-pub-3940256099942544/1033173712',
//   }),
//   rewardedAdUnitID: Platform.select({
//     ios: 'ca-app-pub-3940256099942544/1712485313',
//     android: 'ca-app-pub-3940256099942544/5224354917',
//   }),
// };

// // Subscription plans data
// const SUBSCRIPTION_PLANS = [
//   {
//     id: 'basic',
//     name: 'Basic Plan',
//     price: 4.99,
//     billingCycle: 'monthly',
//     features: ['Ad-free experience', 'Basic features', '24/7 Support', '5GB Storage'],
//     color: ['#4facfe', '#00f2fe'],
//     icon: 'rocket-outline',
//   },
//   {
//     id: 'pro',
//     name: 'Pro Plan',
//     price: 9.99,
//     billingCycle: 'monthly',
//     features: [
//       'Everything in Basic',
//       'Premium features',
//       'Priority Support',
//       'Custom Themes',
//       '20GB Storage',
//     ],
//     color: ['#6a11cb', '#2575fc'],
//     icon: 'diamond-outline',
//     popular: true,
//   },
//   {
//     id: 'premium',
//     name: 'Premium Plan',
//     price: 19.99,
//     billingCycle: 'monthly',
//     features: [
//       'Everything in Pro',
//       'Advanced Analytics',
//       'API Access',
//       'Dedicated Manager',
//       'Unlimited Storage',
//     ],
//     color: ['#ff0844', '#ffb199'],
//     icon: 'crown-outline',
//   },
// ];

// // Banner Ad Component
// const BannerAd = ({ onAdFailedToLoad }) => {
//   return (
//     <View style={styles.bannerContainer}>
//       <AdMobBanner
//         bannerSize="smartBannerPortrait"
//         adUnitID={ADMOB_CONFIG.bannerAdUnitID}
//         servePersonalizedAds={true}
//         onDidFailToReceiveAdWithError={onAdFailedToLoad}
//       />
//     </View>
//   );
// };

// // Interstitial Ad Handler
// const showInterstitialAd = async () => {
//   try {
//     await AdMobInterstitial.setAdUnitID(ADMOB_CONFIG.interstitialAdUnitID);
//     await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
//     await AdMobInterstitial.showAdAsync();
//     return true;
//   } catch (error) {
//     console.error('Interstitial ad error:', error);
//     return false;
//   }
// };

// // Rewarded Ad Handler
// const showRewardedAd = async () => {
//   try {
//     await AdMobRewarded.setAdUnitID(ADMOB_CONFIG.rewardedAdUnitID);
//     await AdMobRewarded.requestAdAsync();
//     await AdMobRewarded.showAdAsync();
//     return true;
//   } catch (error) {
//     console.error('Rewarded ad error:', error);
//     return false;
//   }
// };

// // Subscription Card Component
// const SubscriptionCard = ({ plan, onSubscribe, isActive }) => {
//   const scaleAnim = new Animated.Value(1);

//   const handlePressIn = () => {
//     Animated.spring(scaleAnim, {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = () => {
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//       onPress={() => onSubscribe(plan)}>
//       <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
//         <LinearGradient
//           colors={plan.color}
//           style={[styles.subscriptionCard, isActive && styles.activeCard]}>
//           {plan.popular && (
//             <View style={styles.popularBadge}>
//               <Text style={styles.popularText}>POPULAR</Text>
//             </View>
//           )}
//           <View style={styles.planHeader}>
//             <Ionicons name={plan.icon} size={32} color="#fff" />
//             <Text style={styles.planName}>{plan.name}</Text>
//             <View style={styles.priceContainer}>
//               <Text style={styles.currencySymbol}>$</Text>
//               <Text style={styles.planPrice}>{plan.price}</Text>
//               <Text style={styles.billingCycle}>/{plan.billingCycle}</Text>
//             </View>
//           </View>
//           <View style={styles.featuresList}>
//             {plan.features.map((feature, index) => (
//               <View key={index} style={styles.featureItem}>
//                 <FontAwesome5 name="check-circle" size={16} color="#fff" />
//                 <Text style={styles.featureText}>{feature}</Text>
//               </View>
//             ))}
//           </View>
//           <TouchableOpacity
//             style={[styles.subscribeButton, isActive && styles.activeSubscribeButton]}
//             onPress={() => onSubscribe(plan)}>
//             <Text style={styles.buttonText}>
//               {isActive ? 'Current Plan' : 'Choose Plan'}
//             </Text>
//           </TouchableOpacity>
//         </LinearGradient>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// // Main Component
// const SubscriptionComponent = () => {
//   const [activePlan, setActivePlan] = useState(null);
//   const [showAds, setShowAds] = useState(true);
//   const [adError, setAdError] = useState(null);  useEffect(() => {
//     // Initialize AdMob only on native platforms
//     const initializeAdMob = async () => {
//       if (Platform.OS !== 'web') {
//         try {
//           await setTestDeviceIDAsync('EMULATOR');
//           // Set up rewarded ad handlers using the correct API
//           const rewardedSubscription = AdMobRewarded.addListener(
//             'rewardedVideoUserDidEarnReward',
//             (reward) => {
//               console.log('User earned reward of ', reward);
//             }
//           );

//           return () => {
//             if (rewardedSubscription) {
//               rewardedSubscription.remove();
//             }
//           };
//         } catch (error) {
//           console.log('AdMob not available on this platform');
//         }
//       }
//     };

//     initializeAdMob();
//   }, []);

//   const handleSubscribe = async (plan) => {
//     // Show interstitial ad before subscription (if user is not subscribed)
//     if (!activePlan) {
//       const adShown = await showInterstitialAd();
//       if (!adShown) {
//         console.log('Failed to show interstitial ad');
//       }
//     }

//     setActivePlan(plan.id);
//     setShowAds(false);
//     // Here you would integrate with your payment processing system
//     alert(`Subscribing to ${plan.name} for $${plan.price}/${plan.billingCycle}`);
//   };

//   const handleAdError = (error) => {
//     setAdError(error);
//     console.error('Ad failed to load:', error);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {showAds && !adError && (
//         <BannerAd onAdFailedToLoad={handleAdError} />
//       )}
      
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Choose Your Plan</Text>
//         <Text style={styles.headerSubtitle}>
//           Select the perfect plan for your needs
//         </Text>
//       </View>

//       <View style={styles.plansContainer}>
//         {SUBSCRIPTION_PLANS.map((plan) => (
//           <SubscriptionCard
//             key={plan.id}
//             plan={plan}
//             onSubscribe={handleSubscribe}
//             isActive={activePlan === plan.id}
//           />
//         ))}
//       </View>

//       <View style={styles.guaranteeContainer}>
//         <MaterialIcons name="verified-user" size={24} color="#4CAF50" />
//         <Text style={styles.guaranteeText}>
//           30-day money-back guarantee
//         </Text>
//       </View>

//       {showAds && !adError && (
//         <BannerAd onAdFailedToLoad={handleAdError} />
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   bannerContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   plansContainer: {
//     padding: 16,
//   },
//   subscriptionCard: {
//     borderRadius: 20,
//     padding: 24,
//     marginBottom: 20,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 6,
//       },
//       android: {
//         elevation: 8,
//       },
//     }),
//   },
//   activeCard: {
//     transform: [{ scale: 1.02 }],
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   popularBadge: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   popularText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   planHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   planName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 12,
//     marginBottom: 8,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//   },
//   currencySymbol: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   planPrice: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   billingCycle: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 4,
//     marginLeft: 2,
//   },
//   featuresList: {
//     marginVertical: 20,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   featureText: {
//     color: '#fff',
//     marginLeft: 12,
//     fontSize: 16,
//   },
//   subscribeButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   activeSubscribeButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   guaranteeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     marginBottom: 20,
//   },
//   guaranteeText: {
//     marginLeft: 8,
//     color: '#4CAF50',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default SubscriptionComponent;