import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { colors, moderateScale, sizes, spacing, text } from '../../../app/constants/theme';
import {Icon} from '@rneui/themed';
import OrangeButton from '../../common/OrangeButton';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SharedElement } from '../../navigations/Navigation';
import { deleteAll } from '../../../app/watermelonDB/model/model';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import { logo } from '../../../app/assets/img/images';
import * as Keychain from 'react-native-keychain'
import { HomeElement } from '../../navigations/HomeNavigation';
// import Contacts from 'react-native-contacts';
const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;


const LogoutModal: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
  const [isModalVisible, setIsModalVisible] = useState(false);
//   const userProfile = useSelector((state: RootState) => state.signUp.profile_pic);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const navigationLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      console.log('Contacts permission denied');
    }
  };


  const logoutFunc = async() => {
    const delete_profile = await deleteAll();
    const reset = Keychain.resetGenericPassword()
    navigationLogin()

  }

  return (
    <>
      <Modal
        onBackdropPress={() => navigationHome.goBack()}
        onBackButtonPress={() => navigationHome.goBack()}
        isVisible={true}
        swipeDirection="down"
        onSwipeComplete={() =>  navigationHome.goBack()}
        // animationIn="bounceInUp"
        // animationOut="bounceOutDown"
        // animationInTiming={900}
        // animationOutTiming={500}
        // backdropTransitionInTiming={1000}
        // backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={[{alignItems: 'center'}]}>
            <Image
              source={require('../../../app/assets/img/walking.png')}
            //   source={{uri:(logo)}}
              style={{
                resizeMode: 'cover',
                borderRadius: 20,
                height: 220,
                aspectRatio: 1 / 0.75,
                marginTop: spacing.m,
                marginBottom: spacing.s,
              }}
            />
          </View>
          <View
            style={{
              padding: 15,
            }}>
            <Text
              style={[
                styles.bigTxt,
                {
                  textAlign: 'center',
                  color: colors.black,
                  marginBottom: spacing.s,
                },
              ]}>
              Log out na?
            </Text>
            {/* <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 20,
                fontSize: 16,
                color:colors.black
              }}>
              Securely sign out and keep your account safe. Thank you for using
              our app!
            </Text> */}
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 20,
                fontSize: 16,
                color:colors.black
              }}>
              This will end your current session
            </Text>
          </View>
          <View style={{marginHorizontal: spacing.l}}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  marginTop: spacing.m,
                  justifyContent: 'space-around',
                },
              ]}>
              <View style={{width: wWidth / 2.5}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} // Navigate back
                    style={{
                    backgroundColor: colors.gray,
                    borderRadius: 10,
                    width: wWidth / 2.5,
                    paddingVertical: 13,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.black,
                      fontSize: sizes.h3,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: wWidth / 2.2}}>
                <OrangeButton
                  btnTitle={'Logout'}
                  onPress={logoutFunc} disable={false}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 200,
    paddingBottom: 20,
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
  navText: {
    fontSize: wHeight / 50,
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular',
    color: colors.black,
    marginHorizontal: spacing.m,
  },
  btnContainer: {
    position: 'absolute',
    width: '100%',
  },
  borderStyle: {
    borderColor: colors.mustard,
    borderWidth: 1,
    height: 100,
    width: '75%',
    alignSelf: 'center',
    paddingHorizontal: spacing.m,
  },
  inputLabel: {
    fontSize: sizes.h3,
    fontWeight: '400',
    color: colors.black,
    margin: spacing.s,
  },
  titleLabel: {
    fontSize: sizes.h3,
    fontWeight: '500',
    color: colors.black,
    margin: spacing.s,
    alignSelf: 'center',
    marginVertical: spacing.m,
  },
  infoLabel: {
    fontSize: sizes.h3,
    fontWeight: '400',
    color: colors.black,
    margin: spacing.s,
    textAlign: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    backgroundColor: colors.mustard,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
  },
  bigTxt: {
    fontWeight: '500',
    fontSize: sizes.h3 + 1,
  },
  normalTxt: {
    fontWeight: '400',
    fontSize: sizes.h3,
    color: colors.grayText,
  },
  normalSmallTxt: {
    fontSize: sizes.h3 - 2,
  },
  smallTxt: {
    fontSize: sizes.body - 3,
  },
});
