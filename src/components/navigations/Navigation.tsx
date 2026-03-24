import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Coupon from '../screens/Profile/Coupon';
import Referrals from '../screens/Profile/Referrals';
import Transaction from '../screens/Transaction';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import ContactUs from '../screens/Profile/ContactUs';
import TermsCondition from '../screens/Profile/TermsCondition';
import PrivacyPolicy from '../screens/Profile/PrivacyPolicy';
import AboutRapidoo from '../screens/Profile/AboutRapidoo';
import BeRapidooMerchant from '../screens/Profile/BeRapidooMerchant';
import BeRapidooRider from '../screens/Profile/BeRapidooRider';
import LottieApprovedLogo from '../templates/LottieApprovedLogo';
import Login from '../screens/SignUp/Login';
import ConvertPoints from '../screens/Wallet/ConvertPoints';
import Points from '../screens/Wallet/Points';
import EditProfile from '../screens/EditProfile';
import Loading from '../screens/Loading';
import NoInternet from '../screens/NoInternet';
import SignupNavigation from './SignupNavigation';
import HomeNavigation from './HomeNavigation';
import { AlertModalError } from '../screens/SignUp/AlertModalError';
import HistoryNavigation from './HistoryNavigation';
import PermissionScreen from '../screens/PermissionScreen';
import { PaymentMethod } from '../screens/Wallet/PaymentMethod';
import TopUpWeb from '../screens/Wallet/TopUpWeb';
import { SuccessPayment } from '../screens/Wallet/SuccessPayment';
import { FailedPayment } from '../screens/Wallet/FailedPayment';
import WalletHistory from '../screens/Wallet/WalletHistory';

export type SharedElement = {
    Coupon: undefined
    Referrals: undefined
    ContactUs: undefined
    TermsCondition: undefined
    PrivacyPolicy: undefined
    AboutRapidoo: undefined
    BeRapidooMerchant: undefined
    BeRapidooRider: undefined
    SearchAddress: undefined
    SearchAddressDetails: undefined
    DropoffAddressDetails: undefined
    DropoffAddress: undefined
    ChooseMap: undefined
    TrackMyOrder: undefined
    DriverRating: undefined
    LottieApprovedLogo: undefined
    ModalStatusComponents: undefined
    //? Bottom Navigation - need to declare here for nested navigation
    Home:undefined
    Notification: undefined
    Wallet: undefined
    Transaction: undefined
    Profile: undefined
    Login: undefined
    Parcel: undefined
    Send_OTP: undefined
    OtpEntry: undefined
    SignUp: undefined
    ConvertPoints: undefined
    Points: undefined
    History: undefined
    HistoryDetails: undefined,
    EditProfile: undefined,
    Loading: undefined,
    NoInternet: undefined
    SplashScreen: undefined,
    CashInWeb:undefined
    SignupNavigation: undefined
    HomeNavigation: undefined
    HistoryNavigation: undefined
    WalletNavigation: undefined
    PermissionScreen: undefined
    PaymentMethod: undefined
    TopUpWeb:undefined
    SuccessPayment:undefined
    FailedPayment:undefined
    WalletHistory: undefined
    AlertModalError: {message:any}
}

const Navigation = () => {
    const Stack = createNativeStackNavigator<SharedElement>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="SplashScreen"
                component={Loading}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="NoInternet"
                component={NoInternet}
            />
            <Stack.Screen
                options={{ headerShown: true }}
                name="ConvertPoints"
                component={ConvertPoints}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Points"
                component={Points}
            />

            <Stack.Screen
                name="Transaction"
                component={Transaction}
            />
            <Stack.Screen
                name="Notification"
                component={Notification}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name='LottieApprovedLogo'
                component={LottieApprovedLogo}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name='PermissionScreen'
                component={PermissionScreen}
            />
            <Stack.Screen
                options={{ headerShown: false, presentation:"transparentModal" }}
                name="AlertModalError"
                component={AlertModalError}
            />
{/* Children Stacks */}

            <Stack.Screen
                options={{ headerShown:false}}
                name='SignupNavigation'
                component={SignupNavigation}
            />
            <Stack.Screen
                options={{ headerShown:false}}
                name='HomeNavigation'
                component={HomeNavigation}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="HistoryNavigation"
                component={HistoryNavigation}
            />
            <Stack.Screen
                name="SuccessPayment"
                component={SuccessPayment}
                options={{ headerShown: false, presentation: "transparentModal" }}
            />
            <Stack.Screen
                name="FailedPayment"
                component={FailedPayment}
                options={{ headerShown: false, presentation: "transparentModal" }}
            />
            <Stack.Screen
                name="WalletHistory"
                component={WalletHistory}
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
};
export default Navigation;



