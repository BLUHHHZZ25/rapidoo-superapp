import { BackHandler, StyleSheet, Text, View } from "react-native";
import PlaceOrder from './PlaceOrderContents'
import FindRiderComponent from "../../templates/FindRiderComponent";
import { colors, moderateScale, sizes, spacing, text, verticalScale } from "../../../app/constants/theme";
import { useEffect, useRef } from "react";
import * as keychain from 'react-native-keychain';
import { ParcelElement } from "../../navigations/ParcelNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import DefaultHeader from "../../common/DefaultHeader";
import Header from "../../common/Header";
import HeaderPlain from "../../HeaderPlain";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setCoupons } from "../../../app/redux/reducers/transactionOrder";

export default function ReviewOrder({ route }: { route: any }) {
  const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
  const coupons_data: any = useSelector((state: RootState) => state.transactionOrder.coupons);
  const Price: any = useSelector((state: RootState) => state.transactionOrder.Price);
  const DiscountedPrice: any = useSelector((state: RootState) => state.transactionOrder.discountedPrice);

  const pickupAddress: any = useSelector((state: RootState) => state.transactionOrder.pickupAddress);
  const dropoffAddress: any = useSelector((state: RootState) => state.transactionOrder.dropoffAddress);
  const totalAmount: any = useSelector((state: RootState) => state.transactionOrder.totalAmount);
  const isForm: any = useSelector((state: RootState) => state.transactionOrder.isForm);
  const tip: any = useSelector((state: RootState) => state.transactionOrder.tip);

  const usedispatch = useDispatch<AppDispatch>();

  console.log("\n\n", coupons_data);
  
  const discardCoupon = () => {
    usedispatch(setCoupons(false))
    navigationParcel.navigate('Parcel')
  }

  const discardModal = () => {
    navigationParcel.navigate("ConfirmationModal", {message:"Are you sure do you want to discard ?", yesFunction:discardCoupon})
  }

  useEffect(() => {
    const backAction = () => {
      discardModal()
      return true;
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction)

    return () => backHandler.remove()
  },[])

  return (
    <View style={{ }}>
      {/* <StatusBar hidden={false} /> */}
      <View style={{height:"6%"}}>
        <HeaderPlain title={"Booking Details"} back_button={true} back_function={coupons_data ? discardModal : () =>  navigationParcel.navigate('Parcel')} />
      </View>
      {/* <View style={[styles.center, { height: "100%" }]}> */}
      <View style={[ { height: "91%" }]}>
          {/* Place order content */}
          <PlaceOrder
            pickupAddress={pickupAddress}
            dropoffAddress={dropoffAddress}
            totalAmount={totalAmount
              ? totalAmount
              : tip
                ? tip.toFixed(2)
                : '0.00'
            }
          />
      </View>
      <View
        style={{
          height:'8%',
          width: '90%',
          marginHorizontal: spacing.m,
          position: 'absolute',
          bottom: 10,
          // zIndex: isVisible ? -1 : 1
        }}>
        <View
          style={{
            marginHorizontal: spacing.m,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[text.smallPlus, styles.priceTitle]}>Total Delivery Fee:</Text>
          <Text style={[text.mediumLarge, styles.priceText]}>Php {coupons_data ? DiscountedPrice: Price}</Text>
          {/* <Text style={[text.mediumLarge, styles.priceText]}>{`Php ${totalAmount
            ? totalAmount
            : tip
              ? tip.toFixed(2)
              : '0.00'
            }`}</Text> */}
        </View>
        <FindRiderComponent
          btnName="Place your Order"
          value={true}
          toggle={() => navigationParcel.navigate('ReviewOrder')}
          data={isForm}
        />
      </View>
      {/* </Modal> */}
    </View>
  )
}

const styles = StyleSheet.create({
  footerParcel: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.light,
    height: 140,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    elevation: 5,
    // padding: spacing.l,
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.s,
  },
  center: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.light,
  },
  priceTitle: {
    fontWeight: '400',
    color: colors.black,
    marginTop: spacing.s,
  },
  priceText: {
    fontWeight: '700',
    color: colors.black,
    position: 'absolute',
    right: 10,
  },
  footerText: {
    fontWeight: '400',
    fontSize: sizes.body,
    color: colors.black,
  },
  imageItem: {
    height: 30,
    width: 30,
    margin: spacing.s,
    resizeMode: 'cover',
  },
  footerPrice: {
    fontWeight: '700',
    fontSize: sizes.h2,
    color: colors.black,
    position: 'absolute',
    right: 10,
  },
  imageCover: {
    resizeMode: 'cover',
    flex: 1,
  },
  parcelHeader: {
    padding: moderateScale(8),
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: colors.mustard,
  },
  pickUpform: {
    height: 'auto',
    paddingHorizontal: spacing.s,
    paddingTop: spacing.m,
    backgroundColor: colors.light,
    marginVertical: spacing.s,
    borderRadius: sizes.radius,
  },
  pickUpImage: {
    height: verticalScale(65),
    aspectRatio: 1 / 6,
    resizeMode: 'stretch',
  },
  pickUpTitle: {
    fontWeight: '700',
    color: colors.black,
  },
  pickUpDescription: {
    fontWeight: '500',
    fontSize: sizes.body,
    color: colors.grayText,
  },
  Divider: {
    width: '100%',
    borderWidth: 0.1,
    margin: spacing.s,
    alignSelf: 'center',
  },
  subDivider: {
    margin: spacing.s,
    width: '100%',
    left: -20,
    borderWidth: 0.1,
  },
  selectVehicleForm: {
    height: verticalScale(125),
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    backgroundColor: colors.light,
    borderRadius: sizes.radius,
  },
  selectVehicleTitle: {
    fontWeight: '700',
    color: colors.black,
  },
  additionalServiceForm: {
    height: 'auto',
    paddingBottom: spacing.m,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    elevation: 5,
    backgroundColor: colors.light,
    marginTop: spacing.s,
    borderRadius: sizes.radius,
  },
  additionalServiceTitle: {
    fontWeight: '700',
    color: colors.black,
  },
  additionalServiceDescription: {
    fontWeight: '400',
    color: colors.grayText,
  },
  additionalSerBorder: {
    borderWidth: 1,
    borderColor: colors.mustard,
    height: 45,
    borderRadius: sizes.small,
    padding: spacing.s,
    marginTop: spacing.s,
    flexDirection: 'row',
  },
  typeofPaymentForm: {
    height: verticalScale(100),
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    elevation: 5,
    backgroundColor: colors.light,
    marginTop: spacing.s,
    borderRadius: sizes.radius,
  },
});
