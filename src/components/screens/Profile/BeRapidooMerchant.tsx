import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CloseButton from "../../common/CloseButton";
import Navigation, { SharedElement } from "../../navigations/Navigation";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors,spacing,text, sizes } from "../../../app/constants/theme";
// import ButtonOrange from "../../common/ButtonOrange";
import OrangeButton from "../../common/OrangeButton";
import { ProfileElement } from "../../navigations/ProfileNavigation";


export default function BeRapidooMerchant() {
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

            <View style={{height:'auto'}}>
                <CloseButton Onpress={navigationBack} />
                <Image source={require('../../../app/assets/img/beMerchant.png')} style={styles.imageHeader} />
                <View style={{ alignSelf: 'center', marginVertical: spacing.m }}>
                    <Text style={[text.medium,styles.beMerchantTitle]}>
                        <Text style={styles.beMerchantTitlesub}>Be a </Text>Rapidoo Merchant!
                    </Text>
                </View>
                <ScrollView style={{height:'60%'}}>
                    <View style={{marginHorizontal:spacing.l, height:'auto'}}>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                                Elevate Your Business with Rapidoo.PH
                            </Text>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                Are you a business owner looking to supercharge your success and reach more customers? Welcome to the world of Rapidoo Merchants, where opportunities are endless, and growth is boundless.
                            </Text>
                        </View>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                                Why become a Rapidoo Merchant?
                            </Text>
                        </View>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>1. Expand Your Reach: </Text> Tap into our vast and ever-growing customer base. Rapidoo.PH connects you with a diverse audience seeking your products or services.

                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>2. Boost Your Sales: </Text>  Increase your revenue and profits by offering your goods or services on our platform. Reach customers who are ready to engage and make purchases.

                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>3. Seamless Integration: </Text> Our user-friendly platform makes it easy for you to manage your inventory, orders, and payments. Streamline your operations and save time.

                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>4. Marketing Support: </Text> Benefit from our marketing campaigns and promotional opportunities. We're here to help you get noticed and stand out.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>5. Customer Loyalty: </Text> Build a loyal customer base by providing exceptional service through Rapidoo.PH. Satisfied customers keep coming back.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                            How to Become a Rapidoo Merchant:
                            </Text>
                        </View>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>a. Reach Out: </Text> Contact us, and our dedicated team will guide you through the onboarding process.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>b. Set Up Your Store: </Text>  Customize your online storefront with your branding and product offerings.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>c. Start Selling: </Text> List your products or services, and watch your business grow as orders come in.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>d. Fulfill Orders: </Text> Process orders efficiently and deliver excellent service to your customers.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>e. Grow with Us:  </Text> As a Rapidoo Merchant, you're not just a partner; you're a valued member of our community.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                            Join the Rapidoo Merchant Network:
                            </Text>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                            Unlock new possibilities for your business and elevate your success. Become a Rapidoo Merchant and gain access to a world of opportunities, innovation, and growth Don't miss out on the chance to be part of something big. Join us today and take your business to new heights with Rapidoo.PH!
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ alignSelf: 'center', width:'100%', marginHorizontal:spacing.l, paddingHorizontal:spacing.m }}>
                    <OrangeButton btnTitle={"Submit"} onPress={function (): void {
                    throw new Error("Function not implemented.");
                } } disable={false}/>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    containre: {

    },
    imageHeader: {
        width: "100%",
        height: 200,
        resizeMode: 'cover'
    },
    beMerchantTitle: {
        fontWeight: '700',
        color: colors.mustard
    },
    beMerchantTitlesub: {
        fontWeight: '700',
        color: colors.black
    },
    itemSpacing: {
        marginVertical: spacing.s
    },
    itemHeaderDescription: {
        fontWeight: '400',
        fontSize: sizes.h3,
        color: colors.black,
    },
    itemDescription: {
        fontWeight: '400',
        color:colors.grayText,
        textAlign:'justify'
    },
    itemDescriptionTitle: {
        fontWeight: '600',
        fontSize: sizes.body,
        color: colors.black
    },
    itemHeader: {
        fontWeight: '700',
        color: colors.black,
    },
})