import { Icon } from '@rneui/themed';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, sizes, spacing, text } from '../../../app/constants/theme';
import DefaultHeader from '../../common/DefaultHeader';
import { SharedElement } from '../../navigations/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Divider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import {
  GOOGLE_API_KEY,
  GOOGLE_DETAILS_URL,
} from '../../../app/constants/config';
import AutoComplete from '../../../utils/AutoComplete';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import {
  setContactDetails,
  setDropoffLatLong,
  setMultipleInput,
  setMultipleLatLong,
  setPickupLatLong,
} from '../../../app/redux/reducers/maplocation';
import CrashlyticsErrorHandler from '../../../utils/Crashlytics/CrashlyticsErrorHandler';
import React from 'react';
import { getSavedAddress, removeSavedAddress } from '../../../services/parcel';
import * as Keychain from 'react-native-keychain';
import { ParcelElement } from '../../navigations/ParcelNavigation';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SearchAddress() {
  const navigation = useNavigation<any>();
  const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<any>('');
  const [isLoadingComplete, setIsLoadingComplete] = useState<any>(false);
  const [loading, setIsLoading] = useState(false);
  const [place, setPlace] = useState<any>();
  const [saveAddress, setSaveAddress] = useState<any>(null);
  const [inputText, setTextInput] = useState<any>();
  const bookingStatus = useSelector(
    (state: RootState) => state.maplocation.searchAddressScreen,
  );
  const [details, setDetails] = useState<any>([
    {
      address_components: [
        { long_name: 'CMI Bldg', short_name: 'CMI Bldg', types: [Array] },
        { long_name: '315', short_name: '315', types: [Array] },
        {
          long_name: 'Commonwealth Avenue',
          short_name: 'Commonwealth Ave',
          types: [Array],
        },
        { long_name: 'Quezon City', short_name: 'QC', types: [Array] },
        { long_name: 'Metro Manila', short_name: 'NCR', types: [Array] },
        { long_name: 'Philippines', short_name: 'PH', types: [Array] },
        { long_name: '1128', short_name: '1128', types: [Array] },
      ],
      adr_address:
        'CMI Bldg, <span class="street-address">315 Commonwealth Ave</span>, <span class="locality">Quezon City</span>, <span class="postal-code">1128</span> <span class="region">Metro Manila</span>, <span class="country-name">Philippines</span>',
      business_status: 'OPERATIONAL',
      current_opening_hours: {
        open_now: true,
        periods: [[Object], [Object], [Object], [Object], [Object]],
        weekday_text: [
          'Monday: 8:00 AM – 6:00 PM',
          'Tuesday: 8:00 AM – 6:00 PM',
          'Wednesday: 8:00 AM – 6:00 PM',
          'Thursday: 8:00 AM – 6:00 PM',
          'Friday: 8:00 AM – 6:00 PM',
          'Saturday: Closed',
          'Sunday: Closed',
        ],
      },
      formatted_address:
        'CMI Bldg, 315 Commonwealth Ave, Quezon City, 1128 Metro Manila, Philippines',
      geometry: {
        location: { lat: 14.6931842, lng: 121.00454 },
        viewport: { northeast: [Object], southwest: [Object] },
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
      icon_background_color: '#7B9EB0',
      icon_mask_base_uri:
        'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
      name: 'CMI Building Eqi',
      opening_hours: {
        open_now: true,
        periods: [[Object], [Object], [Object], [Object], [Object]],
        weekday_text: [
          'Monday: 8:00 AM – 6:00 PM',
          'Tuesday: 8:00 AM – 6:00 PM',
          'Wednesday: 8:00 AM – 6:00 PM',
          'Thursday: 8:00 AM – 6:00 PM',
          'Friday: 8:00 AM – 6:00 PM',
          'Saturday: Closed',
          'Sunday: Closed',
        ],
      },
      place_id: 'ChIJFw94r1y3lzMRugvybR_7QpA',
      plus_code: {
        compound_code: 'M379+R9 Quezon City, Metro Manila, Philippines',
        global_code: '7Q63M379+R9',
      },
    },
  ]);
  const location = [
    {
      id: 1,
      description:
        'CMI Building Eqi, Commonwealth Avenue, Quezon City, Metro Manila, Philippines',
      matched_substrings: [[Object]],
      place_id: 'ChIJFw94r1y3lzMRugvybR_7QpA',
      reference: 'ChIJFw94r1y3lzMRugvybR_7QpA',
      structured_formatting: {
        main_text: 'CMI Building Eqi',
        main_text_matched_substrings: [Array],
        secondary_text:
          'Commonwealth Avenue, Quezon City, Metro Manila, Philippines',
      },
      terms: [[Object], [Object], [Object], [Object], [Object]],
      types: ['point_of_interest', 'establishment'],
    },
    {
      id: 2,
      description:
        'CMI (Blue) Building, Bauan, Binay Street, Poblacion, Bauan, Batangas, Philippines',
      matched_substrings: [[Object]],
      place_id: 'ChIJbzLl0UIPvTMRvQrelgWW_Co',
      reference: 'ChIJbzLl0UIPvTMRvQrelgWW_Co',
      structured_formatting: {
        main_text: 'CMI (Blue) Building, Bauan',
        main_text_matched_substrings: [Array],
        secondary_text: 'Binay Street, Poblacion, Bauan, Batangas, Philippines',
      },
      terms: [[Object], [Object], [Object], [Object], [Object], [Object]],
      types: ['point_of_interest', 'establishment'],
    },
    {
      id: 3,
      description: 'CMI - Darasa, Filinvest, Tanauan, Batangas, Philippines',
      matched_substrings: [[Object], [Object]],
      place_id: 'ChIJNROJ_KFvvTMRZhr-qu5yesY',
      reference: 'ChIJNROJ_KFvvTMRZhr-qu5yesY',
      structured_formatting: {
        main_text: 'CMI - Darasa',
        main_text_matched_substrings: [Array],
        secondary_text: 'Filinvest, Tanauan, Batangas, Philippines',
        secondary_text_matched_substrings: [Array],
      },
      terms: [[Object], [Object], [Object], [Object], [Object]],
      types: ['point_of_interest', 'establishment'],
    },
    {
      id: 4,
      description:
        'College of Mary Immaculate, J.P Rizal Street, Pandi, Bulacan, Philippines',
      matched_substrings: [[Object], [Object]],
      place_id: 'ChIJ_xFFQomrlzMRWr_s1YwfO6c',
      reference: 'ChIJ_xFFQomrlzMRWr_s1YwfO6c',
      structured_formatting: {
        main_text: 'College of Mary Immaculate',
        main_text_matched_substrings: [Array],
        secondary_text: 'J.P Rizal Street, Pandi, Bulacan, Philippines',
        secondary_text_matched_substrings: [Array],
      },
      terms: [[Object], [Object], [Object], [Object], [Object]],
      types: ['school', 'point_of_interest', 'establishment'],
    },
    {
      id: 5,
      description:
        'CMI - Creative Minds International Center and Tutorial Services, Purok 2, San Antonio, Santo Tomas, Batangas, Philippines',
      matched_substrings: [[Object], [Object]],
      place_id: 'ChIJJ1-rMLplvTMRNqBd7FRE7B8',
      reference: 'ChIJJ1-rMLplvTMRNqBd7FRE7B8',
      structured_formatting: {
        main_text:
          'CMI - Creative Minds International Center and Tutorial Services',
        main_text_matched_substrings: [Array],
        secondary_text:
          'Purok 2, San Antonio, Santo Tomas, Batangas, Philippines',
        secondary_text_matched_substrings: [Array],
      },
      terms: [[Object], [Object], [Object], [Object], [Object], [Object]],
      types: ['school', 'point_of_interest', 'establishment'],
    },
  ];

  // HANDLE LOADING
  const isLoading = (loading: any) => {
    setIsLoadingComplete(loading);
    return loading;
  };

  //RETRIEVE LOCATION DETAILS (LONG & LAT)
  const handlePress = async (place_id: string, main_text: string) => {
    // navigation.navigate('PickupAddressDetails', {
    //   latitude: details[0].geometry.location.lat,
    //   longitude: details[0].geometry.location.lng,
    //   name: details[0].address_components[0].long_name,
    //   address: details[0].formatted_address,
    // });

    try {
      setIsLoading(true);
      const result = await axios.get(GOOGLE_DETAILS_URL, {
        params: {
          place_id: place_id,
          key: GOOGLE_API_KEY,
        },
      });
      setIsLoading(false);

      if (result) {
        const sendLatLongPickup = {
          place_id: place_id,
          latitudepickup: result.data.result.geometry.location.lat,
          longitudepickup: result.data.result.geometry.location.lng,
          pickupPlace: main_text,
          pickupFullAddress: result.data.result.formatted_address,
        };
        const sendMultipleLatLong = {
          place_id: place_id,
          latitudeMultiple: result.data.result.geometry.location.lat,
          longitudeMultiple: result.data.result.geometry.location.lng,
          placeMultiple: main_text,
          fullAddressMultiple: result.data.result.formatted_address,
          status: 'DELIVERY',
        };
        console.log('this is result', result.data.formatted_address);

        if (bookingStatus == 'pickup') {
          dispatch(setPickupLatLong(sendLatLongPickup));
          console.log('\n\n\n latlong:', sendLatLongPickup);
          navigationSearchDetails()
        } 
        // else if (bookingStatus == 'dropoff'){
        //   dispatch(setDropoffLatLong(sendLatLong));
        //   navigationSearchDetails()
        // }
        else{
          dispatch(setMultipleLatLong(sendMultipleLatLong));
          navigationSearchDetails();
        }
      }

    } catch (error) {
      CrashlyticsErrorHandler(error, 'SearchAddress', 'handlePress');
      console.log(error);
    }

    // const sendLatLongPickup = {
    //   latitudepickup: details[0].geometry.location.lat,
    //   longitudepickup: details[0].geometry.location.lng,
    //   pickupPlace: main_text,
    //   pickupFullAddress: details[0].formatted_address,
    // };

    // const sendLatLong = {
    //   latitude: details[0].geometry.location.lat,
    //   longitude: details[0].geometry.location.lng,
    //   dropOffPlace: main_text,
    //   dropOffFullAddress: details[0].formatted_address,
    // };

    // if (bookingStatus == 'pickup') {
    //   dispatch(setPickupLatLong(sendLatLongPickup));
    //   console.log('\n\n\n latlong:', sendLatLongPickup);
    //   navigation.navigate('SearchAddressDetails');
    // } else {
    //   dispatch(setDropoffLatLong(sendLatLong));
    //   navigation.navigate('SearchAddressDetails');
    // }

    // console.log(details[0].geometry.location.lat);
    // console.log(details[0].geometry.location.lng);
    // console.log(details[0].formatted_address);
    // console.log(main_text);
  };
  console.log('sdsdsds', isLoadingComplete);
  console.log(bookingStatus);


  const navigationSearchDetails = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SearchAddressDetails' }],
    });
  };

  const navigationChooseMap = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ChooseMap' }],
    });
  };

  const removeSaveAddress = async (placeID: any) => {
    try {
      //Get Acess Token
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      console.log(placeID);
      
      const response = await removeSavedAddress(placeID, access_json.access_token)
      if (response){
        console.log(response);
        setSaveAddress('')
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const navigationBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Parcel' }],
    });
  };

  const getAllSaveAddress = async () => {
    try {
      //Get Acess Token
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);

      const response = await getSavedAddress(access_json.access_token);
      if (response) {
        console.log(response);
        setSaveAddress(response);
        setPlace('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setContactDetails({
      saveContactNum: "",
      saveContactName: ""
    }))
  }, [])
  return (
    <>
      <DefaultHeader
        titleName={
          bookingStatus == 'pickup'
            ? 'PickUp Address'
            : bookingStatus == 'dropoff'
            ? 'Drop Off Address'
            : bookingStatus == 'multiple'
            ? 'Stop Location'
            : ''
        }
        onPress={navigationBack}
      />
      <View style={{ 
        height: '83%'
       }}>
        <View style={{ marginHorizontal: windowWidth * 0.05 }}>
          <View style={[styles.inputStyle, {}]}>
            <TextInput
              keyboardType="default"
              returnKeyType="search"
              onSubmitEditing={() => {
                AutoComplete(inputText, isLoading).then(values =>
                  setPlace(values),
                );
                setSaveAddress('');
              }}
              onChangeText={text => {
                // handleChange(text);
                // console.log("AutoComplete Function:",(AutoComplete(text, isLoading)).then(values => console.log(values)));
                setTextInput(text);
              }}
              placeholder="Input Address"
              style={styles.inputTextStyle}
            />

            <TouchableOpacity
              style={[styles.searchButton, {}]}
              onPress={() => {
                AutoComplete(inputText, isLoading).then(values =>
                  setPlace(values),
                );
                setSaveAddress('');
              }}>
              <Icon
                name="search-outline"
                size={25}
                type="ionicon"
                color={colors.light}
                style={{ paddingVertical: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {bookingStatus != 'multiple' && (
        <TouchableOpacity
          onPress={() => {
            navigationChooseMap()
          }}
          style={{
            flexDirection: 'row',
            marginHorizontal: spacing.xl,
            marginBottom: spacing.m,
          }}>
          <View style={{ marginRight: spacing.s }}>
            <Icon type="ionicon" name="locate-outline" />
          </View>
          
            <View style={{ marginTop: 1 }}>
              <Text style={{ color: colors.primary }}>
                {' '}
                Use current location
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <Divider />
        <TouchableOpacity
          onPress={() => {
            getAllSaveAddress();
          }}
          style={{
            flexDirection: 'row',
            marginHorizontal: spacing.xl,
            marginVertical: spacing.m,
          }}
        >
          <View style={{ marginRight: spacing.s }}>
            <Icon type="ionicon" name="bookmark" color={colors.mustard} />
          </View>
          <View style={{ marginTop: 1 }}>
            <Text style={{ color: colors.primary }}>
              Check saved Addresses {isLoadingComplete}
            </Text>
          </View>
        </TouchableOpacity>
        <Divider />

        {saveAddress && (
          <>
            <FlatList
              data={saveAddress} //CHANGE TO USESTATE place TO FETCH REAL DATA else  location for dummy
              decelerationRate={'fast'}
              renderItem={({ item, index }) => {
                return (
                  <>
                    {!isLoadingComplete ? (
                      <TouchableOpacity
                        // key={item.id}
                        onPress={() => {
                          dispatch(setContactDetails({
                            saveContactNum: item.contact_number,
                            saveContactName: item.contact_name
                          }))
                          handlePress(item.place_id, item.address_name);
                        }}
                        style={{
                          height: 'auto',
                          flexDirection: 'row',
                          marginHorizontal: spacing.xl,
                          marginVertical: spacing.m,
                        }}>
                        <View style={{ marginRight: spacing.s }}>
                          <Icon
                            type="ionicon"
                            name="bookmark"
                            color={colors.mustard}
                          />
                        </View>
                        <View style={{
                           paddingRight: spacing.s, 
                           width: '90%', 
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           alignItems: 'center' }}>
                          <View style={{width: '85%'}}>
                            <Text
                              style={[
                                text.normal,
                                { fontWeight: '700', color: colors.black },
                              ]}>
                              {item.address_name}
                            </Text>
                            <Text style={[text.small, { color: colors.grayText }]}>
                              {item.full_address}
                            </Text>
                          </View>
                          <View>
                          <TouchableOpacity
                            onPress={() => {
                              removeSaveAddress(item.place_id)
                              
                            }}>
                            <Icon name="close-circle" type="ionicon" color={colors.red} />
                          </TouchableOpacity>
                          </View>
                        </View>
                        <Divider />
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          marginHorizontal: spacing.xl,
                          marginVertical: spacing.s,
                        }}>
                        {/* <SkeletonPlaceholder borderRadius={15}>
                      <SkeletonPlaceholder.Item
                        flexDirection="row"
                        alignItems="center"
                        justifyContent='flex-start'>
                        <SkeletonPlaceholder.Item>
                          <SkeletonPlaceholder.Item width={200} height={25} />
                          <SkeletonPlaceholder.Item
                            marginTop={6}
                            width={wWidth - 80}
                            height={20}
                          />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder> */}
                      </View>
                    )}
                  </>
                );
              }}
            />
          </>
        )}

        {/* RENDER AUTOCOMPLETE */}
        <FlatList
          data={place} //CHANGE TO USESTATE place TO FETCH REAL DATA else  location for dummy
          decelerationRate={'fast'}
          renderItem={({ item, index }) => {
            return (
              <>
                {!isLoadingComplete ? (
                  <TouchableOpacity
                    // key={item.id}
                    onPress={() => {
                      handlePress(
                        item.place_id,
                        item.structured_formatting.main_text,
                      );
                    }}
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: spacing.xl,
                      marginVertical: spacing.m,
                    }}>
                    <View style={{ marginRight: spacing.s }}>
                      <Icon
                        type="ionicon"
                        name="timer"
                        color={colors.mustard}
                      />
                    </View>
                    <View style={{ paddingRight: spacing.s }}>
                      <Text
                        style={[
                          text.normal,
                          { fontWeight: '700', color: colors.black },
                        ]}>
                        {item.structured_formatting.main_text}
                      </Text>
                      <Text style={[text.small, { color: colors.grayText }]}>
                        {item.structured_formatting.secondary_text}
                      </Text>
                    </View>
                    <Divider />
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      marginHorizontal: spacing.xl,
                      marginVertical: spacing.s,
                    }}>
                  </View>
                )}
              </>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChooseMap', {
            header: 'Pickup Address',
            type: true,
          });
        }}
        style={styles.chooseMapContainer}>
        <Text
          style={{
            color: colors.light,
            fontSize: sizes.radius,
            fontWeight: '700',
          }}>
          Choose from Map
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  chooseMapContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.mustard,
    padding: 15,
    borderRadius: 30,
  },
  inputStyle: {
    flexDirection: 'row',
    // paddingLeft: spacing.s,
    // alignItems: 'center',
    backgroundColor: colors.white,
    height: 55,
    borderColor: colors.mustard,
    borderWidth: 2,
    borderRadius: sizes.sradius,
    marginBottom: spacing.m,
    marginTop: spacing.m,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    textShadowRadius: 20,
  },
  inputTextStyle: {
    paddingLeft: 20,
    paddingRight: 70,
    color: colors.black2,
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    marginLeft: spacing.l,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mustard,
    paddingHorizontal: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: '100%',
    position: 'absolute',
    right: 0,
  },
});
