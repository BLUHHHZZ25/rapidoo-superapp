import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, text, verticalScale, horizontalScale, sizes } from "../../app/constants/theme";

type Props ={
    Title: string;
    SecondText:string;
}

export default function BorderOrangeSmall({Title,SecondText}:Props) {

    return (
        <>
            <View style={styles.additionalSerBorder}>
                <View style={{alignSelf:'center'}}><Text style={[text.normal,{fontWeight: '500', color:colors.grayText}]}>{Title}</Text></View>
                <View style={{alignSelf:'center'}}><Text style={[text.normal,{fontWeight:'700', color:colors.grayText}]}>{SecondText}</Text></View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    additionalSerBorder: {
        borderWidth: 1,
        borderColor: colors.mustard,
        height: 45,
        borderRadius: sizes.small,
        padding: spacing.s,
        marginTop: spacing.s,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
})