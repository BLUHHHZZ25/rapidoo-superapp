import { View,Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { colors, sizes, spacing } from "../../app/constants/theme";
import LinearGradient from "react-native-linear-gradient";
import { logo } from "../../app/assets/img/images";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

export default function Cone_Background() {

    return(
        <SafeAreaView style={styles.viewBackground}>
            <LinearGradient colors={[colors.orange, colors.mustardOpacity, colors.violet]} style={{height: wHeight/3, borderBottomLeftRadius:130, borderBottomRightRadius:130}} > 
                <Image source={{uri:(logo)}} style={{ height:wWidth/1.8, width:wWidth/1.04, alignSelf:'center', marginTop:spacing.l}}/>
                <Text style={[styles.biggerTxt,{color:colors.light, marginTop:-59 ,fontWeight:'500',alignSelf:'center'}]}>Super App</Text>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewBackground:{
        height: wHeight / 3, 
        width: wWidth,
        backgroundColor: '#6129a6',
        borderBottomEndRadius:170,
        borderBottomStartRadius:170
        
    },
    content:{
        marginTop: wHeight * 0.02, //20%
        margin: 20,
    },
    textStyle:{
        fontSize: wWidth * 0.2,
        color: '#fff'
    },
    biggerTxt: {
        fontSize: sizes.h2
    },
    bigTxt: {
        fontWeight: '500',
        fontSize: sizes.h3 + 1
    },
    normalTxt: {
        fontWeight: '400',
        fontSize: sizes.h3
    },
    smallNormalTxt: {
        fontWeight: '400',
        fontSize: sizes.h3 - 2
    },
    smallTxt: {
        fontSize: sizes.body
    },
    smallerTxt: {
        fontSize: sizes.body - 2
    },

})