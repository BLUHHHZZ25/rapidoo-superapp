import { Q } from "@nozbe/watermelondb";
import { adapter, database } from "..";
import Registration from "../db/Registration";
import Post from "../db/Registration";
import App_Info from "../db/App_Info";
import Services from "../db/Services";
import CrashlyticsErrorHandler from "../../../utils/Crashlytics/CrashlyticsErrorHandler";
import App_Updates from "../db/App_updates";
import Report_Issues from "../db/Report_issues";
import Booking from "../db/Booking";
import UpdateConfig from "../db/Update_Config";
import BookingDetails from "../db/Booking_Details";


adapter
database

type Props = {
    sample: string;
    second: string;
}
const todoData = {
    sample: "Title of the todo",
    second: "Subtitle of the todo"
};

// TODO: GET ALL ACCOUNT
export async function getAllPosts() {
    const postsCollection = database.collections.get<Registration>('registration');
    const posts = await postsCollection.query().fetch();
    return posts;
}

// TODO: DELETE ALL ACCOUNTS
export async function deleteAllAccounts() {
    await database.write(async () => {
        const postsCollection = database.collections.get<Registration>('registration');
        const posts = await postsCollection.query().destroyAllPermanently();
        return console.log({"Success": true, "message": "Delete All Accounts"})
    })
}

// TODO: UPDATE ACCOUNT
export async function updateRegistration({
    accountID,
    first_name,
    last_name,
    gender,
    city,
    profile_pic
}: {accountID:string|undefined, first_name: string, last_name: string,gender:string ,city:string, profile_pic:string}) {
    try {
        await database.write(async () => {
            const todoCollect = await database.get<Registration>('registration').find(accountID!);
            await todoCollect.update(require => {
                require.firstname = first_name,
                require.lastname = last_name,
                require.gender = gender,
                require.city = city,
                require.profile = profile_pic
            })
            console.log(todoCollect);
        })
        
        
    } catch (error) {
        CrashlyticsErrorHandler(error, 'model', 'updateRegistration');
        console.error(error);
    }
}

// GET ALL BOOKING
export async function getAllBooking() {
    const postsCollection = database.collections.get<Booking>('booking');
    const posts = await postsCollection.query().fetch();
    return posts.map( data => data._raw);
}

// GET LATEST BOOKING
export async function getLatestBooking() {
    const lastRecord = await database
    .get('booking')
    .query(Q.sortBy('created_at', Q.desc), Q.take(1))
    .fetch();
  return lastRecord
}

// POST BOOKING
export async function postBooking({
    pickupAddress,
    multipleAddress
}:{
    pickupAddress: object,
    multipleAddress: object
}) {
    try{
        await database.write(async () => {
            const update_data = await database.get<Booking>('booking').create(res =>{
                res.pickupAddressJson = JSON.stringify(pickupAddress);
                res.multipleAddressJson = JSON.stringify(multipleAddress);
            })
        })
    } catch(error){
        console.error(error);
    }
}

// CLEAR BOOKING
export async function clearBooking() {
    await database.write(async () => {
        const deleteItem = await database.get<Booking>('booking').query().destroyAllPermanently();
    })
}

export async function getAccountDetails({account_id}:{account_id:string}) {
    const postsCollection = database.collections.get<Registration>('registration').find(account_id);
    const posts = await postsCollection
    return posts;
}

export async function FindID({regNum}:{regNum:string}) {
    const postsCollection = database.collections.get<Registration>('registration');
    const posts = await postsCollection.query(
        Q.where('register_number', regNum ),
    ).fetchIds();
    return posts
}

// ! REMOVE THIS CODE
export async function findAccount({email,password}:{email:string, password:string}) {
    const postsCollection = database.collections.get<Registration>('registration');
    const posts = await postsCollection.query(
        Q.where('email', email ),
        Q.where('password', password ),
    ).fetchCount();
    return posts;
}

// ! REMOVE THIS CODE
export async function existNumber({register_number}:{register_number:string}) {
    const postsCollection = database.collections.get<Registration>('registration');
    const posts = await postsCollection.query(
        Q.where('register_number', register_number ),
    ).fetchCount();
    return posts;
}

export async function GetAccountID({email}:{email:string}) {
    const postsCollection = database.collections.get<Registration>('registration');
    const posts = await postsCollection.query(
        Q.where('email', email ),
    ).fetchIds();
    return posts
}


