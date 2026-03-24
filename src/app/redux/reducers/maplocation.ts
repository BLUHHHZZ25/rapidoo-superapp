import { action } from "@nozbe/watermelondb/decorators"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface MaplocationState {
    name: string,
    rider_account_id: string,
    rider_name: string,
    address: string,
    pickupName : string,
    pickupPlace: string,
    pickupFullAddress: string,
    pickUpAddress : string,
    pickupLatitude: number,
    pickupLongitude: number,
    place_id: string,
    dropOffName: string,
    dropOffPlace: string,
    dropOffFullAddress: string,
    dropOffAddress: string,
    dropOffLatitude: number,
    dropoffLongitude: number,
    pickupCNumber:string,
    pickupCName:string,
    pickupAddressDetails: string,
    dropoffCNumber:string,
    dropoffCName:string,
    dropoffAddressDetails: string,
    searchAddressScreen: string,
    senderPayment: string,
    notes: string,
    distance: number,
    multipleInput: string,
    multipleDropID: number,
    multipleLatitude: number,
    multipleLongitude: number,
    multiplePlace: string,
    multipleFullAddress: string,
    multiplePayload: string,
    saveContactNum: string,
    saveContactName: string
}

const initialState: MaplocationState = {
    name: "",
    rider_account_id: "",
    rider_name: "",
    address: "",
    place_id: "",
    pickupName: "",
    pickupPlace: "",
    pickupFullAddress: "",
    pickUpAddress: "Enter Pickup Address",
    pickupLatitude: 0,
    pickupLongitude: 0,
    dropOffName: "",
    dropOffPlace: "",
    dropOffFullAddress: "",
    dropOffAddress: "Enter Drop-off Address",
    dropOffLatitude: 0,
    dropoffLongitude: 0,
    pickupCNumber:"Contact Number",
    pickupCName:"Contact Person",
    pickupAddressDetails: "",
    dropoffCNumber:"Contact Number",
    dropoffCName:"Contact Person",
    dropoffAddressDetails: "",
    searchAddressScreen:"",
    senderPayment:"Pickup",
    notes: "",
    distance: 0,
    multipleInput: "",
    multipleDropID: 0,
    multipleLatitude: 0,
    multipleLongitude: 0,
    multiplePlace: "",
    multipleFullAddress: "",
    multiplePayload: "[]",
    saveContactNum: "",
    saveContactName: ""
}

export const maplocationSlice = createSlice({
    name: "maplocation/maplocationSlice",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<{name:string, address:string,  pickupLatitude: number, pickupLongitude: number, dropOffLatitude: number, dropoffLongitude: number}>) => {
            state.name = action.payload.name;
            state.address = action.payload.address;
            state.pickupLatitude = action.payload.pickupLatitude;
            state.pickupLongitude = action.payload.pickupLongitude;
            state.dropOffLatitude = action.payload.dropOffLatitude;
            state.dropoffLongitude = action.payload.dropoffLongitude;
        },
        setPickup: (state, action: PayloadAction<{pickupName: string, pickUpAddress: string, pickupLatitude: number, pickupLongitude: number, pickupCNumber:string, pickupCName:string, pickupAddressDetails:string}>) => {
            // state.place_id = action.payload.place_id;
            state.pickupName = action.payload.pickupName;
            state.pickUpAddress = action.payload.pickUpAddress;
            state.pickupLatitude = action.payload.pickupLatitude;
            state.pickupLongitude = action.payload.pickupLongitude;
            state.pickupCNumber = action.payload.pickupCNumber;
            state.pickupCName = action.payload.pickupCName;
            state.pickupAddressDetails = action.payload.pickupAddressDetails;
        },
        setDropoff: (state, action: PayloadAction<{dropOffName: string, dropOffAddress: string, dropOffLatitude: number, dropoffLongitude: number,dropoffCNumber:string, dropoffCName:string,dropOffAddressDetails:string}>) => {
            state.dropOffName = action.payload.dropOffName;
            state.dropOffAddress = action.payload.dropOffAddress;
            state.dropOffLatitude = action.payload.dropOffLatitude;
            state.dropoffLongitude = action.payload.dropoffLongitude;
            state.dropoffCNumber = action.payload.dropoffCNumber;
            state.dropoffCName = action.payload.dropoffCName;
            state.dropoffAddressDetails = action.payload.dropOffAddressDetails
        },
        setMultiple: (state, action: PayloadAction<string>) => {
            state.multiplePayload = action.payload;
        },
        setSearchScreen: (state, action: PayloadAction<string>) => {
            state.searchAddressScreen = action.payload;
        },
        setPickupLatLong: (state, action: PayloadAction<{latitudepickup:number, longitudepickup:number, pickupPlace: string, pickupFullAddress: string, place_id: string}>) => {
            state.place_id = action.payload.place_id;
            state.pickupLatitude = action.payload.latitudepickup;
            state.pickupLongitude = action.payload.longitudepickup;
            state.pickupPlace = action.payload.pickupPlace;
            state.pickupFullAddress = action.payload.pickupFullAddress;
        },
        setDropoffLatLong: (state, action: PayloadAction<{latitude:number, longitude:number, dropOffPlace: string, dropOffFullAddress:string}>) => {
            state.dropOffLatitude = action.payload.latitude;
            state.dropoffLongitude = action.payload.longitude;
            state.dropOffPlace = action.payload.dropOffPlace;
            state.dropOffFullAddress = action.payload.dropOffFullAddress;
        },
        setSenderPayment: (state, action: PayloadAction<string>) => {
            state.senderPayment = action.payload
        },
        setSenderNotes: (state, action: PayloadAction<string>) => {
            state.notes = action.payload
        },
        setDistance: (state, action: PayloadAction<number>) => {
            state.distance = action.payload
        },
        setMultipleLatLong: (state, action: PayloadAction<{latitudeMultiple:number, longitudeMultiple:number, placeMultiple: string, fullAddressMultiple:string, place_id: string}>) => {
            state.place_id = action.payload.place_id;
            state.multipleLatitude = action.payload.latitudeMultiple;
            state.multipleLongitude = action.payload.longitudeMultiple;
            state.multiplePlace = action.payload.placeMultiple;
            state.multipleFullAddress = action.payload.fullAddressMultiple;
        },
        setMultipleInput: (state, action: PayloadAction<string>) => {
            state.multipleInput = action.payload
        },
        setMultipleID: (state, action: PayloadAction<number>) => {
            state.multipleDropID = action.payload
        },
        setRiderInfo: (state, action: PayloadAction<{rider_account_id: string, rider_name: string}>) => {
            state.rider_account_id = action.payload.rider_account_id;
            state.rider_name = action.payload.rider_name;
        },
        setContactDetails: (state, action: PayloadAction<{saveContactNum: string, saveContactName: string}>) => {
            state.saveContactNum = action.payload.saveContactNum;
            state.saveContactName = action.payload.saveContactName;
        },
        setPlaceID: (state, action: PayloadAction<string>) => {
            state.place_id = action.payload
        },
    },

},)


export const { 
    setLocation, 
    setPickup, 
    setDropoff, 
    setSearchScreen, 
    setPickupLatLong, 
    setDropoffLatLong,
    setSenderPayment,
    setSenderNotes,
    setDistance,
    setMultipleInput,
    setMultipleLatLong,
    setMultiple,
    setMultipleID,
    setRiderInfo,
    setContactDetails,
    setPlaceID
} = maplocationSlice.actions

export default maplocationSlice.reducer
