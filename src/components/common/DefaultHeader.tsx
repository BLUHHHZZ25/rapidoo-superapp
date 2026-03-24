import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { colors,spacing, text, sizes, verticalScale,moderateScale,horizontalScale,shadow } from '../../app/constants/theme';
import { Icon } from "@rneui/themed";

type Props = {
    titleName: string;
    onPress: () => void; 
}

export default function DefaultHeader({titleName,onPress}:Props) {

    return (
        <>
            <View style={[styles.container, shadow.dark]}>
                <TouchableOpacity style={styles.iconSpace} onPress={onPress}>
                    <Icon type="ionicon" name="arrow-back-outline" />
                </TouchableOpacity>
                <Text style={[text.medium,styles.headerText]}>
                    {titleName}
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(55),
        width: '100%',
        backgroundColor: colors.light,
        flexDirection: 'row',
        elevation:5,
        // marginTop:"5%"
    },
    headerText: {
        fontWeight: '700',
        color: colors.black,
        alignSelf:'center',
        marginHorizontal:spacing.s
    },
    iconSpace:{
        alignSelf:'center',
        marginHorizontal:spacing.m
    }
})