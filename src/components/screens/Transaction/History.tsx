import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../common/Header';
import {
  CurrentTransaction,
  HistoryCategory,
  HistoryData,
} from '../../../app/assets/data/data';
import { colors, horizontalScale, sizes, spacing, text, verticalScale } from '../../../app/constants/theme';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SharedElement } from '../../navigations/Navigation';
import { ActivitiesStatus } from '../../../services/api_services';
import { parcelIcon } from '../../../app/assets/img/images';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/redux/store';
import { setAppTransactionID, setHistoryData } from '../../../app/redux/reducers/historySlice';
import { DateFormatted, TimeFormatted } from '../../../utils/DateFormats/DateFormat';
import { AutoLogout } from '../../../utils/AutoLogout/Logout';
import { LoaderComponents } from '../../common/LoaderComponents';
import { KeyChainGet } from '../../../utils/KeyChain/GetKeyChain';
import { HistoryElement } from '../../navigations/HistoryNavigation';
import * as Animatable from 'react-native-animatable'
import { setTransactionID } from '../../../app/redux/reducers/transactionOrder';
import React from 'react';
import useHardwareBack from '../../../utils/HardwareBack';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export function ParcelHistory() {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const navigationHistory = useNavigation<NativeStackNavigationProp<HistoryElement>>();
  const [history, setHistory] = useState<[]>();
  const [isLoader, setIsLoader] = useState(false);
  const usedipatch = useDispatch<AppDispatch>();

  useHardwareBack("Home",{screen:'Transaction'})

  useEffect(() => {
    async function TransactionData(){
      const key = await KeyChainGet()
      const params = {
        option:"BY_ALL",
        bearer_token: key.access_token,
        limit: 200,
        action:"HISTORY"
        // app_status: "HISTORY" 
      }
      const data = await ActivitiesStatus(params)
      console.log("  \n\n data+++", data)
      if(data == "401"){        
        setIsLoader(true)
        AutoLogout()
        setTimeout(() => {
            navigation.navigate("Login")
          }, 3000);
        }else{
        setHistory(data)
        console.log("\n\n data", data)
      }
    }
    if(!history){
      TransactionData()
      console.log("hello")
    }

  },[])

  return (
    <>
    <LoaderComponents showComp={isLoader} labelComp={'Session Expired Logging out'}/>
      <FlatList
        data={history}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        updateCellsBatchingPeriod={50}
        style={styles.container}
        renderItem={(
          { item, index }
          :
          {
            item:
              {
                id:string, 
                created_at:string, 
                additional_info:string, 
                product_name:string, 
                total_amount:string, 
                service_status: string, 
                payment_method:string, 
                distance:string,
                transaction_created_at:string,
                updated_at:string,
                sender_payment:string,
                app_status:string,
                rider_profile:string,
                rider_account_id: string,
                rider_username:string,
                app_trasaction_id:string,
                isMultipleDrop: any
              }, 
              index:number
          }) => {
          const params_created_at = {
            date:item.transaction_created_at
          }
          // const formateed_time = format.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric', hour12:true})
          const transaction_id = item.app_trasaction_id
          const additional_info = JSON.parse(item.additional_info)
          const pickup_type =  typeof additional_info.track_my_order.pickup.pickup_address == 'string' ? JSON.parse(additional_info.track_my_order.pickup.pickup_address): additional_info.track_my_order.pickup.pickup_address
          const dropoff_type = typeof additional_info.track_my_order.dropoff.dropoff_address == 'string' ? JSON.parse(additional_info.track_my_order.dropoff.dropoff_address) : additional_info.track_my_order.dropoff.dropoff_address
          const pickup = additional_info.track_my_order.pickup ? pickup_type.pickup : pickup_type.pickup
          const dropoff = dropoff_type.dropoff
          const pickup_details = additional_info.track_my_order.pickup.sender_details
          const pickup_image = pickup ? pickup_type.pickup.pickup_image :JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.pickup_image
          const dropoff_details = JSON.parse(dropoff.dropoff_details)
          // const dropoff_image = dropoff_details && dropoff_details[0].dropoff_image
          // const isMultipleDrop = dropoff.dropoff_details
          // const pickup_wrong_pin= pickup && 'is_wrong_pin' in pickup  ?  pickup_type.pickup.is_wrong_pin: false
          // const drop_off_wrong_pin= dropoff_details && dropoff_details[0].is_wrong_pin ?  true : false
          // is_wrong_pin
          // const pickup_actual_lat=  additional_info.track_my_order.pickup.pickup_address.pickup?additional_info.track_my_order.pickup.pickup_address.pickup.actual_drop_lat:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.actual_drop_lat
          // const pickup_actual_long= additional_info.track_my_order.pickup.pickup_address.pickup?additional_info.track_my_order.pickup.pickup_address.pickup.actual_drop_long:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.actual_drop_long
          // is_wrong_pin
          // const dropoff_actual_lat= dropoff_details && dropoff_details[0].actual_drop_lat
          // const dropoff_actual_long= dropoff_details && dropoff_details[0].actual_drop_long

          return (
            <Animatable.View 
            animation="fadeInUp"
            duration={1000}
            delay={index * 300}>
              <TouchableOpacity 
                style={
                  styles.historyContent
                } 
                onPress={() => {
                  // usedipatch(setHistoryData(params))
                  usedipatch(setAppTransactionID(transaction_id))
                  usedipatch(setTransactionID(transaction_id))
                  navigationHistory.navigate('HistoryDetails')
                  // console.log("\n\n params", JSON.stringify(params,null, 2))
                }}>
              <View style={{ marginRight: 20 }}>
                <Image style={{ width: 70, height: 70 }} source={parcelIcon}></Image>
              </View>
              <View>
                <Text 
                  style={{ 
                    marginTop: 5, 
                    fontWeight:'700', 
                    color: item.app_status == "COMPLETED" ? colors.mustard : item.app_status == "FAILED" ? colors.red : item.app_status == "PROCESSING" ? colors.blue : colors.blue 
                  }}>
                  {item.app_status}
                </Text>
                {/* <Text style={[text.smallPlus,{color:colors.grayText}]}>{item.app_trasaction_id}</Text> */}
                <Text style={[text.small,{color:colors.black2}]}>#{item.app_trasaction_id} • Php {item.total_amount} • {item.distance} Km</Text>
                <Text style={[text.small,{marginVertical: 2, color:colors.grayText}]}>
                {DateFormatted(params_created_at)} • {TimeFormatted(params_created_at)}
                </Text>
              </View>
            </TouchableOpacity>
            </Animatable.View>
          );
        }}
      />
    </>
  )
}

