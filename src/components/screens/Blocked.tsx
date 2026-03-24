import { Image, Text } from "react-native";
import { View } from "react-native";
import { colors, spacing, text } from "../../app/constants/theme";
import OrangeButton from "../common/OrangeButton";
import Navigation, { SharedElement } from "../navigations/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


export default function Blocked() {

    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
                <Image source={require('../../app/assets/img/blocked.png')} style={{ height: 280, aspectRatio: 1 / 1 }} />
                <Text style={[text.large, { fontWeight: '800', color: colors.mustard, marginVertical: spacing.s }]}>Your Account is Blocked</Text>
                <View style={{ justifyContent: 'center', marginHorizontal: spacing.l }}>
                    <Text style={[text.normal, { color: colors.grayText, textAlign: 'center' }]}>We regret to inform you that your account has been temporarily blocked due to suspicious activity. To ensure the security of your account, we recommend you to contact our service email: email@gmail.com</Text>
                </View>
                <View style={{width:"100%", position:'absolute', bottom:20}}>
                    <OrangeButton btnTitle={"Go Home"} onPress={ () =>{  navigation.navigate('Login')} } disable={false}/>
                </View>
            </View>
        </>
    )
}