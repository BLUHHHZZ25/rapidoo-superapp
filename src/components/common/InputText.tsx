import * as React from 'react';
import { Dimensions, KeyboardType, KeyboardTypeOptions, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { colors, spacing, text, verticalScale } from '../constants/theme';
import { colors, spacing, text, verticalScale } from '../../app/constants/theme';
import { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { text } from '@fortawesome/fontawesome-svg-core';

type InputProps = {
  InputLabel: string;
  Placeholder: string;
  keyboardType: KeyboardType;
  secureTextEntry: boolean;
  Editable: boolean;
  Value: string;
  isPhoneNumber:boolean
  maxLength: number;
  onChangeText: (value: any) => void
}

const fullHeight = Dimensions.get('window').height;
const width = 50;

export default function InputText({ InputLabel, Placeholder, onChangeText, keyboardType = 'default', secureTextEntry, Value, Editable, isPhoneNumber , maxLength}: InputProps) {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const [borderColor, setBorderColor] = useState(colors.inputBorder);

  // const handleChange = (e: string) => {
  //     setState({ ...state, [fieldName]: e });
  // }
  return (
    <View>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"> */}
      <View style={{
        height: 70,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View
          style={{
            width: "100%",
            height:48,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: colors.light,
          }}
        >
          <TextInput
            onChangeText={onChangeText}
            placeholder={Placeholder}
            value={Value}
            editable={Editable}
            maxLength={maxLength}
            style={[text.normal, {
              fontSize:12,
              width: '100%',
              zIndex: 10,
              paddingHorizontal: spacing.m,
              paddingRight: spacing.xl + 10,
              paddingLeft: isPhoneNumber ? spacing.xl :spacing.m,
              color:colors.grayText
              
            }]}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry ? isShowPassword : false}
            onFocus={() => setBorderColor(colors.mustard)}
            onBlur={() => setBorderColor('#ccc')}
          />
          <Text style={[text.small, {
            position: 'absolute',
            backgroundColor: colors.light,
            zIndex: 100,
            left: '4%',
            paddingHorizontal: spacing.s,
            marginStart: 10,
            top: '-24%',
            color: colors.black,
            fontWeight: '700'
          }]}>
            {InputLabel}
          </Text>
          {
            isPhoneNumber && <View
              style={{
                position: 'absolute',
                left: 10
              }}
            >
              <Text>+63</Text>
            </View>
          }
          {
            // secureTextEntry && (
            //   isShowPassword ? <Pressable style={{
            //     position: 'absolute',
            //     right: spacing.l,
            //     zIndex: 20
            //   }} onPress={() => setIsShowPassword(false)}><FontAwesomeIcon icon={faEyeSlash} size={20} color="#000" /></Pressable> : <Pressable style={{
            //     position: 'absolute',
            //     right: spacing.l,
            //     zIndex: 20
            //   }} onPress={() => setIsShowPassword(true)}><FontAwesomeIcon icon={faEye} size={20} color={colors.mustard} /></Pressable>
            // )
          }
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};


const styles = StyleSheet.create({
  inputText: {
    backgroundColor: colors.light,
    // height: verticalScale(48),
  },

})