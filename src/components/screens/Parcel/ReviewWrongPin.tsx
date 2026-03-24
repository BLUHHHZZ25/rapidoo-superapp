import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeElement } from '../../navigations/HomeNavigation';
import { colors, horizontalScale, sizes, spacing, text, verticalScale } from '../../../app/constants/theme';
import HeaderPlain from '../../HeaderPlain';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { GOOGLE_API_KEY, GOOGLE_GEOCODING_URL } from '../../../app/constants/config';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { ParcelElement } from '../../navigations/ParcelNavigation';
import { setCustomerAddress } from '../../../app/redux/reducers/transactionOrder';
import { HistoryElement } from '../../navigations/HistoryNavigation';
  
  const wWidth = Dimensions.get('window').width;
  const wHeight = Dimensions.get('window').height;
  
  type Props = {
    route: any
}

  export default function ReviewWrongPin({ route }: Props) {
    const navigationHome =useNavigation<NativeStackNavigationProp<HomeElement>>();
    const navigationHistory = useNavigation<NativeStackNavigationProp<HistoryElement>>();
    const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
    
    const [location, setLocation] = useState<any>([]);
    
    const wrongPinStatus: any = useSelector(
        (state: RootState) => state.transactionOrder.wrongPinStatus,
      );
    const acceptTransaction: any = useSelector(
        (state: RootState) => state.transactionOrder.accept_transaction,
    );

    const usedispatch = useDispatch<AppDispatch>();
    const {data} = route.params
    const {customerDetails} = route.params

    const receiverDetails = typeof(customerDetails.receiver_details) == 'string' ? JSON.parse(customerDetails.receiver_details) : customerDetails.receiver_details
    const senderDetails = typeof(customerDetails.receiver_details) == 'string' ? JSON.parse(customerDetails.sender_details) : customerDetails.sender_details

    const imageValue = wrongPinStatus === 'PICKED_UP'
    ? data.pickup.pickup_image
    : wrongPinStatus === 'DELIVERY' || wrongPinStatus === 'DROP_OFF'
    ? data.dropoff_image
    : data.dropoff_image;

    
    const findLocation = async () => {
        try {
            const response = await axios.get(GOOGLE_GEOCODING_URL, {
                params: {
                    // latlng: data.actual_drop_lat + ',' + data.actual_drop_long,
                    latlng: wrongPinStatus == 'PICKED_UP' 
                    ? data.pickup.actual_drop_lat + ',' + data.pickup.actual_drop_long 
                    : wrongPinStatus == 'DELIVERY' || wrongPinStatus == 'DROP_OFF' 
                    ? data.actual_drop_lat + ',' + data.actual_drop_long
                    : wrongPinStatus == 'DELIVERED'
                    ? data.dropoff.actual_drop_lat + ',' + data.dropoff.actual_drop_long 
                    : null,
                    key: GOOGLE_API_KEY,
                },
            });
            if (response){
                const address = response.data.results[1].formatted_address
                const name = response.data.results[1].address_components[0].long_name +
                    ' ' +
                    response.data.results[1].address_components[1].long_name
                const customerDetails = {
                    address: address,
                    address_name: name
                }
                usedispatch(setCustomerAddress(customerDetails))
                setLocation({
                    ...location,
                    name: name,
                    address: address,
                    });
                }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        findLocation()
    }, [])
    
    // REDIRECT TO GOOGLE MAP FOR DIRECTION
    const openAddressOnMap = () => {
        console.log('open directions');
        const destinationStr = wrongPinStatus == 'DELIVERY' 
        ? `${data.multipleLatitude}%2C${data.multipleLongitude}` 
        : wrongPinStatus == 'PICKED_UP' ? `${data.pickup.latitude}%2C${data.pickup.longitude}`
        : wrongPinStatus == 'DELIVERED' && `${data.dropoff.latitude}%2C${data.dropoff.longitude}`
        Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${destinationStr}`,
        );
    };

    // REDIRECT TO GOOGLE MAP FOR DIRECTION
    const openWrongPinOnMap = () => {
        console.log('open directions');
        const destinationStr = wrongPinStatus == 'DELIVERY' 
        ? `${data.actual_drop_lat}%2C${data.actual_drop_long}` 
        : wrongPinStatus == 'PICKED_UP' ? `${data.pickup.actual_drop_lat}%2C${data.pickup.actual_drop_long}`
        : wrongPinStatus == 'DELIVERED' && `${data.dropoff.actual_drop_lat}%2C${data.dropoff.actual_drop_long}`;
        Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${destinationStr}`,
        );
      };
    console.log(data);
    
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <HeaderPlain
          title={'Review Wrong Pin'}
          back_button={true}
          back_function={() => navigationHome.goBack()}
        />
        <ScrollView style={{ paddingHorizontal: spacing.m }}>
            <View style={[styles.container, { flexDirection: 'row', paddingHorizontal: spacing.s, paddingVertical: spacing.s, marginTop: spacing.s }]}>
                <View style={{ alignSelf: 'center', marginHorizontal: spacing.xl }}>
                    <Image source={require('../../../app/assets/img/sProfile.jpg')} style={{ width: horizontalScale(40), height: verticalScale(40), borderRadius: 100 }} />
                </View>
                <View>
                    {wrongPinStatus == 'PICKED_UP'
                    ? <Text style={[styles.textBold, text.normal, { color: colors.black }]}>{senderDetails.sender_name}</Text> 
                    : wrongPinStatus == 'DELIVERY'
                    ? <Text style={[styles.textBold, text.normal, { color: colors.black }]}>{data.multipleCName}</Text> 
                    : wrongPinStatus == 'DELIVERED'
                    ? <Text style={[styles.textBold, text.normal, { color: colors.black }]}>{receiverDetails.receiver_name}</Text> 
                    : <Text style={[styles.textBold, text.normal, { color: colors.black }]}>------ ---- ------</Text>
                    }

                    { wrongPinStatus == 'PICKED_UP'
                    ? <Text style={[text.small, { color: colors.grayText }]}>{senderDetails.sender_phonenumber}</Text>
                    : wrongPinStatus == 'DELIVERY'
                    ? <Text style={[styles.textBold, text.normal, { color: colors.black }]}>{data.multipleCNumber}</Text> 
                    : wrongPinStatus == 'DELIVERED'
                    ? <Text style={[styles.textBold, text.normal, { color: colors.black }]}>{receiverDetails.receiver_name}</Text> 
                    : <Text style={[text.small, { color: colors.grayText }]}>------ ---- ------</Text> 
                    }
                    
                    {/* <Text style={[text.small, { color: colors.grayText }]}>{DateFormatted(params_pickup_completed_at)} - {TimeFormatted(params_pickup_completed_at)}</Text> */}
                </View>
            </View>

        {/* Wrong Pinned Address */}
            <View style={{flexDirection: 'row', marginTop: spacing.l, marginBottom: 5, marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center'}}> 
                <Text style={[text.normal, {color: colors.black}]}>Wrong Pinned Address</Text>
                <TouchableOpacity onPress={openAddressOnMap}>
                    <Text style={[text.small, styles.textBold, {color: colors.mustard}]}>View in map</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container, {paddingHorizontal: spacing.s, paddingVertical: spacing.s, marginBottom: spacing.l}]}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {
                        navigationParcel.navigate('ViewImage', {imageValue: imageValue})
                        
                    }} style={{ alignSelf: 'center', marginHorizontal: spacing.m }}>
                        <Image source={{uri: imageValue}} style={{ backgroundColor: colors.light, resizeMode: 'cover', width: 100, height: 100, borderRadius: 5 }} />
                    </TouchableOpacity>
                    
                    <View style={{width: '65%', marginVertical: 15, paddingHorizontal: spacing.s}}>
                        <Text style={[styles.textBold, text.normal, { color: colors.black, marginBottom: 5 }]}>
                        {wrongPinStatus == 'PICKED_UP' 
                        ? data.pickup.description 
                        : wrongPinStatus == 'DELIVERY' || wrongPinStatus == 'DROP_OFF' 
                        ? data.multipleName
                        : data.dropoff.description}</Text>
                        <Text style={[text.small, { color: colors.black }]}>
                        {wrongPinStatus == 'PICKED_UP' 
                        ? data.pickup.address 
                        : wrongPinStatus == 'DELIVERY' || wrongPinStatus == 'DROP_OFF' 
                        ? data.multipleAddress
                        : data.dropoff.address}
                        </Text>
                        {/* <Text style={[text.small, { color: colors.grayText }]}>{DateFormatted(params_pickup_completed_at)} - {TimeFormatted(params_pickup_completed_at)}</Text> */}
                    </View>
                </View>
                <Text style={[text.small, {textAlign: 'right', color: colors.grayText}]}>
                    {wrongPinStatus == 'PICKED_UP' 
                    ? data.pickup.completed_at
                    : wrongPinStatus == 'DELIVERY' || wrongPinStatus == 'DROP_OFF' 
                    ? data.completed_at
                    : data.dropoff.completed_at}</Text>
            </View>

        {/* Actual Address */}
           <View style={{flexDirection: 'row', marginBottom: 5, marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center'}}> 
                <Text style={[text.normal, {color: colors.black}]}>Actual Address</Text>
                <TouchableOpacity onPress={openWrongPinOnMap}>
                    <Text style={[text.small, styles.textBold,{color: colors.mustard}]}>View in map</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container, {paddingHorizontal: spacing.s, paddingVertical: spacing.s}]}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {
                        navigationParcel.navigate('ViewImage', {imageValue: imageValue})   
                    }} style={{ alignSelf: 'center', marginHorizontal: spacing.m }}>
                        <Image source={{uri: imageValue}} style={{ backgroundColor: colors.light, resizeMode: 'cover', width: 100, height: 100, borderRadius: 5 }} />
                    </TouchableOpacity>
                    <View style={{width: '65%', marginVertical: 15, paddingHorizontal: spacing.s}}>
                        <Text style={[styles.textBold, text.normal, { color: colors.black, marginBottom: 5 }]}>{location.name}</Text>
                        <Text style={[text.small, { color: colors.black }]}>{location.address}</Text>
                        {/* <Text style={[text.small, { color: colors.grayText }]}>{DateFormatted(params_pickup_completed_at)} - {TimeFormatted(params_pickup_completed_at)}</Text> */}
                    </View>
                </View>
                <Text style={[text.small, {textAlign: 'right', color: colors.grayText}]}>{data.completed_at}</Text>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
                <View style={{flex:1}}>
                <Button
                    mode="contained"
                    buttonColor={colors.gray}
                    style={{
                    borderRadius: 15,
                    height: 50,
                    justifyContent: 'center',
                    flex:1
                    }}
                    onPress={() => {navigationHome.goBack()}}>
                    <Text style={{ fontSize: 15, color: colors.blackText }}>Cancel</Text>
                </Button>
                </View>
            <View style={{flex:0.1}}>
            </View>
            <View style={{flex:1}}>
              <Button
              onPress={() => {
                navigationParcel.navigate("WrongPinModal")
              }}
                mode="contained"
                buttonColor={colors.orange}
                style={{
                  borderRadius: 15,
                  height: 50,
                  justifyContent: 'center',
                  flex:1
                }}>
                <Text style={{ fontSize: 15, color: colors.white }}>Confirm</Text>
              </Button>
            </View>
          </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    historyContent: {
      marginTop: spacing.s,
      height: 80,
      display: 'flex',
      flexDirection: 'row',
    },
    container: {
        backgroundColor: colors.mustardOpacity,
        borderRadius: sizes.radius
    },
    textBold: {
        fontWeight: "700",
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0, // Adjust this value for spacing above the bottom edge
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 30,    
        paddingBottom: 30,
      },
  });
  