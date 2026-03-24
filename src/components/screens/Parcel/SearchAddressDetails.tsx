 import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import BackButton from '../../common/BackButton';
import { colors, spacing, text, sizes } from '../../../app/constants/theme';
// import ButtonOrange from "../../common/ButtonOrange";
import OrangeButton from '../../common/OrangeButton';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { markerPin, pickupMarker } from '../../../app/assets/img/images';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { useIsFocused } from '@react-navigation/native';
import {setDropoff, setPickup, setMultiple, setMultipleID} from '../../../app/redux/reducers/maplocation';
import HelperText from '../../common/HelperText';
import NumberValidation from '../../../utils/NumberValidation';
import { AlertModal } from '../../../app/constants/AlertModal';
import { empty_fields } from '../../../app/constants/AlertMsg';
import { clearBooking, getBookingDetails, postBooking, postBookingDetails } from '../../../app/watermelonDB/model/model';
import * as Keychain from 'react-native-keychain';
import { getCityFromCoordinates, savedAddress, validateDropOff } from '../../../services/parcel';
import { values } from '@nozbe/watermelondb/utils/fp';
import { action } from '@nozbe/watermelondb/decorators';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function SearchAddressDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isFocused = useIsFocused()
  const [message, setMessage] = useState("")
  const [checked, setchecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<any>([]);
  const [address, setAddress] = useState<any>(null);
  const [isWarning, setIsWarning] = useState(false);

  // Selector Redux
  const MultipleName = useSelector((state: RootState) => state.maplocation.multiplePayload);
  const bookingStatus = useSelector((state: RootState) => state.maplocation.searchAddressScreen);
  const multipleDropID = useSelector((state: RootState) => state.maplocation.multipleDropID);
  const contactDetails = useSelector((state: RootState) => state.transactionOrder.contact_details);
  const placeID = useSelector((state: RootState) => state.maplocation.place_id)
  const saveContactName = useSelector((state: RootState) => state.maplocation.saveContactName)
  const saveContactNumber = useSelector((state: RootState) => state.maplocation.saveContactNum)
  const pickupLatitude = useSelector((state: RootState) => state.maplocation.pickupLatitude)
  const pickupLongitude = useSelector((state: RootState) => state.maplocation.pickupLongitude)
  
  const addressName =
    bookingStatus === 'pickup'
      ? useSelector((state: RootState) => state.maplocation.pickupPlace)
      : bookingStatus === 'dropoff' || bookingStatus === 'multiple'
        ? useSelector((state: RootState) => state.maplocation.multiplePlace)
        : 'null'
          // ? useSelector((state: RootState) => state.maplocation.multiplePlace)
          // : 'null';

  const fullAddress =
    bookingStatus == 'pickup'
      ? useSelector((state: RootState) => state.maplocation.pickupFullAddress)
      : bookingStatus === 'dropoff' || bookingStatus === 'multiple'
        ? useSelector((state: RootState) => state.maplocation.multipleFullAddress)
        : 'null'
          // ? useSelector((state: RootState) => state.maplocation.multipleFullAddress)
          // : 'null';

  const latitude =
    bookingStatus == 'pickup'
      ? Number(useSelector((state: RootState) => state.maplocation.pickupLatitude))
      : bookingStatus === 'dropoff' || bookingStatus === 'multiple'
        ? Number(useSelector((state: RootState) => state.maplocation.multipleLatitude))
        : 0
          // ? Number(useSelector((state: RootState) => state.maplocation.multipleLatitude))
          // : 0;

  const longitude =
    bookingStatus == 'pickup'
      ? Number(useSelector((state: RootState) => state.maplocation.pickupLongitude))
      : bookingStatus == 'dropoff' || bookingStatus === 'multiple'
        ? Number(useSelector((state: RootState) => state.maplocation.multipleLongitude))
        : 0
          // ? Number(useSelector((state: RootState) => state.maplocation.multipleLongitude))
          // : 0;

  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const origin = {
    latitude: latitude,
    longitude: longitude,
  };

  const [isForm, setIsForm] = useState({
    floorNumber: '',
    contactNumber: '',
    contactName: '',
  });

  const onchangeFloorNumber = (value: any) => {
    setIsForm({ ...isForm, floorNumber: value });
  };
  const onchangeContact = (value: any) => {
    setIsForm({ ...isForm, contactNumber: value });
  };
  const onchangeName = (value: any) => {
    setIsForm({ ...isForm, contactName: value });
  };

  const updateMultipleDrop = (multiple_json: any) => {
    // Check if multipleDropID exists in the array and update it
    const multi = JSON.parse(MultipleName);
    const index = multi.findIndex((item: { id: number; }) => item.id === multipleDropID);
    if (index !== -1) {
      // Update the item at the found index with multiple_json values
      multi[index] = {
        ...multi[index],
        ...multiple_json,
        id: multipleDropID, // Ensure the ID remains unchanged
      };
    }
    // Convert the updated array to a JSON string
    const multiple_string = JSON.stringify(multi);
    // clearBooking()
    dispatch(setMultiple(multiple_string));
    dispatch(setMultipleID(0));
  };

  const getCityCoordinates = async (latitude: any, longitude: any) => {
    try {
      const response = await getCityFromCoordinates(latitude, longitude)
      if (response) {
        return response
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const saveMultipleDrop = (multiple_json: any) => {
    let multiple_array = [multiple_json];

    if (MultipleName) {
      const multi = JSON.parse(MultipleName);

      // Check if multi is an array or a single object
      if (Array.isArray(multi)) {
        // Spread the contents into multiple_array
        multiple_array.unshift(...multi);
        console.log('true');
      } else {
        // Assign a unique ID to the single object
        multi.id = multiple_json.id++;
        // Push it directly
        multiple_array.unshift(multi);
        console.log('false');
      }
      // Reassign the IDs to ensure sequential order starting from 1
      multiple_array = multiple_array.map((item, index) => {
        item.id = index + 1;
        return item;
      });
    }
    // Convert the updated array to a JSON string
    const multiple_string = JSON.stringify(multiple_array);
    dispatch(setMultiple(multiple_string));
    dispatch(setMultipleID(0));
  };

  const validateDropoff = async (action_type: any, params: any) => {
    try {
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      const response = await validateDropOff(action_type, params, access_json.access_token)
      console.log("++++++++++++++++++++++++++++++", response.status_code);
      
      if (![4000, 4001, 4002].includes(response.status_code)) {
        if (action_type == "pickup"){
          dispatch(setPickup(params.pickup_payload));
        }
        else{
          if (multipleDropID > 0) {
            console.log("here");
            updateMultipleDrop(params.validate_dropoff)
          } else {
            saveMultipleDrop(params.validate_dropoff);
          }    
        }
        navigationParcel()
      }
      else{
        setMessage(response.detail)
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async () => {
    const city = await getCityCoordinates(latitude, longitude) // Get city by lat long

    if (bookingStatus === 'pickup') {
      const pickup_json = {
        pickupName: addressName,
        pickUpAddress: fullAddress,
        pickupLatitude: latitude,
        pickupLongitude: longitude,
        pickupCNumber: isForm.contactNumber,
        pickupCName: isForm.contactName,
        pickupAddressDetails: isForm.floorNumber, // Details of the pickup address floor or street etc.
        city: city
      }
      validateDropoff("pickup", {
        pickup_payload: pickup_json,
        dropoff_payload: MultipleName,
        validate_dropoff: null
      })
      
    } else if (bookingStatus === 'dropoff' || bookingStatus === 'multiple') {
      let idCounter = 1;

      const multiple_json = {
        id: idCounter++,
        multipleName: addressName,
        multipleAddress: fullAddress,
        multipleLatitude: latitude,
        multipleLongitude: longitude,
        multipleCNumber: isForm.contactNumber,
        multipleCName: isForm.contactName,
        multipleAddressDetails: isForm.floorNumber,
        completed_at: null,
        dropoff_image: null,
        actual_drop_lat: null,
        actual_drop_long: null,
        is_wrong_pin: false,
        status: "DELIVERY", 
        city: city
      };
      console.log("DSASDADSADADA", pickupLatitude, pickupLongitude);
      
      const pickup_payload = {
        pickupLatitude: pickupLatitude,
        pickupLongitude: pickupLongitude
      }

      validateDropoff("dropoff", {
        pickup_payload: pickup_payload,
        dropoff_payload: MultipleName,
        validate_dropoff: multiple_json
      }) 
    }
  };

  const saveAddressDetails = async (params: any) => {
    try {
      //Get Acess Token
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      console.log(access_json.access_token);
      
      const response = await savedAddress(params, access_json.access_token)
      if(response){
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const checkSaveAddress = () => {
    if(checked){
      const params = {
        addressName: addressName,
        placeID: placeID,
        fullAddress: fullAddress,
        contact_number: isForm.contactNumber,
        contact_name: isForm.contactName,
      }
      const params_local = {
        address_name: addressName,
        address_details: fullAddress,
        recipient_number: isForm.contactNumber,
        recipient_name: isForm.contactName
      }
      console.log(params);
      
      saveAddressDetails(params)
      postBookingDetails(params_local)
      console.log("\n\n params local ", params_local);
      
    }
    handleClick();
    // navigationParcel()

  }

  const navigationBack = () => {
    if (bookingStatus === 'pickup') {
      dispatch(setPickup({
        pickupName: "",
        pickUpAddress: "",
        pickupLatitude: 0,
        pickupLongitude: 0,
        pickupCNumber: "",
        pickupCName: "",
        pickupAddressDetails: "",
      }));
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'SearchAddress' }]
    })
  }

  const navigationContacts = () => {
    navigation.navigate('ContactsScreen')
  }

  const navigationParcel = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Parcel' }],
    });
  };

  useEffect(() =>{
    if(contactDetails){
      let phone_number = contactDetails.phoneNumbers.replace(/^0/, "").replace(/\s+/g, "");
      let contact_number = phone_number.replace("+63","")
      setIsForm({ ...isForm, contactNumber: contact_number,  contactName: contactDetails.displayName });
    }
  },[isFocused])

  useEffect(() => {
    const bookingDetails = async () => {
      const data = await getBookingDetails({address_name:addressName})

      if(data.length > 0){
        const addressName = data[0]._raw.address_name;
        const addressDetails = data[0]._raw.address_details;
        const recipientNumber = data[0]._raw.recipient_number;
        const recipientName = data[0]._raw.recipient_name;
        setIsForm({...isForm, contactName:recipientName, contactNumber: recipientNumber, floorNumber:addressDetails})
      }
    }
    
    bookingDetails()
  
    if(saveContactNumber && saveContactName){
      setIsForm({ ...isForm, contactNumber: saveContactNumber,  contactName: saveContactName });
    }

  }, [])

  useEffect(() => {
    async function enableButton(data: {
      contactNumber: string;
      contactName: string;
    }) {
      if (data.contactName === '' || data.contactNumber === '') {
        // setIsVisible(true);
        setIsWarning(true);
      } else {
        // setIsVisible(false);
        setIsWarning(false);
      }
    }

    bookingStatus == 'pickup'
      ? setLocation({
        ...location,
        pickupCName: isForm.contactName,
        pickupCNumber: isForm.contactNumber,
        pickupAddressDetails: isForm.floorNumber,
      })
      : bookingStatus == 'dropoff'
        ? setLocation({
          ...location,
          dropoffCNumber: isForm.contactNumber,
          dropoffCName: isForm.contactName,
          dropOffAddressDetails: isForm.floorNumber,
        })
        : bookingStatus == 'multiple' &&
        setLocation({
          ...location,
          multipleCNumber: isForm.contactNumber,
          multipleCName: isForm.contactName,
          multipleAddressDetails: isForm.floorNumber,
        });
  }, [isForm]);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      {message && <AlertModal alertMessage={message} modalVisibile={true} yesOnpress={() => {setMessage('')}} noOnpress={() => {}}/>}
      <View style={{ position: 'absolute' }}>
        <AlertModal
          modalVisibile={isWarning}
          alertMessage={empty_fields}
          yesOnpress={() => setIsWarning(false)}
          noOnpress={() => setIsWarning(false)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: spacing.l,
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          zIndex: 1,
          marginHorizontal: spacing.s,
        }}>
        <View style={{ alignSelf: 'center' }}>
          <Button mode="contained" style={styles.parcelHeader}>
            <Text style={{ fontSize: sizes.h3, fontWeight: '700' }}>
              {bookingStatus == 'pickup'
                ? 'Pickup Address'
                : bookingStatus == 'dropoff'
                  ? 'Drop-off Address'
                  : bookingStatus == 'multiple' && 'Stop Location Address'}
            </Text>
          </Button>
        </View>
      </View>

      <View style={{ height: wHeight / 2.23 }}>
        <View style={{ position: 'absolute', zIndex: 1, top: 30, left: 15 }}>
          <View style={{ alignSelf: 'center' }}>
            <BackButton
              Onpress={navigationBack}
            />
          </View>
        </View>

        {/* DISPLAY MAP */}
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          minZoomLevel={7}
          maxZoomLevel={18}
          showsUserLocation={true}
          region={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onRegionChangeComplete={region => setRegion(region)}>
          <Marker coordinate={origin}>
            <Image source={pickupMarker} style={{ height: 40, width: 30 }} />
          </Marker>
        </MapView>

        {/* FIXED FAKE MARKER */}
        {/* <View style={styles.markerFixed}>
          <Image source={markerPin} style={styles.marker} />
        </View> */}
      </View>

      <View style={styles.container}>
        <ScrollView>
          <View>
            {/* <Text>{region.latitude}</Text>
          <Text>{region.longitude}</Text> */}
            <Text style={[text.normal, styles.pickUpText]}>
              {bookingStatus == 'pickup'
                ? 'Pickup Address Details'
                : bookingStatus == 'dropoff'
                  ? 'Drop-off Address Details'
                  : bookingStatus == 'multiple' && 'Stop Location Details'}
            </Text>
          </View>
          <View>
            <View style={styles.additionalSerBorder}>
              <View style={styles.iconSpacing}>
                <Icon type="ionicon" name="location" color={colors.mustard} />
              </View>
              <TouchableOpacity
                onPress={navigationBack}
                style={{ marginTop: 7 }}>
                <Text
                  numberOfLines={1}
                  style={[
                    text.smallPlus,
                    { fontWeight: '700', color: colors.black, width: '100%' },
                  ]}>
                  {bookingStatus == 'pickup'
                    ? addressName
                    : addressName.slice(0, 43)}
                </Text>
                {location ? (
                  <Text style={[text.smallPlus, { color: colors.grayText }]}>
                    {bookingStatus == 'pickup'
                      ? `${fullAddress.slice(0, 43)}...`
                      : `${fullAddress.slice(0, 43)}...`}
                  </Text>
                ) : (
                  <Text style={[text.smallPlus, { color: colors.grayText }]}>
                    {origin.latitude}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.additionalSerBorder}>
              <TextInput
                placeholder="Enter floor or unit number (Optional)"
                placeholderTextColor={colors.grayText}
                onChangeText={onchangeFloorNumber}
                value={isForm.floorNumber}
                maxLength={50}
                style={[text.normal, styles.inputText]}
              />
            </View>

            <View>
              <Text style={[text.normal, styles.contactText]}>
                Contact Details
              </Text>
            </View>

            <View style={styles.additionalSerBorder}>
              <TextInput
                placeholder="Contact Name"
                onChangeText={onchangeName}
                placeholderTextColor={colors.grayText}
                value={isForm.contactName}
                maxLength={50}
                style={[text.normal, styles.inputText]}
              />
            </View>
            <HelperText
              visibility={isForm.contactName == ''}
              caption={'The field is empty!'}
            />

            <View style={[styles.additionalSerBorder]}>
              <View style={[styles.iconSpacingFlag]}>
                <Image
                  source={require('../../../app/assets/img/phil.png')}
                  style={{ resizeMode: 'cover', width: 25, height: 25 , justifyContent:'center'}}
                />
                <Text
                  style={{
                    marginLeft: spacing.s,
                    justifyContent:'center',
                    color: colors.grayText,
                  }}>
                  +63
                </Text>
              </View>

              <TextInput
                keyboardType="numeric"
                onChangeText={onchangeContact}
                value={isForm.contactNumber}
                maxLength={10}
                style={[text.normal, styles.inputText, { marginTop: 3 }]}
              />

              <TouchableOpacity onPress={navigationContacts} style={{ position: 'absolute', right: 20, top: 13 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon type='ionicon' name='person-outline' size={22} color={colors.grayText} />
                </View>
              </TouchableOpacity>
            </View>

            <HelperText
              visibility={NumberValidation(isForm.contactNumber)}
              caption={'The format of number is invalid'}
            />
            <View style={styles.checkboxSpacing}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setchecked(!checked);
                }}
                color={colors.mustard}
              />
              <Text
                style={[
                  text.normal,
                  {
                    alignSelf: 'center',
                    fontWeight: '600',
                    color: colors.grayText,
                  },
                ]}>
                Save these details
              </Text>
            </View>

            <View style={{ marginTop: spacing.s }}>
              <OrangeButton
                btnTitle={'Next'}
                onPress={() => {
                  checkSaveAddress()
                }}
                disable={
                  !(isForm.contactName === '') && isForm.contactNumber === ''
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -40,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 40,
    width: 40,
  },
  container: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: colors.light,
    // marginTop: wHeight / 2.2,
    // height: "50%",
    // width: '100%',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    elevation: 5,
    padding: spacing.l,
  },
  pickUpText: {
    fontWeight: '700',
    color: colors.black,
  },
  contactText: {
    fontWeight: '700',
    color: colors.black,
    marginTop: spacing.s,
  },
  footerPrice: {
    fontWeight: '700',
    fontSize: sizes.h2,
    color: colors.black,
    // position: 'absolute',
    right: 10,
  },
  imageCover: {
    resizeMode: 'cover',
    flex: 1,
  },
  parcelHeader: {
    padding: spacing.s,
    borderRadius: 100,
    backgroundColor: colors.mustard,
  },
  Divider: {
    width: '100%',
    borderWidth: 0.1,
    alignSelf: 'center',
  },
  additionalSerBorder: {
    borderWidth: 1,
    borderColor: colors.mustard,
    height: 50,
    width: '100%',
    borderRadius: sizes.small,
    paddingHorizontal: spacing.s,
    marginTop: spacing.s + 5,
    flexDirection: 'row',
  }, 
  iconSpacing: {
    marginHorizontal: spacing.s,
    marginTop: 15,
  },
  iconSpacingFlag: {
    marginHorizontal: spacing.s,
    marginTop: 15,
    flexDirection: 'row',
  },
  inputText: {
    width: '100%',
    backgroundColor: 'transparent',
    color: colors.black,
  },
  contactIcon: {
    marginHorizontal: spacing.s,
    marginTop: spacing.s,
  },
  checkboxSpacing: {
    flexDirection: 'row',
    marginTop: spacing.s,
  },
});
