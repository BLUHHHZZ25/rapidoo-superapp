import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CloseButton from "../../common/CloseButton";
import Navigation, { SharedElement } from "../../navigations/Navigation";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors,text,spacing,sizes,verticalScale, } from "../../../app/constants/theme";
import { Button } from "react-native-paper";
// import ButtonOrange from "../../common/ButtonOrange";
import OrangeButton from "../../common/OrangeButton";
import { ProfileElement } from "../../navigations/ProfileNavigation";


export default function BeRapidooRider() {
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
                <Image source={require('../../../app/assets/img/beRider.png')} style={styles.imageHeader} />
                <View style={{ alignSelf: 'center', marginVertical: spacing.m }}>
                    <Text style={[text.medium,styles.beMerchantTitle]}>
                        <Text style={[text.medium,styles.beMerchantTitlesub]}>Be a </Text>Rapidoo Merchant!
                    </Text>
                </View>
                <ScrollView style={{height:'60%'}}>
                    <View style={{marginHorizontal:spacing.l, height:'auto'}}>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                            Join the Rapidude Revolution and Become a Hero on Wheels
                            </Text> 
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                            Are you ready to embrace the thrill of the ride and the joy of making a difference? Become a Rapidude, the proud and dedicated Rapidoo Rider, and experience the excitement of delivering smiles, one delivery at a time!
                            </Text>
                        </View>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                            Why Become a Rapidude?
                            </Text>
                        </View>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>1. Freedom on Two Wheels: </Text> Say goodbye to the office desk and hello to the open road. As a Rapidude, you'll enjoy the freedom and flexibility of riding through your city while earning.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>2. Earn on Your Terms: </Text>  Choose when and how you want to ride. Whether you're looking for a full-time gig or just some extra income, being a Rapidude fits your lifestyle.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>3. Be a Local Hero: </Text> Deliver more than packages; deliver smiles and satisfaction to our customers. You're an essential part of the Rapidoo.PH community.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>4. Supportive Community:  </Text>Join a tight-knit community of Rapidudes who share tips, stories, and experiences. You're never alone on the road.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                <Text style={styles.itemDescriptionTitle}>Rewards and Recognition: </Text> We value your hard work. Enjoy bonuses, incentives, and special rewards as you ride and excel.
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                            What You Need:
                            </Text>
                        </View>
                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                                a. A valid driver's license
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                            b. A reliable two-wheeler
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                            c. A smartphone with our easy-to-use app
                            </Text>
                        </View>

                        <View style={styles.itemSpacing}>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                            d. A passion for great service and road adventures
                            </Text>
                        </View>


                        <View style={styles.itemSpacing}>
                            <Text style={[text.medium,styles.itemHeader]}>
                            Join the Rapidude Team:
                            </Text>
                            <Text style={[text.smallPlus,styles.itemDescription]}>
                            Ready to embark on an exciting journey? Join the Rapidude team and be part of something bigger than yourself. You're not just a rider; you're a Rapidude—a hero on wheels, bringing convenience and joy to our customers. Become a Rapidude today, and let's ride towards a brighter future together!
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ alignSelf: 'center', width:'100%', marginHorizontal:spacing.l, paddingHorizontal:spacing.m }}>
                    <OrangeButton btnTitle={"Submit"} onPress={() => {}} disable={false}/>
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
        textAlign:'justify',
        color:colors.grayText
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