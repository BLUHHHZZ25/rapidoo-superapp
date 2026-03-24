import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors, sizes, spacing, text } from '../../app/constants/theme';
//import { black } from 'react-native-paper/lib/typescript/styles/colors';


type BtnProps = {
  btnTitle : String;
  onPress: () => void;
  disable: boolean;
}


const OrangeButton = ({btnTitle, onPress, disable}:BtnProps) => (
  <Button
    mode="contained"
    disabled={disable}
    labelStyle={[styles.buttonText, text.medium]}
    uppercase={false}
    style={[styles.buttonStyle, disable && styles.disabledButtonStyle]}
    onPress={onPress}
    
  >
    {btnTitle}
  </Button>
);

const CancelButton = ({btnTitle, onPress, disable}:BtnProps) => (
  <Button
    mode="contained"
    disabled={disable}
    labelStyle={[styles.buttonText, text.medium]}
    uppercase={false}
    style={[styles.cancelStyle, disable && styles.disabledButtonStyle]}
    onPress={onPress}
    
  >
    {btnTitle}
  </Button>
);

export default OrangeButton
export {CancelButton};


const styles = StyleSheet.create({
  buttonStyle:{
      height: 50,
      backgroundColor: colors.mustard,
      borderRadius:15,
      justifyContent:'center',
      width:'90%',
      alignSelf:'center'
  },
  cancelStyle:{
    height: 45,
    backgroundColor: colors.red,
    borderRadius:15,
    justifyContent:'center',
    width:'90%',
    alignSelf:'center',
},
  buttonText:{
    verticalAlign:'middle',
    fontWeight: 'bold'
  },
  disabledButtonStyle: {
    backgroundColor: colors.gray, // Adjust to your desired gray color
  },
})