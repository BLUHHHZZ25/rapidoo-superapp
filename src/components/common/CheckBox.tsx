import { CheckBox } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cone_Background from './Cone_Background';
import { colors, moderateScale, sizes, spacing, text, verticalScale } from '../../app/constants/theme';

type Props = {
  onPress : () => void;
  checked: boolean;
  chekcboxName: string;
}

export default function CheckBoxComponent({onPress, checked, chekcboxName}: Props) {

    return (
      <View>
        <CheckBox
          checked={checked}
          title={chekcboxName}
          onPress={onPress}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon={'checkbox-blank-outline'}
          containerStyle={{backgroundColor:'transparent'}}
          uncheckedColor={colors.grayText}
          checkedColor= {colors.mustard}
        />
      </View> 
    );
  }



  const style = StyleSheet.create({
    checkBox:{
        backgroundColor:'black',
    }
  })