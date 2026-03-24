import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface WalletState {
    redirect_url : string,
    reference_id:string,
    payment_reference_id: string,
    redirect_uri: string,
    code: string | (string | null)[] | null,
    option: string, // union-bank - paymongo
    type: string, // gcash
    img: string,
    rate: number
}

const initialState: WalletState ={
    redirect_url : "",
    reference_id:"",
    payment_reference_id: "",
    redirect_uri: "",
    code: "",
    option: "", // union-bank - paymongo
    type: "", // gcash
    img: "",
    rate: 0
}

export const walletSlice = createSlice({
    name:"wallet/walletSlice",
    initialState,
    reducers:{
        setCashInURL:(state, action:PayloadAction<string>) =>{
            state.redirect_url= action.payload.toString();
        },
        
        setPaymentData:(state, action:PayloadAction<{reference_id:string, payment_reference_id:string, redirect_uri:string, code: string| (string | null) [] | null}>) =>{
            state.reference_id= action.payload.reference_id.toString();
            state.payment_reference_id= action.payload.payment_reference_id.toString();
            state.redirect_uri= action.payload.redirect_uri.toString();
            state.code = action.payload.code
        },
        
        setPaymentMethod:(state, action:PayloadAction<{option:string, type:string, img:string, rate:number}>) =>{
            state.option = action.payload.option.toString();
            state.img = action.payload.img.toString();
            state.rate = action.payload.rate;
            state.type = action.payload.type.toString();
        }
        
    },
    },)


export const {setCashInURL, setPaymentData, setPaymentMethod} = walletSlice.actions

export default walletSlice.reducer