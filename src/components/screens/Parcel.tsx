import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  BackHandler
} from 'react-native';
import Modal from 'react-native-modal';
import {
  colors,
  spacing,
  text,
  verticalScale,
  moderateScale,
  sizes,
  horizontalScale,
} from '../../app/constants/theme';
import { Button } from 'react-native-paper';
import BackButton from '../common/BackButton';
import HistoryButton from '../common/HistoryButton';
import { Divider, color } from '@rneui/base';
import { Icon } from '@rneui/themed';
import { AddTipData, DeliveryOption, PaymentType, VEHICLE } from '../../app/assets/data/data';

import { SharedElement } from '../navigations/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import PlaceOrder from './Parcel/PlaceOrderContents';
import { useEffect, useRef, useState } from 'react';
import BorderOrangeSmall from '../common/BorderOrangeSmall';
import VehicleSelection from '../common/VehicleSelection';
import TypeOfPayBorder from '../common/AddTip';
import { lightning, parcel, walletCard } from '../../app/assets/img/images';
import AddTip from '../common/AddTip';
import OrangeButton from '../common/OrangeButton';
import {
  GOOGLE_API_KEY,
  GOOGLE_DISTANCE_MATRIX_URL,
} from '../../app/constants/config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/redux/store';
import { AlertModal } from '../../app/constants/AlertModal';
import {
  empty_dropoffAddress,
  empty_paymentType,
  empty_pickupAddress,
  empty_vehicleType,
} from '../../app/constants/AlertMsg';
import {
  setDistance,
  setDropoff,
  setMultiple,
  setMultipleID,
  setPickup,
  setPickupLatLong,
  setSearchScreen,
} from '../../app/redux/reducers/maplocation';
import CrashlyticsErrorHandler from '../../utils/Crashlytics/CrashlyticsErrorHandler';
import { computeAmount, getServiceOption } from '../../services/parcel';
import * as keychain from 'react-native-keychain';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { log } from '@react-native-firebase/crashlytics';
import { ParcelElement } from '../navigations/ParcelNavigation';
import { useEvent } from 'react-native-reanimated';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { setPrice, setReviewOrder, setTransactionID } from '../../app/redux/reducers/transactionOrder';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import useHardwareBack from '../../utils/HardwareBack';
import { getAllBooking, getLatestBooking, postBooking } from '../../app/watermelonDB/model/model';
import { IAM_WEBSOCKET_URL } from '../../Config';


