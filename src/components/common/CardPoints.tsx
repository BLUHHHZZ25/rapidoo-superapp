import { ScreenWidth, Text } from "@rneui/base";
import { StyleSheet, View } from "react-native";
import { colors,spacing, text, sizes, verticalScale,horizontalScale, shadow, } from "../../app/constants/theme";
import { Icon } from "@rneui/themed";


const CARD_WIDTH = sizes.width / 2.2;
const CARD_HEIGHT = 70;

type Props = {
    title: string;
    iconName: string;
    amount: string;
}

export default function CardPoints({title,iconName, amount}:Props) {

    return (
        <View style={styles.container}>
            <View style={styles.containerStatus}>
                <Text style={[text.small,styles.statusText]}>soon</Text>
            </View>
            <View style={shadow.light}>
                <View style={styles.containerText}>
                    <View style={{alignSelf:'center'}}>
                        <Text style={[text.normal,styles.titleStyle]}>{title}</Text>
                        <Text style={[text.normal,styles.amountStyle]}>P {amount}</Text>
                    </View>
                    <View style={styles.iconDirection}>
                        <Icon name={iconName} color={colors.grayText} type="ionicon" size={20} />
                    </View>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: spacing.l,
        marginLeft: spacing.s
    },
    containerText: {
        flexDirection: 'row',
        backgroundColor: colors.gray,
        opacity: 50,
        padding: 10,
        borderRadius: sizes.sradius,
        width: CARD_WIDTH,
        height: CARD_HEIGHT

    },
    titleStyle: {
        color: colors.grayText,
        fontWeight: '700',
    },
    amountStyle: {
        fontWeight: '600',
        marginLeft: 5,
        flexDirection: 'column'
    },
    containerStatus: {
        backgroundColor: colors.red,
        width: 'auto',
        height: 'auto',
        alignContent: 'center',
        borderRadius: sizes.radius,
        paddingHorizontal:spacing.s,
        paddingVertical:2,
        position: 'absolute',
        top: CARD_HEIGHT - 80,
        left: 10,
        zIndex: 1
    },
    statusText: {
        color: colors.white,
        alignSelf: 'center',
    },
    iconDirection: {
        position:'absolute',
        top:28,
        right: 10

    }
})