export function NullHistory() {
  // Back button
  useHardwareBack("Home",{screen:'Transaction'})
  
  return (
    <View>
      <Image
        source={require('../../../app/assets/img/NoData.png')}
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
    </View>
  )
}

export default function History() {

  const [isCategory, setIsCategory] = useState<undefined | string>();
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();

  const navigationHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeNavigation',
        state:{
            routes:[{ name: "Home",
                state:{
                    routes:[{ name:"Transaction"}]
                }
            }]
        }
       }],
    });
  };

  return (
    <View>
    <StatusBar
      barStyle="dark-content" // Or "dark-content" based on your preference
      translucent={true}
      // backgroundColor={'#00000080'}
      backgroundColor={"transparent"}
    />
      <Header title="History" backBtn={true} settingBtn={false} backFunc={navigationHome} settingFunc={() => {}} />
      <FlatList
        data={HistoryCategory}
        horizontal={true}
        style={{ width: 'auto', height: 'auto', marginHorizontal: spacing.s, marginTop: spacing.m }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const background = item.value == isCategory ? colors.mustardOpacity : colors.gray;

          return (              
            <TouchableOpacity
              onPress={() => {
                setIsCategory(item.value)
              }} 
              style={{ 
                backgroundColor: background, 
                marginHorizontal: spacing.s, 
                paddingHorizontal: spacing.m, 
                paddingVertical: spacing.s, 
                flexDirection: 'row', 
                borderRadius: sizes.radius 
              }}>
              <Image source={item.img} style={{ width: horizontalScale(20), height: verticalScale(20), alignSelf: "center", marginRight: spacing.s }} />
              <Text style={[text.normal, { color: colors.black }]}>
                {item.category}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {
        isCategory == "parcel" ?
          <ParcelHistory />
          :
          isCategory == "marketplace" ?
            <NullHistory />
            :
            isCategory == "car" ?
              <NullHistory />
              :
              isCategory == "mototaxi" ?
                <NullHistory />
                :
                isCategory == "rapidoowallet" ?
                  <NullHistory/>
                  :
                  <NullHistory/>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.s,
    display: 'flex',
    flexDirection: 'column',
    height: wHeight - 160,
    marginLeft: spacing.l
  },
  historyContent: {
    marginTop: spacing.m,
    display: 'flex',
    flexDirection: 'row',
  },
  titleDescription: {
    fontWeight: '700',
    color: colors.black,
  },
  imageStyle: {
    marginTop: 50,
    alignSelf: 'center',
    aspectRatio:1/1.2,
    height:400,
    resizeMode: 'cover',
  },
  description: {
    fontWeight: '400',
    color: colors.black,
  },
  textStyle: {

    alignSelf: 'center',
    alignItems: 'center',
  },
});
