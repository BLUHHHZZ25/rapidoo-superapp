import { Image, Text, TouchableOpacity, View } from "react-native"
import { colors, text } from "../../../app/constants/theme"
import { Icon } from "@rneui/themed"
import Navigation from "../../navigations/Navigation"
import { SignUpElement } from "../../navigations/SignupNavigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { HistoryElement } from "../../navigations/HistoryNavigation"

type Props = {
    route: any
}

export default function ViewImage({ route }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<HistoryElement>>();
    const { imageValue } = route.params
    return (
        <View style={{ height:"100%", width:'100%', backgroundColor:colors.black2}}>
            <View style={{justifyContent:'center', marginTop:"10%"}}>
                <Image style={{ width: "95%", height: "95%", alignSelf: 'center' }} source={{ uri: imageValue }} />
                {/* <Text style={[text.mediumLarge,{position:'absolute',color:colors.light,top:20, left:20}]}>X</Text> */}
                <TouchableOpacity onPress={() =>  navigation.goBack()} style={[{position:'absolute',top:30, right:20}]}>
                    <Icon type="ionicon" size={25} name={"close"} color={colors.black} backgroundColor={colors.light} borderRadius={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}  