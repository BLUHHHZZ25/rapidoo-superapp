import { Button } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors, spacing, text, sizes, verticalScale, horizontalScale } from "../../app/constants/theme";
import { SlideOutLeft } from "react-native-reanimated";
import { Icon } from "@rneui/themed";
import { View } from "react-native";
import React from "react";


type Props = {
    Onpress: () => void,

}

export default function BackButton({ Onpress }: Props) {

    return (
        <>
            <TouchableOpacity onPress={Onpress} style={styles.btnStyle}>
                <Icon name="arrow-back" type="ionicon" color={colors.black} size={22} />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 100,
        backgroundColor:colors.light,
        justifyContent:'center',
        width:horizontalScale(40),
        aspectRatio:1/1,
        elevation:5,
        marginLeft:20
        
    }
})