import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import uuid from 'react-native-uuid';
import { z_app_version, SIGN_APP_KEY, SIGN_APP_SECRET, z_app, z_app_code, z_app_type, autorization } from "../../../Config";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";

export interface SignInState {
    token: string | any
    status: 'idle' | 'loading' | 'done';
}

const initialState: SignInState = {
    token: "",
    status: 'idle'
}

export const signInSlice = createSlice({
    name: "sendOTP/signInSlice",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
    extraReducers:builder => {
        builder
        .addCase(signInFetch.pending, state => {
            state.status = 'loading';
            console.log("status: ", state.status);
        })
        .addCase(signInFetch.fulfilled, (state, action) => {
            state.status = 'done';
            state.token = action.payload
        })
    },


},)

export const signInFetch = createAsyncThunk(
    "sendOTP/signInFetch",
    async ({first_name, last_name, email, password, confirm_password, referral_code, token}:{first_name:string, last_name:string, email:string, password: string, confirm_password: string, referral_code: string, token:any}) => {
        try {
            const url = 'http://10.0.2.2:9001/v1/user/signup/customer/account/update';
            const requestData = {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password,
                'confirm_password': confirm_password,
                'referral_code': referral_code
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
                'Autorization': autorization
                };

            const response = await axios.post(url, requestData, { headers });
            // return (await response).data;
            return console.log("here result", response.data);
        } catch (error) {
            console.log(error);
        }
    }
)


export const { setToken } = signInSlice.actions

export default signInSlice.reducer
