import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface AppInfoState {
    device_id: string
    id: string,
    isUserConnected: string,
    isUserOnline: string
}

const initialState: AppInfoState ={
    device_id: "",
    id: "",
    isUserConnected: "connected",
    isUserOnline: ""
}

export const appInfoSlice = createSlice({
    name:"appInfo/appInfoSlice",
    initialState,
    reducers:{
        setDeviceID:(state, action:PayloadAction<string>) =>{
            state.device_id= action.payload
        },
        setTableID:(state, action:PayloadAction<string>) =>{
            state.id= action.payload
        },
        setUserConnected:(state, action:PayloadAction<string>) =>{
            state.isUserConnected= action.payload
        },
        setUserOnline:(state, action:PayloadAction<string>) =>{
            state.isUserOnline= action.payload
        },
    },
        
    },)


export const {setDeviceID, setTableID, setUserConnected, setUserOnline} = appInfoSlice.actions

export default appInfoSlice.reducer