//Update the Drivers License
// TODO: REGISTRATION ACCOUNT AND PROFILE
export async function createRegistration({
    register_number,
    profile,
    referral_code,
    firstname,
    lastname,
    email,
    gender,
    city,
}: {register_number:string,profile:string, referral_code:string,firstname:string,lastname:string, email:string, gender:string, city:string}) {
    try {
        await database.write(async () => {
            const todoCollect = await database.get<Registration>('registration').create(require => {
                require.register_number =register_number,
                require.profile = profile,
                require.referral_code = referral_code,
                require.firstname = firstname,
                require.lastname = lastname,
                require.email = email,
                require.gender = gender,
                require.city = city
            })
        })
        return {
            "code": "200",
            "message": "save profile"
        }
    } catch (error) {
        console.error(error);
        console.log(firstname);
        console.log(lastname);
    }
}

// export async function deleteAll() {
//     await database.write( async () => {
//         const deleteItem = await database.get<Post>('table').query().fetch();
//          return deleteItem.map(allItems => allItems.prepareDestroyPermanently)
//     })
// }
export async function deleteAll() {
    await database.write(async () => {
        const deleteItem = await database.get<Registration>('registration').query().destroyAllPermanently();
    })
}

// App Info
export async function getCountAppInfo() {
    const postsCollection = database.collections.get<App_Info>('app_info').query().fetchCount();
    return postsCollection;
}

export async function getAppInfo() {
    const postsCollection = database.collections.get<App_Info>('app_info').query().fetch();
    return postsCollection;
}

export async function getIdAppInfo({device_id}:{device_id:string}) {
    const postsCollection = database.collections.get<App_Info>('app_info');
    const posts = await postsCollection.query().fetchIds();
    return posts
}

export async function postAppInfo({
    device_id,
}:{device_id:string}) {
    try{
        await database.write(async () =>{
            const update_data = await database.get<App_Info>('app_info').create(res =>{
                res.device_id = device_id;
            })
        })
    } catch(error){
        console.error(error);
    }
}

export async function patchAppInfo({
    id,
    uuid
}: {
    id: string,
    uuid:string | number[]
}) {
    try {
        await database.write(async () => {
            const todoCollect = await database.get<App_Info>('app_info').find(id!);
            await todoCollect.update(res => {
                res.uuid = uuid;
            })
        })
    } catch (error) {
        console.error(error);
    }
}

// * Services =========================================================
//TODO: SERVICES 

// TODO: COUNT SERVICES
export async function getCountServices() {
    const postsCollection = database.collections.get<Services>('services').query().fetchCount();
    return postsCollection;
}

// TODO: GET ID SERVICES
export async function getIDServices() {
    const postsCollection = database.collections.get<Services>('services').query().fetchIds();
    return postsCollection;
}

// TODO: GET SERVICES
export async function getServices() {
    // const postsCollection = database.collections.get<Services>('services').query().unsafeFetchRaw();
    // return postsCollection;
    const lastRecord = await database
    .get('services')
    .query(Q.sortBy('created_at', Q.desc), Q.take(1))
    .fetch();
  return lastRecord
}

// TODO: GET UPDATE CONFIG
export async function getUpdateConfig({config_name}:{config_name:string}) {
    const lastRecord = await database
    .get('update_config')
    .query(
        Q.where('config_name', config_name),
        Q.sortBy('created_at', Q.desc), 
        Q.take(1)
    )
    // .query(Q.sortBy('created_at', Q.desc), Q.take(1))
    .fetch();
  return lastRecord
}

// TODO: CREATE UPDATE CONFIG
export async function createUpdateConfig({
    config_name,
    update_version
}:{
    config_name:string,
    update_version: string
}) {
    try{
        await database.write(async () =>{
            const update_data = await database.get<UpdateConfig>('update_config').create(res =>{
                res.config_name = config_name;
                res.update_version = update_version
            })
        })
    } catch(error){
        console.error(error);
    }
}

// TODO: DELETE UPDATE CONFIG
export async function deleteUpdateConfig() {
    await database.write(async () => {
        const deleteItem = await database.get<UpdateConfig>('update_config').query().destroyAllPermanently();
    })
}


export async function deleteServices() {
    await database.write(async () => {
        const deleteItem = await database.get<Services>('services').query().destroyAllPermanently();
    })
}

export async function postServices({
    services
    
}:{
    services : any
}) {
    try{
        await database.write(async () => {
            const update_data = await database.get<Services>('services').create(res =>{
                res.services = services
            })
        })
    } catch(error){
        console.error(error);
    }
}

// export async function postServices({
//     service_id,
//     name,
//     key,
//     is_active,
//     status,
//     img,
//     version,
    
