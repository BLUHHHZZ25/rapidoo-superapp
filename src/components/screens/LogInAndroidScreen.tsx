// import React from 'react';
// import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
// // import RapidooLogo from '../assets/icons/RapidooLogo.svg';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// // import GoogleLogo from '../assets/icons/googlelogo.svg';
// // import FacebookLogo from '../assets/icons/facebooklogo.svg';

// import theme from '../Styles/theme';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../Navigation/types';
// import LongButton from '../Components/LongButton';
// import BackButton from '../Components/BackButton';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   return (
//     <ScrollView contentContainerStyle={theme.scrollContainer}>
//       <View style={[LoginStyle.logInContainer]}>
//         <BackButton />
//         <RapidooLogo
//           width={theme.logoSize.m}
//           height={theme.logoSize.m}
//           style={theme.logoMargin}
//         />
//         <Text style={LoginStyle.logoText}>
//           Delivering convenience at your fingertips
//         </Text>
//         <LongButton
//           onPress={() => navigation.navigate('CreateAccountScreen')}
//           backgroundColor={theme.colors.blue}
//           icon={
//             <Ionicons
//               name="logo-facebook"
//               size={theme.iconSize.m}
//               color="white"
//             />
//           }
//           text=" Continue with Facebook"
//           textColor="white"
//         />

//         <LongButton
//           onPress={() => navigation.navigate('CreateAccountScreen')}
//           backgroundColor={theme.colors.red}
//           icon={
//             <Ionicons
//               name="logo-google"
//               size={theme.iconSize.m}
//               color="white"
//             />
//           }
//           text=" Continue with Google"
//           textColor="white"
//         />

//         <View style={LoginStyle.dividerContainer}>
//           <View style={theme.line} />
//           <Text style={theme.grayText}>or</Text>
//           <View style={theme.line} />
//         </View>

//         <LongButton
//           onPress={() => navigation.navigate('CreateAccountScreen')}
//           backgroundColor={theme.colors.lightGray}
//           icon={<Ionicons name="call" size={theme.iconSize.m} color="black" />}
//           text=" Continue with Mobile Number"
//           textColor="black"
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default LoginScreen;
// const {width, height} = Dimensions.get('window');
// const LoginStyle = StyleSheet.create({
//   logInContainer: {
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: width * 0.03,
//     alignSelf: 'center',
//     minHeight: height * 0.9,
//   },
//   dividerContainer: {
//     flexDirection: 'row' as const,
//     alignItems: 'center' as const,
//     marginVertical: height * 0.02,
//   },
//   logoText: {
//     fontSize: width * 0.04,
//     fontWeight: 'bold' as const,
//     color: '#333',
//     textAlign: 'center' as const,
//     marginBottom: height * 0.09,
//     bottom: height * 0.17,
//   },
// });