const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 70;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function Parcel() {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const scheduleAt = useSelector((state: RootState) => state.transactionOrder.scheduled_at)
  const isUserConnected = useSelector((state: RootState) => state.appInfo.isUserConnected)

  const isFocused = useIsFocused(); // Hook to track if the screen is focused
  const pickupLocation = {
    pickupName: useSelector((state: RootState) => state.maplocation.pickupName),
    pickUpAddress: useSelector((state: RootState) => state.maplocation.pickUpAddress),
    pickupLatitude: useSelector((state: RootState) => state.maplocation.pickupLatitude),
    pickupLongitude: useSelector((state: RootState) => state.maplocation.pickupLongitude),
    pickupCNumber: useSelector((state: RootState) => state.maplocation.pickupCNumber),
    pickupCName: useSelector((state: RootState) => state.maplocation.pickupCName),
    pickupAddressDetails: useSelector((state: RootState) => state.maplocation.pickupAddressDetails),
  };

  const dropOffLocation = {
    dropOffName: useSelector((state: RootState) => state.maplocation.dropOffName),
    dropOffAddress: useSelector((state: RootState) => state.maplocation.dropOffAddress),
    dropLat: useSelector((state: RootState) => state.maplocation.dropOffLatitude),
    dropLong: useSelector((state: RootState) => state.maplocation.dropoffLongitude),
    dropoffCNumber: useSelector((state: RootState) => state.maplocation.dropoffCNumber),
    dropoffCName: useSelector((state: RootState) => state.maplocation.dropoffCName),
    DropoffAddressDetails: useSelector((state: RootState) => state.maplocation.dropoffAddressDetails),
  };
  const MultipleName = useSelector((state: RootState) => state.maplocation.multiplePayload);
  const route = useRoute<any>();
  const acceptTransaction: any = useSelector((state: RootState) => state.transactionOrder.accept_transaction);
  const [isAdditionalService, setIsAdditionalService] = useState(true);
  // const [isTypeofPayment, setIsTypeofPayment] = useState(true);
  // const [isAddTip, setIsAddTip] = useState(true);
  const [payment, setPayment] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [isSelectedTip, setIsSelectedTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const [deliveryOptionPrice, setDeliveryOptionPrice] = useState({
    priority: null,
    regular: null,
    pooling: null
  })
  const [distanceDuration, setDistanceDuration] = useState<any>(null);
  const usedispatch = useDispatch<AppDispatch>();
  const [address, setAddress] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [multipleDropID, setMultipleDropID] = useState(0);
  const [multipleDrop, setMultipleDrop] = useState<any>(null);
  const [isWarningMsg, setIsWarningMsg] = useState('');
  const [transactionStatus, setTransactionStatus] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  // Account Details
  // const accountID = useSelector((state: RootState) => state.registrationCounter.account_ID);
  // const fullname = useSelector((state: RootState) => state.registrationCounter.regFullName);
  // const email = useSelector((state: RootState) => state.registrationCounter.regEmail);
  // const birthday = useSelector((state: RootState) => state.registrationCounter.regBirthday);
  // const gender = useSelector((state: RootState) => state.registrationCounter.regGender);
  // const city = useSelector((state: RootState) => state.registrationCounter.regGender);
  // const mobileNumber = useSelector((state: RootState) => state.registrationCounter.regNumber);

  type isFormType = {
    senderDetails: object;
    receiverDetails: object;
    pickupAddress: object;
    dropOffAddress: object;
    vehicleType: string;
    paymentType: string;
    distance: any;
    deliveryOption: any;
    tip: any;
  };

  // Navigation Back
  useHardwareBack("Home",{})

  useEffect(() => {
    if (isForm.vehicleType == '') {
      setIsVisible(false);
    } else if (isForm.tip == '') {
      setIsVisible(false);
    } else if (isForm.paymentType == '') {
      setIsVisible(false);
    } else if (isForm.distance == '') {
      setIsVisible(false);
    } else if (totalAmount == 0){
      setIsVisible(false);
    }
    else if (multipleDrop.length <= 0){
      setIsVisible(false);
    }
    else {
      setIsVisible(true);
    }
  });
  useEffect(() => {
    try {
      if (MultipleName) {
        const multi = JSON.parse(MultipleName);
        setMultipleDrop(multi);
        console.log(multi);
      }
    } catch (error) {
      console.log("\n\nerrrrrrrrrrorrrrrrrrrrrr", error)
    }
  }, [MultipleName]);
  
  const [isForm, setIsForm] = useState<isFormType>({
    distance: '',
    vehicleType: '',
    paymentType: '',
    deliveryOption: 'REGULAR',
    tip: 0,
    senderDetails: {
      sender_name: pickupLocation.pickupCName,
      sender_phonenumber: '',
    },
    receiverDetails: {
      receiver_name: '',
      receiver_phonenumber: '',
    },
    pickupAddress: {
      pickupName: '',
      pickupAddress: '',
      pickupLatitude: '',
      pickupLongitude: '',
      pickupAddressDetails: '',
    },
    dropOffAddress: {
      dropoffName: '',
      dropoffAddress: '',
      dropoffLatitude: '',
      dropoffLongitude: '',
      dropoffAddressDetails: '',
    },
  });

  const ParcelValidation = () => {
    if (!isForm) {
      // console.log("value of form1", isForm);
      setIsDisable(false);
    } else {
      // console.log("value of form12", isForm);
      setIsDisable(true);
    }

    // if(!isForm.dropOffAddress){
    //   setIsWarning(true);
    //   setIsWarningMsg(empty_dropoffAddress);
    // }
    // else if(!isForm.pickupAddress){
    //   setIsWarning(true);
    //   setIsWarningMsg(empty_pickupAddress);
    // }
    // else if(!isForm.pickupAddress){
    //   setIsWarning(true);
    //   setIsWarningMsg(empty_dropoffAddress);
    // }
    // else if(!isForm.paymentType){
    //   setIsWarning(true);
    //   setIsWarningMsg(empty_paymentType);
    // }
    // else if(!isForm.vehicleType){
    //   setIsWarning(true);
    //   setIsWarningMsg(empty_vehicleType);
    // }
  };

const calculateDistance = async () => {
  const MAX_DESTINATIONS = 25;
  const lat = pickupLocation.pickupLatitude;
  const long = pickupLocation.pickupLongitude;
  const multiple_json = JSON.parse(MultipleName);
  let totalDistanceMeters = 0;

  try {
    if (MultipleName && multiple_json.length >= 1) {
      // Split destinations into chunks of 25
      for (let i = 0; i  < multiple_json.length; i += MAX_DESTINATIONS) {
        const chunk = multiple_json.slice(i, i + MAX_DESTINATIONS); // slice up to 25
        
        const destinations = chunk // slice up to 25
          .map((item: any) => `${item.multipleLatitude},${item.multipleLongitude}`)
          .join('|');

        const response = await axios.get(GOOGLE_DISTANCE_MATRIX_URL, {
          params: {
            origins: `${lat},${long}`,
            destinations: destinations,
            key: GOOGLE_API_KEY,
          },
        });
        const elements = response.data.rows[0].elements;

        for (let j = 0; j < elements.length; j++) {
          if (elements[j].status === 'OK') {
            totalDistanceMeters += elements[j].distance.value;
          }
        }
      }

      const totalDistance = totalDistanceMeters === 0.0 ? 0.1 : (totalDistanceMeters / 1000).toFixed(1);
      setIsForm({ ...isForm, distance: totalDistance });
    } else {
      // Handle single drop-off (non-multiple)
      const droplat = multipleDrop && multipleDrop[0].multipleLatitude;
      const droplong = multipleDrop && multipleDrop[0].multipleLongitude;

      const result = await axios.get(GOOGLE_DISTANCE_MATRIX_URL, {
        params: {
          origins: `${lat},${long}`,
          destinations: `${droplat},${droplong}`,
          key: GOOGLE_API_KEY,
        },
      });

      const distance = result.data.rows[0].elements[0].distance.text;
      const duration = result.data.rows[0].elements[0].duration.text;

      setIsForm({ ...isForm, distance });
      console.log(distance);
      console.log(duration);
    }
  } catch (error) {
    CrashlyticsErrorHandler(error, 'Parcel.ts', 'calculateDistance');
    console.log(error);
  }
};

  const toggleAdditionalS = () => {
    setIsAdditionalService(!isAdditionalService);
  };

  // const toggleTypeofPay = () => {
  //   setIsTypeofPayment(!isTypeofPayment);
  // };

  const removeMultipleDrop = (id: any) => {
    console.log(id);

    // Filter out the item with the matching id
    const updatedMulti = multipleDrop
      .filter((item: { id: number }) => item.id !== id)
      .map((item: any, index: any) => ({
        ...item,
        id: index + 1, // Reassign ids to be sequential
      }));

    const multiple_string = JSON.stringify(updatedMulti);
    setMultipleDrop(updatedMulti);
    usedispatch(setMultiple(multiple_string));
  };

  const onSubmit = () => {
    setIsForm({
      ...isForm,
      senderDetails: {
        sender_name: pickupLocation.pickupCName,
        sender_phonenumber: pickupLocation.pickupCNumber,
      },
      receiverDetails: {
        receiver_name: dropOffLocation.dropoffCName,
        receiver_phonenumber: dropOffLocation.dropoffCNumber,
      },
      pickupAddress: {
        pickupName: pickupLocation.pickupName,
        pickupAddress: pickupLocation.pickUpAddress,
        pickupLatitude: pickupLocation.pickupLatitude,
        pickupLongitude: pickupLocation.pickupLongitude,
        pickupAddressDetails: '',
      },
      dropOffAddress: {
        dropoffName: dropOffLocation.dropOffName,
        dropoffAddress: dropOffLocation.dropOffAddress,
        dropoffLatitude: dropOffLocation.dropLat,
        dropoffLongitude: dropOffLocation.dropLong,
        dropoffAddressDetails: '',
      },
    });
    usedispatch(setTransactionID(""))
    usedispatch(setPrice(totalAmount))
    setModalVisible(!isModalVisible);
  };

  const navigationSearchAddress = () => {
    navigationParcel.reset({
      index: 0,
      routes: [{ name: 'SearchAddress' }],
    });
  };

  const navigationBack = () => {
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
            }
          ]
        }
      }],
    })
  }

  // Dispatch Booking from Watermelon
  const fetchDataBooking = async() => {
    const data = await getLatestBooking()
    if(data.length){
      const pickup_data = JSON.parse(data[0]._raw.pickupAddress);
      const multiple_data = JSON.parse(data[0]._raw.multipleAddress);

      if (multiple_data.length > 0) {
          const updatedData = multiple_data.map((item: any) => ({
              ...item,
              completed_at: null,
              status: "DELIVERY",
              dropoff_image: null
          }));
          usedispatch(setMultiple(JSON.stringify(updatedData)))
      } else {
          usedispatch(setMultiple('[]'))
      }

      usedispatch(setPickup(pickup_data))
    }
     
  }

  useEffect(() => {
    if (isModalVisible) {
      usedispatch(setReviewOrder({
        pickupAddress:pickupLocation.pickUpAddress,
          dropoffAddress:dropOffLocation.dropOffAddress,
          totalAmount:totalAmount,
        isForm: isForm,
        tip: isForm.tip
      }))

      navigationParcel.navigate('ReviewOrder')
    }
  }, [isModalVisible])

  useEffect(() => {
    if (
      pickupLocation.pickUpAddress.length > 20 &&
      multipleDrop && multipleDrop.length >= 1
    ) {
      calculateDistance();
    }
  }, [pickupLocation.pickUpAddress, dropOffLocation.dropOffAddress, multipleDrop]);

  useEffect(() => {
    const serviceOption = async () => {
      try {        
        const response = await getServiceOption();
        console.log("-----------------", response);
        setDeliveryOptionPrice({
          priority: response.priority,
          regular: response.regular,
          pooling: response.pooling
        })

      } catch (error) {
        console.log(error);
      }

    }
    serviceOption()
  }, [isForm.deliveryOption])

  useEffect(() => {
    if (isForm.distance) {
      const computeDistance = async () => {
        try {
          const dropoff_payload = {
            pickup: {
              pickupLocation
            },
            dropoff: {
              dropoff_details: MultipleName
            }
          }
          const resp: any = await keychain.getGenericPassword();
          const access_json = JSON.parse(resp.password);

          const response = await computeAmount(isForm.deliveryOption, isForm.distance, multipleDrop.length, access_json.access_token, dropoff_payload);

          const total = response.total + isForm.tip;
          console.log(response.total + isForm.tip);
          setTotalAmount(total.toFixed(2));
          usedispatch(setPrice(total.toFixed(2)))
        } catch (error) {
          console.log(error);
        }
      };
      computeDistance();
    }
  }, [isForm.deliveryOption, isForm.distance, isForm.tip, multipleDrop, MultipleName]);

  // const initWebSocket = async () => {
  //   const response: any = await keychain.getGenericPassword();
  //   const access_json = JSON.parse(response.password);
  //   console.log(access_json.access_token);

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
  //     console.log('WebSocket connection opened');
  //   };
  //   ws.current.onerror = e => {
  //     console.error('WebSocket error:', e.message);
  //   };
  //   ws.current.onclose = e => {
  //     console.log('WebSocket closed:', e.code, e.reason);
  //   };
  // };
    
  // useEffect(() => {
  //   initWebSocket()
    
  //   return () => {
  //     if (ws.current) {
  //       ws.current.close();
  //     }
  //   };
      
  // }, [isFocused, isRiderConnected]);

  // Save booking
  useEffect(() => {
    if(typeof(MultipleName) == 'string'){
      const multipleData = JSON.parse(MultipleName)

      pickupLocation.pickupLatitude && MultipleName.length ?
      postBooking({pickupAddress:pickupLocation, multipleAddress:multipleData})
      :
      fetchDataBooking()
    }else{
      pickupLocation.pickupLatitude ?
      postBooking({pickupAddress:pickupLocation, multipleAddress:MultipleName})
      :
      fetchDataBooking()
    }
  },[isFocused, MultipleName])
  
  // SET DEFAULT DELIVERY OPTION
  useEffect(() => {
    if(MultipleName){
      const dropoff = JSON.parse(MultipleName)
      const dropoff_count = dropoff.length

      if(dropoff_count > 1){
        setIsForm({ ...isForm, deliveryOption: "PRIORITY" });
      }
    }
  }, [MultipleName, isForm.deliveryOption])

  console.log(MultipleName);
  
  return (
    <>
      <ImageBackground
        source={require('../../app/assets/img/mapBackground.png')}
        style={styles.imageCover}>
        <AlertModal
          modalVisibile={isWarning}
          alertMessage={isWarningMsg}
          yesOnpress={() => setIsWarning(false)}
          noOnpress={() => setIsWarning(false)}
        />
        <ScrollView>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginVertical: spacing.m,
            }}>
            <View style={{ alignSelf: 'center' }}>
              <BackButton
                Onpress={navigationBack}
              />
            </View>
            <View>
              <Button mode="contained" style={styles.parcelHeader}>
                <Text style={{ fontSize: sizes.h3, fontWeight: '700' }}>
                  Parcel Delivery
                </Text>
              </Button>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <HistoryButton
                Onpress={() => {
                  // navigationParcel.navigate('ScheduleBookingModal')
                }}
              />
            </View>
          </View>
          {/* <View style={{height: wHeight / 0.55, paddingHorizontal: spacing.m}}> */}
          <View style={{ height:"85%", paddingHorizontal: spacing.m, marginBottom:spacing.xl }}>
            <View style={styles.pickUpform}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  minHeight: 50,
                  position: 'relative',
                }}>
                <View
                  style={{
                    width: 1,
                    height: '75%',
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    opacity: 0.8,
                    borderColor: '#111',
                    position: 'absolute',
                    left: '10%',
                    bottom: 0,
                  }}></View>
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <Icon name="location" type="ionicon" color={colors.green} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    usedispatch(setSearchScreen('pickup'));
                    navigationSearchAddress()
                  }}
                  style={{ width: '80%' }}>
                  <Text style={[text.normal, styles.pickUpTitle]}>
                    {pickupLocation
                      ? `${pickupLocation.pickUpAddress}`
                      : 'Enter Pickup Address'}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[text.smallPlus, styles.pickUpDescription]}>
                    {`${pickupLocation.pickupCName}`} |{' '}
                    {`${pickupLocation.pickupCNumber}`}
                  </Text>
                  <Divider style={styles.subDivider} />
                </TouchableOpacity>
              </View>
              {/* MULTIPLE STOP INPUT */}
              {multipleDrop &&
                multipleDrop.map((item: any, index: any) => index !== 0 && (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      minHeight: 50,
                      position: 'relative',
                    }}
                    key={index}>
                    <View
                      style={{
                        width: 1,
                        height: '75%',
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        opacity: 0.8,
                        borderColor: '#111',
                        position: 'absolute',
                        left: '10%',
                        bottom: 0,
                      }}></View>
                    <View
                      style={{
                        width: '20%',
                        height: '100%',
                        alignItems: 'center',
                      }}>
                      <Icon name="radio-button-on" type="ionicon" color={colors.orange} />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item.id);
                        usedispatch(setMultipleID(item.id));
                        usedispatch(setSearchScreen('multiple'));
                        navigationSearchAddress()
                      }}
                      style={{ width: '60%' }}>
                      <Text style={[text.normal, styles.pickUpTitle]}>
                        {dropOffLocation
                          ? `${item.multipleAddress}`
                          : 'Enter Stop Location Address'}
                      </Text>
                      <Text
                        // numberOfLines={1}
                        // ellipsizeMode="tail"
                        style={[text.smallPlus, styles.pickUpDescription]}>
                        {`${item.multipleCName}`} | {`${item.multipleCNumber}`}
                      </Text>
                      <Divider style={styles.subDivider} />
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '20%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          removeMultipleDrop(item.id);
                        }}>
                        <Icon name="close-circle" type="ionicon" color={colors.red} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  minHeight: 50,
                  position: 'relative',
                }}>
                {/* <View style={{
                  width: 1,
                  height: '100%',
                  backgroundColor: '#111',
                  position: 'absolute',
                  left: '10%'
                }}>
                </View> */}
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <Icon name="location" type="ionicon" color={colors.red} />
                </View>
                <TouchableOpacity
                 onPress={() => {
                  if (multipleDrop && multipleDrop.length > 0) {
                    usedispatch(setMultipleID(1));
                  }
                  usedispatch(setSearchScreen('dropoff'));
                  navigationSearchAddress();
                  }}
                  style={{ width: '60%' }}>
                  <Text style={[text.normal, styles.pickUpTitle]}>
                    {multipleDrop && multipleDrop.length > 0
                      ? `${multipleDrop[0].multipleAddress}`
                      : 'Enter Drop-off Address'}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[text.smallPlus, styles.pickUpDescription]}>
                    {multipleDrop && multipleDrop.length > 0
                      ? `${multipleDrop[0].multipleCName} | ${multipleDrop[0].multipleCNumber}`
                      : `Contact Person | Contact Number`
                    }
                    {/* // {`${multipleDrop ? multipleDrop[0].multipleCName : ' '}`} |{' '}
                    // {`${multipleDrop ? multipleDrop[0].multipleCNumber : ' '}`} */}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: '20%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      removeMultipleDrop(1);
                    }}>
                    {multipleDrop?.length === 1 && (
                      <Icon name="close-circle" type="ionicon" color={colors.red} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Divider style={styles.Divider} />
                
              {/* MULTIPLE STOP */}
              <TouchableOpacity
                onPress={() => {
                  usedispatch(setSearchScreen('multiple'));
                  navigationSearchAddress()
                }}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  paddingBottom: spacing.s,
                }}
                disabled={multipleDrop && multipleDrop.length > 0 ? false : true}
                >
                <View
                  style={{
                    backgroundColor: multipleDrop && multipleDrop.length > 0 ? colors.mustard : colors.grayTwo,
                    padding: spacing.s,
                    borderRadius: 20,
                    alignSelf: 'center',
                    marginHorizontal: spacing.s,
                  }}>
                  <Icon
                    type="ionicon"
                    name="add"
                    size={17}
                    color={colors.light}
                    style={{ elevation: 5 }}
                  />
                </View>
                <View style={{ alignSelf: 'center' }}>
                  <Text
                    style={[
                      text.smallPlus,
                      { fontWeight: '600', color: colors.grayTwo },
                    ]}>
                    Add more stop
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.additionalServiceForm}>
              <TouchableOpacity
                onPress={() => {}}
                disabled={true}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={[text.normal, styles.additionalServiceTitle]}>
                    Scheduled Order
                  </Text>
                </View>
              </TouchableOpacity>
                <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigationParcel.navigate('ScheduleBookingModal')
                      }}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.mustard,
                        height: 45,
                        borderRadius: sizes.small,
                        padding: spacing.s,
                        marginTop: spacing.s,
                        flexDirection: 'row',
                      }}>
                      <Icon name="calendar" type="ionicon" size={25} color={colors.mustard} style={{marginRight: spacing.l}}/>
                      <View style={{ alignSelf: 'center' }}>
                        <Text
                          style={[
                            text.normal,
                            {
                              fontWeight: '600',
                              color: colors.black
                            },
                          ]}>
                          {scheduleAt
                          ? `${scheduleAt}` 
                          : "Now"
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.selectVehicleForm}>
              <Text style={[text.normal, styles.selectVehicleTitle]}>
                Select Vehicle
              </Text>
              <>
                <FlatList
                  data={VEHICLE}
                  horizontal
                  snapToInterval={CARD_WIDTH_SPACING}
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  extraData={selectedVehicle}
                  renderItem={({ item, index }) => {
                    console.log('this is ID' + item.id);
                    const backgroundColor =
                      item.value == isForm.vehicleType
                        ? colors.mustard
                        : colors.gray;
                    const color =
                      item.value == isForm.vehicleType
                        ? 'white'
                        : colors.grayText;
                    return item.id === 2 || item.id === 3 ? (
                      <View
                        style={{
                          marginLeft: spacing.s,
                          marginRight: spacing.s,
                        }}>
                        <View
                          style={{
                            width: 'auto',
                            height: CARD_HEIGHT,
                            marginVertical: 10,
                            borderRadius: sizes.radius,
                            flexDirection: 'row',
                            backgroundColor: backgroundColor,
                            padding: spacing.s,
                            elevation: 5,
                          }}>
                          <Image source={item.image} style={styles.imageItem} />
                          <View>
                            <Text
                              style={{
                                fontWeight: '600',
                                fontSize: sizes.h3,
                                marginHorizontal: spacing.s,
                                color: color,
                              }}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '400',
                                fontSize: sizes.body,
                                marginHorizontal: spacing.s,
                                color: color,
                              }}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          marginLeft: spacing.s,
                          marginRight: spacing.s,
                        }}
                        onPress={() =>
                          setIsForm({ ...isForm, vehicleType: item.value })
                        }>
                        <View
                          style={{
                            width: 'auto',
                            height: CARD_HEIGHT,
                            marginVertical: 10,
                            borderRadius: sizes.radius,
                            flexDirection: 'row',
                            backgroundColor: backgroundColor,
                            padding: spacing.s,
                            elevation: 5,
                          }}>
                          <Image source={item.image} style={styles.imageItem} />
                          <View>
                            <Text
                              style={{
                                fontWeight: '600',
                                fontSize: sizes.h3,
                                marginHorizontal: spacing.s,
                                color: color,
                              }}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '400',
                                fontSize: sizes.body,
                                marginHorizontal: spacing.s,
                                color: color,
                              }}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </>
            </View>
            {/* UNCOMMENT */}
            {/* <View style={styles.additionalServiceForm}>
            <TouchableOpacity
              onPress={toggleAdditionalS}
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View>
                <Text style={[text.normal, styles.additionalServiceTitle]}>
                  Additional Services
                </Text>
                <Text style={[text.small, styles.additionalServiceDescription]}>
                  (You can select more than 1)
                </Text>
              </View>
              {isAdditionalService == true ? (
                <View style={{ alignSelf: 'center' }}>
                  <Icon type="ionicon" name="chevron-up-outline" />
                </View>
              ) : (
                <View style={{ alignSelf: 'center' }}>
                  <Icon type="ionicon" name="chevron-down-outline" />
                </View>
              )}
            </TouchableOpacity>
            {isAdditionalService && (
              <View>
                <BorderOrangeSmall
                  Title="Pabili Service"
                  SecondText="Php 30.00"
                />
                <BorderOrangeSmall
                  Title="Insulated Bag"
                  SecondText="Php 30.00"
                />
              </View>
            )}
          </View> */}

            <View style={styles.additionalServiceForm}>
              <TouchableOpacity
                onPress={() => {}}
                disabled={true}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={[text.normal, styles.additionalServiceTitle]}>
                    Type of Payment
                  </Text>
                  <Text style={[text.small, styles.additionalServiceDescription]}>
                    (Choose how you pay)
                  </Text>
                </View>
                {/* {isTypeofPayment == true ? (
                  <View style={{ alignSelf: 'center' }}>
                    <Icon type="ionicon" name="chevron-up-outline" />
                  </View>
                ) : (
                  <View style={{ alignSelf: 'center' }}>
                    <Icon type="ionicon" name="chevron-down-outline" />
                  </View>
                )} */}
              </TouchableOpacity>
              {/* {isTypeofPayment && ( */}
                <View>
                  {PaymentType.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setIsForm({ ...isForm, paymentType: item.value });
                      }}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.mustard,
                        borderRadius: sizes.small,
                        padding: spacing.s,
                        backgroundColor:
                          isForm.paymentType == item.value
                            ? colors.mustard
                            : colors.white,
                        marginTop: spacing.s,
                      }}>
                      
                      <View style={styles.deliveryOptionChoice}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                              source={{ uri: item.image }}
                              style={{
                              height: 30,
                              width: 30,
                              marginRight: spacing.l,
                            }}
                          />
                          <Text
                            style={[
                              text.normal,
                              {
                                fontWeight: '600',
                                color:
                                  isForm.paymentType == item.value
                                    ? colors.white
                                    : colors.black,
                              },
                            ]}>
                            {item.paymentName}
                          </Text>
                          
                        </View>
                        {/* <Text 
                          style={[text.normal,
                            {
                              fontWeight: '400',
                              color:
                                isForm.paymentType == item.value
                                  ? colors.white
                                  : colors.orange
                            },
                          ]}>
                           {item.value == 'CASH' && `+ ₱30`}
                        </Text> */}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
            </View>
            
            <View style={styles.additionalServiceForm}>
              <TouchableOpacity
                onPress={() => {}}
                disabled={true}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={[text.normal, styles.additionalServiceTitle]}>
                    Delivery Option
                  </Text>
                </View>

              </TouchableOpacity>
              {/* {isTypeofPayment && ( */}
                <View>
                  {DeliveryOption.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setIsForm({ ...isForm, deliveryOption: item.value });
                      }}  
                      style={{
                        borderWidth: 1,
                        borderColor: colors.mustard,
                        height: 45,
                        borderRadius: sizes.small,
                        padding: spacing.s,
                        backgroundColor:
                          isForm.deliveryOption == item.value
                            ? colors.mustard
                            : colors.white,
                        marginTop: spacing.s,
                      }}>
                      {/* <Image
                        source={{ uri: item.image }}
                        style={{
                          height: 30,
                          width: 30,
                          marginRight: spacing.l,
                        }}
                      /> */}
                      <View style={styles.deliveryOptionChoice}>
                        <Text
                          style={[
                            text.normal,
                            {
                              fontWeight: '600',
                              color:
                                isForm.deliveryOption == item.value
                                  ? colors.white
                                  : colors.black,
                            },
                          ]}>
                          {item.deliveryOption}
                        </Text>
                        <Text 
                          style={[text.normal,
                            {
                              fontWeight: '400',
                              color:
                                isForm.deliveryOption == item.value
                                  ? colors.white
                                  : colors.orange
                            },
                          ]}>
                          {item.value == 'PRIORITY' 
                          ? `+ ${deliveryOptionPrice && deliveryOptionPrice.priority}%` 
                          : item.value == "REGULAR" 
                          ? `${deliveryOptionPrice && deliveryOptionPrice.regular != 0 ? `${deliveryOptionPrice.regular}` : ``}` 
                          : item.value == "POOLING" 
                          ? `- ${deliveryOptionPrice && deliveryOptionPrice.pooling}%` 
                          : `0`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
            </View>
            
            <View style={styles.addTipForm}>
              <TouchableOpacity
                onPress={() => {}}
                disabled={true}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={[text.normal, styles.additionalServiceTitle]}>
                    Add Tip
                  </Text>
                  <Text style={[text.small, styles.additionalServiceDescription]}>
                    (100% of the Tip will be recieved by the rider)
                  </Text>
                </View>

              </TouchableOpacity>
              {/* {isAddTip && ( */}
                <View>
                  {/* <AddTip list={AddTipData} /> */}
                  <>
                    <FlatList
                      data={AddTipData}
                      decelerationRate="fast"
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        const backgroundColor =
                          item.value == isForm.tip
                            ? colors.mustard
                            : colors.white;
                        const color =
                          item.value === isForm.tip ? 'white' : colors.black;
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              isForm.tip ==
                                setIsForm({ ...isForm, tip: item.value });
                            }}
                            style={{
                              borderWidth: 1,
                              borderColor: colors.mustard,
                              height: 60,
                              width: 'auto',
                              backgroundColor: backgroundColor,
                              marginHorizontal: spacing.s,
                              paddingHorizontal: spacing.m,
                              paddingVertical: spacing.s,
                              borderRadius: sizes.small,
                              marginTop: spacing.s,
                              flexDirection: 'row',
                            }}>
                            <View style={{ alignSelf: 'center' }}>
                              <Text
                                style={[
                                  text.normal,

                                  { fontWeight: '600', color: color },
                                ]}>
                                {item.amount}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </>
                  <View style={{ flexDirection: 'row', marginTop: spacing.m }}>
                  </View>
                </View>
              {/* )} */}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      <View style={styles.footerParcel}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.footerText}>Total Delivery Fee</Text>
          
          <Text style={styles.footerPrice}>{`Php ${totalAmount
            ? totalAmount
            : isForm.tip
              ? isForm.tip.toFixed(2)
              : '0.00'
            }`}</Text>
        </View>
        <View>
          <View style={{ marginTop: spacing.m, width: '100%' }}>
            <OrangeButton
              btnTitle={'Review your Order'}
              onPress={onSubmit}
              disable={!isVisible}
            />
          </View>
        </View>
      </View>
      {/* Place order Modal */}

    </>
  );
}

