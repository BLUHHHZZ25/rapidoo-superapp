import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import uuid from 'react-native-uuid';
import { z_app_version, SIGN_APP_KEY, SIGN_APP_SECRET, z_app, z_app_code, z_app_type, LOCAL_BASE_URL } from "../../../Config";

export interface HistoryState {
    pickup_address: string,
    pickup_address_details: string,
    pickup_lat: number,
    pickup_long: number,
    pickup_person: string,
    pickup_number: string,
    transaction_created_at: string,
    dropoff_address: string,
    dropoff_address_details: string,
    dropoff_lat: number,
    dropoff_long: number,
    dropoff_person: string,
    dropoff_number: string,
    updated_at: string,
    vehicle_type: string,
    sender_payment: string,
    rider_profile: string,
    rider_account_id: string,
    rider_name: string,
    app_transaction_id: string,
    isMultipleDrop:any,
    pickup_image: string,
    dropoff_image:string,
    pickup_completed_at: string
    dropoff_completed_at: string
    pickup_wrong_pin: boolean
    dropoff_wrong_pin: boolean
    pickup_actual_lat: string
    pickup_actual_long: string
    dropoff_actual_lat: string
    dropoff_actual_long: string
    status: string
    total_amount: any
}

const initialState: HistoryState = {
    pickup_address: "",
    pickup_address_details: "",
    pickup_lat: 0,
    pickup_long: 0,
    pickup_person: "",
    pickup_number: "",
    transaction_created_at: "",
    dropoff_address: "",
    dropoff_address_details: "",
    dropoff_lat: 0,
    dropoff_long: 0,
    dropoff_person: "",
    dropoff_number: "",
    updated_at: "",
    vehicle_type: "",
    sender_payment: "",
    rider_profile: "",
    rider_account_id: "",
    rider_name: "",
    app_transaction_id: "",
    isMultipleDrop: null,
    pickup_image: "",
    dropoff_image: "",
    pickup_completed_at: "",
    dropoff_completed_at: "",
    pickup_wrong_pin: false,
    dropoff_wrong_pin: false,
    pickup_actual_lat: "",
    pickup_actual_long: "",
    dropoff_actual_lat: "",
    dropoff_actual_long: "",
    status: "",
    total_amount: ""
}

export const historySlice = createSlice({
    name: "history/historySlice",
    initialState,
    reducers: {
        setHistoryData: (state, action: PayloadAction<{
                pickup_address:string,
                pickup_address_details:string,
                pickup_lat:number,
                pickup_long:number,
                pickup_person:string,
                pickup_number:string,
                transaction_created_at:string,
                dropoff_address:string,
                dropoff_address_details:string,
                dropoff_lat:number,
                dropoff_long:number,
                dropoff_person:string,
                dropoff_number:string,
                updated_at:string,
                vehicle_type:string,
                sender_payment: string,
                rider_profile: string,
                rider_account_id: string,
                rider_name: string,
                app_transaction_id: string,
                isMultipleDrop: any,
                pickup_image: any,
                dropoff_image: any,
                pickup_completed_at: any,
                dropoff_completed_at: any,
                pickup_wrong_pin: boolean,
                dropoff_wrong_pin: boolean,
                pickup_actual_lat: string,
                pickup_actual_long: string,
                dropoff_actual_lat: string,
                dropoff_actual_long: string,
                status: string,
                total_amount: any
            }>) => {
            state.pickup_address = action.payload.pickup_address,
            state.pickup_address_details = action.payload.pickup_address_details,
            state.pickup_lat = action.payload.pickup_lat,
            state.pickup_long = action.payload.pickup_long,
            state.pickup_person = action.payload.pickup_person,
            state.pickup_number = action.payload.pickup_number,
            state.transaction_created_at = action.payload.transaction_created_at,

            state.dropoff_address = action.payload.dropoff_address,
            state.dropoff_address_details = action.payload.dropoff_address_details,
            state.dropoff_lat = action.payload.dropoff_lat,
            state.dropoff_long = action.payload.dropoff_long,
            state.dropoff_person = action.payload.dropoff_person,
            state.dropoff_number = action.payload.dropoff_number,

            state.updated_at = action.payload.updated_at,
            state.vehicle_type = action.payload.vehicle_type,
            state.sender_payment = action.payload.sender_payment
            state.rider_profile = action.payload.rider_profile
            state.rider_account_id = action.payload.rider_account_id
            state.rider_name = action.payload.rider_name,
            state.app_transaction_id = action.payload.app_transaction_id,
            state.isMultipleDrop = action.payload.isMultipleDrop
            state.pickup_image = action.payload.pickup_image
            state.dropoff_image = action.payload.dropoff_image
            state.pickup_completed_at = action.payload.pickup_completed_at
            state.dropoff_completed_at = action.payload.dropoff_completed_at
            state.pickup_wrong_pin = action.payload.pickup_wrong_pin
            state.dropoff_wrong_pin = action.payload.dropoff_wrong_pin
            state.pickup_actual_lat = action.payload.pickup_actual_lat
            state.pickup_actual_long = action.payload.pickup_actual_long
            state.dropoff_actual_lat = action.payload.dropoff_actual_lat
            state.dropoff_actual_long = action.payload.dropoff_actual_long
            state.status = action.payload.status
            state.total_amount = action.payload.total_amount
        },
        // setHistoryMultiple: (state, action: PayloadAction<string>) => {
        //     state.multiplePayload = action.payload;
        // },
        setAppTransactionID: (state, action: PayloadAction<string>) => {
            state.app_transaction_id = action.payload;
        },
    }
},)

export const { setHistoryData, setAppTransactionID } = historySlice.actions

export default historySlice.reducer
