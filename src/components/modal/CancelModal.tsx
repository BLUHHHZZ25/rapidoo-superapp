import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import OrangeButton from '../common/OrangeButton';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SharedElement } from '../navigations/Navigation';
import { HomeElement } from '../navigations/HomeNavigation';
import { colors, sizes, spacing } from '../../app/constants/theme';
import { useState } from 'react';
import { log } from '@react-native-firebase/crashlytics';
import { ParcelElement } from '../navigations/ParcelNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/redux/store';
import * as keychain from 'react-native-keychain';
import { cancelTransaction } from '../../services/parcel';
import { setAcceptTransaction, setTransactionID } from '../../app/redux/reducers/transactionOrder';
import { LoaderComponents } from '../common/LoaderComponents';
import React from 'react';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function CancelModal() {
  const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
  const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
  const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const usedispatch = useDispatch<AppDispatch>();

  const toggleModal = () => {
    navigationParcel.navigate('TrackMyOrder');
    setIsModalVisible(!isModalVisible);
  };
  const acceptTransaction: any = useSelector((state: RootState) => state.transactionOrder.accept_transaction,);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setIsLoader] = useState(false);

  const cancelOrder = async () => {
    try {
      const json_string = acceptTransaction;
      const booking = JSON.parse(json_string);

      //Get Acess Token
      const result: any = await keychain.getGenericPassword();
      const access_json = JSON.parse(result.password);
      setIsLoader(true);
      const cancel = await cancelTransaction(
        booking.transaction_id,
        access_json.access_token,
      );
      if (cancel) {
        setIsLoader(false);
        usedispatch(setAcceptTransaction(''));
        usedispatch(setTransactionID(''));
        console.log(cancel);
        navigationParcel.reset({
          index:0,
          routes: [{name: 'Parcel'}],
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        onBackdropPress={() => navigationHome.goBack()}
        onBackButtonPress={() => navigationHome.goBack()}
        isVisible={true}
        swipeDirection="down"
        onSwipeComplete={() => navigationHome.goBack()}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={[{ alignItems: 'center' }]}>
            {/* <Image
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
            /> */}
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
              Cancel Transaction
            </Text>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 20,
                fontSize: 16,
                color: colors.black,
              }}>
              Are you sure you want to cancel your order?
            </Text>
          </View>
          <View style={{ marginHorizontal: spacing.l }}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  marginTop: spacing.m,
                  justifyContent: 'space-around',
                },
              ]}>
              <View style={{ width: wWidth / 2.5 }}>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                  }}
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
              <View style={{ width: wWidth / 2.2 }}>
                <OrangeButton
                  btnTitle={'Confirm'}
                  onPress={() => {
                    cancelOrder()
                  }}
                  disable={false}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <LoaderComponents showComp={loader} labelComp={`Please wait...`} />
    </>
  );
}

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
    alignItems: 'center',
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
