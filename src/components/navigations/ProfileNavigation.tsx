import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Send_OTP from '../screens/SignUp/Send_OTP';
import OtpEntry from '../screens/SignUp/OtpEntry';
import SignUp from '../screens/SignUp/SignUp';
import { AlertModalError } from '../screens/SignUp/AlertModalError';
import EditProfile from '../screens/EditProfile';
import BeRapidooMerchant from '../screens/Profile/BeRapidooMerchant';
import BeRapidooRider from '../screens/Profile/BeRapidooRider';
import AboutRapidoo from '../screens/Profile/AboutRapidoo';
import PrivacyPolicy from '../screens/Profile/PrivacyPolicy';
import TermsCondition from '../screens/Profile/TermsCondition';
import ContactUs from '../screens/Profile/ContactUs';
import Referrals from '../screens/Profile/Referrals';
import Coupon from '../screens/Profile/Coupon';
import HomeNavigation from './HomeNavigation';

export type ProfileElement = {
    EditProfile: undefined
    BeRapidooRider: undefined
    BeRapidooMerchant: undefined
    AboutRapidoo: undefined
    PrivacyPolicy: undefined
    TermsCondition: undefined
    ContactUs: undefined
    Referrals: undefined
    Coupon: undefined
    HomeNavigation: undefined
    AlertModalError: { message: any }
}
const ProfileNavigation = () => {
    const ProfileNav = createNativeStackNavigator<ProfileElement>();

    return (
        <ProfileNav.Navigator>
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name='EditProfile'
                component={EditProfile}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="BeRapidooRider"
                component={BeRapidooRider}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="BeRapidooMerchant"
                component={BeRapidooMerchant}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="AboutRapidoo"
                component={AboutRapidoo}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="PrivacyPolicy"
                component={PrivacyPolicy}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="TermsCondition"
                component={TermsCondition}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="ContactUs"
                component={ContactUs}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="Referrals"
                component={Referrals}
            />
            <ProfileNav.Screen
                options={{ headerShown: false }}
                name="Coupon"
                component={Coupon}
            />
            {/* <ProfileNav.Screen
                options={{ headerShown: false }}
                name="HomeNavigation"
                component={HomeNavigation}
            /> */}
            <ProfileNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="AlertModalError"
                component={AlertModalError}
            />
        </ProfileNav.Navigator>
    );
};
export default ProfileNavigation;



