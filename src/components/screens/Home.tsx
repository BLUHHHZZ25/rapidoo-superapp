import { Input } from '@rneui/base';
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from '@rneui/themed';
import CardPoints from '../common/CardPoints';
import {
  colors,
  spacing,
  sizes,
  text,
  horizontalScale,
  verticalScale,
  moderateScale,
  shadow,
} from '../../app/constants/theme';

import { Banners, IconServices } from '../../app/assets/data/data';
import VehicleSelection from '../common/VehicleSelection';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SharedElement } from '../navigations/Navigation';
import CarouselItems from '../common/CarouselItems';
import CarouselSlide from '../common/CarouselSlide';
import { useEffect, useState } from 'react';
import {
  getAccountDetails,
  getAllPosts,
  getServices,
} from '../../app/watermelonDB/model/model';
import { useBounceAnimation } from '../../app/redux/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/redux/store';
import { setPickup } from '../../app/redux/reducers/maplocation';
import {
  setNumber,
  setSaveDetils,
} from '../../app/redux/reducers/registrationSlice';
import { LoaderComponents } from '../common/LoaderComponents.tsx';
import * as Keychain from 'react-native-keychain';
import FloatedTransaction from '../common/FloatedTransaction';
import messaging from '@react-native-firebase/messaging';
import onDisplayNotification from '../notification/NotificationChannel.tsx';
import {
  setAcceptTransaction,
  setBookingStatus,
  setDropPayload,
  setProgressTransaction,
  setTransactionID,
  setTransactionReturn,
} from '../../app/redux/reducers/transactionOrder.ts';
import { KeyChainGet } from '../../utils/KeyChain/GetKeyChain.js';
import { checkTransaction, getTransaction } from '../../services/parcel.tsx';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import NetInfo from '@react-native-community/netinfo';
import { WalletAccount } from '../../services/api_services.tsx';
import { log } from '@react-native-firebase/crashlytics';
import { HomeElement } from '../navigations/HomeNavigation.tsx';
import { ParcelElement } from '../navigations/ParcelNavigation.tsx';
import React from 'react';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const navigationReturn = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
  const route = useRoute<any>();
  const usedispatch = useDispatch<AppDispatch>();
  const accountID = useSelector(
    (state: RootState) => state.registrationCounter.account_ID,
  );
  const regNumber = useSelector(
    (state: RootState) => state.registrationCounter.regNumber,
  );
  const firstname = useSelector(
    (state: RootState) => state.registrationCounter.regFirstname,
  );
  const lastname = useSelector(
    (state: RootState) => state.registrationCounter.regLastname,
  );
  const email = useSelector(
    (state: RootState) => state.registrationCounter.regEmail,
  );
  const gender = useSelector(
    (state: RootState) => state.registrationCounter.regGender,
  );
  const city = useSelector(
    (state: RootState) => state.registrationCounter.regGender,
  );
  const [isLoader, setIsLoader] = useState(false);
  const [isServices, setIsServices] = useState<any | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [status, setStatus] = useState<any>(null);
  const [userTransaction, setUserTransaction] = useState<any>([]);
  const [isState, setState] = useState(0);
  const isFocused = useIsFocused();
  const acceptTransaction = useSelector((state: RootState) => state.transactionOrder.accept_transaction,);
  const [walletBalance, setWalletBalance] = useState<String | Number>('-- --');
  const transaction_id: any = useSelector((state: RootState) => state.transactionOrder.transaction_id);

  const accountIDParams = {
    account_id: accountID,
  };
  const datafetch = {
    regNumber: '',
    regFullName: '',
    regEmail: '',
    regBirthday: '',
    regGender: '',
    regCity: '',
  };

  // async function getTokens(){
  //   // const token = await Keychain.getGenericPassword()
  //   const data = await KeyChainGet()
  //   console.log("\n\n token", data.access_token)
  // }

  // getTokens();

  // FETCH SERVICES
  useEffect(() => {
    // Fetch the services from watermelon db
    async function getFuncServices() {
      const data = await getServices();
      console.log("\n\n\n services data ", data[0]._raw.services);
      setIsServices(JSON.parse(data[0]._raw.services));
    }

    if (!isServices) {
      getFuncServices();
    }
  }, [isServices]);
  

  function fetchAccount() {
    const timeoutDuration = 2000; // Timeout duration in milliseconds (e.g., 10 seconds)
    // setIsLoader(true);
    // Promise that resolves after the timeout duration
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout occurred while fetching account details'));
      }, 11000);
    });
    const fetchingDetails = new Promise((resolve, reject) => {
      setTimeout(async () => {
        resolve(true);
        setIsLoader(false);
        const data_profile = await getAllPosts();
        const datafetch = {
          regNumber: data_profile[0].register_number,
          profile: data_profile[0].profile,
          regFirstname: data_profile[0].firstname,
          regLastname: data_profile[0].lastname,
          regEmail: data_profile[0].email,
          regGender: data_profile[0].gender,
          regCity: data_profile[0].city,
        };
        usedispatch(setSaveDetils(datafetch));
      }, timeoutDuration);
    });
    Promise.race([timeoutPromise, fetchingDetails]).then(value => {
      if (value) {
        console.log('Fetching Account details completed');
      }
    });
  }

  const GetCustomerTransaction = async () => {
    try {
      //Get Acess Token
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      const response = await getTransaction(access_json.access_token)
      
      if (response){
        setUserTransaction(response)
        usedispatch(setProgressTransaction(response))
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  // const checkCustomerTransaction = async () => {
  //   try {
      // //Get Acess Token
      // const result: any = await Keychain.getGenericPassword();
      // const access_json = JSON.parse(result.password);

  //     const response = await checkTransaction(
  //       'active',
  //       access_json.access_token,
  //     );
  //     if (response) {
  //       if (response.status == 'DELIVERED' || response.status == 'FAILED') {
  //         console.log(response.status);
  //         usedispatch(setAcceptTransaction(''));
  //         usedispatch(setTransactionID(''));
  //         usedispatch(setProgressTransaction(''))
  //       }
  //       else {
  //         setStatus(response.status);
  //         usedispatch(setProgressTransaction(response))
  //         const order = JSON.stringify(response);
  //         usedispatch(setAcceptTransaction(order));
  //         usedispatch(setTransactionID(response.transaction_id));
  //         console.log('return', response);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const navigationParcel = () => {
    navigationHome.reset({
      index: 0,
      routes: [{ name: 'ParcelNavigation' }],
    });
  };

  const exitAppFunc = () => {
    navigationHome.navigate("ConfirmationModal", {message:"Are you sure do you want to Exit ?", yesFunction:() => BackHandler.exitApp()})
  }
  
  useEffect(() => {
    const backAction = () => {
        exitAppFunc()
        return true;
      }
  
      const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction)
      return () => backHandler.remove()
    },[])
  

  useEffect(()=>{
    const permissionCheck = async() => {
      const contact_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      const gps_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
      // const library_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES)
      const notification_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

      if(!(contact_p && gps_p && notification_p )){
        navigation.navigate('PermissionScreen')
      }
    }
    permissionCheck()
    
  },[])

  useEffect(() => {
    fetchAccount();
    GetCustomerTransaction();
    // checkCustomerTransaction();
  }, [isFocused]);


  useEffect(() => {
    const Notification = () => {
      // Handle displaying of Notification while in background
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        const body = remoteMessage.notification?.body;
        const title = remoteMessage.notification?.title;
        const data = remoteMessage?.data;
        const data_string = data?.data;
        console.log("IDDDD2", transaction_id);

        if (typeof data_string === 'string') {
          try {
            if (data_string == 'alive' && !setAcceptTransaction) {
              console.log('alive');
            } else if (title == 'Rider Accepted your Booking') {
              // console.log('ENTER', data_string);
              // usedispatch(setAcceptTransaction(data_string));
              // usedispatch(setTransactionID(JSON.parse(data_string).transaction_id));
              // usedispatch(setDropPayload(data_string));
              // const status_string = JSON.parse(data_string);
              // const status = status_string.status;
              // console.log(status);
              // console.log(data_string);
              // setStatus(status);
              // usedispatch(setBookingStatus(status));
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          console.error('Data is not a string:', data_string);
        }

        // onDisplayNotification(body, title, data);
      });
      return () => {
        unsubscribe();
      };
    };

    // Background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // Handle your background message here
    });

    // App opened from a background notification
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // Handle your notification here
      const data = remoteMessage?.data;
      const data_string = data?.data;
      if (typeof data_string === 'string') {
        try {
          if (data_string == 'alive' && !setAcceptTransaction) {
            console.log('alive');
          } else if (
            (remoteMessage.notification?.title === 'Customer Transaction') || (remoteMessage.notification?.title === 'You have an incorrect pin location.')
          ) {
            usedispatch(setAcceptTransaction(data_string));
            const status_string = JSON.parse(data_string);
            const status = status_string.status;
            console.log(status);
          } 
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('Data is not a string:', data_string);
      }
    });
    
    Notification();
  }, []);

  useEffect(() => {
    const account_wallet = async () => {
      const key = await KeyChainGet();
      const parmas = {
        username: key.username,
        bearer_token: key.access_token,
      };
      console.log('params', key);
      const result = await WalletAccount(parmas);
      console.log('\n\n Wallet> ', result);
      setWalletBalance(Number(result.data.amount_available));
    };
    account_wallet();
  }, []);

  const getData = async() => {
    
    const data= await getServices()

    console.log("\n\\n\n services------- ",data);
    
  }
  getData()

  return (
    <>
      <View style={{ position: 'absolute' }}>
        <StatusBar
          barStyle="dark-content" // Or "dark-content" based on your preference
          translucent={true}
          backgroundColor="transparent"
        />
        <LoaderComponents showComp={isLoader} labelComp={''} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageStyle}>
            <CarouselSlide list={Banners} />
          </View>
          <View style={[styles.inputStyle, shadow.dark]}>
            <View style={{ marginHorizontal: spacing.s }}>
              <Icon name="search-outline" size={25} type="ionicon" />
            </View>
            <TextInput
              placeholder="Satisfy your cravings!"
              numberOfLines={3}
              inlineImagePadding={10}
              underlineColorAndroid={'transparent'}
              style={{
                paddingLeft: spacing.s,
                paddingRight: horizontalScale(80),
              }}
            />
            <View style={styles.rightIcon}>
              <Icon name="heart-outline" size={25} type="ionicon" />
            </View>
          </View>
          <View style={styles.contentContainer}>
            {/* <View>
              <FlatList
                data={IconServices}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginLeft: spacing.m }}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={
                        item.name === 'Parcel'
                          ? () =>
                            navigation.navigate('Parcel')
                          : () => navigation.navigate('Home')
                      }>
                      {!item.status && (
                        <View
                          style={{
                            backgroundColor: colors.red,
                            paddingHorizontal: spacing.s,
                            position: 'absolute',
                            top: "5%",
                            left: '13%',
                            // left: horizontalScale(7),
                            alignSelf: 'center',

                            zIndex: 1,
                            borderRadius: 10,
                          }}>
                          <Text style={[text.small, { color: colors.light }]}>
                            soon
                          </Text>
                        </View>
                      )}
                      <View style={{ justifyContent: 'center', marginRight: spacing.m, }}>
                        <View
                          style={{
                            marginTop: 15,
                            alignSelf: 'center',
                            borderRadius: 100,
                            padding: spacing.s + 2,
                            backgroundColor:
                              item.status === true
                                ? colors.mustardOpacity
                                : colors.grayOpacityOne,
                          }}>
                          {
                            item.status == false ?
                              <Image source={item.img} tintColor={"gray"} style={{ height: verticalScale(35), aspectRatio: 1 / 0.9, resizeMode: 'contain' }} />
                              :
                              <Image source={item.img} style={{ height: verticalScale(35), aspectRatio: 1 / 0.9, resizeMode: 'contain' }} />
                          }
                        </View>
                        <Text style={[text.smallPlus, { alignSelf: 'center', marginVertical: spacing.s, color: colors.grayText, },]}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View> */}
            {isServices && (
              <View>
                <FlatList
                  data={isServices}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginLeft: spacing.m }}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={
                          item.res.name === 'Parcel'
                            ? () => navigationParcel()
                            : () => navigationHome.navigate('Home')
                        }>
                        {item.res.status == 'soon' && (
                          <View
                            style={{
                              backgroundColor: colors.red,
                              paddingHorizontal: spacing.s,
                              position: 'absolute',
                              top: '5%',
                              left: '13%',
                              // left: horizontalScale(7),
                              alignSelf: 'center',

                              zIndex: 1,
                              borderRadius: 10,
                            }}>
                            <Text style={[text.small, { color: colors.light }]}>
                              soon
                            </Text>
                          </View>
                        )}
                        <View
                          style={{
                            justifyContent: 'center',
                            marginRight: spacing.m,
                          }}>
                          <View
                            style={{
                              marginTop: 15,
                              alignSelf: 'center',
                              borderRadius: 100,
                              padding: spacing.s + 2,
                              backgroundColor:
                                item.res.status === true
                                  ? colors.grayOpacityOne
                                  : colors.mustardOpacity,
                            }}>
                            {item.res.status == 'soon' ? (
                              <Image
                                source={{ uri: item.res.img }}
                                tintColor={'gray'}
                                style={{
                                  height: verticalScale(35),
                                  aspectRatio: 1 / 0.9,
                                  resizeMode: 'contain',
                                }}
                              />
                            ) : (
                              <Image
                                source={{ uri: item.res.img }}
                                style={{
                                  height: verticalScale(35),
                                  aspectRatio: 1 / 0.9,
                                  resizeMode: 'contain',
                                }}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              text.smallPlus,
                              {
                                alignSelf: 'center',
                                marginVertical: spacing.s,
                                color: colors.grayText,
                              },
                            ]}>
                            {item.res.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}

            <View style={{ flexDirection: 'row' }}>
              <CardPoints
                title={'Balance'}
                iconName={'wallet'}
                amount={` ${walletBalance.toLocaleString()}`}
              />
              <CardPoints
                title={'Lightning'}
                iconName={'flash'}
                amount={' -- --'}
              />
            </View>
            <View>
              <View>
                <Text style={[text.medium, styles.carouselTitle]}>
                  Discover Rapidoo.ph
                </Text>
              </View>
              <CarouselItems
                list={Banners}
                pressFun={() => {
                  console.log('');
                }}
              />
            </View>

            <View>
              <View>
                <Text style={[text.medium, styles.carouselTitle]}>
                  Discover Rapidoo
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {userTransaction.length > 0 && <FloatedTransaction status={status} count={userTransaction}/>}
    </>
  );
}

