import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  AppState,
  TextInput,
  Animated,
  StatusBar,
  Linking,
  Alert,
  useWindowDimensions
} from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { Divider, color } from '@rneui/base';
import { Icon } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { SharedElement } from '../../navigations/Navigation';
import { colors, spacing, text, sizes } from '../../../app/constants/theme';
import DefaultHeader from '../../common/DefaultHeader';
import { cancelTransaction, checkTransaction, customerTransaction } from '../../../services/parcel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { setAcceptTransaction, setBookingStatus, setDropPayload, setID, setMultipleIndex, setRiderDetails, setRiderPic, setTransactionID, setWrongPinStatus } from '../../../app/redux/reducers/transactionOrder';
import * as Keychain from 'react-native-keychain';
import styles from './styles/TrackMyOrderStyle';
import { log } from '@react-native-firebase/crashlytics';
import { FlatList } from 'react-native-gesture-handler';
import { ParcelElement } from '../../navigations/ParcelNavigation';
import OrangeButton, { CancelButton } from '../../common/OrangeButton';
import BackButton from '../../common/BackButton';
import { DateFormatted, TimeFormatted } from '../../../utils/DateFormats/DateFormat';
import messaging from '@react-native-firebase/messaging';
import onDisplayNotification from '../../notification/NotificationChannel';
import WebView from 'react-native-webview';
import { KeyChainGet } from '../../../utils/KeyChain/GetKeyChain';
import ShareButton from '../../common/ShareButton';
import Share from 'react-native-share';
import { IAM_WEBSOCKET_URL, PARCEL_BASE_URL } from '../../../Config';
import { sendWebSocketMessage } from '../../../services/websocket/WebsocketService';


