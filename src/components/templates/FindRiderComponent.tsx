import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AppState,
} from 'react-native';
import Modal from 'react-native-modal';
import OrangeButton from '../common/OrangeButton';
import { colors, sizes, spacing, text } from '../../app/constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SharedElement } from '../navigations/Navigation';
import AddTip from '../common/AddTip';
import { AddTipData } from '../../app/assets/data/data';
import Lootie from './Lootie';
import * as keychain from 'react-native-keychain';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/redux/store';
import {
  cancelTransaction,
  checkCurrentTransaction,
  getTransactionStatus,
  getVehicles,
  saveTransactions,
} from '../../services/parcel';
import { setAcceptTransaction, setID, setTransactionID } from '../../app/redux/reducers/transactionOrder';
import { LoaderComponents } from '../common/LoaderComponents';
import { log } from '@react-native-firebase/crashlytics';
import { ParcelElement } from '../navigations/ParcelNavigation';
import { KeyChainGet } from '../../utils/KeyChain/GetKeyChain';
import { AlertModal } from '../../app/constants/AlertModal';
import { IAM_WEBSOCKET_URL } from '../../Config';
import { sendWebSocketMessage } from '../../services/websocket/WebsocketService';
// import ButtonOrange from "../common/ButtonOrange";

type Props = {
  btnName: string;
  data: any;
  value: any;
  toggle: any;
};
const FindRiderComponent: React.FC<Props> = ({
  btnName,
  data,
  value,
  toggle,
}: Props) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("")
  const [isMessageToggle, setIsMessageToggle] = useState(false)
  const [noCashMessage, setNoCashMessage] = useState("")
  const [isModalVisible, setModalVisible] = useState(false);
  const [iscancelModal, setIsCancelModal] = useState(false)
  const [loader, setIsLoader] = useState(false);
  const [isCancelBtn, setIsCancelBtn] = useState(true);
  const isUserConnected = useSelector((state: RootState) => state.appInfo.isUserConnected)
  const transactionID = useSelector((state: RootState) => state.transactionOrder.transaction_id);
  const websocketMessage = useSelector((state: RootState) => state.transactionOrder.websocketMessage);
  const acceptTransaction = useSelector((state: RootState) => state.transactionOrder.accept_transaction);
  const rider_account_id = useSelector((state: RootState) => state.maplocation.rider_account_id);
  const coupons_data: any = useSelector((state: RootState) => state.transactionOrder.coupons);
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const usedispatch = useDispatch<AppDispatch>();
  const isMultipleDrop = useSelector((state: RootState) => state.maplocation.multiplePayload);
  const permissionRef = useRef<any>(null);

  // DETECT IF APP IS in background or Foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }
      
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  
  const toggleNoCash = () => {
    setIsMessageToggle(false) 
    setModalVisible(false)
    setIsCancelModal(false)
  }

  const toggleModal = (transac_id: any) => {
    const sendTimeOut = async (transaction_id: any) => {
      try {
        setMessage(''); 
        //Get Acess Token
        // const result: any = await keychain.getGenericPassword();
        const key = await KeyChainGet()
        // const access_json = JSON.parse(result.password);
        // console.log("password++++++++", result.password);
        
        setIsCancelModal(true)
        const cancel = await cancelTransaction(
          transac_id,
          // access_json.access_token,
          key.access_token
        );
        // if (cancel.status_code === 1003) {
        //   setMessage("Booking Accepted Please Wait")
        // }
        // else if (cancel) {}
        if (cancel){
          websocketTimeOut(0)
          usedispatch(setTransactionID(''))
          setModalVisible(false)
          toggle(!value);
          console.log(cancel);
          setIsCancelModal(false)
          setIsCancelBtn(true)
        }
        // }
      } catch (error) {
        console.log(error);
      }
    };
    sendTimeOut(transactionID);
  };

  const toggleRiderLoad = () => {
    setModalVisible(value);
    console.log(isModalVisible);
  };

  // TIME OUT FIND RIDER IN 2 MINUTES
  // const customerTimeOut = (transac_id: any) => {
  //   if (!isModalVisible) {
  //     setTimeout(() => {
  //       toggleModal(transac_id);
  //     }, 120000);
  //   }
  // }
  
  // Transaction Payload
  const TransactionDetails = {
    coupon_id: coupons_data ? coupons_data.data.coupon_id: null ,
    rider_account_id: rider_account_id ? rider_account_id : null,
    vehicle_type: data.vehicleType,
    delivery_option: data.deliveryOption,
    payment_method: data.paymentType,
    tip: data.tip == 0 ? 0 : data.tip,
    schedule_at: useSelector((state: RootState) => state.transactionOrder.schedule_order),
    is_schedule: useSelector((state: RootState) => state.transactionOrder.is_schedule),
    notes: useSelector((state: RootState) => state.maplocation.notes),
    sender_payment: useSelector(
      (state: RootState) => state.maplocation.senderPayment,
    ),
    distance: typeof(data.distance) == 'string' ? data.distance.split(' ')[0] : data.distance,
    sender_details: {
      sender_name: data.senderDetails.sender_name,
      sender_phonenumber: data.senderDetails.sender_phonenumber,
    },
    receiver_details: {
      receiver_name: data.receiverDetails.receiver_name,
      receiver_phonenumber: data.receiverDetails.receiver_phonenumber,
    },
    pickup_address: {
      pickup: {
        description: data.pickupAddress.pickupName,
        address: data.pickupAddress.pickupAddress,
        latitude: data.pickupAddress.pickupLatitude,
        longitude: data.pickupAddress.pickupLongitude,
        completed_at: null,
        pickup_image: null,
        actual_drop_lat: null,
        actual_drop_long: null,
        is_wrong_pin: false,
        // pickupAddressDetails: data.pickupAddress.pickupAddressDetails
      },
    },
    dropoff_address: {
      dropoff: {
        // description: data.dropOffAddress.dropoffName,
        // address: data.dropOffAddress.dropoffAddress,
        // latitude: data.dropOffAddress.dropoffLatitude,
        // longitude: data.dropOffAddress.dropoffLongitude,
        // completed_at: null,
        // dropoff_image: null,
        // actual_drop_lat: null,
        // actual_drop_long: null,
        // is_wrong_pin: false,
        dropoff_details: useSelector(
          (state: RootState) => state.maplocation.multiplePayload,
        ),
        // dropoffAddressDetails: data.dropOffAddress.dropoffAddressDetails
      },
    },
  };
  
  const toggleLoader = () => {
    toggleRiderLoad();
    setIsLoader(!loader);
    setTimeout(() => {
      setIsLoader(false);
      onSubmit();
    }, 4000);
  };

  //Create Transaction
  const onSubmit = async () => {
    try {
      // console.log(TransactionDetails);
      // Get Acess Token
      const result: any = await keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      const response = await saveTransactions(
        TransactionDetails,
        access_json.access_token,
      );
      console.log("sdadsadsa", response.status_code);
      console.log("sdadsadsa", response);
      
      if (response.status_code === 3003) {
        console.log(response.detail.transaction_id);
        usedispatch(setTransactionID(response.detail.transaction_id));
        setMessage("No nearest rider found")
        websocketTimeIn(0);
      }
      else if (response.status_code === 3001){
        setNoCashMessage(response.detail)
        setIsMessageToggle(true)
        websocketTimeIn(0);
      }
      else if (response){
        usedispatch(setTransactionID(response.data.transaction_id));
        websocketTimeIn(response.data.transaction_id);
        setIsCancelBtn(false)
        // customerTimeOut(response.data.transaction_id)
        // toggleRiderLoad();
        console.log(response.data.transaction_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigationTrackMyOrder = () => {
    navigationParcel.reset({
        index:0,
        routes: [{name: 'TrackMyOrder'}],
    })
  }
  
  const checkCustomerTransaction = async () => {
    try {
      console.log('asdasd', !acceptTransaction && transactionID);
      
      if (!acceptTransaction && transactionID){
        const response = await checkCurrentTransaction(transactionID)
        const booking = JSON.parse(response)
        console.log(response.status_code);

        if(response.status_code != 5000 && response.status_code != 1001){
          console.log(booking.transaction_id);
          
          usedispatch(setAcceptTransaction(response));
          usedispatch(setTransactionID(booking.transaction_id));
          usedispatch(setID(booking.transaction_id));
          navigationTrackMyOrder()
          
          console.log("INNNNNNNNNNNNNNNN");
          console.log("INNNNNNNNNNNNNNNN", transactionID);
          console.log(response);
        }
      }
    }
    catch (error) {
    console.log(error);
    }
  }

  const websocketTimeIn = async (transaction_id: any) => {
    const data = {
      action_type: 'TIME_IN',
      transaction_id: transaction_id,
    };
    sendWebSocketMessage(data)
  };

  const websocketTimeOut = async (transaction_id: any) => {
    const data = {
      action_type: 'TIME_OUT',
      transaction_id: transaction_id,
    };
    sendWebSocketMessage(data)
    // ws.current?.send(JSON.stringify(data));
  };

  // useEffect(() => {
  //   try {
  //     console.log("ACCEPT BOOKINGGGG", typeof(acceptTransaction));
      
  //     const json_string = acceptTransaction;      
  //     const booking = JSON.parse(json_string);

  //     if (acceptTransaction && booking.rider_account_id) {
  //       usedispatch(setTransactionID(booking.transaction_id));
  //       usedispatch(setID(booking.transaction_id))
  //       navigationTrackMyOrder()
  //       console.log('RIDER FOUND', acceptTransaction);
  //     } else {
  //       console.log('no id');
  //     }
  //   } catch (error) {
  //     console.log("\n\n no id",error);
  //   }
  // }, [acceptTransaction]);

  // useEffect(() => {
  //   if (!acceptTransaction && transactionID){
  //     const interval = setInterval(() => {
  //       console.log('HEREEEE');
  //       checkCustomerTransaction()
  //     }, 11000);
  //     return () => clearInterval(interval);
  //   }
  // }, [acceptTransaction, transactionID])

  

  // useEffect(() => {
  //   const initWebSocket = async () => {
  //     const response: any = await keychain.getGenericPassword();
  //     const access_json = JSON.parse(response.password);
  //     console.log(access_json.access_token);
  
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
  
  //     ws.current.onopen = () => {
  //       console.log('WebSocket connection openedddd');
  //       if(transactionID){
  //         websocketTimeIn(transactionID);
  //       }
  //     };
  
  //     ws.current.onmessage = (event) => {
  //       console.log('Received WebSocket message:', event.data);
  //       // Handle the received data
  //       const messageData = JSON.parse(event.data);
  //       console.log("MESSAGE DATAAAAAAA", messageData);
  //       console.log("MESSAGE DATAAAAAAA", typeof(messageData));
        
  //       if (messageData.action_type == "ACCEPT_BOOKING"){
  //         // console.log("RIDER_ACCEPT", messageData);
  //         // console.log('RIDER FOUND', acceptTransaction);
  //         usedispatch(setTransactionID(messageData.transaction_id));
  //         // usedispatch(setID(messageData.transaction_id));
  //         usedispatch(setAcceptTransaction(JSON.stringify(messageData)));
  //         // navigationTrackMyOrder()
  //       }
  //     };
  
  //     ws.current.onerror = e => {
  //       console.error('WebSocket error:', e.message);
  //     };
  
  //     ws.current.onclose = e => {
  //       console.log('WebSocket closed:', e.code, e.reason);
  //     };
  //   };

  //   initWebSocket();

  //   return () => {
  //     if (ws.current) {
  //       ws.current.close();
  //     }
  //   }
  // }, [appStateVisible, isUserConnected])

  
  useEffect(() => {
    websocketTimeIn(1);
  }, [appStateVisible, isUserConnected])
  
  // CHECK TRANSACTION IN CASE RIDER ACCEPT WHEN WEBSOCKET IS DISCONNECTED
  useEffect(() => {
    permissionRef.current = setInterval(() => {
      if(transactionID){
        checkCustomerTransaction()
      }
    }, 11000);

    return () => {
      clearInterval(permissionRef.current);
    };
  }, [transactionID]);

  useEffect(() => {
    checkCustomerTransaction()
  }, [appStateVisible, transactionID])
  
  
  return (
    <>
    {isMessageToggle && <AlertModal alertMessage={noCashMessage} modalVisibile={true} yesOnpress={() => {toggleNoCash()}} noOnpress={() => {}}/>}
    {message && <AlertModal alertMessage={message} modalVisibile={true} yesOnpress={() => {toggleModal(transactionID)}} noOnpress={() => {}}/>}
      <StatusBar />
      <View style={styles.btnContainer}>
        {/* <ButtonOrange title={name} Onpress={toggleModal} /> */}
        <View style={{ marginBottom: spacing.m }}>
          <OrangeButton
            btnTitle={btnName}
            onPress={() => {
              toggleLoader();
            }}
            disable={false}
          />
        </View>
      </View>

      <Modal  
        isVisible={isModalVisible}
        // swipeDirection="down"
        onSwipeComplete={() => {toggleModal(transactionID)}}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        coverScreen={true}
        hasBackdrop={true}
        style={styles.modal}>
        <TouchableOpacity style={[styles.logoStyle, {}]}>
          {isModalVisible && !loader && (
            <>
            <LoaderComponents showComp={iscancelModal} labelComp={`Please wait...`} />
              <View>
                <Lootie />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Text
                  style={{
                    fontSize: sizes.Large,
                    fontWeight: '700',
                    color: colors.mustard,
                  }}>
                  Finding Rider..
                </Text>
              </View>
              <TouchableOpacity
                disabled={isCancelBtn}
                style={{
                  alignSelf: 'center',
                  backgroundColor: isCancelBtn ? colors.grayTwo : colors.mustard,
                  marginTop: spacing.s,
                  padding: spacing.s,
                  borderRadius: sizes.sradius,
                }}
                onPress={()=> {toggleModal(transactionID)}}>
                <Text
                  style={{
                    fontSize: sizes.body,
                    fontWeight: '600',
                    color: colors.light,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>
        {/* UNCOMMENT */}
        {/* <View style={styles.modalContent}>
          <View style={{ marginTop: spacing.m, marginLeft: spacing.m }}>
            <Text style={[text.normal, styles.additionalServiceTitle]}>Add Tip</Text>
            <Text style={[text.small, styles.additionalServiceDescription]}>(100% of the Tip will be recieved by the rider)</Text>
            <View style={{ marginTop: spacing.s }}>
              <AddTip list={AddTipData} />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: spacing.m }}>
              <Text style={{ alignSelf: 'center' }}>Other Amount:</Text>
              <TextInput style={{ borderBottomWidth: 1, fontSize: sizes.Normal, marginLeft: spacing.s, paddingLeft: spacing.s, width: "40%", borderBottomColor: colors.black }} />
            </View>
            <OrangeButton btnTitle={"Add Tip"} onPress={() => console.log("")} disable={false} />
          </View>
        </View> */}
      </Modal>
      <LoaderComponents showComp={loader} labelComp={`Please wait...`} />
    </>
    
  );
};

export default FindRiderComponent;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    // justifyContent: "flex-end", UNCOMMENT
    margin: 0,
    flex: 1,
  },
  logoStyle: {
    alignContent: 'center',
    marginBottom: 100,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 200,
    paddingBottom: 20,
  },
  additionalServiceTitle: {
    fontWeight: '700',
    color: colors.black,
  },
  additionalServiceDescription: {
    fontWeight: '400',
    color: colors.grayText,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
  },
  text: {
    color: '#bbb',
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    marginTop: spacing.m,
    width: '100%',
  },
});