const styles = StyleSheet.create({
  footerParcel: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.light,
    height: "15%",
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    elevation: 5,
    // padding: spacing.l,
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.s,
    paddingLeft: spacing.l
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 700,
    // paddingBottom: 20,
  },
  priceTitle: {
    fontWeight: '400',
    fontSize: sizes.body + 3,
    color: colors.black,
    marginTop: spacing.s,
  },
  priceText: {
    fontWeight: '700',
    fontSize: sizes.h2,
    color: colors.black,
    position: 'absolute',
    right: 10,
  },
  footerText: {
    fontWeight: '400',
    fontSize: sizes.body,
    color: colors.black,
  },
  imageItem: {
    height: 30,
    width: 30,
    margin: spacing.s,
    resizeMode: 'cover',
  },
  footerPrice: {
    fontWeight: '700',
    fontSize: sizes.h2,
    color: colors.black,
    position: 'absolute',
    right: 10,
  },
  imageCover: {
    resizeMode: 'cover',
    height:"100%"
  },
  parcelHeader: {
    padding: moderateScale(8),
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: colors.mustard,
  },
  pickUpform: {
    height: 'auto',
    elevation: 5,
    paddingHorizontal: spacing.s,
    paddingTop: spacing.m,
    backgroundColor: colors.light,
    marginVertical: spacing.s,
    borderRadius: sizes.radius,
  },
  pickUpImage: {
    height: verticalScale(65),
    aspectRatio: 1 / 6,
    resizeMode: 'stretch',
  },
  dataTitle: {
    fontWeight: '500',
  },
  pickUpTitle: {
    fontWeight: '700',
    color: colors.black,
  },
  pickUpDescription: {
    fontWeight: '500',
    fontSize: sizes.body,
    color: colors.grayText,
  },
  Divider: {
    width: '100%',
    borderWidth: 0.1,
    margin: spacing.s,
    alignSelf: 'center',
  },
  subDivider: {
    margin: spacing.s,
    width: '100%',
    left: -20,
    borderWidth: 0.1,
  },
  selectVehicleForm: {
    height: "auto",
    elevation: 5,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    backgroundColor: colors.light,
    borderRadius: sizes.radius,
  },
  selectVehicleTitle: {
    fontWeight: '700',
    color: colors.black,
  },
  additionalServiceForm: {
    height:"auto",
    paddingBottom: spacing.m,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    elevation: 5,
    backgroundColor: colors.light,
    marginVertical: spacing.s,
    borderRadius: sizes.radius,
  },
  addTipForm: {
    height:"auto",
    paddingBottom: spacing.m,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    elevation: 5,
    backgroundColor: colors.light,
    marginTop: spacing.s,
    marginBottom:spacing.xxl + 25,
    borderRadius: sizes.radius,
  },
  additionalServiceTitle: {
    fontWeight: '700',
    color: colors.black,
  },
  additionalServiceDescription: {
    fontWeight: '400',
    color: colors.grayText,
  },
  additionalSerBorder: {
    borderWidth: 1,
    borderColor: colors.mustard,
    height: 45,
    borderRadius: sizes.small,
    padding: spacing.s,
    marginTop: spacing.s,
    flexDirection: 'row',
  },
  typeofPaymentForm: {
    height: verticalScale(100),
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    elevation: 5,
    backgroundColor: colors.light,
    marginTop: spacing.s,
    borderRadius: sizes.radius,
  },
  deliveryOptionChoice: {
    alignItems: 'center',
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
});