export default function TrackMyOrder() {
  const ws = useRef<WebSocket | null>(null);
  const { width, height } = useWindowDimensions();
  type isFormType = {
    totalAmount: any;
  };
  const isFocused = useIsFocused()
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  //Transaction Table
  const [transactionInfo, setTransactionInfo] = useState<any>({});
  const [transactionDropoff, setTransactionDropoff] = useState<any>(null);
  const [transactionPickup, setTransactionPickup] = useState<any>(null);
  const [pickupDate, setPickupDate] = useState<any>(null);
  const [dropoffDate, setDropoffDate] = useState<any>(null);
  const [multipleDrop, setMultipleDrop] = useState<any>(null);
  //Transaction Status Table
  const [transactionStatusInfo, setTransactionStatusInfo] = useState<any>({});
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const isUserConnected = useSelector((state: RootState) => state.appInfo.isUserConnected)
  const acceptTransaction: any = useSelector((state: RootState) => state.transactionOrder.accept_transaction);
  const websocketMessage: any = useSelector((state: RootState) => state.transactionOrder.websocketMessage);
  const dropPayload: any = useSelector((state: RootState) => state.transactionOrder.dropoff_payload);
  const riderPic: any = useSelector((state: RootState) => state.transactionOrder.riderPic);
  const bookingStatus: any = useSelector((state: RootState) => state.transactionOrder.bookingStatus);
  const transaction_id: any = useSelector((state: RootState) => state.transactionOrder.transaction_id);
  const id: any = useSelector((state: RootState) => state.transactionOrder.id);
  const navigationReturn = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [notificationPayload, setNotificationPayload] = useState<any>(null)
  const [notificationMessage, setNotificationMessage] = useState<any>({
    title: '',
    body: '',
    data: ''
  })
  // Account ID 
  const [accountId, setAccountId] = useState(null)
  const usedispatch = useDispatch<AppDispatch>();

  const websocketTimeIn = async (transaction_id: any) => {
    const data = {
      action_type: 'TIME_IN',
      transaction_id: transaction_id,
    };
    // ws.current?.send(JSON.stringify(data));
    sendWebSocketMessage(data)
  };

  const navigationBack = () => {
    usedispatch(setAcceptTransaction(''))
    navigation.reset({
      index: 0,
      routes: [{
        name: 'HomeNavigation',
        state: {
          routes: [
            {
              name: 'Home',
              state: {
                routes: [
                  {
                    name: 'Home'
                  }
                ]
              }
            },
          ]
        }
      },],
    })
  }

  const getTransactionDetails = async () => {
    try {
      //Get Acess Token
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      
      console.log("++++++++++++++++++++", transaction_id);
      
      const response = await customerTransaction(
        transaction_id,
        access_json.access_token,
      );
       
      if (response) {
        console.log("FAILEEDDDDD", response.status);
        console.log('RESPONSEEE', response);
        setAccountId(response.account_id)
        setTransactionInfo(response);
        setTransactionDropoff(JSON.parse(response.dropoff_address));
        setTransactionPickup(JSON.parse(response.pickup_address));
        usedispatch(setRiderPic(JSON.parse(acceptTransaction).profile_pic))

        if (response.status == 'FAILED') {
          console.log("FAILEEDDDDD");
          usedispatch(setAcceptTransaction(''));
          usedispatch(setTransactionID(''));
          navigationParcel.navigate('Parcel');
        }
        else if (appStateVisible == 'active') {
          const data = JSON.stringify(response)
          usedispatch(setAcceptTransaction(data));
        }
        else if (!acceptTransaction && response.status == 'PICKING_UP') {
          console.log('ACCEPT', acceptTransaction);
          setTransactionStatusInfo(response.status);
        }
        else {
          const booking = JSON.parse(acceptTransaction);
          setTransactionStatusInfo(booking);
          console.log("BOOKINGGG1", booking);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const navigationTrackMyOrder = () => {
  //   navigationParcel.reset({
  //       index:0,
  //       routes: [{name: 'TrackMyOrder'}],
  //   })
  // }

  useEffect(() => {
    if (appStateVisible == 'active') {
      console.log("STATEEE", appStateVisible);
      getTransactionDetails()
    }
  }, [appStateVisible, isUserConnected])

  useEffect(() => {
    try {
      const json_string = acceptTransaction;

      const booking = JSON.parse(json_string);
      const pickup = JSON.parse(booking.pickup_address)

      if (acceptTransaction && booking.transaction_id) {
        setTransactionStatusInfo(booking);
        if (
          booking.status == 'PICKED_UP' ||
          booking.status == 'DELIVERY' ||
          booking.status == 'DROP_OFF'
        ) {
          setPickupDate(pickup.pickup.completed_at);
        }
        console.log('Status', acceptTransaction);
        console.log('Stats', booking.status);
      }
      if (booking.status == 'DELIVERED') {
        const rider_details = {
          "display_name": booking.display_name,
          "rider_account_id": booking.rider_account_id,
          "rider_username": booking.username,
          "reference_id": booking.reference_id,
        }
        usedispatch(setRiderDetails(rider_details))
        usedispatch(setAcceptTransaction(''));
        usedispatch(setTransactionID(''));
        usedispatch(setID(''));
        navigationParcel.navigate('DriverRating');
      } else {
        console.log('no update');
      }
    } catch (error) {
      console.log(error);
    }
  }, [acceptTransaction, appStateVisible]);

  useEffect(() => {
    
    
    if (bookingStatus === 'FAILED' || transactionStatusInfo.status === 'DELIVERED') {

    }
    else {
      const booking = acceptTransaction && JSON.parse(acceptTransaction)

      
      if (acceptTransaction) {
        if (booking.dropoff_address && JSON.stringify(transactionDropoff) !== acceptTransaction.dropoff_address) {
          console.log("ENTERRR HERE");

          const dropoff = JSON.parse(booking.dropoff_address)
          const multiple_json = JSON.parse(dropoff.dropoff.dropoff_details)

          setMultipleDrop(multiple_json);
        }
      }
    }

  }, [acceptTransaction, transactionDropoff, transactionStatusInfo]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const webViewRef = useRef<WebView>(null);

  // Define header height and opacity dynamically based on scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 280], // Adjust this range as needed
    outputRange: [280, 100], // Change header size dynamically
    // outputRange: [200, 70], // Change header size dynamically
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0], // Fade out as you scroll up
    extrapolate: 'clamp',
  });

  const wrongPinModal = (index: any, status: any, data: any, customerDetails: any) => {
    usedispatch(setMultipleIndex(index))
    usedispatch(setWrongPinStatus(status))
    // console.log(data);

    navigationParcel.navigate("ReviewWrongPin", {
      data: data,
      customerDetails: customerDetails
    })
  }

  const sendSMS = () => {
    console.log("clickk");

    const phoneNumber = JSON.parse(acceptTransaction).phone_number
    const message = "Hello, check out this link!"; // Your message
    const encodedMessage = encodeURIComponent(message);
    const smsUrl = `sms:${phoneNumber}?body=${encodedMessage}`;

    Linking.openURL(smsUrl)
      .catch((err) => console.error('Error launching SMS app', err));
  };

  const callNumber = () => {
    const phoneNumber = JSON.parse(acceptTransaction).phone_number
    const callUrl = `tel:${phoneNumber}`
    Linking.openURL(callUrl)
      .catch((err) => console.error('Error launching Call app', err));
  }

  const shareFunction = async () => {
    const url = `${PARCEL_BASE_URL}/v1/app-service/gps/track?reference_id=${transactionInfo.reference_id}&account_id=${accountId}`
    const url_string = url.replace(/\s/g, '+');
    const shareOptions = {
      title: 'Share via',
      message: 'Check this out!',
      url: url_string, // Replace with your file's URI
      subject: 'Here is your receipt',
    };
    const result = await Share.open(shareOptions);
  }

  // const initWebSocket = async () => {
  //   const response: any = await Keychain.getGenericPassword();
  //   const access_json = JSON.parse(response.password);
  //   console.log(access_json.access_token);

    // ws.current = new WebSocket(
    //   "wss://iam.rapidooph.com/app-service/ws",
    //   // IAM_WEBSOCKET_URL,
    //   undefined,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${access_json.access_token}`,
    //     },
    //   },
    // );
  //   ws.current = new WebSocket(
  //     "wss://iam.rapidooph.com/app-service/ws",
  //     // IAM_WEBSOCKET_URL,
  //     undefined,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_json.access_token}`,
  //       },
  //     },
  //   );

  //   ws.current.onopen = () => {
  //     console.log('WebSocket connection openessd');
  //     websocketTimeIn(transaction_id)
  //   };

  //   ws.current.onmessage = (event) => {
  //     console.log('Received WebSocket message:sdsdsds', event.data);
  //     console.log('Received WebSocket messageSDADSAD:', typeof(event.data));
  //     // Handle the received data
  //     const messageData = JSON.parse(event.data);
  //     console.log("****************", messageData.action_type == 'DELIVERED_BOOKING');
  //     if (messageData.action_type == "CANCEL_BOOKING"){
  //       if (messageData.status == 'FAILED') {
  //         usedispatch(setAcceptTransaction(''));
  //         usedispatch(setTransactionID(''));
  //         navigationReturn.navigate('Parcel');
  //       }
  //     }
  //     else if (messageData.action_type == "ACCEPT_BOOKING"){
  //       console.log("RIDER_ACCEPT", messageData);
  //       console.log('RIDER FOUND', acceptTransaction);
        // usedispatch(setTransactionID(messageData.transaction_id));
        // usedispatch(setID(messageData.transaction_id));
        // usedispatch(setAcceptTransaction(JSON.stringify(messageData)));
        // navigationTrackMyOrder()
  //     }
      
  //     else if(messageData.action_type == 'DELIVERED_BOOKING'){
  //       console.log('Received WebSocket message:123', messageData.pickup_address);
  //       console.log('Received WebSocket message:456', typeof(messageData.pickup_address));
  //       // usedispatch(setTransactionID(messageData.transaction_id));
        
  //       if(messageData.status == 'PICKED_UP' && messageData.transaction_id == id){
  //         setTransactionPickup(JSON.parse(messageData.pickup_address));
  //       }
  //       else{
  //         setTransactionDropoff(JSON.parse(messageData.dropoff_address));
  //       }
  //       setNotificationPayload(event.data)
  //     }
  //   };

  //   ws.current.onerror = e => {
  //     console.error('WebSocket error:', e.message);
  //   };

  //   ws.current.onclose = e => {
  //     console.log('WebSocket closed:', e.code, e.reason);
  //   };
  // };

  useEffect(() => {
    const Notification = () => {
      // Handle displaying of Notification while in background

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        const body = remoteMessage.notification?.body;
        const title = remoteMessage.notification?.title;
        const data = remoteMessage?.data;
        const data_string = data?.data;

        if (typeof data_string === 'string') {
          try {
            if (data_string == 'alive' && !setAcceptTransaction) {
              console.log('alive');
            } else if (title === 'Customer Transaction' || title === 'You have an incorrect pin location.' || title === 'Booking has been cancelled') {
              // const status_string = JSON.parse(data_string);
              // usedispatch(setTransactionID(status_string.transaction_id));
              // setNotificationPayload(data_string)
              setNotificationMessage({
                title: title,
                body: body,
                data: data
              })
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
        else {
          console.error('Data is not a string:', data_string);
        }
      });
      return () => {
        unsubscribe();
      };
    };
    Notification();
  }, []);

  useEffect(() => {
    console.log("CHECKKKKKKKK PNS", transaction_id);
    // console.log("CHECKKKKKKKK PNS", id);
    console.log("CHECKKKKKKKK PNS", id);
    console.log("CHECCKKSADSADSA", notificationPayload);

    if (notificationPayload) {
      const transactionID = JSON.parse(notificationPayload).transaction_id 
      console.log("CHECCKKSADSADSA", transactionID);
      if(transactionID == id){
        console.log("HEREEEE");
        usedispatch(setAcceptTransaction(notificationPayload));
        usedispatch(setDropPayload(notificationPayload));
        const status_string = JSON.parse(notificationPayload);
        const status = status_string.status;
        usedispatch(setBookingStatus(status));
      }
    }
    else {
      console.log("HEREEEEEE", notificationMessage);
      onDisplayNotification(notificationMessage.body, notificationMessage.title, notificationMessage.data);
    }
  }, [transaction_id, notificationPayload, notificationMessage])

  useEffect(() => {
    const interval = setInterval(() => {
      // Reload
      if(webViewRef.current){
        webViewRef.current.reload();
      }
    },40000)
    // Cleanup on component unmount
    return () => clearInterval(interval)
  },[])

   // DETECT IF APP IS in background or Foreground
  //  useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //       initWebSocket()
  //     }
      
  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   initWebSocket()

  //   return () => {
  //     if (ws.current) {
  //       ws.current.close();
  //     }
  //   }
  // }, [isFocused, isRiderConnected, appStateVisible]);


  useEffect(() => {
    websocketTimeIn(1)
  },[isFocused, isUserConnected, appStateVisible])

  useEffect(() => {
    if(websocketMessage){
      const messageData = JSON.parse(websocketMessage);
      if(messageData.transaction_id == transaction_id){
        if (messageData.action_type == "CANCEL_BOOKING"){
          if (messageData.status == 'FAILED') {
            usedispatch(setAcceptTransaction(''));
            usedispatch(setTransactionID(''));
            navigationReturn.navigate('Parcel');
          }
        }
        // else if (messageData.action_type == "ACCEPT_BOOKING"){
        //   console.log("RIDER_ACCEPT", messageData);
        //   console.log('RIDER FOUND', acceptTransaction);
        //   usedispatch(setTransactionID(messageData.transaction_id));
        //   usedispatch(setID(messageData.transaction_id));
        //   usedispatch(setAcceptTransaction(JSON.stringify(messageData)));
        //   navigationTrackMyOrder()
        // }
        
        else if(messageData.action_type == 'DELIVERED_BOOKING'){
          console.log('Received WebSocket message:123', messageData.pickup_address);
          console.log('Received WebSocket message:456', typeof(messageData.pickup_address));
          // usedispatch(setTransactionID(messageData.transaction_id));
          
          if(messageData.status == 'PICKED_UP' && messageData.transaction_id == id){
            setTransactionPickup(JSON.parse(messageData.pickup_address));
          }
          else{
            setTransactionDropoff(JSON.parse(messageData.dropoff_address));
          }
          setNotificationPayload(websocketMessage)
        }
      }
      console.log("sadasdadasdsadsa");
      
    }

  }, [websocketMessage])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content" // Or "dark-content" based on your preference
        backgroundColor={colors.light}
      />
      <View style={{ position: 'absolute', top: 15, zIndex: 1 }}>
        <BackButton
          Onpress={() => {
            navigationBack()
          }}
        />
      </View>
      <View style={{ position: 'absolute', top: 15, zIndex: 1, right:15 }}>
        <ShareButton
          Onpress={() => {
            shareFunction()
          }}
        />
      </View>
      {/* Dynamic Header with back button and image background */}
      <Animated.View
        style={{
          // position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
          // zIndex: 1,
          // overflow: 'hidden',
          // opacity: headerOpacity, // Fade out as you scroll
        }}
      >
        <WebView ref={webViewRef} source={{ uri: `${PARCEL_BASE_URL}/v1/app-service/gps/track?reference_id=${transactionInfo.reference_id}&account_id=${accountId}` }} style={{ flex: 1 }} />
        {/* <ImageBackground
          source={require('../../../app/assets/img/mapBackground.png')}
          style={{ width: width, height: height  }}
        > */}
        {/* Back Button inside Image Background */}
        {/* <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              // opacity: headerOpacity, // Fade out as you scroll
              zIndex: 1,
            }}
          > */}
        {/* <View style={{position:'absolute', top:15, zIndex:1}}>
              <BackButton
                  Onpress={navigationBack}
                />
            </View> */}
        {/* </Animated.View> */}
        {/* </ImageBackground> */}
      </Animated.View>

      {/* ScrollView */}
      {/* <Animated.ScrollView
        contentContainerStyle={{}} // Start content below the header
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      > */}
      <ScrollView>
        {/* Status Tracking Icons and other content */}
        <View></View>
        <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.light,
            paddingHorizontal: spacing.m,
            paddingTop: spacing.s,
          }}>
          <View style={styles.trackStatusList}>
            <View style={styles.statusColumns}>
              <Image
                source={require('../../../app/assets/img/Accepted.png')}
                style={[styles.iconStatus, { opacity: 1 }]}
              />
            </View>
            <View style={styles.statusColumns}>
              <Image
                source={
                  transactionStatusInfo.status == 'PICKED_UP' ||
                    transactionStatusInfo.status == 'DELIVERY' ||
                    transactionStatusInfo.status == 'DROP_OFF' ||
                    transactionStatusInfo.status == 'DELIVERED' ?
                    require('../../../app/assets/img/ArrivedStore.png')
                    : require('../../../app/assets/img/ArrivedStorex.png')
                }
                style={
                  styles.iconActive
                }
              />
            </View>
            <TouchableOpacity style={styles.statusColumns}>
              <Image
                source={
                  transactionStatusInfo.status == 'PICKED_UP' ||
                    transactionStatusInfo.status == 'DELIVERY' ||
                    transactionStatusInfo.status == 'DROP_OFF' ||
                    transactionStatusInfo.status == 'DELIVERED' ?
                    require('../../../app/assets/img/Otw.png')
                    : require('../../../app/assets/img/Otwx.png')
                }
                style={
                  styles.iconActive
                }
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.statusColumns}>
              <Image
                source={
                  transactionStatusInfo.status == 'DELIVERED' ?
                    require('../../../app/assets/img/Completed.png')
                    : require('../../../app/assets/img/Completedx.png')
                }
                style={
                  styles.iconActive
                }
              />
            </TouchableOpacity>
          </View>
          {/* More content */}
          <View style={{ alignSelf: 'center' }}>
            <Text
              style={[
                { fontWeight: '700', color: colors.black, textAlign: 'center' },
                text.mediumPlus,
              ]}>
              {transactionStatusInfo.status == 'PICKING_UP'
                ? 'Rider accepted the request'
                : transactionStatusInfo.status == 'PICKED_UP'
                  ? 'Rider Picked up the Parcel and on its Way'
                  : transactionStatusInfo.status == 'DELIVERY' ||
                    transactionStatusInfo.status == 'DROP_OFF'
                    ? 'Rider is on its Way'
                    : transactionStatusInfo.status == 'DELIVERED' &&
                    'Request has been delivered'}
            </Text>
            <Text
              style={[
                {
                  fontWeight: '400',
                  alignSelf: 'center',
                  marginBottom: spacing.m,
                  color: colors.grayText,
                },
                text.small,
              ]}>
              {transactionInfo.reference_id &&
                `Transaction ID: ${transactionInfo.reference_id}`}
            </Text>
          </View>
        </View>
          <Divider style={styles.Divider} />
          <View>
            <View>
              <View style={styles.profileSpacing}>
                {
                  acceptTransaction ?
                    <Image
                      source={{ uri: riderPic }}
                      // source={require('../../../app/assets/img/sProfile.jpg')}
                      style={styles.profileImage}
                    />
                    // <Text>{riderPic}</Text>
                    :
                    null
                  // null
                  // <Image
                  //   source={require('../../../app/assets/img/sProfile.jpg')}
                  //   style={styles.profileImage}
                  // />

                }
                <View style={styles.riderDetails}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.nameTxt, text.smallPlus]}>
                    {transactionStatusInfo && transactionStatusInfo.display_name}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      type="ionicon"
                      name="star"
                      color={colors.mustard}
                      size={12}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        text.small,
                        {
                          fontWeight: '400',
                          color: colors.black,
                          width: '55%',
                        },
                      ]}>
                      4.9 |{' '}
                      {transactionStatusInfo && transactionStatusInfo.vehicle_model}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <TouchableOpacity onPress={callNumber} style={styles.contactIcon}>
                    <Icon type="ionicon" name="call" color={colors.mustard} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.contactIcon}
                    onPress={sendSMS}
                  >
                    <Icon
                      type="ionicon"
                      name="chatbox"
                      color={colors.mustard}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Divider style={styles.Divider} />
              <View>
                <View
                  style={{ flexDirection: 'row', marginVertical: spacing.s }}>
                  <Text style={[styles.subTitle, text.smallPlus]}>Pickup:</Text>
                  <Text style={[styles.descriptionTxt, text.smallPlus]}>
                    {transactionPickup &&
                      ` ${transactionPickup.pickup.description}`}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.statusBorderSpacing}>
                    <Icon
                      type="ionicon"
                      name="location"
                      color={colors.green}
                      size={30}
                    />
                  </View>

                  <TouchableOpacity
                    disabled={transactionPickup && !transactionPickup.pickup.is_wrong_pin}
                    style={[styles.statusBorder,
                    transactionPickup && !transactionPickup.pickup.is_wrong_pin
                      ? { backgroundColor: colors.mustardOpacity }
                      : { backgroundColor: colors.redOpacity }]}
                    onPress={() => {
                      wrongPinModal(0, "PICKED_UP", transactionPickup, transactionInfo)

                    }}
                  >
                    <Image
                      source={{
                        uri: transactionPickup
                          ? `${transactionPickup.pickup.pickup_image}`
                          : 'https://wallpapers.com/images/featured/blank-white-background-xbsfzsltjksfompa.jpg',
                      }}
                      style={{
                        resizeMode: 'cover',
                        width: 40,
                        height: 40,
                        backgroundColor: colors.light,
                        marginHorizontal: spacing.s,
                      }}
                    />
                    <View
                      style={
                        (transactionStatusInfo.status == 'PICKING_UP' ||
                          transactionStatusInfo.status == 'DELIVERY' ||
                          transactionStatusInfo.status == 'DROP_OFF') && {
                          justifyContent: 'center',
                        }
                      }>
                      <Text
                        style={[
                          (transactionStatusInfo.status == 'PICKED_UP' ||
                            transactionStatusInfo.status == 'DELIVERY' ||
                            transactionStatusInfo.status == 'DROP_OFF') &&
                          styles.statusTitle,
                          text.smallPlus,
                        ]}>
                        PICKED UP
                      </Text>
                      {(transactionStatusInfo.status == 'PICKED_UP' ||
                        transactionStatusInfo.status == 'DELIVERY' ||
                        transactionStatusInfo.status == 'DROP_OFF') && (
                          <Text style={[styles.statusDescription, text.small]}>
                            {DateFormatted({ date: pickupDate })} : {TimeFormatted({ date: pickupDate })}
                          </Text>
                        )}
                    </View>

                    <View style={{ position: 'absolute', right: 15, top: 15 }}>
                      {transactionPickup && !transactionPickup.pickup.is_wrong_pin ?
                        <Icon type="ionicon" name="chevron-forward" />
                        : <Icon type="ionicon" color={colors.red} name="warning" />}

                    </View>
                  </TouchableOpacity>
                </View>

                {multipleDrop &&
                  multipleDrop
                    .slice() // create a shallow copy to avoid mutating the original
                    .sort((a: any, b: any) => {
                    if (a.status === 'ARRIVED' && b.status !== 'ARRIVED') return -1;
                    if (a.status !== 'ARRIVED' && b.status === 'ARRIVED') return 1;
                    return 0; // preserve order if both are the same
                    })
                  .map((item: any, index: any) =>  (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: spacing.s,
                        }}>
                        <Text style={[styles.subTitle, text.smallPlus]}>
                          Drop-off:
                        </Text>
                        <Text style={[styles.descriptionTxt, text.smallPlus]}>
                          {multipleDrop && ` ${item.multipleName}`}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.statusBorderSpacing}>
                          <Icon
                            type="ionicon"
                            name="location"
                            color={colors.red}
                            size={30}
                          />
                        </View>

                        <TouchableOpacity
                          disabled={!item.is_wrong_pin}
                          style={[styles.statusBorder,
                          !item.is_wrong_pin
                            ? { backgroundColor: colors.mustardOpacity }
                            : { backgroundColor: colors.redOpacity }]}
                          onPress={() => {
                            wrongPinModal(index, "DELIVERY", item, transactionInfo)
                          }}>
                          <Image
                            source={{
                              uri: item
                                ? `${item.dropoff_image}`
                                : 'https://wallpapers.com/images/featured/blank-white-background-xbsfzsltjksfompa.jpg',
                            }}
                            style={{
                              resizeMode: 'cover',
                              width: 40,
                              height: 40,
                              backgroundColor: colors.light,
                              marginHorizontal: spacing.s,
                            }}
                          />
                          <View
                            style={
                              transactionStatusInfo.status == 'PICKING_UP' && {
                                justifyContent: 'center',
                              }
                            }>
                            <Text
                              style={[
                                (item.status == 'ARRIVED') &&
                                styles.statusTitle,
                                text.smallPlus,
                              ]}>
                              {item.status == 'ARRIVED'
                                ? 'DELIVERED'
                                : 'DELIVERY'
                              }
                            </Text>
                            {((transactionStatusInfo.status == 'PICKED_UP' &&
                              item.status == 'ARRIVED') ||
                              (transactionStatusInfo.status == 'DELIVERY' &&
                                item.status == 'ARRIVED') ||
                              transactionStatusInfo.status == 'DROP_OFF' &&
                              item.status == 'ARRIVED') && (
                                <Text
                                  style={[styles.statusDescription, text.small]}>
                                  {DateFormatted({ date: item.completed_at })} : {TimeFormatted({ date: item.completed_at })}
                                </Text>
                              )
                            }
                          </View>

                          <View
                            style={{
                              position: 'absolute',
                              right: 15,
                              top: 15,
                            }}>
                            {!item.is_wrong_pin ?
                              <Icon type="ionicon" name="chevron-forward" />
                              : <Icon type="ionicon" color={colors.red} name="warning" />}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                {/* <View style={{ flexDirection: 'row', margin: spacing.s }}>
                  <Text style={[styles.subTitle, text.smallPlus]}>
                    Drop-off:
                  </Text>
                  <Text style={[styles.descriptionTxt, text.smallPlus]}>
                    {multipleDrop &&
                      `${multipleDrop[0].multipleName}`}
                  </Text>
                </View> */}
                {/* <View style={{ flexDirection: 'row' }}>
                  <View style={styles.statusBorderSpacing}>
                    <Icon
                      type="ionicon"
                      name="location"
                      color={colors.red}
                      size={30}
                    />
                  </View>
                  <TouchableOpacity
                    disabled={multipleDrop && !multipleDrop[0].is_wrong_pin}
                    style={[styles.statusBorder,
                    multipleDrop && !multipleDrop[0].is_wrong_pin
                      ? { backgroundColor: colors.mustardOpacity }
                      : { backgroundColor: colors.redOpacity }]}
                    onPress={() => {
                      wrongPinModal(0, "DELIVERY", multipleDrop[0], transactionInfo)
                    }}>
                    <Image
                      source={{
                        uri: multipleDrop
                          ? `${multipleDrop[0].dropoff_image}`
                          : 'https://wallpapers.com/images/featured/blank-white-background-xbsfzsltjksfompa.jpg',
                      }}
                      style={{
                        resizeMode: 'cover',
                        width: 40,
                        height: 40,
                        backgroundColor: colors.light,
                        marginHorizontal: spacing.s,
                      }}
                    />
                    <View
                      style={
                        (transactionStatusInfo.status == 'PICKING_UP' ||
                          transactionStatusInfo.status == 'PICKED_UP') && {
                          justifyContent: 'center',
                        }
                      }>
                      <Text
                        style={
                          multipleDrop && multipleDrop[0].status == 'ARRIVED' && [
                            styles.statusTitle,
                            text.smallPlus,
                          ]
                        }>
                        {multipleDrop && multipleDrop[0].status == 'ARRIVED'
                          ? 'DELIVERED'
                          : 'DELIVERY'
                        }

                      </Text>
                      {multipleDrop && multipleDrop[0].status == 'ARRIVED' && (
                        <Text style={[styles.statusDescription, text.small]}>
                          {DateFormatted({ date: multipleDrop[0].completed_at })} : {TimeFormatted({ date: multipleDrop[0].completed_at })}
                        </Text>
                      )}
                    </View>
                    <View style={{ position: 'absolute', right: 15, top: 15 }}>
                      {multipleDrop && !multipleDrop[0].is_wrong_pin ?
                        <Icon type="ionicon" name="chevron-forward" />
                        : <Icon type="ionicon" color={colors.red} name="warning" />}
                    </View>
                  </TouchableOpacity>
                </View> */}
                <View style={{ marginTop: spacing.m }}>
                  <Text style={[styles.subTitle, text.smallPlus]}>
                    Notes to Rapidoo Rider:
                  </Text>
                  <TextInput
                    style={styles.noteRider}
                    multiline
                    placeholder={
                      transactionInfo.notes ? transactionInfo.notes : 'None'
                    }
                    numberOfLines={4}
                    maxLength={50}
                    editable={false}
                  />
                </View>
              </View>
              <Divider style={styles.Divider} />

              <View style={{ width: '100%', marginVertical: spacing.s }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.priceText, text.smallPlus]}>
                    Subtotal
                  </Text>
                  <Text style={[styles.priceTextAmount, text.smallPlus]}>
                    {transactionInfo.transaction_amount
                      ? transactionInfo.transaction_amount.toFixed(2)
                      : '0.00'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.priceText, text.smallPlus]}>
                    Delivery Fee
                  </Text>
                  <Text style={[styles.priceTextAmount, text.smallPlus]}>
                    {transactionInfo.processing_fee
                      ? transactionInfo.processing_fee.toFixed(2)
                      : '0.00'}
                  </Text>
                </View>
              </View>
              <Divider style={styles.Divider} />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: spacing.s,
                  }}>
                  <Text style={[styles.priceText, text.smallPlus]}>
                    Payment Details
                  </Text>
                  <View style={styles.descriptionCashSpace}>
                    <Text style={[styles.deductionDescription, text.smallPlus]}>
                      {/* Cash {'\n'} Coupon Code {'\n'} (Less: Php 20.00) */}
                      {transactionInfo.payment_method == 'CASH' &&
                        `Cash ${'\n'}`}
                      {transactionInfo.tip && `Tip: ${transactionInfo.tip}`}
                    </Text>
                  </View>
                </View>
              </View>
              <Divider style={styles.Divider} />
              <View style={{ marginVertical: spacing.s }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.priceText, text.medium]}>Total</Text>
                  <Text
                    style={[
                      {
                        fontWeight: '700',
                        color: colors.mustard,
                        alignSelf: 'center',
                      },
                      text.mediumLarge,
                    ]}>
                    {transactionInfo.total_amount
                      ? `Php ${transactionInfo.total_amount.toFixed(2)}`
                      : 'Php 0.00'}
                  </Text>
                </View>
              </View>
              {transactionStatusInfo.status == 'PICKING_UP' && (
                <View>
                  <View style={{ marginVertical: spacing.m, width: '100%' }}>
                    <CancelButton
                      btnTitle={'Cancel Order'}
                      onPress={() => {
                        // cancelOrder();
                        navigationParcel.navigate("CancelModal")
                      }}
                      disable={false}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>

        </View>
      {/* </Animated.ScrollView> */}
      </ScrollView>
    </View>
  );

}
