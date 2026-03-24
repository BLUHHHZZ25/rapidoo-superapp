import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SharedElement } from "../../navigations/Navigation";
import { colors, spacing, text, sizes, verticalScale, } from "../../../app/constants/theme";
import { Icon, Input } from "@rneui/themed";
import { ScrollView } from "react-native";
import Pointers from "../../common/Pointers";
// import ButtonOrange from "../../common/ButtonOrange";
import OrangeButton from "../../common/OrangeButton";
import BackButton from "../../common/BackButton";
import { ProfileElement } from "../../navigations/ProfileNavigation";





export default function Referrals() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationProfile = useNavigation<NativeStackNavigationProp<ProfileElement>>();
    const navigationBack = () => {
        navigation.reset({
            index:0,
            routes: [{name: 'HomeNavigation',
                state:{
                    routes:[
                        {
                            name:'Home',
                            state:{
                                routes:[
                                    {
                                        name:'Profile'
                                    }
                                ]
                            }
                        }
                    ]
                }
            }],
        })
    }
    return (
        <>
            <View style={styles.referralBg}>
                <BackButton Onpress={navigationBack} />
                <View style={{flexDirection:'row', marginTop:spacing.m}}>
                    <View style={{ width: "55%", justifyContent: 'center', marginLeft:spacing.m }}>
                        <Text style={[text.mediumPlus, styles.titleHeader]}>Referrals</Text>
                        <Text style={[text.small, styles.descriptionHeader]}>Are you enjoying the Rapidoo Superapp? Spread the world and earn fantastic rewards with our Referral Program! it's our way of saying thank you for being a part of our community and helping us grow.</Text>
                    </View>
                    <View style={{ justifyContent: 'center',marginRight:spacing.l, }}>
                        <Image source={require('../../../app/assets/img/referral.png')} style={styles.imageHeader} />
                    </View>
                </View>
            </View>
            <View style={styles.shareCodebar}>
                <View style={{ marginTop: spacing.s + 5, marginLeft: spacing.l * 2 }}>
                    <Text style={[text.mediumPlus,styles.sharelinkTitle]}>Share my Link</Text>
                    <Text style={[text.smallPlus,styles.sharelinkDescription]}>www.r.rapidoo.com/refer/code</Text>
                </View>
                <View style={{ alignSelf:'center', marginHorizontal:spacing.l }}>
                    <Icon name="share-social-outline" type="ionicon" size={30} color={colors.mustard} />
                </View>
            </View>
            <ScrollView style={styles.referContent}>
                <View>
                    <Text style={[text.medium,styles.itemHeader]}>
                        Did a friend refer you?
                    </Text>
                    <TextInput placeholder="Paste Referral Link here" style={styles.input} />
                </View>
                <View style={styles.pointersSpace}>
                    <Pointers titlePointers={"Generate Your Unique Referral Link: "} descriptionPointers={"Inside the app, you'll find your special referral link. It's as unique as you are!"} />
                </View>
                <View style={styles.pointersSpace} >
                    <Pointers titlePointers={"Share the Love: "} descriptionPointers={"Share your referral link with friends, family, or anyone you think would love Rapidoo Superapp. They'll get a warm welcome, and you'll get rewarded!"} />
                </View>
                <View style={styles.pointersSpace}>
                    <Pointers titlePointers={"Earn Rewards Together: "} descriptionPointers={"When your referrals sign up and start using Rapidoo Superapp, you both reap the rewards. It's a win-win!"} />
                </View>

                <Text style={[text.medium,styles.itemHeader]}>
                    What you'll Earn?
                </Text>
                <View style={styles.pointersSpace}>
                    <Pointers titlePointers={"Awesome Discounts: "} descriptionPointers={"Get exclusive discounts on Rapidoo Superapp services, making your experience even more rewarding."} />
                </View>
                <View style={styles.pointersSpace} >
                    <Pointers titlePointers={"Cash Back: "} descriptionPointers={"Earn cashback on your transactions when your referrals use Rapidoo Superapp"} />
                </View>
                <View style={styles.pointersSpace}>
                    <Pointers titlePointers={"Gift Cards: "} descriptionPointers={"Redeem gift cards for your favorite stores, restaurants, and more."} />
                </View>

                <Text style={[text.medium,styles.itemHeader]}>
                    Why Join the Referral Program?
                </Text>
                <View style={styles.pointersSpace}>
                    <Pointers titlePointers={"Help Friend Save: "} descriptionPointers={"Share a fantastic app that can save your friends time and money."} />
                </View>
                <View style={styles.pointersSpace} >
                    <Pointers titlePointers={"Boost Your Benefits: "} descriptionPointers={"The more you refer, the more you earn. Your rewards stack up!"} />
                </View>
                <View style={styles.pointersSpace}>
                    <Pointers titlePointers={"Be Part of Our Growth: "} descriptionPointers={"Help Rapidoo Superapp grow and become even better."} />
                </View>
                <View style={styles.pointersSpace}>
                    <Pointers titlePointers={"Spread the Love: "} descriptionPointers={"Give your friends a reason to smile by introducing them to an app they'll love.."} />
                </View>

                <Text style={[text.medium,styles.itemHeader]}>
                    Start Referring Today
                </Text>
                <Text style={[text.smallPlus,{  fontWeight: '400',color:colors.grayText, marginBottom: spacing.s }]}>
                    Ready to get started? Head to the "Referrals" section in the Rapidoo Superapp to generate your unique link and begin sharing the love. Watch your rewards grow as you help others discover the benefits of Rapidoo Superapp.
                </Text>
                <Text style={[text.smallPlus,{ fontWeight: '400', marginBottom: spacing.s }]}>
                    Thank you for being an essential part of our Rapidoo Superapp community. Together, we're making life easier, more convenient, and a whole lot more fun!
                </Text>
                <OrangeButton onPress={() => { } } btnTitle={"Submit"} disable={false}  />
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
        height: verticalScale(130),
        aspectRatio: 1 / 1,
    },
    shareCodebar: {
        borderRadius: 40,
        flexDirection: 'row',
        marginHorizontal: spacing.l,
        justifyContent:'space-between',
        height: 80,
        width: '90%',
        top: 250 / 8 - 60,
        backgroundColor: colors.light,
        zIndex: 0,
        elevation: 5
    },
    sharelinkTitle: {
        fontWeight: '700',
        color: colors.grayText
    },
    sharelinkDescription: {
        fontWeight: '400',
        color: 'blue'

    },
    referContent: {
        marginLeft: spacing.l,
        marginRight: spacing.l,
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
        margin: spacing.s
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