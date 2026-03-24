import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors,spacing, text, sizes, verticalScale,moderateScale,horizontalScale,shadow } from '../../app/constants/theme';
import { Icon } from "@rneui/themed"
import { ScrollView } from "react-native"
import { SharedElement } from "../navigations/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getAllPosts } from "../../app/watermelonDB/model/model";
import { useState } from "react";
import { ProfileElement } from "../navigations/ProfileNavigation";
import { HomeElement } from "../navigations/HomeNavigation";


type Props = {
    fullname : string;
    profile:string
    email: string;
    phone: string;
}

export default function ProfilePic({fullname,email,phone, profile}:Props) {
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();

    const navigationEditProfile = () => {
        navigationHome.reset({
            index:0,
            routes: [{name: 'ProfileNavigation',
                state:{
                    routes:[
                        {
                            name:'EditProfile'
                        }
                    ]
                }
            }],
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={navigationEditProfile}>
                    <View>
                        <Image source={{uri: profile }} style={styles.profileStyle} />
                    </View>
                    <View style={styles.editIcon}>
                        <Icon reverse type="ionicon" name="pencil" size={15} />
                    </View>
                </TouchableOpacity>
                <View style={styles.profileDetails}>
                    <Text style={[text.medium,styles.nameStyle]}>
                        {fullname}
                    </Text>
                    <Text style={[text.smallPlus, { color:colors.black, fontWeight:'500'}]}>
                        {email}
                    </Text>
                    <Text style={[text.smallPlus, { color:colors.black, fontWeight:'500'}]}>
                        +63{`${phone}`}
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.l,
        marginVertical: spacing.m
    },
    profileStyle: {
        borderRadius: 100,
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },
    editIcon: {
        position: "absolute",
        bottom: 100 - 105,
        left: 100 - 40
    },
    nameStyle: {
        fontWeight: '700',
        color: colors.black
    },
    profileDetails: {
        left: 20,
        top: 20,

    }
})