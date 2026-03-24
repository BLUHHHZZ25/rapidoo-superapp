import { StyleSheet } from 'react-native';
import { colors, sizes, spacing } from '../../../../app/constants/theme';


const styles = StyleSheet.create({
    container: {
      // flex:1,
      bottom: 0,
      backgroundColor: colors.light,
      // height: '100%',
      // width: '100%',
      elevation: 5,
      paddingHorizontal: spacing.l,
      borderTopLeftRadius: 20,
      borderTopRightRadius:20
    },
    // trackStatusList: {
    //   flexDirection: 'row',
    //   alignSelf: 'center',
    // },
    statusColumns: {
      marginHorizontal: spacing.m,
      marginVertical: spacing.s,
      alignItems: 'center',
    },
    pickUpText: {
      fontWeight: '500',
      fontSize: sizes.body,
      color: colors.black,
      marginBottom: spacing.s,
      marginTop: spacing.s,
    },
    contactText: {
      fontWeight: '500',
      fontSize: sizes.body,
      color: colors.black,
      marginTop: spacing.s,
      marginBottom: spacing.s,
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
      padding: spacing.s,
      width: '50%',
      alignSelf: 'center',
      borderRadius: 100,
      marginTop: spacing.l,
      backgroundColor: colors.mustard,
    },
    Divider: {
      width: '100%',
      borderWidth: 0.1,
      alignSelf: 'center',
    },
    profileSpacing: {
      flexDirection: 'row',
      paddingVertical: spacing.m,
      paddingHorizontal: spacing.m,
      justifyContent: 'space-around',
    },
    profileImage: {
      resizeMode: 'cover',
      height: 50,
      width: 50,
      borderRadius: 100,
    },
    nameTxt: {
      fontWeight: '700',
      color: colors.black,
    },
    riderDetails: {
      flexDirection: 'column',
      marginLeft: spacing.m,
      alignSelf: 'center',
    },
    additionalSerBorder: {
      backgroundColor: colors.mustardOpacity,
      height: 30,
      width: '25%',
      marginHorizontal: spacing.m,
      borderRadius: 2,
      paddingHorizontal: spacing.s,
      flexDirection: 'row',
    },
    iconSpacingFlag: {
      marginHorizontal: spacing.s,
      marginTop: 9,
      flexDirection: 'row',
    },
    inputText: {
      width: '100%',
      backgroundColor: 'transparent',
    },
    contactIcon: {
      padding: spacing.s - 1,
      backgroundColor: colors.light,
      height: 40,
      width: 40,
      borderRadius: 7,
      // elevation: 5,
      marginHorizontal: spacing.s - 2,
    },
    statusBorder: {
      // backgroundColor: colors.mustardOpacity,
      padding: spacing.s,
      height: 60,
      width: '80%',
      borderRadius: sizes.sradius,
      flexDirection: 'row',
    },
    statusBorderSpacing: {
      marginHorizontal: spacing.s,
      top: 10,
    },
    subTitle: {
      marginVertical: spacing.s,
      fontWeight: '700',
      color: colors.black,
    },
    priceText: {
      marginVertical: spacing.s,
      fontWeight: '700',
      color: colors.black,
      alignContent: 'space-between',
    },
    priceTextAmount: {
      marginVertical: spacing.s,
      fontWeight: '700',
      color: colors.mustard,
      right: 5,
      position: 'absolute',
    },
    descriptionTxt: {
      marginVertical: spacing.s,
      fontWeight: '400',
      color: colors.black2,
    },
    deductionDescription: {
      fontWeight: '600',
      marginBottom: spacing.s,
      textAlign: 'right',
      color: colors.grayText,
    },
    noteRider: {
      backgroundColor: colors.mustardOpacity,
      borderRadius: sizes.radius,
      paddingHorizontal: spacing.m,
      height: 80,
      marginVertical: spacing.s,
      marginBottom: spacing.m,
    },
    descriptionCashSpace: {
      marginVertical: spacing.s,
      width: '50%',
    },
    statusTitle: {
      fontWeight: '700',
      color: colors.black,
    },
    statusDescription: {
      fontWeight: '400',
      color: colors.grayText,
    },
    iconStatus: {
      width: 55,
      height: 55,
      opacity: 0.35,
    },
    iconActive: {
      width: 55,
      height: 55,
      opacity: 1,
    },
    // container: {
    //   flex: 1,
    //   padding: 20,
    // },
    trackStatusList: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  
  });

export default styles