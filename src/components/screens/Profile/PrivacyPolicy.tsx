import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SharedElement } from "../../navigations/Navigation";
import { spacing, sizes, colors, verticalScale, text } from "../../../app/constants/theme";
import { Icon, Input } from "@rneui/themed";
import { ScrollView } from "react-native";
import DefaultHeader from "../../common/DefaultHeader";
import { ProfileElement } from "../../navigations/ProfileNavigation";


export default function PrivacyPolicy() {
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
            <DefaultHeader titleName="Privacy Policy" onPress={navigationBack}/>
            <View style={styles.container}>
                <Text style={[text.medium,styles.itemHeader]}>
                    Privacy Policy:
                </Text>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        1.Information We collect
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        We collect personal and non-personal information as described in our Privacy Policy.
                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        2.How we use your information
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        We use your information for the purposes outlined in our Privacy Policy.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        3.Sharing your information
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        We may share your information as described in our Privacy Policy.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        4.Security
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        We take reasonable measures to protect your data. Please refer to our Privacy Policy for details.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        5.Changes to this Policy
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        We may update our Privacy Policy from time to time, and any changes will be posted on this page.

                    </Text>
                </View>

                <View style={styles.itemSpacing}>
                    <Text style={[text.medium,styles.itemHeader]}>
                        6.Contact Us
                    </Text>
                    <Text style={[text.smallPlus,styles.itemDescription]}>
                        If you have questions or concerns about your privacy or this policy, please contact us at <Text style={{color:colors.mustard}}>rapidoo.marketing@gmail.com</Text>.
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