import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;


export const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;
export const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;


export const colors = {
  primary: '#070f18',
  gray: '#E5E4E2',
  grayTwo: "#C0C0C0",
  lightGray: '#b2b2b2',
  light: '#fbfbfb',
  light_lace: '#f8f2ed',
  white: '#fff',
  black: '#030104',
  black2: '#252525',
  red: '#FF5733',
  green:'#3C8932',
  mustard:'#FFAC13',
  mustardOpacity:'#FDE4B5',
  // mustardTransaction: '#FDE4B5',
  redOpacity:'#FF573340',
  blackText: "#252525",
  // greenOpacity:'#3C893240',
  greenOpacity: '#4BAE4F50',
  grayOpacity: "#67676710",
  grayOpacityOne: "#67676740",
  grayText: "#676767",
  orange: "#F78A1A",
  violet: "#8C57D9",
  violet_step: "#71286F",
  yellow:"#FFC300",
  blue:"#5C5CFF",
  inputGray: "#676767",
  lightGreen: "#59DAA4",
  inputBorder: "rgba(197,198,198,255)",
  skyblue: '#669BD9',
  skyblue_opacity:'#DEEEFA',
  lighterGray: "#F4F4F4",
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  small:10,
  body: 14,
  Big: moderateScale(45),
  Large: moderateScale(28),
  Normal: moderateScale(17),
  radius: 16,
  sradius:10,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
  xxl: 75,
  marginTop: 60,
};

export const text = {
  extra_small:{
    fontSize: moderateScale(10),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  small:{
    fontSize: moderateScale(11),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  smallPlus:{
    fontSize: moderateScale(13),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  normal:{
    fontSize: moderateScale(15),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  medium:{
    fontSize: moderateScale(17),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  mediumPlus:{
    fontSize: moderateScale(20),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  mediumLarge:{
    fontSize: moderateScale(22),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  large:{
    fontSize: moderateScale(28),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  largePlus:{
    fontSize: moderateScale(32),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  extraL:{
    fontSize: moderateScale(45),
    // fontFamily: "opensans"
    // fontFamily: "montserrat"
    // fontFamily: "Helvetica"
  },
  title:{

  }
}
