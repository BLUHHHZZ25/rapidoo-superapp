import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface TransactionOrderState {
    websocketMessage: string,
    transaction_id: string,
    multipleIndex: any,
    accept_transaction: string
    dropoff_payload: string,
    id: string,
    transactionReturn: string
    riderDetails: string,
    riderPic:string
    bookingStatus: string
    wrongPinStatus: string
    progress_transaction : any
    contact_details: any
    address_name: string
    address: string
    coupons: string | any
    Price: string | any
    discountedPrice: string | any
    pickupAddress: any
    dropoffAddress: any
    totalAmount: any
    isForm: any,
    tip:any,
    scheduled_at: any,
    schedule_order: any,
    is_schedule: boolean
    
}

const initialState: TransactionOrderState = {
    websocketMessage: "",
    transaction_id: "",
    multipleIndex: "",
    accept_transaction: "",
    dropoff_payload: "",
    id: "",
    transactionReturn: "",
    riderDetails: "",
    riderPic: "",
    bookingStatus: "",
    wrongPinStatus: "",
    progress_transaction: {},
    contact_details: "",
    address_name: "",
    address: "",
    coupons: false,
    Price: false,
    discountedPrice: false,
    pickupAddress: "",
    dropoffAddress: "",
    totalAmount: "",
    isForm: false,
    tip: false,
    scheduled_at: "",
    schedule_order: null,
    is_schedule: false
}

export const TransactionOrderSlice = createSlice({
    name: "transactionOrder/TransactionOrderState",
    initialState,
    reducers: {
        setWebsocketMessage: (state, action: PayloadAction<string>) => {
            state.websocketMessage = action.payload;
        },  
        setTransactionID: (state, action: PayloadAction<string>) => {
            state.transaction_id = action.payload;
        },

        setMultipleIndex: (state, action: PayloadAction<string>) => {
            state.multipleIndex = action.payload;
        },
        setAcceptTransaction: (state, action: PayloadAction<string>) => {
            state.accept_transaction = action.payload;
        },
        setDropPayload: (state, action: PayloadAction<string>) => {
            state.dropoff_payload = action.payload;
        },
        setID: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setTransactionReturn: (state, action: PayloadAction<string>) => {
            state.transactionReturn = action.payload;
        },
        setRiderDetails: (state, action: PayloadAction<any>) => {
            state.riderDetails = action.payload;
        },
        setRiderPic: (state, action: PayloadAction<any>) => {
            state.riderPic = action.payload;
        },
        setBookingStatus:(state, action: PayloadAction<any>) => {
            state.bookingStatus = action.payload;
        },
        setWrongPinStatus:(state, action: PayloadAction<any>) => {
            state.wrongPinStatus = action.payload;
        },
        setProgressTransaction:(state, action: PayloadAction<any>) => {
            state.progress_transaction = action.payload;
        },
        setContactDetails:(state, action: PayloadAction<any>) => {
            state.contact_details = action.payload;
        },
        setCustomerAddress: (state, action: PayloadAction<{address_name:string, address:string}>) => {
            state.address_name = action.payload.address_name;
            state.address = action.payload.address;
        },
        setCoupons: (state, action: PayloadAction<any>) => {
            state.coupons = action.payload;
        },
        setPrice: (state, action: PayloadAction<any>) => {
            state.Price = action.payload;
        },
        setDiscountedPrice: (state, action: PayloadAction<any>) => {
            state.discountedPrice = action.payload;
        },
        setScheduleAt: (state, action: PayloadAction<any>) => {
            state.scheduled_at = action.payload;
        },
        setScheduleOrder: (state, action: PayloadAction<any>) => {
            state.schedule_order = action.payload;
        },
        setIsSchedule: (state, action: PayloadAction<boolean>) => {
            state.is_schedule = action.payload;
        },
        setReviewOrder: (state, action: PayloadAction<{
            pickupAddress:any, dropoffAddress:any, totalAmount:any, isForm:any, tip:any
        }>) => {
            state.pickupAddress = action.payload.pickupAddress;
            state.dropoffAddress = action.payload.dropoffAddress;
            state.totalAmount = action.payload.totalAmount;
            state.isForm = action.payload.isForm;
            state.tip = action.payload.tip;
        },
        setResetTransactionOrder(state){
            return initialState
        }
        
    },
},)

export const { 
    setWebsocketMessage,
    setTransactionID, 
    setMultipleIndex,
    setAcceptTransaction, 
    setTransactionReturn, 
    setID,
    setRiderDetails, 
    setRiderPic, 
    setBookingStatus,
    setWrongPinStatus,
    setProgressTransaction,
    setContactDetails,
    setResetTransactionOrder,
    setDropPayload,
    setCoupons,
    setPrice,
    setScheduleAt,
    setScheduleOrder,
    setIsSchedule,
    setReviewOrder,
    setDiscountedPrice,
    setCustomerAddress} = TransactionOrderSlice.actions
export default TransactionOrderSlice.reducer