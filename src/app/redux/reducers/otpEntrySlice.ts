import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import uuid from 'react-native-uuid';
import { z_app_version, SIGN_APP_KEY, SIGN_APP_SECRET, z_app, z_app_code, z_app_type, LOCAL_BASE_URL } from "../../../Config";

export interface OtpEnterState {
    token: string | any
    status: 'idle' | 'loading' | 'done';
}

const initialState: OtpEnterState = {
    token: "",
    status: 'idle'
}

export const otpEnterSlice = createSlice({
    name: "sendOTP/otpEnterSlice",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
    extraReducers:builder => {
        builder
        .addCase(otpEntryFetch.pending, state => {
            state.status = 'loading';
            console.log("status: ", state.status);
        })
        .addCase(otpEntryFetch.fulfilled, (state, action) => {
            state.status = 'done';
            state.token = action.payload
        })
    },


},)

export const otpEntryFetch = createAsyncThunk(
    "sendOTP/sendOTPFetch",
    async ({register_number, token, otp}:{register_number:any, token:any, otp:any}) => {
        try {
            const url = 'http://10.0.2.2:9001/v1/user/signup/customer/otp/verify';
            const requestData = {
                phone_number:register_number , // Make sure this is valid
                otp: otp, // TODO: Dto papasok yung sa may otp
            };
    
            const headers = {
                'Content-type': 'application/json',
                'z-app': z_app,
                'uuid': token,
                'z-app-type': z_app_type,
                'z-app-version': z_app_version,
                'z-app-code': z_app_code,
                'z-app-key': SIGN_APP_KEY,
                'z-app-secret': SIGN_APP_SECRET,
                };

            const response = await axios.post(url, requestData, { headers });
            return console.log("here result", response.data);
        } catch (error) {
            console.log(error);
        }
    }
)


export const { setToken } = otpEnterSlice.actions

export default otpEnterSlice.reducer
