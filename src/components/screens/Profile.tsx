import { Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListBox from "../common/ListBox";
import { colors, moderateScale, sizes, spacing, text } from "../../app/constants/theme";
import Header from "../common/Header";
import ProfilePic from "../common/ProfilePic";
//import { SharedElement } from "../navigations/ScreenNavigation";
import { SharedElement } from "../navigations/Navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../app/watermelonDB/model/model";
import LogOut from "./Profile/Logout";
import { HomeElement } from "../navigations/HomeNavigation";


export default function Profile() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const accountID = useSelector((state: RootState) => state.registrationCounter.account_ID);
    const fullname = (`${useSelector((state: RootState) => state.registrationCounter.regFirstname)}` + ` ${useSelector((state: RootState) => state.registrationCounter.regLastname)}`)
    const email = useSelector((state: RootState) => state.registrationCounter.regEmail);
    const profile = useSelector((state: RootState) => state.registrationCounter.profile);
    // const birthday = useSelector((state:RootState) => state.registrationCounter.regBirt7hday);
    const gender = useSelector((state: RootState) => state.registrationCounter.regGender);
    const city = useSelector((state: RootState) => state.registrationCounter.regGender);
    const mobileNumber = useSelector((state: RootState) => state.registrationCounter.regNumber);
    const isFocused = useIsFocused();

    const [isForm, setIsForm] = useState({
        mobile_number: "",
        fullname: "",
        email: "",
        profile: ""
    })

    const navigationCoupon = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'Coupon'
                        }
                    ]
                }
            }],
        })
    }
    const navigationReferrals = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'Referrals'
                        }
                    ]
                }
            }],
        })
    }
    const navigationContactUs = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'ContactUs'
                        }
                    ]
                }
            }],
        })
    }
    const navigationTermsConditions = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'TermsConditions'
                        }
                    ]
                }
            }],
        })
    }
    const navigationPrivacyPolicy = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'PricacyPolicy'
                        }
                    ]
                }
            }],
        })
    }
    const navigationAboutRapidoo = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'AboutRapidoo'
                        }
                    ]
                }
            }],
        })
    }
    const navigationBeRapidooMerchant = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'BeRapidooMerchant'
                        }
                    ]
                }
            }],
        })
    }
    const navigationBeRapidooRider = () => {
        navigationHome.reset({
            index: 0,
            routes: [{
                name: 'ProfileNavigation',
                state: {
                    routes: [
                        {
                            name: 'BeRapidooRider'
                        }
                    ]
                }
            }],
        })
    }

    // const sampleFunc = () => {
    //     navigationHome.reset({
    //         index: 0,
    //         routes: [{
    //             name: 'ContactsScreen',
    //         }],
    //     })
    // }

    // const navigationLogoutModal = () => {
    //     navigationHome.reset({
    //         index: 0,
    //         routes: [{
    //             name: 'LogoutModal'
    //         }],
    //     })
    // }

    useEffect(() => {
        const Fetching = async () => {
            const data = await getAllPosts();
            // console.log("\n\n\ fetching", JSON.stringify(data, null , 5))
            console.log("\n\n\ fetching", data)
            setIsForm({
                ...isForm,
                mobile_number: data[0].register_number,
                fullname: `${data[0].firstname} ${data[0].lastname}`,
                email: data[0].email,
                profile: data[0].profile
            })
        }

        Fetching()
    }, [isFocused])
    console.log("\n\n\n  data", isForm)
    return (
        <ScrollView>
            <StatusBar
                barStyle="dark-content" // Or "dark-content" based on your preference
                translucent={true}
                backgroundColor="transparent"
            />
            <View style={style.container}>
                <Header title="Profile" backBtn={false} settingBtn={false} backFunc={() => { }} settingFunc={() => { }} />
                <ProfilePic fullname={isForm.fullname} email={isForm.email} phone={isForm.mobile_number} profile={isForm.profile} />
                <View style={{ marginTop: spacing.l }}>
                    <Text style={[text.medium, style.subTitle]}>For You</Text>
                </View>
                <View style={style.listStyle}>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Need Help?"} onPress={() => {
                            Linking.openURL("https://m.me/rapidoophsuperapp")
                        }} />
                    </View>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Coupons"} onPress={navigationCoupon} />
                    </View>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Referrals"} onPress={navigationReferrals} />
                    </View>
                </View>
                <View style={{ marginTop: spacing.l }}>
                    <Text style={[text.medium, style.subTitle]}>General</Text>
                </View>
                <View style={style.listStyle}>
                    {/* <View style={style.spacingItem}>
                        <ListBox titleList={"Contact Us"} onPress={navigationContactUs} />
                    </View> */}
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Notification Settings"} onPress={() => { console.log('sample'); }} />
                    </View>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Terms and Contidions"} onPress={navigationTermsConditions} />
                    </View>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Privacy Policy"} onPress={navigationPrivacyPolicy} />
                    </View>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"About Rapidoo.PH"} onPress={navigationAboutRapidoo} />
                    </View>
                </View>

                <View style={{ marginTop: spacing.l }}>
                    <Text style={[text.medium, style.subTitle]}>Opportunities</Text>
                </View>
                <View style={style.listStyle}>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Be a RAPIDOO MERCHANT!"} onPress={navigationBeRapidooMerchant} />
                    </View>
                    <View style={style.spacingItem}>
                        <ListBox titleList={"Be a RAPIDUDE! "} onPress={navigationBeRapidooRider} />
                    </View>
                </View>

                <View style={{ marginTop: spacing.l }}>
                    <Text style={[text.medium, style.subTitle]}>Account</Text>
                </View>
                <View style={style.listStyle}>
                    {/* <LogOut nameSection={""} iconName={""}/> */}
                    {/* <TouchableOpacity onPress={sampleFunc()}>
                        <Text>Contacts ui</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => navigationHome.navigate("LogoutModal")}
                        style={{
                            flexDirection: 'row',
                            marginHorizontal: spacing.s,
                            marginVertical: spacing.s,
                        }}>
                        <View style={[styles.iconStyle, { marginHorizontal: spacing.s }]}>
                            <Image
                                source={require('../../app/assets/img/10.png')}
                                style={{ width: moderateScale(35), height: moderateScale(35) }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={{ marginHorizontal: spacing.s }}>
                            <Text style={[text.medium, { color: colors.black }]}>Log out</Text>
                            <Text style={[text.normal, { color: colors.grayText }]}>
                                Sign out securely
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
}


const style = StyleSheet.create({
    container: {

    },
    listStyle: {
        marginHorizontal: spacing.m,
        marginVertical: spacing.s
    },
    divider: {

    },
    spacingItem: {

    },
    subTitle: {
        fontWeight: '700',
        marginHorizontal: spacing.m,
        color: colors.black
    },
})

const styles = StyleSheet.create({
    iconStyle: {
        backgroundColor: colors.mustard,
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})