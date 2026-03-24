import * as React from 'react';
import { KeyboardType, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
// import { colors, verticalScale } from '../constants/theme';
import { colors, spacing, text, verticalScale } from '../../app/constants/theme';
import { View } from 'react-native';

type InputProps = {
    InputLabel: string;
    keyboardType: KeyboardType;
    secureTextEntry: boolean;
    Editable: boolean;
    Value: string
    onChangeText: (value: any) => void
}

export default function InputTextNumber({ InputLabel, keyboardType, secureTextEntry, Editable, Value, onChangeText }: InputProps) {

    return (
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{position:'absolute', alignSelf:'center', zIndex:1, paddingHorizontal:spacing.m, paddingTop:spacing.s, }}>
                <Text style={[text.smallPlus,{color:colors.grayText}]}>+63</Text>
            </View>
            <TextInput style={[text.smallPlus, styles.inputText,{alignSelf:'center'}]}
                label={InputLabel}
                value={Value}
                mode='outlined'
                secureTextEntry={secureTextEntry}
                editable={true}
                maxLength={10}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                theme={{ colors: { primary: colors.mustard }, roundness: 20 }}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    inputText: {
        flex:1,
        backgroundColor: colors.white,
        paddingLeft:spacing.l + 14
        // height: verticalScale(48),
    },

})