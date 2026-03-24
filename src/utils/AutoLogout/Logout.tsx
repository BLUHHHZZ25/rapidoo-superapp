import { useEffect } from "react";
import { deleteAll } from "../../app/watermelonDB/model/model";
import { resetGenericPassword } from "react-native-keychain";
import * as Keychain from 'react-native-keychain'

export async function AutoLogout() {
    async function deleteData(){
        const delete_profile = await deleteAll()
        const delete_key = await Keychain.resetGenericPassword()
        console.log("effect")
    }

    deleteData()
}