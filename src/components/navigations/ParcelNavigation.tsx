import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertModalError } from '../screens/SignUp/AlertModalError';
import Parcel from '../screens/Parcel';
import SearchAddress from '../screens/Parcel/SearchAddress';
import SearchAddressDetails from '../screens/Parcel/SearchAddressDetails';
import ChooseMap from '../screens/Parcel/ChooseMap';
import TrackMyOrder from '../screens/Parcel/TrackMyOrder';
import ReviewOrder from '../screens/Parcel/ReviewOrder';
import DriverRating from '../screens/Parcel/DriverRating';
import HomeNavigation from './HomeNavigation';
import CancelModal from '../modal/CancelModal';
import WrongPinModal from '../modal/WrongPinModal';
import ReviewWrongPin from '../screens/Parcel/ReviewWrongPin';
import ViewImage from '../screens/Transaction/ViewImage'
import { ConfirmationModal } from '../screens/SignUp/ConfirmationModal';
import ScheduleBookingModal from '../screens/Parcel/ScheduleBooking'
import Coupon from '../screens/Profile/Coupon';

export type ParcelElement = {
    Parcel: undefined,
    SearchAddress: undefined,
    SearchAddressDetails: undefined,
    ChooseMap: undefined,
    TrackMyOrder: undefined,
    ReviewOrder: undefined,
    DriverRating: undefined,
    HomeNavigation: undefined,
    AlertModalError: { message: any },
    CancelModal: undefined,
    ScheduleBookingModal: undefined,
    WrongPinModal: undefined,
    Coupons: undefined,
    ReviewWrongPin: {data:any, customerDetails:any},
    ViewImage: {imageValue:any}
    ConfirmationModal: {message: any, yesFunction: () => void}
}
const ParcelNavigation = () => {
    const ParcelNav = createNativeStackNavigator<ParcelElement>();

    return (
        <ParcelNav.Navigator>
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name="Parcel"
                component={Parcel}
            />
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name="SearchAddress"
                component={SearchAddress}
            />
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name="SearchAddressDetails"
                component={SearchAddressDetails}
            />
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name='ChooseMap'
                component={ChooseMap}
            />
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name='TrackMyOrder'
                component={TrackMyOrder}
            />
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name='DriverRating'
                component={DriverRating}
            />
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name='ReviewOrder'
                component={ReviewOrder}
            />
            <ParcelNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="CancelModal"
                component={CancelModal}
            />
            <ParcelNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="WrongPinModal"
                component={WrongPinModal}
            />
            <ParcelNav.Screen
                options={{ headerShown: false}}
                name="ReviewWrongPin"
                component={ReviewWrongPin}
            />
            <ParcelNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="ViewImage"
                component={ViewImage}
            />
            <ParcelNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="ConfirmationModal"
                component={ConfirmationModal}
            />
            <ParcelNav.Screen
                options={{ headerShown: false }}
                name='Coupons'
                component={Coupon}
            />
            <ParcelNav.Screen
                options={{ headerShown: false, presentation: "transparentModal" }}
                name="ScheduleBookingModal"
                component={ScheduleBookingModal}
            />
        </ParcelNav.Navigator>
    );
};
export default ParcelNavigation;



