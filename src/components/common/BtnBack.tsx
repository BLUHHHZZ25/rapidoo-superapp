import Icon from "@rneui/themed/dist/Icon"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { colors, spacing,text } from "../../app/constants/theme"

type Props = {
    btnName: string,
    onPress: () => void
}

export default function BtnBack({ btnName, onPress }: Props) {

    return (
        <>
                <TouchableOpacity style={[styles.btnBack,{ flexDirection: 'row'}]} onPress={onPress}>
                    <View style={{alignSelf:'center'}}>
                        <Icon
                            name='chevron-back'
                            type='ionicon'
                            color='#fff'
                            size={30}
                        />
                    </View>
                    <View style={{alignSelf:'center'}}>
                        <Text style={[text.medium,styles.btnBackText]}>{btnName}</Text>
                    </View>
                </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btnBack: {
        marginTop: spacing.xl,
        marginLeft: spacing.m,
    },
    btnBackText: {
        fontWeight: "700",
        color: colors.light,
        textAlignVertical:'center'
    },
})