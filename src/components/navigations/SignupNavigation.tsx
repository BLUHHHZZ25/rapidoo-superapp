import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Send_OTP from '../screens/SignUp/Send_OTP';
import OtpEntry from '../screens/SignUp/OtpEntry';
import SignUp from '../screens/SignUp/SignUp';
import { AlertModalError } from '../screens/SignUp/AlertModalError';
import { ConfirmationModal } from '../screens/SignUp/ConfirmationModal';

export type SignUpElement = {
    SignUp: undefined,
    OtpEntry: undefined,
    Send_OTP: undefined,
    AlertModalError: {message:any}
    ConfirmationModal: {message:any, yesFunction:() => void}
}
const SignupNavigation = () => {
    const SignupNav = createNativeStackNavigator<SignUpElement>();

    return (
        <SignupNav.Navigator>
            <SignupNav.Screen
                options={{ headerShown: false }}
                name="Send_OTP"
                component={Send_OTP}
            />
            <SignupNav.Screen
                options={{ headerShown: false }}
                name="SignUp"
                component={SignUp}
            />
            <SignupNav.Screen
                options={{ headerShown: false }}
                name="OtpEntry"
                component={OtpEntry}
            />
            <SignupNav.Screen
                options={{ headerShown: false, presentation:"transparentModal" }}
                name="AlertModalError"
                component={AlertModalError}
            />
            <SignupNav.Screen
                options={{ headerShown: false, presentation:"transparentModal" }}
                name="ConfirmationModal"
                component={ConfirmationModal}
            />
        </SignupNav.Navigator>
    );
};
export default SignupNavigation;



