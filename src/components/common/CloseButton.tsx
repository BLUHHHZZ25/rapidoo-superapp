import { Button } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors,spacing, text, sizes, verticalScale,moderateScale,horizontalScale,shadow } from '../../app/constants/theme';
import { SlideOutLeft } from "react-native-reanimated";
import { Icon } from "@rneui/themed";
import { View } from "react-native";


type Props = {
    Onpress: () => void,

}

export default function CloseButton({ Onpress }: Props) {

    return (
        <>
            <TouchableOpacity onPress={Onpress} style={styles.btnStyle}>
                <Icon name="close-outline" type="ionicon" color={colors.black} size={22} />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        borderRadius: 100,
        position:'absolute',
        backgroundColor:colors.light,
        padding:spacing.s,
        left:spacing.l,
        top:spacing.l,
        elevation:5,
        zIndex:1
    }
})