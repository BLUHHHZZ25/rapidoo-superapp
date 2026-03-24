import { Image, ScrollView, Text, TouchableOpacity, View, FlatList } from "react-native"
import DefaultHeader from "../common/DefaultHeader"
import { colors, spacing, text } from "../../app/constants/theme"
import { default_profile } from "../../app/assets/img/images"
// import Contacts from 'react-native-contacts';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { setContactDetails } from "../../app/redux/reducers/transactionOrder";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElement } from "../navigations/Navigation";
import { HomeElement } from "../navigations/HomeNavigation";


export default function ContactsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const [contacts, setContacts] = useState([])
    const [isAphabet, setAphabet] = useState("")
    const usedispatch = useDispatch<AppDispatch>();

    // useEffect(() => {
    //     const loadContacts = () => {
    //         Contacts.getAll()
    //             .then((contacts: any) => {
    //                 setContacts(contacts);
    //                 console.log("\n\n contacts", contacts);

    //             })
    //             .catch((e) => {
    //                 console.log('Error loading contacts', e);
    //             });
    //     };
    //     loadContacts()

    // }, [])

    const sortedData = [...contacts].sort((a: any, b: any) => a.displayName.localeCompare(b.displayName))

    return (
        <View style={{ flex: 1 }}>
            <DefaultHeader titleName={"Contacts"} onPress={() => {navigation.goBack() }} />
            <View style={{ height: '95%', width: '100%', marginTop: spacing.s, paddingBottom: spacing.l }}>

                <FlatList
                    data={sortedData}
                    style={{ width: "100%" }}
                    renderItem={({ item}: { item: { displayName: string, phoneNumbers: any } }) => {

                        return (
                            item.phoneNumbers.length != 0 ?
                                <View>
                                    {
                                        <View style={{ marginHorizontal: spacing.m, marginVertical: spacing.s }}>
                                            <Text style={[text.normal, { fontWeight: '700' }]}>
                                                {item.displayName.charAt(0)}
                                            </Text>
                                        </View>
                                    }
                                    <TouchableOpacity onPress={() => {
                                        usedispatch(setContactDetails({ "displayName": item.displayName, "phoneNumbers": item.phoneNumbers[0].number }))
                                        navigation.goBack()
                                    }} style={{ flexDirection: 'row', backgroundColor: colors.light, width: '90%', borderRadius: 10, elevation: 10, paddingVertical: spacing.s, marginHorizontal: spacing.m, marginBottom: spacing.m }}>
                                        <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={{ uri: default_profile }} style={{ height: 70, aspectRatio: 1 / 1 }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', width: "50%" }}>
                                            <Text style={[text.medium, { color: colors.blackText, fontWeight: '700' }]}>{item.displayName}</Text>
                                            <Text style={[text.smallPlus, { color: colors.blackText }]}>Contacts</Text>
                                            {/* <Text style={[text.smallPlus]}>09234234858</Text> */}
                                            {
                                                item.phoneNumbers.length != 0 &&
                                                <Text style={[text.smallPlus]}>{item.phoneNumbers[0].number}</Text>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View> : null
                        )
                    }}
                />
            </View>
        </View>
    )
}