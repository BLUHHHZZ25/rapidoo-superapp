import { Image, Text, View } from "react-native"
import { colors, text } from "../../app/constants/theme"
import { SharedElement } from "../navigations/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { logo, rapidooLogo } from "../../app/assets/img/images";
import SuperAppBackground from "../common/SuperAppBackground";
import React from "react";

export default function SplashScreen(){
    const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();

    
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login');
        }, 4000)
    },[])

    return(
        <>
            <View style={{ flex:1, backgroundColor:colors.mustardOpacity}}>
                <Text style={[text.large,{color:colors.light, fontWeight:'700', alignSelf:'center', marginTop:100}]}>
                    Welcome!
                </Text>
            </View>
        </>
    )   
}