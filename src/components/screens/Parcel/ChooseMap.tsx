import { Dimensions, Image, StyleSheet, View } from 'react-native';
import MapDetails from '../../map/MapDetails';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { useEffect, useRef, useState } from 'react';
import { setDropoff, setMultiple, setMultipleID, setPickup, setPlaceID } from '../../../app/redux/reducers/maplocation';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import UserLocation from '../../map/MapHeader';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { markerPin, pickupMarker } from '../../../app/assets/img/images';
import BackButton from '../../common/BackButton';

import MapHeader from '../../map/MapHeader';
import {
  GOOGLE_API_KEY,
  GOOGLE_GEOCODING_URL,
} from '../../../app/constants/config';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import CrashlyticsErrorHandler from '../../../utils/Crashlytics/CrashlyticsErrorHandler';

export default function ChooseMap() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();
  const wWidth = Dimensions.get('window').width;
  const wHeight = Dimensions.get('window').height;
  const [location, setLocation] = useState<any>([]);
  const [isGranted, setIsGranted] = useState(false);
  const funRef = useRef<any>(null);
  const permissionRef = useRef<any>(null);

  // Selector Redux
  const bookingStatus = useSelector(
    (state: RootState) => state.maplocation.searchAddressScreen,
  );
  const MultipleName = useSelector(
    (state: RootState) => state.maplocation.multiplePayload,
  );
  const multipleDropID = useSelector(
    (state: RootState) => state.maplocation.multipleDropID,
  );
  const [mapLocation, setMapLocation] = useState({
    latitude: 14.5995,
    longitude: 120.9842,
  });

  const [region, setRegion] = useState({
    latitude: mapLocation.latitude,
    longitude: mapLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const origin = {
    latitude: mapLocation.latitude,
    longitude: mapLocation.longitude,
  };

  // FUNCTIONS
  const findLocation = async () => {
    // const name =
    //   data[0].results[2].address_components[0].long_name +
    //   ' ' +
    //   data[0].results[2].address_components[1].long_name;
    // const address = data[0].results[2].formatted_address;
    // const lat = data[0].results[2].geometry.location.lat;
    // const lng = data[0].results[2].geometry.location.lng;

    // setLocation({
    //   ...location,
    //   name: name.slice(0, 43),
    //   address: address,
    //   latitude: lat,
    //   longitude: lng,
    //   pickupCName: '',
    //   pickupCNumber: '',
    //   pickupAddressDetails: '',
    // });

    try {
      const result = await axios.get(GOOGLE_GEOCODING_URL, {
        params: {
          latlng: region.latitude + ',' + region.longitude,
          key: GOOGLE_API_KEY,
        },
      });
      // setLocation(result.data.items[0].address.label);
      if (result) {
        const name =
          result.data.results[2].address_components[0].long_name +
          ' ' +
          result.data.results[2].address_components[1].long_name;
        const address = result.data.results[2].formatted_address;
        const latitude = result.data.results[2].geometry.location.lat;
        const longitude = result.data.results[2].geometry.location.lng;

        setLocation({
          ...location,
          name: name,
          address: address,
          latitude: latitude,
          longitude: longitude,
        });
        dispatch(setPlaceID(result.data.results[2].place_id))
        console.log(result.data.results[2].address_components[0].long_name);
        console.log(result.data.results[2].formatted_address);
        console.log(result.data.results[2].place_id);
      }
    } catch (error) {
      CrashlyticsErrorHandler(error, 'ChooseMap.ts', 'findLocation');
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('you moved');
    findLocation();
  }, [region]);

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
    dispatch(setMultiple(multiple_string));
    dispatch(setMultipleID(0));
  };

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

  const handleClick = (
    contactName: string,
    contactNumber: string,
    floorNumber: string,
  ) => {
    if (bookingStatus == 'pickup') {
      console.log("PICKEEEED", location.place_id);
      dispatch(
        setPickup({
          pickupName: location.name,
          pickUpAddress: location.address,
          pickupLatitude: location.latitude,
          pickupLongitude: location.longitude,
          pickupCNumber: contactNumber,
          pickupCName: contactName,
          pickupAddressDetails: floorNumber,
        }),
      );
    // } else if (bookingStatus === 'dropoff') {
    //   dispatch(
    //     setDropoff({
    //       dropOffName: location.name,
    //       dropOffAddress: location.address,
    //       dropOffLatitude: location.latitude,
    //       dropoffLongitude: location.longitude,
    //       dropoffCNumber: contactNumber,
    //       dropoffCName: contactName,
    //       dropOffAddressDetails: floorNumber,
    //     }),
    //   );
    } else if (bookingStatus === 'dropoff' || bookingStatus === 'multiple') {
      let idCounter = 1;
      
      const multiple_json = {
        id: idCounter++,
        multipleName: location.name,
        multipleAddress: location.address,
        multipleLatitude: location.latitude,
        multipleLongitude: location.longitude,
        multipleCNumber: contactNumber,
        multipleCName: contactName,
        multipleAddressDetails: floorNumber,
        completed_at: null,
        dropoff_image: null,
        actual_drop_lat: null,
        actual_drop_long: null,
        is_wrong_pin: false,
        status: 'DELIVERY',
      };
      
      if (multipleDropID > 0) {
        updateMultipleDrop(multiple_json);
      } else {
        saveMultipleDrop(multiple_json);
      }
    }
  };

  const locationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Rapidoo App needs access to your Location ',
          buttonNeutral: 'Ask Me Later',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        _getCurrentLocation();
        setIsGranted(true);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMapLocation({ latitude, longitude });
      },
      error => console.log('Error', error.message),
      { enableHighAccuracy: false, timeout: 15000 },
    );
  };

  useEffect(() => {
    locationPermission();
  }, []);

  // useEffect(() => {
  //   funRef.current = setInterval(() => {
  //     locationPermission();
  //     console.log('hello');
  //   }, 5000);
  //   return () => {clearInterval(funRef.current)};
  // }, []);

  useEffect(() => {
    permissionRef.current = setInterval(() => {
      locationPermission();
      console.log('hello');
    }, 10000);
    return () => {
      clearInterval(permissionRef.current);
    };
  }, []);

  const navigationSearchAddress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SearchAddress' }],
    });
  };

  return (
    <View style={{ height: '100%' }}>
      <MapHeader
        header={
          bookingStatus == 'pickup' ? 'Pickup Address' : 'Drop-off Address'
        }
      />
      <View style={{ height: wHeight / 2 }}>
        <View style={{ position: 'absolute', zIndex: 1, top: 30, left: 15 }}>
          <View style={{ alignSelf: 'center' }}>
            <BackButton
              Onpress={() => {
                navigationSearchAddress()
              }}
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
          onRegionChangeComplete={region => setRegion(region)}></MapView>

        {/* FIXED FAKE MARKER */}
        <View style={styles.markerFixed}>
          <Image source={markerPin} style={styles.marker} />
        </View>
      </View>
      <MapDetails
        handleClick={handleClick}
        header={
          bookingStatus == 'pickup'
            ? 'Pickup Address Details'
            : 'Drop-off Address Details'
        }
        location={location}
        origin={origin}
        region={region}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 40,
    width: 40,
  },
});
function updateMultipleDrop(multiple_json: {
  id: number;
  multipleName: any;
  multipleAddress: any;
  multipleLatitude: any;
  multipleLongitude: any;
  multipleCNumber: string;
  multipleCName: string;
  multipleAddressDetails: string;
  status: string;
}) {
  throw new Error('Function not implemented.');
}
