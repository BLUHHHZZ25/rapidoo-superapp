import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { colors, spacing, text, sizes, verticalScale, moderateScale, horizontalScale, shadow } from '../../app/constants/theme';
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

type Props = {
    title: string,
    backBtn: boolean,
    settingBtn: boolean,
    backFunc: () => void,
    settingFunc: () => void
}

export default function Header({ title, backBtn, settingBtn, backFunc }: Props) {

    return (
        <View style={{ flexDirection: 'row', justifyContent:'space-between', marginBottom:spacing.s, marginTop:spacing.l }}>
            <View style={{flexDirection:'row'}}>
                {
                    backBtn &&
                    <TouchableOpacity 
                        style={{ marginLeft: spacing.l, marginTop: spacing.l }}
                        onPress={backFunc}
                        >
                        <Icon type="ionicon" name="arrow-back-outline" size={30} />
                    </TouchableOpacity>
                }
                <Text style={[text.mediumLarge, styles.titleStyle, { marginLeft: spacing.l }]}>{title}</Text>
            </View>
            {
                settingBtn &&
                <TouchableOpacity style={{marginTop:spacing.m, marginRight:spacing.m}}>
                    <Icon type="ionicon" name="ellipsis-horizontal" size={45}  />
                </TouchableOpacity>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    titleStyle: {
        marginTop: spacing.l,
        color: colors.black,
        fontWeight: '700'
    }
})