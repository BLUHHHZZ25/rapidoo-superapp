import { Text,TouchableOpacity,View } from "react-native";
import { colors, spacing, text } from "../../app/constants/theme";
import { Icon } from "@rneui/themed";

type Props = {
    title: string;
    onPress: () => void
}


export default function BackHeader({title, onPress}:Props){

    return(
        <>
        <View style={{marginTop:spacing.m,elevation:5, marginLeft:spacing.m, flexDirection:'row',marginBottom:spacing.s+3}}>
            <TouchableOpacity onPress={onPress}>
                <Icon type="ionicon" name="arrow-back-outline" size={30} style={{alignSelf:"center"}}/>
            </TouchableOpacity>
            <Text style={[text.mediumPlus,{color:colors.black, fontWeight:'600', marginLeft:spacing.m}]}>{title}</Text>
        </View>
        </>
    )
}