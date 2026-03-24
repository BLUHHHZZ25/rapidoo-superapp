import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface RegistrationState {
    account_ID: string
    regNumber:string 
    regOTP:string
    regFullName:string
    regEmail:string
    regPassword:string
    regConfirm:string
    regBirthday:string
    regGender:string
    regCity:string
    regNumberIsVerified:string
    regScreenStatus:string
    regDeviceID:string
}

const initialState: RegistrationState ={
    account_ID:"",
    regNumber: "",
    regOTP: "",
    regFullName: "",
    regEmail: "",
    regPassword: "",
    regConfirm: "",
    regBirthday: "",
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
        setNumber:(state, action:PayloadAction<string>) =>{
            state.regNumber= action.payload.toString();
        }
    },
        
    },)


export const {setDeviceID,setNumber} = registrationSlice.actions

export default registrationSlice.reducer