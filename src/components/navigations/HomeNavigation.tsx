import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Send_OTP from '../screens/SignUp/Send_OTP';
import OtpEntry from '../screens/SignUp/OtpEntry';
import SignUp from '../screens/SignUp/SignUp';
import { AlertModalError } from '../screens/SignUp/AlertModalError';
import MainContainer from './BottomNav';
import ParcelNavigation from './ParcelNavigation';
import HistoryNavigation from './HistoryNavigation';
import CashInModal from '../screens/Wallet/CashInModal';
import CashInWeb from '../screens/Wallet/CashInWeb';
import ProfileNavigation from './ProfileNavigation';
import LogoutModal from '../screens/Profile/Logout';
import ContactsScreen from '../screens/ContactsScreen';
import ChooseRider from '../screens/Parcel/ChooseRider';
import Coupon from '../screens/Profile/Coupon';
import { ConfirmationModal } from '../screens/SignUp/ConfirmationModal';
import { PaymentMethod } from '../screens/Wallet/PaymentMethod';
import WalletNavigation from './WalletNavigation';

export type HomeElement = {
    Home: undefined,
    ParcelNavigation: undefined,
    HistoryNavigation: undefined,
    CashInModal: undefined
    CashInWeb: undefined
    ProfileNavigation: undefined
    LogoutModal: undefined
    ContactsScreen: undefined
    ChooseRider: undefined
    Coupons: undefined
    WalletNavigation: undefined
    AlertModalError: { message: any }
    ConfirmationModal: {message:any, yesFunction: () => void}
}
const HomeNavigation = () => {
    const HomeNav = createNativeStackNavigator<HomeElement>();

    return (
        <HomeNav.Navigator>
            <HomeNav.Screen
                options={{ headerShown: false }}
                name="Home"
                component={MainContainer}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name="ParcelNavigation"
                component={ParcelNavigation}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name="HistoryNavigation"
                component={HistoryNavigation}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name="ProfileNavigation"
                component={ProfileNavigation}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name="WalletNavigation"
                component={WalletNavigation}
            />
            <HomeNav.Screen
                options={{ headerShown: false, presentation: 'transparentModal' }}
                name="LogoutModal"
                component={LogoutModal}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name='CashInWeb'
                component={CashInWeb}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name='ContactsScreen'
                component={ContactsScreen}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name='Coupons'
                component={Coupon}
            />
            <HomeNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="AlertModalError"
                component={AlertModalError}
            />
            <HomeNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="ConfirmationModal"
                component={ConfirmationModal}
            />
            <HomeNav.Screen
                name="ChooseRider"
                component={ChooseRider}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
        </HomeNav.Navigator>
    );
};
export default HomeNavigation;



