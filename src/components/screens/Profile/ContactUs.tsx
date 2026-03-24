import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SharedElement } from "../../navigations/Navigation";
import { colors,spacing,text,sizes,verticalScale } from "../../../app/constants/theme";
import { ScrollView } from "react-native";
// import ButtonOrange from "../../common/ButtonOrange";
import OrangeButton from "../../common/OrangeButton";
import BackButton from "../../common/BackButton";
import InputOrange from "../../common/InputOrange";





export default function ContactUs() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    return (
        <>
            <View style={styles.referralBg}>
                <BackButton Onpress={() => navigation.goBack()} />
                <View style={{ flexDirection: 'row', marginTop: spacing.m }}>
                    <View style={{ width: "70%", justifyContent: 'center' }}>
                        <Text style={[text.mediumPlus, styles.titleHeader]}>Contact Us</Text>
                        <Text style={[text.small, styles.descriptionHeader]}>Have a question, feedback, or need assistance? We're here to help! Contact us anytime through the "Contact Us" feature. Our dedicated support team is ready to assist you and provide the information you need. Your satisfaction is our priority, and we're just a message away. Reach out and let us know how we can make your experience even better. Your input matters to us</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={require('../../../app/assets/img/contactus.png')} style={styles.imageHeader} />
                    </View>
                </View>
            </View>
            <View style={styles.shareCodebar}>
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <Text style={[text.medium, styles.sharelinkTitle]}>Have Some Questions?</Text>
                </View>
            </View>
            <ScrollView style={styles.referContent}>
                <View>
                    <Text style={[text.medium, styles.itemHeader]}>
                        Account Name?
                    </Text>
                    <View style={{ marginVertical: spacing.s }}>
                        <InputOrange name={"Account Name?"} />
                    </View>
                </View>
                <View>
                    <Text style={[text.medium, styles.itemHeader]}>
                        Email?
                    </Text>
                    <View style={{ marginVertical: spacing.s }}>
                        <InputOrange name="Input your Email" />
                    </View>
                </View>
                <View style={{ marginVertical: spacing.s }}>
                    <Text style={[text.medium, styles.itemHeader]}>
                        Contact Number?
                    </Text>
                    <View style={{ marginVertical: spacing.s }}>
                        <InputOrange name="Input your Contact Number" />
                    </View>
                </View>
                <View>
                    <Text style={[text.medium, styles.itemHeader]}>
                        Concern?
                    </Text>
                    <View style={{ marginVertical: spacing.s }}>
                        <TextInput editable
                            multiline
                            numberOfLines={4}
                            maxLength={140}
                            style={{ padding: 10, width:"94%", borderWidth: 1.5, borderColor: colors.mustard }} placeholder="Paste Referral Link here" />
                    </View>
                </View>
                <OrangeButton btnTitle={"Submit"} onPress={() =>{}} disable={false}/>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    containre: {

    },
    referralBg: {
        height: 250,
        backgroundColor: "#FFAC13",
        justifyContent: 'center',
    },
    titleHeader: {
        color: colors.light,
        fontWeight: '700',
        marginHorizontal: spacing.m
    },
    descriptionHeader: {
        color: colors.light,
        fontWeight: '500',
        marginHorizontal: spacing.m
    },
    imageHeader: {
        resizeMode: 'cover',
        aspectRatio: 1 / 1,
        height: verticalScale(110)
    },
    shareCodebar: {
        borderRadius: 40,
        flexDirection: 'row',
        marginHorizontal: spacing.l,
        height: verticalScale(70),
        justifyContent: 'center',
        width: '90%',
        top: 250 / 8 - 60,
        backgroundColor: colors.light,
        zIndex: 0,
        elevation: 5
    },
    sharelinkTitle: {
        fontWeight: '700',
        alignSelf: 'center'
    },
    sharelinkDescription: {
        fontSize: sizes.body,
        fontWeight: '400',
        color: 'blue'

    },
    referContent: {
        paddingHorizontal:spacing.m,
        height: 'auto'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: colors.mustard,
        padding: 10,
    },
    itemHeader: {
        fontWeight: '700',
        color: colors.black,
    },
    pointTitle: {
        fontWeight: '700',
        fontSize: sizes.body,

    },
    pointDescription: {
        fontWeight: '400',

    },
    pointersSpace: {
        marginVertical: spacing.s
    }
})