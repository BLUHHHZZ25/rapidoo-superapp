import { Text, View, VirtualizedList, ScrollView, TouchableOpacity, PermissionsAndroid } from "react-native"
// import { colors, spacing, text } from "../../../constants/theme"
import { colors, spacing, text } from "../../app/constants/theme"
import { Icon } from "@rneui/themed"
import { useEffect, useState } from "react"
import { PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { HomeElement } from "../navigations/HomeNavigation"

export default function PermissionScreen() {
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const [isContact, setContact] = useState(false)
    const [isNotification, setNotification] = useState(false)
    const [isLibrary, setLibrary] = useState(false)
    const [isLocation, setLocation] = useState(false)
    const [isDone, setDone] = useState(false)


    useEffect(()=>{
        checkPermission()
        if(isContact && isNotification && isLocation){
            setDone(true)
        }
    },[isContact,isNotification,isLibrary,isLocation])

    async function checkPermission() {
        const contact_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        const gps_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
        // const library_p2 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        const notification_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)


        // const save_p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        
        if(contact_p){
            setContact(true)
        }
        if(gps_p){
            setLocation(true)
        }
        if(notification_p){
            setNotification(true)
        }
    }
    
    async function permissionGPS() {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
        if(result === RESULTS.GRANTED){
            setLocation(true)
            console.log("Granted Location Permission")
            return "granted"
        }
    }
    async function permissionNotification() {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        if(result === RESULTS.GRANTED){
            setNotification(true)
            console.log("Granted Location Permission")
            return "granted"
        }
    }
    async function permissionContact() {
        const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS)
        if(result === RESULTS.GRANTED){
            setContact(true)
            console.log("Granted Location Permission")
            return "granted"
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: spacing.xl, justifyContent: 'space-between' }}>
                <View>

                </View>
                <TouchableOpacity onPress={() => navigationHome.goBack()} style={{ marginRight: spacing.l }} disabled = {isDone ? false : true}>
                    {
                    isDone ?
                        < Icon type="ionicon" name="close-outline" size={40} />
                    :
                        null
                    }
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: spacing.xl, marginLeft: spacing.l, width: "80%" }}>
                <Text style={[text.large, { fontWeight: '700', color: colors.blackText }]}>
                    Permissions
                </Text>
                <Text style={[text.normal, { color: colors.grayText, marginTop: spacing.s }]}>
                    To enhance your experience, please allow permission in the app settings
                </Text>
            </View>

            <View style={{ width: "100%", marginTop: spacing.xxl }}>
                <ScrollView>
                    <View style={{ height: 'auto' }}>
                        <View style={{ width: "85%", marginLeft: spacing.l, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', height: "80%", alignSelf: 'center' }}>
                                <Icon type="ionicon" name="people-outline" size={35} />
                                <Text style={[text.normal, { alignSelf: 'center', marginLeft: spacing.m, color: colors.blackText, fontWeight: '700' }]}>Contact</Text>
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                {
                                    isContact ?
                                        <TouchableOpacity style={{ backgroundColor: colors.lightGreen, width: 100, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} disabled={true}>
                                            <Icon type="ionicon" name="checkmark" color={colors.light} size={30} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={permissionContact} style={{ backgroundColor: colors.orange, width: 100, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                            <Text style={[text.normal, { color: colors.light, alignSelf: 'center', fontWeight: '700' }]}>
                                                Allow
                                            </Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={{ borderColor: colors.gray, borderWidth: 1, marginVertical: spacing.m, width: "90%", alignSelf: 'center' }} />
                        <View style={{ width: "85%", marginLeft: spacing.l, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', height: "80%", alignSelf: 'center' }}>
                                <Icon type="ionicon" name="notifications-outline" size={35} style={{}} />
                                <Text style={[text.normal, { alignSelf: 'center', marginLeft: spacing.m, color: colors.blackText, fontWeight: '700' }]}>Push Notifications</Text>
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                {
                                    isNotification ?
                                        <TouchableOpacity style={{ backgroundColor: colors.lightGreen, width: 100, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} disabled={true}>
                                            <Icon type="ionicon" name="checkmark" color={colors.light} size={30} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={permissionNotification} style={{ backgroundColor: colors.orange, width: 100, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                            <Text style={[text.normal, { color: colors.light, alignSelf: 'center', fontWeight: '700' }]}>
                                                Allow
                                            </Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={{ borderColor: colors.gray, borderWidth: 1, marginVertical: spacing.m, width: "90%", alignSelf: 'center' }} />
                        {/* <View style={{ borderColor: colors.gray, borderWidth: 1, marginVertical: spacing.m, width: "90%", alignSelf: 'center' }} /> */}
                        <View style={{ width: "85%", marginLeft: spacing.l, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', height: "80%", alignSelf: 'center' }}>
                                <Icon type="ionicon" name="location-outline" size={35} style={{}} />
                                <Text style={[text.normal, { alignSelf: 'center', marginLeft: spacing.m, color: colors.blackText, fontWeight: '700' }]}>Location</Text>
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                {
                                    isLocation ?
                                        <TouchableOpacity style={{ backgroundColor: colors.lightGreen, width: 100, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} disabled={true}>
                                            <Icon type="ionicon" name="checkmark" color={colors.light} size={30} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={permissionGPS} style={{ backgroundColor: colors.orange, width: 100, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                            <Text style={[text.normal, { color: colors.light, alignSelf: 'center', fontWeight: '700' }]}>
                                                Allow
                                            </Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}