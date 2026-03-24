import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { colors, moderateScale, sizes, spacing, text, verticalScale } from "../../../app/constants/theme";
import { Text } from "react-native";
import { G } from "react-native-svg";
import { Button } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { lightning, logo, referral } from "../../../app/assets/img/images";
import InputOrange from "../../common/InputOrange";
import { SharedElement } from "../../navigations/Navigation";
import BackButton from "../../common/BackButton";


const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function Points() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    console.log(wWidth);
    console.log(wHeight);
    return (
        <View style={{ width: '100%', height: "100%" }}>
            {/* <LinearGradient colors={[colors.orange, colors.mustard, colors.orange]} style={[stlyes.logoContainer]}>
                <Image style={[stlyes.logoStyle, { justifyContent: 'center', alignSelf: 'center' }]} source={{ uri: (logo) }} />
            </LinearGradient> */}
            <View style={{ backgroundColor: colors.mustard, flexDirection: 'row', paddingBottom: spacing.xl, paddingTop: spacing.xxl }}>
                <View style={{ position: 'absolute', top: 20, left: 20 }}>
                    <BackButton Onpress={() => navigation.goBack()} />
                </View>
                <View style={{ marginHorizontal: spacing.m }}>
                    <Text style={[text.mediumPlus, { color: colors.light, fontWeight: '700', marginVertical: spacing.s }]}>Lightning Points</Text>
                    <Text style={[text.small, { color: colors.light, width: moderateScale(200), textAlign: 'justify' }]}>Lightning Points on the Rapidoo Superapp are instant rewards for using the app. Earn points by shopping, referring friends, and more. Redeem for discounts, and exclusive deals. It's a fun way to earn and enjoy benefits instantly.</Text>
                </View>
                <View style={{ alignSelf: 'center', backgroundColor: colors.white, padding: spacing.s, borderRadius: 100 }}>
                    <Image source={{ uri: (lightning) }} style={{ aspectRatio: 1 / 1, height: verticalScale(90) }} />
                </View>
            </View>
            <View style={{ width: "90%", paddingHorizontal: spacing.l, backgroundColor: colors.light, justifyContent: 'space-between', flexDirection: 'row', height: "8%", borderRadius: 50, elevation: 5, position: 'absolute', top: verticalScale(210), alignSelf: 'center' }}>
                <View style={{ alignSelf: 'center' }}>
                    <Text style={[text.mediumLarge, { fontWeight: '600', color: colors.grayText }]}>Current Points</Text>
                    <Text style={[text.normal, { color: colors.black }]}>500 Points</Text>
                </View>
            </View>
            <View style={{ width: "100%", marginTop: verticalScale(66), alignContent: 'center', alignSelf: 'center' }}>
            </View>
            <ScrollView style={{ width: '100%', height: '50%', marginHorizontal: spacing.l, marginTop: spacing.s }}>
                <View>
                    <View>
                        <Text style={[text.medium, { color: colors.black, fontWeight: '700' }]}>What is Lightning Points:</Text>
                        <Text style={[text.smallPlus, stlyes.pointerDes, { textAlign: 'justify' }]}>
                            "Lightning Points" on the Rapidoo Superapp are a unique rewards system designed to offer users instant gratification and benefits for their engagement and activities within the app ecosystem.
                        </Text>
                    </View>
                    <View style={{ marginTop: spacing.m }}>
                        <Text style={[text.medium, { color: colors.black, fontWeight: '700' }]}>How to earn Rapidoo Points?</Text>
                        <Text style={[text.smallPlus, stlyes.pointerDes, { textAlign: 'justify' }]}>
                            To earn Rapidoo Lightning Points, users of the app can engage in various activities within the Rapidoo Superapp ecosystem. Here's how they can earn points:
                        </Text>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.smallPlus, stlyes.pointerDes]}>
                                <Text style={[text.normal, stlyes.pointerTxt]}>• Marketplace Transactions: </Text>
                                Kumita ng extra income sa pamamagitan ng pag-refer ng mga tao na magiging matagumpay na Rapidoo Riders. Mas maraming matagumpay na referral, mas maraming rewards.
                            </Text>
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.smallPlus, stlyes.pointerDes]}>
                                <Text style={[text.normal, stlyes.pointerTxt]}>• Parcel Delivery Transactions: </Text>
                                Users also earn Lightning Points for utilizing the Parcel Delivery service offered by Rapidoo. Whether they're sending or receiving parcels through the app, each delivery transaction earns users additional Lightning Points, encouraging them to take advantage of the convenient delivery options provided by Rapidoo.
                            </Text>
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.smallPlus, stlyes.pointerDes]}>
                                <Text style={[text.normal, stlyes.pointerTxt]}>• Referral Program: </Text>
                                Users can earn Lightning Points by referring friends to join the Rapidoo Superapp using a special Referral Code. When their friends sign up and engage with the app, both the referrer and the new user receive Lightning Points as a reward, incentivizing users to spread the word about Rapidoo and expand its user base.
                            </Text>
                        </View>
                        <View style={{ marginTop: spacing.s }}>
                            <Text style={[text.smallPlus, stlyes.pointerDes]}>
                                <Text style={[text.normal, stlyes.pointerTxt]}>• Utilizing Other Services: </Text>
                                Beyond Marketplace transactions and Parcel Delivery, users can earn Lightning Points by using the various other services offered within the Rapidoo Superapp. This may include activities such as bill payments, mobile recharge, ticket bookings, or any other services available through the app. Each interaction with these services contributes to the accumulation of Lightning Points, providing users with additional incentives to explore and utilize the diverse range of features offered by Rapidoo.
                            </Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const stlyes = StyleSheet.create({
    logoStyle: {
        width: wWidth / 1.7,
        height: wWidth / 4.7,
    },
    logoSmallStyle: {
        width: wWidth / 8.4,
        height: wWidth / 8.4,
    },
    logoContainer: {
        height: wWidth / 5.5,
        width: wWidth / 1,
        backgroundColor: colors.orange
    },
    bigTxt: {
        fontWeight: '500',
        fontSize: sizes.h3 + 1
    },
    normalTxt: {
        fontWeight: '400',
        fontSize: sizes.h3
    },
    smallNormalTxt: {
        fontWeight: '400',
    },
    smallTxt: {
        fontSize: sizes.body
    },
    smallerTxt: {
        fontSize: sizes.body - 2
    },
    pointerTxt: {
        color: colors.black,
        marginTop: spacing.s
    },
    pointerDes: {
        color: colors.grayText,
        width: "90%"
    }
})