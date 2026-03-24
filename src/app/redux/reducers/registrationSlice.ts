import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../../Config"


export interface RegistrationState {
    account_ID: string
    regNumber:string 
    profile:string,
    uuid:string 
    signup_id:string
    token:string
    regOTP:string
    regFirstname:string
    regLastname:string
    regEmail:string
    regPassword:string
    regConfirm:string
    regGender:string
    regCity:string
    regNumberIsVerified:string
    regScreenStatus:string
    regDeviceID:string
}

const initialState: RegistrationState ={
    account_ID:"",
    regNumber: "",
    profile:"",
    uuid:"",
    signup_id:"",
    token:"",
    regOTP: "",
    regFirstname: "",
    regLastname: "",
    regEmail: "",
    regPassword: "",
    regConfirm: "",
    regGender: "",
    regCity: "",
    regNumberIsVerified: "",
    regScreenStatus: "",
    regDeviceID : ""
}

export const registrationSlice = createSlice({
    name:"registrationCounter/registrationSlice",
    initialState,
    reducers:{
        setDeviceID:(state, action:PayloadAction<string>) =>{
            state.regDeviceID= action.payload.toString();
        },
        setAccountId:(state, action:PayloadAction<string>) =>{
            state.account_ID= action.payload.toString();
        },

        //Account Details
        setNumber:(state, action:PayloadAction<string>) =>{
            state.regNumber= action.payload.toString();
        },

        // Response in  Send_otp that will be use in otp entry header
        setUUID:(state, action:PayloadAction<string>) =>{
            state.uuid = action.payload.toString();
        },

        setSignupID:(state, action:PayloadAction<string>) =>{
            state.signup_id = action.payload.toString();
        },

        setToken:(state, action:PayloadAction<string>) =>{
            state.token = action.payload.toString();
        },
        setOTP:(state, action:PayloadAction<string>) =>{
            state.regOTP = action.payload.toString();
        },


        setSaveDetils:(state, action:PayloadAction<{regNumber:string,profile:string,regFirstname:string,regLastname:string,regEmail:string,regGender:string,regCity:string}>) => {
            state.regNumber = action.payload.regNumber.toString();
            state.profile = action.payload.profile.toString();
            state.regFirstname = action.payload.regFirstname.toString();
            state.regLastname = action.payload.regLastname.toString();
            state.regEmail = action.payload.regEmail.toString();
            state.regGender = action.payload.regGender.toString();
            state.regCity = action.payload.regCity.toString();
        }
    },
        
    },)

    export const axiosAsync = createAsyncThunk(
        'axios/axiosAsync',
        async() => {
            try{
                const response = await axios.get(BASE_URL + "/admin/v1/user/services");
                return response.data; 
            }
            catch (err){
                console.error(err)
            }
        }   
    )

export const {setDeviceID,setNumber,setAccountId,setSaveDetils, setUUID, setSignupID, setToken, setOTP} = registrationSlice.actions

export default registrationSlice.reducer