const styles = StyleSheet.create({
  status: {
    height: '90%',
    width: '50%',
    backgroundColor: '#ff00ff',
    borderRadius: 50,
  },
  statusContainer: {
    height: windowHeight * 0.1,
    width: '100%',
    position: 'absolute',
    top: '85%',
    // marginHorizontal: 'auto'
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.light,
    height: '100%',
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    marginLeft: spacing.l,
  },
  contentContainer: {
    marginTop: 50,
    marginHorizontal: spacing.s,
    height: windowHeight,
    color: 'white',
  },
  imageStyle: {
    width: windowWidth,
    height: windowHeight / 6,
    resizeMode: 'stretch',
  },
  inputStyle: {
    flexDirection: 'row',
    paddingVertical: spacing.s,
    alignItems: 'center',
    backgroundColor: colors.white,
    height: verticalScale(55),
    elevation: 5,
    borderRadius: sizes.sradius,
    marginBottom: spacing.xl,
    position: 'absolute',
    top: windowHeight / 5 - 30,
    width: horizontalScale(350),
    alignSelf: 'center',
    textShadowRadius: 20,
  },
  businesService: {
    alignItems: 'center',
  },
  serviceSpacing: {
    marginHorizontal: 11,
    width: 'auto',
  },
  serviceTitle: {
    alignSelf: 'center',
    marginTop: 8,
    color: colors.grayText,
  },
  carouselTitle: {
    fontWeight: '700',
    color: colors.black,
    marginLeft: spacing.m,
    marginTop: spacing.m,
  },
});
function setFloatingStatus(status: any): any {
  throw new Error('Function not implemented.');
}
