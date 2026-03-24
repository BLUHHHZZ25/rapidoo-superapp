import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeElement } from '../../navigations/HomeNavigation';
import { colors, spacing, text } from '../../../app/constants/theme';
import HeaderPlain from '../../HeaderPlain';
import { choose_drop_png, rider_helmet } from '../../../app/assets/img/images';
import * as Keychain from 'react-native-keychain';
import { checkFavoriteRider, getFavoriteRider } from '../../../services/parcel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/redux/store';
import { ParcelElement } from '../../navigations/ParcelNavigation';
import { setRiderInfo } from '../../../app/redux/reducers/maplocation';
import { log } from '@react-native-firebase/crashlytics';
import { SharedElement } from '../../navigations/Navigation';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;


export default function ChooseRider() {
  const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
  const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  
  const [favoriteRider, setFavoriteRider] = useState([]);
  const usedispatch = useDispatch<AppDispatch>();

  const chooseRider = async (rider_account_id: any, rider_name: any) => {
    //Get Acess Token
    const result: any = await Keychain.getGenericPassword();
    const access_json = JSON.parse(result.password);

    const rider_data = {
      rider_account_id: rider_account_id,
      rider_name: rider_name,
    }
    const response = await checkFavoriteRider(rider_data, access_json.access_token)
    console.log(response);
    
    if (response.status_code === 4001) {
      navigation.navigate("AlertModalError",{message: response.status_code})
      console.log(response.detail);
    }
    else if (response.status_code === 4002) {
      navigation.navigate("AlertModalError",{message: response.status_code})
      console.log(response.detail);
    }
    else {
      console.log(response);
      
      usedispatch(setRiderInfo(rider_data));
      navigationHome.goBack()
      
    }
  }

  const favoriteRiderDetails = async () => {
    //Get Acess Token
    const result: any = await Keychain.getGenericPassword();
    const access_json = JSON.parse(result.password);

    const response = await getFavoriteRider(access_json.access_token);
    if (response){
      console.log(response);
      setFavoriteRider(response)
    }
  }
  
  useEffect(() => {
    const rider_data = {
      rider_account_id: "",
      rider_name: "",
    }
    usedispatch(setRiderInfo(rider_data));
    favoriteRiderDetails();
  }, [])

  return (
    <View style={{ width: '100%' }}>
      <HeaderPlain
        title={'Choose Rider'}
        back_button={true}
        back_function={() => navigationHome.goBack()}
      />
      <ScrollView style={{}}>
        <View
          style={{
            width: '70%',
            height: 'auto',
            marginTop: spacing.s,
            marginLeft: spacing.l,
          }}>
          {favoriteRider && favoriteRider.map((item: any, index: any) => (
            <TouchableOpacity key={index} style={styles.historyContent} onPress={() => {chooseRider(item.rider_account_id, item.rider_name)
            }}>
            <View style={{ marginRight: 20 }}>
              <Image
                style={{ width: 70, height: 70 }}
                source={rider_helmet}></Image>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Text
                style={[
                  text.medium,
                  {
                    marginTop: 5,
                    fontWeight: '700',
                    color: colors.mustard,
                  },
                ]}>
                {item.rider_name}
              </Text>
              <Text
                style={[
                  text.smallPlus,
                  { marginVertical: 2, color: colors.grayText },
                ]}>
                {item.city}
              </Text>
              <Text style={[text.smallPlus, { color: colors.grayText }]}></Text>
            </View>
          </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
});
