import { SafeAreaView, StyleSheet, View, useWindowDimensions, Text, ScrollView, ImageBackground, StatusBar } from "react-native";
import { Dimensions } from "react-native";
import React, { Children, PropsWithChildren, ReactNode } from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../app/constants/theme";
import BtnBack from "../common/BtnBack";
import OrangeButton from "../common/OrangeButton";
import { background_steps } from "../../app/assets/img/images";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

interface childrenInter {
    children: React.ReactNode
}

type Props = {
    onSubmit: () => void,
    submitName: string,
    submitEnable: boolean,
    backSubmit: () => void,
}

const SignUpTemplate: React.FC<Props & childrenInter> = ({ children, onSubmit, backSubmit, submitName, submitEnable}: childrenInter & Props) => {


    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}>
        <ImageBackground source={background_steps}  >
            <StatusBar
                barStyle="dark-content" // Or "dark-content" based on your preference
                translucent={true}
                backgroundColor="transparent"
            />
            <BtnBack btnName={"Back"} onPress={backSubmit} />
            <View style={styles.contentBackground}>
                {children}
                <View style={{ position: 'absolute', bottom: "15%", width: "100%" }}>
                    <OrangeButton btnTitle={submitName} onPress={onSubmit} disable={submitEnable} />
                </View>
            </View>
        </ImageBackground>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    viewBackground: {
        backgroundColor: '#FFAC13',
        width: wWidth,
        height: '100%',
    },
    titleText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 40,
        color: '#171717',
        fontWeight: '700',
        fontFamily: 'OpenSans-Regular'
    },
    contentBackground: {
        // flex:1,
        height: wHeight,
        width: wWidth,
        backgroundColor: '#FDFDFD',
        marginTop: wHeight / 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    SignUPcontentBackground: {
        // flex:1,
        // height: 'auto',
        // width: wWidth,
        backgroundColor: '#FDFDFD',
        // marginTop: wHeight / 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
})

export default SignUpTemplate;