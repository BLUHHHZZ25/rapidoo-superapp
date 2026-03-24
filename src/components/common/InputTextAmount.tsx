import * as React from 'react';
import { Dimensions, KeyboardType, KeyboardTypeOptions, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, spacing, text, verticalScale } from '../../app/constants/theme';
import { useState } from 'react';

type InputProps = {
  // InputLabel: string;
  keyboardType: KeyboardType;
  secureTextEntry: boolean;
  Editable: boolean;
  Value: string;
  isPhoneNumber:boolean
  Placeholder:string
  onChangeText: (value: any) => void
}

const fullHeight = Dimensions.get('window').height;
const width = 50;

export default function InputTextAmount({ onChangeText, keyboardType = 'default', secureTextEntry, Value, Editable, isPhoneNumber, Placeholder }: InputProps) {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const [borderColor, setBorderColor] = useState(colors.inputBorder);
  const [borderWidth, setBorderWidth] = useState(1);

  const formatAmount = (value: string) => {
    if (!value) return '';
  
    // Remove all non-numeric characters except for a single dot
    const cleaned = value.replace(/[^\d.]/g, '');
  
    // Split integer and decimal parts
    const [intPart, decimalPart] = cleaned.split('.');
  
    // Format integer part with commas
    const formattedInt = parseInt(intPart || '0', 10)
      .toLocaleString('en-US')
      .replace(/\.00$/, '');
  
    // Re-attach decimal (max 2 digits)
    if (decimalPart !== undefined) {
      return `${formattedInt}.${decimalPart.slice(0, 2)}`;
    }
  
    return formattedInt;
  };
  return (
    <SafeAreaView>
      <View style={{
        height: 70,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        }}
      >
        <View
            style={{
              width: "100%",
              borderStyle: 'solid',
              borderColor,
              borderWidth: 0,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              backgroundColor: colors.light,
              elevation: 5
            }}
        >
          <Text style={{
            position:'absolute', 
            left:16,
            color:colors.grayText
            }}
          >
            ₱
          </Text>
          <TextInput 
            onChangeText={onChangeText}
            value={formatAmount(Value)}
            editable={Editable}
            maxLength={7}
            style={[text.smallPlus, {
              width: '100%',
              zIndex: 10,
              paddingHorizontal: spacing.m,
              paddingRight: spacing.xl + 10,
              paddingLeft: 40,
              color:colors.black
            }]}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry ? isShowPassword : false}
            onFocus={() => {
              setBorderColor(colors.mustard);
              setBorderWidth(2);  // Increase border width on focus
            }}
            onBlur={() => {
              setBorderColor('#ccc');
              setBorderWidth(1);  // Reset border width on blur
            }}
            placeholder={Placeholder}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  inputText: {
    backgroundColor: colors.light,
  },

})