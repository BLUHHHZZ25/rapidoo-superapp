import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import { mySchema } from "./model/schema"
import migrations from "./model/migrations"
import { Database } from "@nozbe/watermelondb"
import Registration from "./db/Registration"
import Parcel_Transaction from "./db/Parcel_Transaction"
import App_Info from "./db/App_Info"
import Services from "./db/Services"
import App_Updates from "./db/App_updates"
import Report_Issues from "./db/Report_issues"
import Booking from "./db/Booking"
import UpdateConfig from "./db/Update_Config"
import BookingDetails from "./db/Booking_Details"


export const adapter = new SQLiteAdapter({
    schema: mySchema,
    migrations,
    jsi: false, /* Platform.OS === 'ios' */
    onSetUpError: error => {
    }
})

export const database = new Database({
    adapter,
    modelClasses: [Registration,Parcel_Transaction,App_Info,Services,App_Updates,Report_Issues,Booking,UpdateConfig,BookingDetails],
})





