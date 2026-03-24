import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SharedElement } from "../../navigations/Navigation";
import { colors, text, spacing, } from "../../../app/constants/theme";
import { Icon, Input } from "@rneui/themed";
import { ScrollView } from "react-native";
import DefaultHeader from "../../common/DefaultHeader";
import { ProfileElement } from "../../navigations/ProfileNavigation";





export default function AboutRapidoo() {
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
            <DefaultHeader titleName="About Rapidoo" onPress={navigationBack} />
            <ScrollView >
                <View style={styles.container}>
                    <Text style={[text.normal, styles.itemHeaderDescription]}>
                        At Rapidoo.PH, we're on a mission to revolutionize the way you experience convenience, efficiency, and endless possibilities right at your fingertips. We're not just an app; we're your trusted companion for making life easier and more enjoyable.
                    </Text>
                    <View style={styles.itemSpacing}>
                        <Text style={[text.medium,styles.itemHeader]}>
                            Our Vision:
                        </Text>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            To be the ultimate one-stop superapp that empowers Filipinos to navigate their daily lives seamlessly.
                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.medium,styles.itemHeader]}>
                            What We Offer:
                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>1. Swift Services:</Text> We may share your information as described in our Privacy Policy.
                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>2. Local Flavor:</Text> We may share your information as described in our Privacy Policy.
                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>3. Personalized Experiences:</Text> Our app learns your preferences and suggests tailored recommendations, ensuring you get exactly what you need, when you need it.
                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>4. Safety First :</Text> Your security is our top priority. We employ stringent safety measures to protect your data and transactions.

                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>5. 24/7 Support :</Text> Have questions or need assistance? Our friendly and responsive customer support team is available around the clock to assist you.

                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.medium,styles.itemHeader]}>
                            Why Choose Rapidoo.PH Superapp:
                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>1. Convenience:</Text> Say goodbye to long queues and wasted time. We bring everything you need right to your doorstep.

                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>2. Affordability:</Text>  Enjoy competitive prices and exclusive discounts, helping you save money on your daily expenses.

                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>3. Community:</Text> Join a growing community of users who rely on Rapidoo.PH for a more comfortable and efficient lifestyle.

                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            <Text style={styles.itemDescriptionTitle}>4. Sustainability :</Text> We are committed to reducing our carbon footprint and promoting eco-friendly practices in our operations.
                        </Text>
                    </View>

                    <View style={styles.itemSpacing}>
                        <Text style={[text.medium,styles.itemHeader]}>
                            Our Promise:
                        </Text>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            We're more than just an app; we're your reliable partner in navigating the complexities of modern life. Whether it's a ride home after a long day or a delicious meal delivered to your door, we're here to make your life simpler and more enjoyable.
                        </Text>
                        <Text style={[text.smallPlus,styles.itemDescription]}>
                            Thank you for choosing Rapidoo.PH Superapp. Together, we're building a brighter, more connected future for the Philippines.
                        </Text>
                    </View>

                </View>

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.m,
    },
    itemHeader: {
        fontWeight: '700',
        color: colors.black,
    },
    itemHeaderDescription: {
        fontWeight: '400',
        color: colors.black,
        textAlign:'justify'
    },
    itemDescription: {
        fontWeight: '400',
        color:colors.grayText,
        textAlign:'justify'
    },
    itemDescriptionTitle: {
        fontWeight: '700',
        color: colors.grayText
    },
    itemSpacing: {
        marginVertical: spacing.s
    }
})