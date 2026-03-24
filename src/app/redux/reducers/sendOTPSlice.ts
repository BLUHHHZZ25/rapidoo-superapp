import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import uuid from 'react-native-uuid';
import { z_app_version, SIGN_APP_KEY, SIGN_APP_SECRET, z_app, z_app_code, z_app_type } from "../../../Config";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";

export interface SentOTPState {
    token: string | any
    status: 'idle' | 'loading' | 'done';
}

const initialState: SentOTPState = {
    token: "",
    status: 'idle'
}

export const sendOTPSlice = createSlice({
    name: "sendOTP/sendOTPSlice",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
    extraReducers:builder => {
        builder
        .addCase(sendOTPFetch.pending, state => {
            state.status = 'loading';
            console.log("status: ", state.status);
        })
        .addCase(sendOTPFetch.fulfilled, (state, action) => {
            state.status = 'done';
            state.token = action.payload
        })
    },


},)

export const sendOTPFetch = createAsyncThunk(
    "sendOTP/sendOTPFetch",
    async (register_number: any) => {
        try {
            const url = "http://10.0.2.2:9000/v1/user/signup/customer"
            const requestData = {
                phone_number: register_number,
                uuid: uuid.v4(),
                start: new Date().toISOString(),
            };

            const headers = {
                'Content-type': 'application/json',
                'z-app': 'rapidoo-superapp',
                'z-app-type': 'android',
                'z-app-version': z_app_version,
                'z-app-code': '0.0.1',
                'z-app-key': SIGN_APP_KEY,
                'z-app-secret': SIGN_APP_SECRET,
            };

            const response = await axios.post(url, requestData, { headers });
            return response.data.data.token;
            // return console.log(response.data.data.token);

        } catch (error) {
            console.log(error);
        }
    }
)

export const otpEntryFetch = createAsyncThunk(
    "sendOTP/sendOTPFetch",
    async ({register_number, token, otp}:{register_number:any, token:any, otp:any}) => {
        try {
            const url = 'http://10.0.2.2:9000/v1/user/signup/customer/otp/verify';
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
            // return (await response).data;
            return console.log("here result", response.data);
        } catch (error) {
            console.log(error);
        }
    }
)


export const { setToken } = sendOTPSlice.actions

export default sendOTPSlice.reducer
