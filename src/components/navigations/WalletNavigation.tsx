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
import TopUpWeb from '../screens/Wallet/TopUpWeb';

export type WalletElement = {
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
    PaymentMethod: undefined
    TopUpWeb: undefined
    AlertModalError: { message: any }
    ConfirmationModal: {message:any, yesFunction: () => void}
}
const WalletNavigation = () => {
    const HomeNav = createNativeStackNavigator<WalletElement>();

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
                options={{ headerShown: false, presentation: 'transparentModal' }}
                name="LogoutModal"
                component={LogoutModal}
            />
            <HomeNav.Screen
                options={{ headerShown: false, presentation: 'transparentModal' }}
                name="CashInModal"
                component={CashInModal}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name='CashInWeb'
                component={CashInWeb}
            />
            <HomeNav.Screen
                options={{ headerShown: false }}
                name="PaymentMethod"
                component={PaymentMethod}
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
                name="TopUpWeb"
                component={TopUpWeb}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <HomeNav.Screen
                name="ChooseRider"
                component={ChooseRider}
                options={{ headerShown: false, animation: 'slide_from_right' }}
            />
        </HomeNav.Navigator>
    );
};
export default WalletNavigation;



