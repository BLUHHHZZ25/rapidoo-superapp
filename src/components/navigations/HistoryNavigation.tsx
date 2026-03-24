import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertModalError } from '../screens/SignUp/AlertModalError';
import History from '../screens/Transaction/History';
import HistoryDetails from '../screens/Transaction/HistoryDetails';
import ReceiptView from '../screens/Transaction/ReceiptView';
import HistoryWrongPin from '../screens/Parcel/HistoryWrongPin';
import HistoryWrongPinModal from '../modal/HistoryWrongPinModal';
import ViewImage from '../screens/Transaction/ViewImage';
import Transaction from '../screens/Transaction';
import { ConfirmationModal } from '../screens/SignUp/ConfirmationModal';
import MainContainer from './BottomNav';

export type HistoryElement = {
    History: undefined
    HistoryDetails: undefined
    ReceiptView: undefined
    Home: undefined
    ViewImage: {imageValue:any}
    AlertModalError: { message: any }
    HistoryWrongPinModal: undefined,
    HistoryWrongPin: {data:any, customerDetails:any},
    Transaction: undefined,
    ConfirmationModal: {message:any, yesFunction: () => void}
}
const HistoryNavigation = () => {
    const HistoryNav = createNativeStackNavigator<HistoryElement>();

    return (
        <HistoryNav.Navigator>
            <HistoryNav.Screen
                options = {{headerShown:false}}
                name="History"
                component={History} 
            />
            <HistoryNav.Screen
                options = {{headerShown:false}}
                name="HistoryDetails"
                component={HistoryDetails} 
            />
            <HistoryNav.Screen
                options={{ headerShown: false}}
                name="ReceiptView"
                component={ReceiptView}
            />
            <HistoryNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="ViewImage"
                component={ViewImage}
            />
            <HistoryNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="AlertModalError"
                component={AlertModalError}
            />
            <HistoryNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="ConfirmationModal"
                component={ConfirmationModal}
            />
            <HistoryNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="HistoryWrongPinModal"
                component={HistoryWrongPinModal}
            />
            <HistoryNav.Screen
                options={{ headerShown: false}}
                name="HistoryWrongPin"
                component={HistoryWrongPin}
            />
            <HistoryNav.Screen
                options={{ headerShown: false}}
                name="Transaction"
                component={Transaction}
            />
            <HistoryNav.Screen
                options={{ headerShown: false}}
                name="Home"
                component={MainContainer}
            />
        </HistoryNav.Navigator>
    );
};
export default HistoryNavigation;



