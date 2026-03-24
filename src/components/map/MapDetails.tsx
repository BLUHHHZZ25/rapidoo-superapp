import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import OrangeButton from '../common/OrangeButton';
import { colors, sizes, spacing, text } from '../../app/constants/theme';
import { Checkbox } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/redux/store';
import HelperText from '../common/HelperText';
import NumberValidation from '../../utils/NumberValidation';
import * as Keychain from 'react-native-keychain';
import { savedAddress } from '../../services/parcel';

export default function MapDetails({
  handleClick,
  location,
  origin,
  header,
}: {
  handleClick: any;
  location: any;
  origin: any;
  region: any;
  header: string;
}) {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [checked, setchecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Selector Redux
  const bookingStatus = useSelector(
    (state: RootState) => state.maplocation.searchAddressScreen,
  );
  const placeID = useSelector((state: RootState) => state.maplocation.place_id);
  const saveContactName = useSelector(
    (state: RootState) => state.maplocation.saveContactName,
  );
  const saveContactNumber = useSelector(
    (state: RootState) => state.maplocation.saveContactNum,
  );

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

  useEffect(() => {
    const validation = async () => {
      if (isForm.contactName == '') {
        setIsVisible(false);
      } else if (isForm.contactNumber == '') {
        setIsVisible(false);
      } else if (isForm.floorNumber == '') {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    validation();
  }, [isForm]);

  const navigationParcel = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Parcel' }],
    });
  };

  const saveAddressDetails = async (params: any) => {
    try {
      //Get Acess Token
      const result: any = await Keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      console.log(access_json.access_token);

      const response = await savedAddress(params, access_json.access_token);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkSaveAddress = () => {
    if (checked) {
      const params = {
        addressName: location.address,
        placeID: placeID,
        fullAddress: location.address,
        contact_number: isForm.contactNumber,
        contact_name: isForm.contactName,
      };
      console.log(params);
      
      saveAddressDetails(params);
    }
    handleClick(
      isForm.contactName,
      isForm.contactNumber,
      isForm.floorNumber,
    );
    navigationParcel();
  };

  useEffect(() => {
    if (saveContactNumber && saveContactName) {
      setIsForm({
        ...isForm,
        contactNumber: saveContactNumber,
        contactName: saveContactName,
      });
    }
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {/* <Text>{region.latitude}</Text>
          <Text>{region.longitude}</Text> */}
          <Text style={[text.normal, styles.pickUpText]}>
            {bookingStatus == 'pickup'
              ? 'Pickup Address Details'
              : 'Drop-off Address Details'}
          </Text>
        </View>
        <View>
          <View style={styles.additionalSerBorder}>
            <View style={styles.iconSpacing}>
              <Icon type="ionicon" name="location" color={colors.mustard} />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginTop: 7 }}>
              <Text
                numberOfLines={1}
                style={[
                  text.smallPlus,
                  { fontWeight: '700', color: colors.black, width: '100%' },
                ]}>
                {bookingStatus == 'pickup' && location.name
                  ? location.name.slice(0, 43)
                  : location.name && location.name.slice(0, 43)}
              </Text>
              {location ? (
                <Text style={[text.smallPlus, { color: colors.grayText }]}>
                  {bookingStatus == 'pickup' && location.address
                    ? `${location.address.slice(0, 43)}...`
                    : location.address && `${location.address.slice(0, 43)}...`}
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
              placeholder="Enter floor or unit number"
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

          <View style={styles.additionalSerBorder}>
            <View style={styles.iconSpacingFlag}>
              <Image
                source={require('../../app/assets/img/phil.png')}
                style={{ resizeMode: 'cover', width: 25, height: 25 }}
              />
              <Text
                style={{
                  marginLeft: spacing.s,
                  marginTop: 2,
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
                // handleClick(
                //   isForm.contactName,
                //   isForm.contactNumber,
                //   isForm.floorNumber,
                // );
                checkSaveAddress()
              }}
              disable={!isVisible}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxSpacing: {
    flexDirection: 'row',
    marginTop: spacing.s,
  },
  inputText: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  contactText: {
    fontWeight: '700',
    color: colors.black,
    marginVertical: spacing.s,
  },
  additionalSerBorder: {
    borderWidth: 1,
    borderColor: colors.mustard,
    height: 55,
    width: '100%',
    borderRadius: sizes.small,
    paddingHorizontal: spacing.s,
    marginTop: spacing.s,
    flexDirection: 'row',
    marginBottom: spacing.s,
  },
  iconSpacingFlag: {
    marginHorizontal: spacing.s,
    marginTop: 15,
    flexDirection: 'row',
  },
  container: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: colors.light,
    height: 'auto',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    elevation: 5,
    padding: spacing.l,
  },
  pickUpText: {
    fontWeight: '700',
    color: colors.black,
    marginVertical: spacing.s,
  },
  iconSpacing: {
    marginHorizontal: spacing.s,
    marginTop: 15,
  },
});
