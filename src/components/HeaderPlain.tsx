import { Text, TouchableOpacity, View } from "react-native";
import { colors, spacing, text } from "../app/constants/theme";
import { Icon } from "@rneui/themed";

type props = {
    title: string
    back_button: boolean,
    back_function: () => void
}

export default function HeaderPlain({ title, back_button, back_function }: props) {

    return (
        <View style={{ width: "90%", marginTop: spacing.l, marginLeft: spacing.l, marginBottom: spacing.m, elevation:5}}>

            <View style={{ flexDirection:'row'}}>
                {
                    back_button &&
                    <TouchableOpacity onPress={back_function}>
                        <Icon type="ionicon" name="arrow-back-outline" size={30} style={{marginRight:spacing.l}} />
                    </TouchableOpacity>
                }

                <Text style={[text.mediumLarge, { color: colors.blackText, fontWeight: '700' }]}>
                    {title}
                </Text>
            </View>
        </View>
    )
}