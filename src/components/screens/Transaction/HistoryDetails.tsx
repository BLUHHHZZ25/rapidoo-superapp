import { BackHandler, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../common/Header";
import { colors, horizontalScale, sizes, spacing, text, verticalScale } from "../../../app/constants/theme";
import { Icon } from "@rneui/themed";
import { logo, pickup_dropoff, rapidooLogo } from "../../../app/assets/img/images";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElement } from "../../navigations/Navigation";
import { DateFormatted, TimeFormatted } from "../../../utils/DateFormats/DateFormat";
import { HomeElement } from "../../navigations/HomeNavigation";
import { useCallback, useEffect, useState } from "react";
import { setDropoff, setMultiple, setPickup } from "../../../app/redux/reducers/maplocation";
import ParcelNavigation, { ParcelElement } from "../../navigations/ParcelNavigation";
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
import { HistoryElement } from "../../navigations/HistoryNavigation";
import { setAcceptTransaction, setMultipleIndex, setWrongPinStatus } from "../../../app/redux/reducers/transactionOrder";
import * as Keychain from 'react-native-keychain';
import { favoriteRider } from "../../../services/parcel";
import { ConfirmModal } from "../../../app/constants/AlertModal";
import React from "react";
import { ActivityTransactionID } from "../../../services/api_services";
import { setHistoryData } from "../../../app/redux/reducers/historySlice";
import useHardwareBack from "../../../utils/HardwareBack";

type Props = {
    title: string,
    date: string,
    time: string,
    image: string,
    wrong_pin: boolean
    status: any
}

type PropsDetails = {
    title: string,
    details: string
}

export function PickUpComponents({ title, date, time, image, wrong_pin, status }: Props) {
    // const status = useSelector((state: RootState) => state.history.status);

    return (
        <View>
            <View style={[{ backgroundColor: wrong_pin ? colors.redOpacity : colors.greenOpacity, padding: spacing.s, borderRadius: sizes.sradius, flexDirection: 'row', width: "100%" }]}>
                <View style={{ flexDirection: 'row', width: "80%" }}>
                    <View style={{ marginHorizontal: spacing.s }}>
                        <Image source={{ uri: (image) }} style={{ width: 40, height: 40 }} />
                    </View>
                    <View style={{ width: "90%" }}>
                        <Text style={[styles.textBold, text.normal, { color: colors.black }]}>{title}</Text>
                        <Text style={[text.extra_small]}>{status == 'COMPLETED' 
                        ? `${date} ${time}` 
                        : `---- -- ----`}</Text>
                    </View>
                </View>
                <View style={{ alignSelf: 'center', marginLeft: spacing.s, width: "20%" }}>
                    {
                        wrong_pin ?
                            <Icon type="ionicon" name="warning" color={colors.red} size={20} />
                            :
                            <Icon type="ionicon" name="chevron-forward-outline" size={20} />
                    }
                </View>
            </View>
        </View>
    )
}


export function DetailsComponent({ title, details }: PropsDetails) {

    return (
        <View style={[styles.container, { marginTop: spacing.m, paddingHorizontal: spacing.m, paddingVertical: spacing.m }]}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textBold, text.medium, { color: colors.black, alignSelf: 'center' }]}>{title}</Text>
                <Text style={[text.medium, { color: colors.black, alignSelf: 'center' }]}> {details}</Text>
            </View>
        </View>
    )
}

