import * as React from 'react';
import { KeyboardType, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
// import { colors, verticalScale } from '../constants/theme';
import { colors, text, verticalScale } from '../../app/constants/theme';

type InputProps = {
  InputLabel: string; 
  keyboardType: KeyboardType;
  secureTextEntry: boolean;
  Editable: boolean;
  Value: string
  onChangeText: (value:any) => void
}

export default function InputOrange({InputLabel, keyboardType, secureTextEntry,Editable, Value, onChangeText}:InputProps) {

  return (
    <>
    <TextInput style={[text.normal,styles.inputText]}
      label = {InputLabel}
      value={Value}
      mode='outlined'
      secureTextEntry={secureTextEntry}
      editable={true}
      maxLength={50}
      underlineColorAndroid={'rgba(0,0,0,0)'}
      theme={{ colors: { primary: 'black'}, roundness:20}}
      outlineStyle={{borderColor:colors.mustard, borderWidth:1.8}}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
    />
    </>
  );
};


const styles = StyleSheet.create({
    inputText:{
        backgroundColor: colors.white,
        width:"90%",
        // height: verticalScale(48),
    },

})