// }:{
//     service_id:string, 
//     name:string, 
//     key:string, 
//     is_active:Boolean, 
//     status:string, 
//     img:string,
//     version:string
// }) {
//     try{
//         await database.write(async () => {
//             const update_data = await database.get<Services>('services').create(res =>{
//                 res.service_id = service_id;
//                 res.name = name;
//                 res.key = key;
//                 res.is_active = is_active;
//                 res.status = status;
//                 res.img = img;
//                 res.version = version;
//             })
//         })
//     } catch(error){
//         console.error(error);
//     }
// }

// export async function patchServices({
//     id,
//     service_id,
//     name,
//     key,
//     is_active,
//     status,
//     img,
//     version,
// }: {
//     id:string
//     service_id:string, 
//     name:string, 
//     key:string, 
//     is_active:Boolean, 
//     status:string, 
//     img:string,
//     version:string
// }) {
//     try {
//         await database.write(async () => {
//             const todoCollect = await database.get<Services>('services').find(id!);
//             await todoCollect.update(res => {
//                 res.service_id = service_id;
//                 res.name = name;
//                 res.key = key;
//                 res.is_active = is_active;
//                 res.status = status;
//                 res.img = img;
//                 res.version = version;
//             })
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }


// * AppUpdates  =================================================================
// TODO: APP UPDATES


//  TODO: COUNT APPUPDATES
export async function getCountAppUpdates() {
    const postsCollection = database.collections.get<App_Updates>('app_updates').query().fetchCount();
    return postsCollection;
}

// TODO: GET ID APP UPDATES
export async function getIDAppUpdates() {
    const postsCollection = database.collections.get<App_Updates>('app_updates').query().fetchIds();
    return postsCollection;
}

// TODO: GET ALL APP UPDATES
export async function getAppUpdates() {
    const postsCollection = database.collections.get<App_Updates>('app_updates').query().unsafeFetchRaw();
    // return postsCollection;
    const lastRecord = await database
    .get('app_updates')
    .query(Q.sortBy('created_at', Q.desc), Q.take(1))
    .fetch();
  return lastRecord
}

export async function deleteAppUpdates() {
    await database.write(async () => {
        const postsCollection = database.collections.get<App_Updates>('app_updates');
        const posts = await postsCollection.query().destroyAllPermanently();
        return console.log({"Success": true, "message": "Delete All Accounts"})
    })
}

// TODO: POST APP UPDATE
export async function postAppUpdates({
    phone_number,
    app_services,
    app_merchants,
    app_sku_foods
}:{
    phone_number: string, 
    app_services: string, 
    app_merchants: string, 
    app_sku_foods: string
}) {
    try{
        await database.write(async () => {
            const update_data = await database.get<App_Updates>('app_updates').create(res =>{
                res.phone_number = phone_number;
                res.app_services = app_services;
                res.app_merchants = app_merchants;
                res.app_sku_foods = app_sku_foods;
            })
            return update_data;
        })
    } catch(error){
        console.error(error);
    }
}

export async function patchAppUpdates({
    id,
    updates_id,
    app_services,
    app_merchants,
    app_sku_foods
}: {
    id: string,
    updates_id:string | number[],
    app_services:string | number[],
    app_merchants:string | number[],
    app_sku_foods:string | number[],
}) {
    try {
        await database.write(async () => {
            const todoCollect = await database.get<App_Updates>('app_updates').find(id!);
            await todoCollect.update(res => {
                res.updates_id = updates_id
                res.app_services = app_services;
                res.app_merchants = app_merchants;
                res.app_sku_foods= app_sku_foods;
            })
        })
    } catch (error) {
        console.error(error);
    }
}


// * Report Issues ====================================================

export async function getReportIssues() {
    const postsCollection = database.collections.get<Report_Issues>('report_issues').query().fetchCount();
    return postsCollection;
}


// ? BOOKING DETAILS

export async function postBookingDetails({
    address_name,
    address_details,
    recipient_number,
    recipient_name
    
}:{
    address_name: string,
    address_details: string,
    recipient_number: string,
    recipient_name: string
}) {
    try{
        await database.write(async () => {
            const update_data = await database.get<BookingDetails>('booking_details').create(res =>{
                res.address_name = address_name;
                res.address_details = address_details;
                res.recipient_number = recipient_number;
                res.recipient_name = recipient_name;
            })
        })
    } catch(error){
        console.error(error);
    }
}

export async function getBookingDetails({address_name}:{address_name:string}) {
    const lastRecord = await database
    .get('booking_details')
    .query(
        Q.where('address_name', address_name),
        Q.sortBy('created_at', Q.desc), 
        Q.take(1)
    )
    // .query(Q.sortBy('created_at', Q.desc), Q.take(1))
    .fetch();
  return lastRecord
}