import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SharedElement } from "../../navigations/Navigation";
import { colors, spacing,text,sizes } from "../../../app/constants/theme";
import { Icon, Input } from "@rneui/themed";
import { ScrollView } from "react-native";
import DefaultHeader from "../../common/DefaultHeader";
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
        <ScrollView >
            <DefaultHeader titleName="Terms and Condition" onPress={navigationBack}/>
            <View style={styles.container}>
                <Text style={[text.medium,styles.itemHeader]}>
                    Terms and Condition:
                </Text>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        1.Introduction
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        Welcome to Rapidoo Superapp ("we," "us," or "our"). By accessing or using our app, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please do not use our app.
                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        2.Use of the App
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        You must use the app in compliance with all applicable laws and regulations. You are solely responsible for any content you post or share on the app.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        3.User Accounts
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        To access certain features of the app, you may need to create an account. You are responsible for maintaining the security of your account credentials.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        4.Content
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        Users may post, upload, or submit content to the app. By doing so, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        5.Privacy
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        Your use of the app is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        6.Termination
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        We reserve the right to terminate or suspend your account at our discretion, without notice, if you violate these terms.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        7.Disclaimers
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        The app is provided "as is," and we make no warranties or representations about its accuracy, completeness, or suitability for any purpose. We are not liable for any damages or losses resulting from your use of the app.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        8.Contact Information
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        If you have any questions or concerns about these terms, please contact us at <Text style={{ color: colors.mustard }}>rapidoo.marketing@gmail.com</Text>.
                    </Text>
                </View>
            </View>

        </ScrollView>
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
    itemDescription: {
        fontWeight: '400',
        color:colors.grayText
    },
    itemSpacing: {
        marginVertical: spacing.s
    }
})