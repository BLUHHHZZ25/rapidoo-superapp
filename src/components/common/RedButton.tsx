import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { colors, sizes, spacing, text } from '../../app/constants/theme';
import { Icon } from '@rneui/themed';
//import { black } from 'react-native-paper/lib/typescript/styles/colors';


type BtnProps = {
  btnTitle : String;
  onPress: () => void;
  disable: boolean;
}


const RedButton = ({btnTitle, onPress, disable}:BtnProps) => (
  <Button
    mode="contained"
    disabled={disable}
    labelStyle={[styles.buttonText, text.medium]}
    uppercase={false}
    style={[styles.buttonStyle, disable && styles.disabledButtonStyle]}
    onPress={onPress}
  >
    <View style={{alignSelf:'center'}}>
      <Icon type='ionicon' name='logo-google' color={colors.light} size={20} />
    </View>
    <View style={{alignSelf:'center'}}>
      <Text style={[{color:colors.light},text.normal]}> {btnTitle}</Text>
    </View>
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

export default RedButton
export {CancelButton};


const styles = StyleSheet.create({
  buttonStyle:{
      height: 50,
      backgroundColor: colors.red,
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