export default function HistoryDetails() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const usedispatch = useDispatch<AppDispatch>();
    const navigationMain = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const navigationHistory = useNavigation<NativeStackNavigationProp<HistoryElement>>();
    const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
    // const HomeNavigation = useNavigation<NativeStackNavigationProp<HomeElement>>();

    const isFocused = useIsFocused()
    const rider_account_id = useSelector((state: RootState) => state.history.rider_account_id);
    const transaction_created_at = useSelector((state: RootState) => state.history.transaction_created_at);
    const updated_at = useSelector((state: RootState) => state.history.updated_at);
    const rider_name = useSelector((state: RootState) => state.history.rider_name);
    const app_transaction_id = useSelector((state: RootState) => state.history.app_transaction_id);
    const [message, setMessage] = useState<any>()

    const [isData, setData] = useState({
        "pickup_address": "",
        "pickup_address_details": "", 
        "pickup_lat": 0, 
        "pickup_long": 0, 
        "pickup_person": "", 
        "pickup_number": "",
        "transaction_created_at": "",
        "dropoff_address": "",
        "dropoff_address_details": "",
        "dropoff_lat": 0, 
        "dropoff_long": 0, 
        "dropoff_person": "", 
        "dropoff_number": "",
        "updated_at": "",
        "vehicle_type": "", 
        "sender_payment": "",
        "rider_profile":"" ,
        "rider_name":"" ,
        "rider_account_id":"" ,
        "app_transaction_id":"" ,
        "isMultipleDrop":""  ,
        "pickup_image":"" ,
        "dropoff_image":"" ,
        "pickup_completed_at":"" ,
        "dropoff_completed_at":"" ,
        "pickup_wrong_pin": false,
        "dropoff_wrong_pin": false ,
        "pickup_actual_lat":"" ,
        "pickup_actual_long":"" ,
        "dropoff_actual_lat":"" ,
        "dropoff_actual_long":"" ,
        "status":"" 
    })

    // const pickup_formatted_date = pickup_date_format.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'});
    const params_pickup_date = {
        date: transaction_created_at
    }
    const parmas_dropoff_date = {
        date: updated_at
    }

    const params_pickup_completed_at = {
        date: isData.pickup_completed_at
    }

    const pickup_params = {
        pickupName: isData.pickup_address_details,
        pickUpAddress: isData.pickup_address,
        pickupLatitude: isData.pickup_lat,
        pickupLongitude: isData.pickup_long,
        pickupCNumber: isData.pickup_number,
        pickupCName: isData.pickup_person,
        pickupAddressDetails: isData.pickup_address_details
    }

    const dropoff_params = {
        dropOffName: isData.dropoff_person,
        dropOffAddress: isData.dropoff_address,
        dropOffLatitude: isData.dropoff_lat,
        dropoffLongitude: isData.dropoff_long,
        dropoffCNumber: isData.dropoff_number,
        dropoffCName: isData.dropoff_person,
        dropOffAddressDetails: isData.dropoff_address_details
    }
    const customerDetails = {
        receiver_details: {
            dropoff_person: isData.dropoff_person,
            dropoff_number: isData.dropoff_number
        },
        sender_details: {
            pickup_person: isData.pickup_person,
            pickup_number: isData.pickup_number
        }
    }

    // Navigation Back
    useHardwareBack("History",{})

    const fetchData = async () => {
        //Get Acess Token
        const result: any = await Keychain.getGenericPassword();
        const access_json = JSON.parse(result.password);
        const params = {
            'option': 'APP_TRANSACTION_ID',
            'app_transaction_id': app_transaction_id,
            'limit': 2,
            'bearer_token': access_json.access_token
        }
        const data = await ActivityTransactionID(params)

        // const transaction_id = data.app_transaction_id
        const additional_info = JSON.parse(data.additional_info)
        const pickup_type =  typeof additional_info.track_my_order.pickup.pickup_address == 'string' ? JSON.parse(additional_info.track_my_order.pickup.pickup_address): additional_info.track_my_order.pickup.pickup_address
        const dropoff_type = typeof additional_info.track_my_order.dropoff.dropoff_address == 'string' ? JSON.parse(additional_info.track_my_order.dropoff.dropoff_address) : additional_info.track_my_order.dropoff.dropoff_address
        const pickup = additional_info.track_my_order.pickup ? pickup_type.pickup : pickup_type.pickup
        const dropoff = dropoff_type.dropoff
        const pickup_details = additional_info.track_my_order.pickup.sender_details
        const pickup_image = pickup ? pickup_type.pickup.pickup_image :JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.pickup_image
        const dropoff_details = JSON.parse(dropoff.dropoff_details)
        const dropoff_image = dropoff_details && dropoff_details[0].dropoff_image
        const isMultipleDrop = dropoff.dropoff_details
        const pickup_wrong_pin= pickup && 'is_wrong_pin' in pickup  ?  pickup_type.pickup.is_wrong_pin: false
        const drop_off_wrong_pin= dropoff_details && dropoff_details[0].is_wrong_pin ?  true : false
        // is_wrong_pin
        const pickup_actual_lat=  additional_info.track_my_order.pickup.pickup_address.pickup?additional_info.track_my_order.pickup.pickup_address.pickup.actual_drop_lat:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.actual_drop_lat
        const pickup_actual_long= additional_info.track_my_order.pickup.pickup_address.pickup?additional_info.track_my_order.pickup.pickup_address.pickup.actual_drop_long:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.actual_drop_long
        // is_wrong_pin
        const dropoff_actual_lat= dropoff_details && dropoff_details[0].actual_drop_lat
        const dropoff_actual_long= dropoff_details && dropoff_details[0].actual_drop_long

        console.log("date ----------------->>> ", data.rider_username);
        
        usedispatch(setHistoryData({
            pickup_address: pickup ?pickup.address : JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.address,
            pickup_address_details: typeof additional_info.track_my_order.pickup.pickup_address == 'string' ? JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.description : additional_info.track_my_order.pickup.pickup_address.pickup.description,
            pickup_lat: pickup ?pickup.latitude:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.latitude,
            pickup_long: pickup ?pickup.longitude:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.longitude,
            pickup_person: pickup_details.sender_name,
            pickup_number:pickup_details.sender_phonenumber,
            transaction_created_at: data.transaction_created_at,
            dropoff_address:dropoff_details && dropoff_details[0].multipleAddress,
            dropoff_address_details: dropoff_details && dropoff_details[0].multipleName,
            dropoff_lat: dropoff_details && dropoff_details[0].multipleLatitude,
            dropoff_long: dropoff_details && dropoff_details[0].multipleLongitude,
            dropoff_person: dropoff_details && dropoff_details[0].multipleCName,
            dropoff_number:dropoff_details && dropoff_details[0].multipleCNumber,
            updated_at:data.transaction_created_at,
            vehicle_type: additional_info.vehicle_type,
            sender_payment: data.sender_payment,
            rider_profile: data.rider_profile,
            rider_name: data.rider_username,
            rider_account_id: data.rider_account_id,
            app_transaction_id: data.app_trasaction_id,
            isMultipleDrop: isMultipleDrop.length > 0 ? JSON.parse(isMultipleDrop) : [],
            pickup_image: pickup_image,
            dropoff_image: dropoff_image,
            pickup_completed_at: pickup.completed_at,
            dropoff_completed_at: dropoff_details && dropoff_details[0].completed_at,
            pickup_wrong_pin: pickup_wrong_pin,
            dropoff_wrong_pin: drop_off_wrong_pin,
            pickup_actual_lat: pickup_actual_lat,
            pickup_actual_long: pickup_actual_long,
            dropoff_actual_lat: dropoff_actual_lat,
            dropoff_actual_long: dropoff_actual_long,
            status: data.app_status,
            total_amount : data.total_amount
        }))

        setData({
            ...isData,
            pickup_address: pickup ?pickup.address : JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.address,
            pickup_address_details: typeof additional_info.track_my_order.pickup.pickup_address == 'string' ? JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.description : additional_info.track_my_order.pickup.pickup_address.pickup.description,
            pickup_lat: pickup ?pickup.latitude:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.latitude,
            pickup_long: pickup ?pickup.longitude:JSON.parse(additional_info.track_my_order.pickup.pickup_address).pickup.longitude,
            pickup_person: pickup_details.sender_name,
            pickup_number:pickup_details.sender_phonenumber,
            transaction_created_at: data.transaction_created_at,
            dropoff_address:dropoff_details && dropoff_details[0].multipleAddress,
            dropoff_address_details: dropoff_details && dropoff_details[0].multipleName,
            dropoff_lat: dropoff_details && dropoff_details[0].multipleLatitude,
            dropoff_long: dropoff_details && dropoff_details[0].multipleLongitude,
            dropoff_person: dropoff_details && dropoff_details[0].multipleCName,
            dropoff_number:dropoff_details && dropoff_details[0].multipleCNumber,
            updated_at:data.transaction_created_at,
            vehicle_type: additional_info.vehicle_type,
            sender_payment: data.sender_payment,
            rider_profile: data.rider_profile,
            rider_name: data.rider_username,
            rider_account_id: data.rider_account_id,
            app_transaction_id: data.app_trasaction_id,
            isMultipleDrop: isMultipleDrop.length > 0 ? JSON.parse(isMultipleDrop) : [],
            pickup_image: pickup_image,
            dropoff_image: dropoff_image,
            pickup_completed_at: pickup.completed_at,
            dropoff_completed_at: dropoff_details && dropoff_details[0].completed_at,
            pickup_wrong_pin: pickup_wrong_pin,
            dropoff_wrong_pin: drop_off_wrong_pin,
            pickup_actual_lat: pickup_actual_lat,
            pickup_actual_long: pickup_actual_long,
            dropoff_actual_lat: dropoff_actual_lat,
            dropoff_actual_long: dropoff_actual_long,
            status: data.app_status
        })
        
    }

    const addFavoriteRider = async () => {
        try {
            //Get Acess Token
            const result: any = await Keychain.getGenericPassword();
            const access_json = JSON.parse(result.password);

            const response = await favoriteRider(
                rider_account_id,
                rider_name,
                access_json.access_token
            )
            console.log(response);

            if (response.status_code === 3002) {
                navigation.navigate("AlertModalError", { message: response.status_code })
            }
            else if (response.status_code === 200) {
                setMessage(response.message);
                console.log(response);

            }
        } catch (error) {
            console.log(error);

        }
    }

    const rebook_function = () => {
        usedispatch(setAcceptTransaction(''));
        usedispatch(setPickup(pickup_params))
        usedispatch(setDropoff(dropoff_params))
        // usedispatch(setMultiple())

        if (isData.isMultipleDrop.length > 0) {
            const updatedData = isData.isMultipleDrop.map((item: any) => ({
                ...item,
                completed_at: null,
                status: "DELIVERY",
                dropoff_image: null
            }));
            // setMultipleDrop((updatedData))
            usedispatch(setMultiple(JSON.stringify(updatedData)))
        } else {
            usedispatch(setMultiple('[]'))
        }

        navigationParcel.navigate('Parcel')
        parcelNav()
    }

    const HistoryWrongPin = (index: any, status: any, data: any, customerDetails: any) => {
        console.log("\n\n History", index, " status ", status," data ", data);
        
        usedispatch(setMultipleIndex(index))
        usedispatch(setWrongPinStatus(status))

        navigationHistory.navigate("HistoryWrongPin", {
            data: data,
            customerDetails: customerDetails
        })
    }

    const navigationHome = () => {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'HomeNavigation',
                state: {
                    routes: [{
                        name: "Home",
                        state: {
                            routes: [{ name: "Profile" }]
                        }
                    }]
                }
            }],
        });
    };

    const parcelNav = () => {
        navigationMain.reset({
            index: 0,
            routes: [{
                name: 'ParcelNavigation',
            }],
        });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus',() => {
            fetchData()
        })
        return unsubscribe;
    },[navigation, isFocused, isData, navigationHistory])

    useEffect(() => {
        const fetch = setTimeout(async() =>{
            fetchData()
        },4000)
        
        return () => clearTimeout(fetch)
    },[isFocused])

    const receiptViewFunc = () => {
        navigationHistory.navigate('ReceiptView')
    }

    return (
        <>
            {message && <ConfirmModal alertMessage={message} modalVisibile={true} yesOnpress={() => { setMessage('') }} noOnpress={() => { }} />}
            <StatusBar
                barStyle="dark-content" // Or "dark-content" based on your preference
                translucent={true}
                backgroundColor={"transparent"}
            />
            <Header title={"History Details"} backBtn={true} settingBtn={false} backFunc={() => { navigation.navigate('History') }} settingFunc={() => { }} />
            {/* // ? Space for print receipt */}
            {
                isData.rider_name &&
                <View style={{ position: 'absolute', top: 50, alignSelf: 'flex-end', right: 20 }}>
                    <TouchableOpacity onPress={receiptViewFunc}><Icon type="ionicon" name="ticket-outline"/></TouchableOpacity>
                </View>
            }
            <ScrollView style={{ paddingHorizontal: spacing.m }}>

                <View style={[styles.container, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.m, paddingVertical: spacing.s, marginTop: spacing.l }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignSelf: 'center', marginHorizontal: spacing.m }}>
                            {
                                isData.rider_profile ?
                                    <Image source={{ uri: isData.rider_profile }} style={{ width: horizontalScale(40), height: verticalScale(40), borderRadius: 100 }} />
                                    :
                                    <Image source={require('../../../app/assets/img/sProfile.jpg')} style={{ width: horizontalScale(40), height: verticalScale(40), borderRadius: 100 }} />
                            }
                        </View>
                        <View>
                            {
                                isData.rider_name ?
                                    <Text style={[styles.textBold, text.normal, { color: colors.black }]}>{(isData.rider_name).toUpperCase()}</Text>
                                    :
                                    <Text style={[styles.textBold, text.normal, { color: colors.red }]}>Cancelled</Text>
                            }
                            {
                                isData.updated_at ?
                                    // <Text style={[text.small, { color: colors.grayText }]}>{DateFormatted(parmas_dropoff_date)} - {TimeFormatted(params_pickup_date)}</Text>
                                    <Text style={[text.small, { color: colors.grayText }]}>{isData.status == 'COMPLETED' ? `${DateFormatted(params_pickup_completed_at)} - ${TimeFormatted(params_pickup_completed_at)}` : `--- -- ---` }</Text>
                                    :
                                    <Text style={[text.small, { color: colors.grayText }]}>----- ---- --:--</Text>
                            }
                        </View>
                    </View>

                    {isData.rider_name && <TouchableOpacity
                        onPress={addFavoriteRider}>
                        <Icon name="heart-outline" type="ionicon" color={colors.red} size={28} />
                    </TouchableOpacity>}
                </View>

                <View style={[styles.container, { flexDirection: 'row', marginTop: spacing.m, paddingHorizontal: spacing.s, paddingVertical: spacing.m }]}>
                    <View style={{ alignSelf: 'center', marginLeft: spacing.s }}>
                    </View>
                    <View style={{ width: "100%" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    width: 1,
                                    height: '80%',
                                    borderStyle: 'dashed',
                                    borderWidth: 1,
                                    opacity: 0.8,
                                    borderColor: '#111',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 20,
                                }}></View>
                            <View
                                style={{
                                    width: '10%',
                                    height: '100%',
                                    alignItems: 'center',
                                }}>
                                <Icon name="location" type="ionicon" color={colors.red} />
                            </View>
                            <View style={{ width: "80%", marginLeft: spacing.s }}>
                                <Text style={[text.smallPlus, { color: colors.black }]}>{isData.pickup_address}</Text>
                                <Text style={[text.small, { color: colors.grayText }]}>{isData.pickup_person} - {isData.pickup_number}</Text>
                                <TouchableOpacity onPress={() => {
                                    const transactionPickup = {
                                        pickup: {
                                            actual_drop_lat: isData.pickup_actual_lat,
                                            actual_drop_long: isData.pickup_actual_long,
                                            address: isData.dropoff_address,
                                            description: isData.dropoff_address_details,
                                            pickup_image: isData.pickup_image,
                                            latitude: isData.pickup_lat,
                                            longitude: isData.pickup_long,
                                        }
                                    }
                                    !isData.pickup_wrong_pin
                                        ? navigationHistory.navigate('ViewImage', { imageValue: isData.pickup_image })
                                        : HistoryWrongPin(0, "PICKED_UP", transactionPickup, customerDetails)
                                }} style={{ marginVertical: spacing.s, marginRight: spacing.m }}>
                                    <PickUpComponents title={"Pickup"} date={DateFormatted(params_pickup_completed_at)} time={TimeFormatted(params_pickup_completed_at)} image={isData.pickup_image ? isData.pickup_image : rapidooLogo} wrong_pin={isData.pickup_wrong_pin} status={isData.status} />
                                </TouchableOpacity>
                                <Text>{``}</Text>
                            </View>
                        </View>
                        {
                            isData.isMultipleDrop &&
                            isData.isMultipleDrop.map((data: any, index: number) => index !== 0 && (
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    <View
                                        style={{
                                            width: 1,
                                            height: '80%',
                                            borderStyle: 'dashed',
                                            borderWidth: 1,
                                            opacity: 0.8,
                                            borderColor: '#111',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 20,
                                        }}></View>
                                    <View
                                        style={{
                                            width: '10%',
                                            height: '100%',
                                            alignItems: 'center',
                                        }}>
                                        <Icon name="radio-button-on" type="ionicon" color={colors.green} />
                                    </View>
                                    <View style={{ width: "80%", marginLeft: spacing.s }}>
                                        <Text style={[text.smallPlus, { color: colors.black }]}>{data.multipleAddress}</Text>
                                        <Text style={[text.small, { color: colors.grayText }]}>{data.multipleCName} - {data.multipleCNumber}</Text>
                                        <TouchableOpacity onPress={() => {
                                            !data.is_wrong_pin
                                                ? navigationHistory.navigate('ViewImage', { imageValue: data.dropoff_image })
                                                : HistoryWrongPin(index, "DELIVERY", data, customerDetails)

                                        }} style={{ marginVertical: spacing.s, marginRight: spacing.m }}>
                                            <PickUpComponents title={"Dropoff"} date={DateFormatted({ date: data.completed_at })} time={TimeFormatted({ date: data.completed_at })} image={data.dropoff_image ? data.dropoff_image : rapidooLogo} wrong_pin={data.is_wrong_pin} status={isData.status}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }

                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    width: '10%',
                                    height: '100%',
                                    alignItems: 'center',
                                }}>
                                <Icon name="location" type="ionicon" color={colors.green} />
                            </View>
                            <View style={{ width: "80%", marginLeft: spacing.s }}>
                                <Text style={[text.smallPlus, { color: colors.black }]}>{isData.dropoff_address}</Text>
                                <Text style={[text.small, { color: colors.grayText }]}>{isData.dropoff_person} - {isData.dropoff_number}</Text>
                                <TouchableOpacity onPress={() => {
                                    const transactionDropoff = {
                                        dropoff: {
                                            actual_drop_lat: isData.dropoff_actual_lat,
                                            actual_drop_long: isData.dropoff_actual_long,
                                            address: isData.dropoff_address,
                                            description: isData.dropoff_address_details,
                                            latitude: isData.dropoff_lat,
                                            longitude: isData.dropoff_long
                                        }
                                        , dropoff_image: isData.dropoff_image
                                    }
                                    !isData.dropoff_wrong_pin
                                        ? navigationHistory.navigate('ViewImage', { imageValue: isData.dropoff_image })
                                        : HistoryWrongPin(0, "DELIVERED", transactionDropoff, customerDetails)
                                }} style={{ marginVertical: spacing.s, marginRight: spacing.m }}>
                                    <PickUpComponents title={"Dropoff"} date={DateFormatted({ date: isData.dropoff_completed_at })} time={TimeFormatted({ date: isData.dropoff_completed_at })} image={isData.dropoff_image ? isData.dropoff_image : rapidooLogo} wrong_pin={isData.dropoff_wrong_pin} status={isData.status} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

                <DetailsComponent title={"Vehicle Type: "} details={isData.vehicle_type} />
                <DetailsComponent title={"Payment: "} details={`CASH - ${isData.sender_payment}`} />
                <DetailsComponent title={"Tip: "} details={"Php 50.00"} />

                <TouchableOpacity onPress={rebook_function} style={[{ backgroundColor: colors.mustard, marginTop: spacing.m, marginBottom: spacing.m, paddingHorizontal: spacing.s, paddingVertical: spacing.s, alignItems: 'center', height: 53, width: "100%", justifyContent: 'center', borderRadius: 10 }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textBold, text.medium, { color: colors.light, alignSelf: 'center' }]}>Rebook</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ alignItems: 'center', marginVertical: spacing.s }}>
                    <Text style={[text.smallPlus, { textAlign: 'center', color: colors.black }]}>Transaction ID#{app_transaction_id} {"\n"}{DateFormatted(params_pickup_date)} - {TimeFormatted(params_pickup_date)}</Text>
                </View>

            </ScrollView>
            <View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mustardOpacity,
        borderRadius: sizes.radius
    },
    textBold: {
        fontWeight: "700",
    }
})

function alert(arg0: string) {
    throw new Error("Function not implemented.");
}
