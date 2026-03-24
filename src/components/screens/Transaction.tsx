import {
  BackHandler,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../common/Header';
import { Image } from 'react-native';
import { colors, horizontalScale, sizes, spacing, text, verticalScale } from '../../app/constants/theme';
import { parcelIcon } from '../../app/assets/img/images';
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SharedElement } from '../navigations/Navigation';
import { CurrentTransaction } from '../../app/assets/data/data';
import { ActivitiesStatus } from '../../services/api_services';
import { LoaderComponents } from '../common/LoaderComponents';
import { deleteAll } from '../../app/watermelonDB/model/model';
import { AutoLogout } from '../../utils/AutoLogout/Logout';
import { KeyChainGet } from '../../utils/KeyChain/GetKeyChain';
import { action, date } from '@nozbe/watermelondb/decorators';
import { HistoryElement } from '../navigations/HistoryNavigation';
import { HomeElement } from '../navigations/HomeNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/redux/store';
import { DateFormatted, TimeFormatted } from '../../utils/DateFormats/DateFormat';
import * as Keychain from 'react-native-keychain';
import { customerTransaction } from '../../services/parcel';
import { setAcceptTransaction, setID, setProgressTransaction, setTransactionID } from '../../app/redux/reducers/transactionOrder';
import React from 'react';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function Transaction() {
  const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const progress_transaction = useSelector((state: RootState) => state.transactionOrder.progress_transaction);
  const [isEmpty, setIsEmpty] = useState(true);
  const [history, setHistory] = useState<[]>();
  const [isLoader, setIsLoader] = useState(false)
  const isFocused = useIsFocused()
  const usedispatch = useDispatch<AppDispatch>();
  
  const navigateHistory = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HistoryNavigation' }],
    });
  };

  const navigationTrackMyOrder = () => {
    navigationHome.reset({
      index: 0,
      routes: [{
        name: 'ParcelNavigation',
        state: {
          routes: [
            {
              name: 'TrackMyOrder'
            }
          ]
        }
      }],
    })
  }

  const checkCustomerTransaction = async (transaction_id: any) => {
    try {
      //Get Acess Token
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      const response = await customerTransaction(transaction_id, access_json.access_token)

      if (response){
        // usedispatch(setProgressTransaction(response))
        const order = JSON.stringify(response);
        usedispatch(setAcceptTransaction(order));
        usedispatch(setID(response.transaction_id));
        usedispatch(setTransactionID(response.transaction_id));
        navigationTrackMyOrder()
      }
    } catch (error) {
      console.log(error);  
    }
  }
  // progress_transaction.dropoff_address = JSON.parse(progress_transaction.dropoff_address);
  // progress_transaction.pickup_address = JSON.parse(progress_transaction.pickup_address);
  // progress_transaction.receiver_details = JSON.parse(progress_transaction.receiver_details);
  // progress_transaction.sender_details = JSON.parse(progress_transaction.sender_details);


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

  useEffect(() => {
    async function TransactionData() {
      const key = await KeyChainGet()
      const params = {
        option: "BY_ALL",
        bearer_token: key.access_token,
        limit: 10,
        action: "PROGRESS",
        // service_key: 'parcel'
      }
      const data = await ActivitiesStatus(params)
      // console.log(" \n\n\n activities", data)

      if (data == "401") {
        setIsLoader(true)
        AutoLogout()
        setTimeout(() => {
          navigation.navigate("Login")
        }, 3000);
      } else {
        setHistory(data)
        console.log("\n\n data", data)
      }
    }
    TransactionData()
    // setHistory([])
  }, [isFocused])
  
  return (
    <View>
      <StatusBar
        barStyle="dark-content" // Or "dark-content" based on your preference
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Header title="Current Transaction" backBtn={false} settingBtn={false} backFunc={() => { }} settingFunc={() => { }} />
        <LoaderComponents showComp={isLoader} labelComp={'Session Expired Logging out'} />
        <TouchableOpacity
          style={{
            backgroundColor: colors.mustardOpacity,
            borderRadius: sizes.radius,
            flexDirection: 'row',
            paddingHorizontal: spacing.m,
            elevation:5,
            marginTop: spacing.l+20,
            marginRight: spacing.m,
            height: "50%"
          }}
          onPress={navigateHistory}>

          <Image source={require('../../app/assets/img/Icons/document.png')} style={{ width: horizontalScale(20), height: verticalScale(20), alignSelf: "center", marginRight: spacing.s }} />
          <Text style={[text.normal, { fontWeight: '600', color: colors.black, alignSelf: "center" }]}>History</Text>
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={history}
        showsVerticalScrollIndicator ={false}
        style={styles.container}
        renderItem={({ item, index }:{item:{id:string, created_at:string, additional_info:string, product_name:string, total_amount:string, service_status:string, payment_method:string, distance:string, app_status: string}, index:number}) => {
          const format = new Date(item.created_at)
          const formateed_time = format.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric', hour12:true})
          const additional_info = JSON.parse(item.additional_info)
          const pickup = additional_info.track_my_order.pickup.pickup_address.pickup
          return (
            <TouchableOpacity onPress={() => {navigationTrackMyOrder()}} style={styles.historyContent}>
              <View style={{ width:"20%",marginRight: spacing.m, justifyContent:'center' }}>
                <Image style={{ width: 80, height: 80 }} source={parcelIcon}></Image>
              </View>
              <View style={{width:"60%", justifyContent:'center'}}>
                <Text style={[styles.titleDescription,text.normal]}>
                  Parcel Delivery | <Text style={[text.smallPlus,{color:colors.green, fontWeight:'700'}]}>PICKING UP</Text>
                </Text>
                <Text style={[text.smallPlus,{marginVertical: 2, color:colors.grayText}]}>
                PHP ₱ {item.total_amount}
                </Text>
                <Text style={[text.extra_small,{color:colors.grayText}]}> {item.distance} Km • {formateed_time}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      /> */}
      {/* {
        (Object.keys(progress_transaction).length != 0) &&
        <TouchableOpacity onPress={() => { navigationTrackMyOrder() }} style={styles.historyContent}>
          <View style={{ width: "20%", marginRight: spacing.m, justifyContent: 'center' }}>
            <Image style={{ width: 80, height: 80 }} source={parcelIcon}></Image>
          </View>
          <View style={{ width: "60%", justifyContent: 'center' }}>
            <Text style={[styles.titleDescription, text.normal]}>
              Parcel Delivery | <Text style={[text.smallPlus, { color: colors.green, fontWeight: '700' }]}>{progress_transaction.status}</Text>
            </Text>
            <Text style={[text.smallPlus, { marginVertical: 2, color: colors.grayText, fontWeight: '700' }]}>
              PHP ₱ {progress_transaction.total_amount}
            </Text>
            <Text style={[text.extra_small, { color: colors.grayText }]}>{DateFormatted({ date: progress_transaction.updated_at })} • {TimeFormatted({ date: progress_transaction.updated_at })}</Text>
          </View>
        </TouchableOpacity>
      } */}
      
      <FlatList
        data={progress_transaction}
        decelerationRate={'fast'}
        renderItem={({item, index}) => {
          return (
          <TouchableOpacity onPress={() => { checkCustomerTransaction(item.transaction_id) }} style={styles.historyContent}>
            <View style={{ width: "20%", marginRight: spacing.m, justifyContent: 'center' }}>
              <Image style={{ width: 80, height: 80 }} source={parcelIcon}></Image>
            </View>
            <View style={{ width: "60%", justifyContent: 'center' }}>
              <Text style={[styles.titleDescription, text.normal]}>
                Parcel Delivery | <Text style={[text.smallPlus, { color: colors.green, fontWeight: '700' }]}>{item.status}</Text>
              </Text>
              <Text style={[text.smallPlus, { marginVertical: 2, color: colors.grayText, fontWeight: '700' }]}>
                PHP ₱ {item.total_amount}
              </Text>
              <Text style={[text.extra_small, { color: colors.grayText }]}>{DateFormatted({ date: item.updated_at })} • {TimeFormatted({ date: item.updated_at })}</Text>
            </View>
          </TouchableOpacity>
          )
        }}
      />

      {(Object.keys(progress_transaction).length == 0) && (
        <>
          <Image
            source={require('../../app/assets/img/NoData.png')}
            style={styles.imageStyle}
          />
          <View style={styles.textStyle}>
            <Text style={[text.medium, styles.titleDescription]}>
              No activity at the moment
            </Text>
            <Text style={[text.smallPlus, styles.description]}>
              Once you start using our services, you can track them here
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'column',
    height: wHeight - 160,
    margin: 25,
  },
  contain: {
    height: wHeight,
    width: wWidth,
  },
  historyContent: {
    marginTop: spacing.s,
    // display: 'flex',
    marginHorizontal: spacing.m,
    // justifyContent:'space-between',
    flexDirection: 'row',
  },
  historyBtn: {
    fontSize: 15,
    color: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#FFAC13',
    borderRadius: 20,
  },
  imageStyle: {
    marginTop: 50,
    alignSelf: 'center',
    width: '85%',
    height: '65%',
    resizeMode: 'cover',
  },
  titleDescription: {
    fontWeight: '700',
    color: colors.black,
  },
  description: {
    fontWeight: '400',
    color: colors.black,
  },
  textStyle: {
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
