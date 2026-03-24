import { Alert, StyleSheet, Text, View } from "react-native";
import { colors, spacing, text } from "../../../app/constants/theme";
import { OtpInput } from "react-native-otp-entry";
import { TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import OrangeButton from "../../common/OrangeButton";

export default function SetPin() {
    const [pinCode, setPinCode] = React.useState(true);
    const otpInputRef = useRef(null);
    const [isPin, setIsPin] = useState("");
    const [isCPin, setIsCPin] = useState("");
    
    const togglePin = () => { setPinCode(!pinCode) }
    
    const setPinHandle = (text) => {
        console.log("value", text);
        setIsPin(text);
        console.log("Pin",isPin);
        console.log("confirm Pin",isCPin);
        if(otpInputRef.current){
            otpInputRef.current.clear();
            // console.log(otpInputRef.current);
        }
    }

    const confirmPinHandle = (text) => {
        setIsCPin(text);
    }

    const clearHandle = () => {
        setIsPin("");
        setIsCPin("");
        otpInputRef.current.clear();
    }

    const confirmPIN = () => {
        if(isPin !== isCPin){
            Alert.alert(
                "Not Matched",
                "Please  enter the same PIN in both fields.",
                [
                  {
                    text: "OK",
                    onPress: () => clearHandle(),
                  },
                ],
                { cancelable: false }
              );
        }else{
            console.log("Compatibel");
        }
    }


    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    {
                        isPin === ""?
                        <Text style={[text.largePlus, styles.titleText]}>Create a PIN</Text>
                        :
                        <Text style={[text.largePlus, styles.titleText]}>Verify by entering again.</Text>
                    }
                    <Text style={[styles.smallText, text.normal, { fontWeight: '600', marginBottom: spacing.s, color: colors.grayText, textAlign: 'justify' }]}>Ensure your PIN is secure by avoiding repetitive (e.g., 0000 or sequential (e.g., 1234) number combinations.)</Text>
                </View>
                <OtpInput
                    numberOfDigits={5}
                    focusColor='#FFAC13'
                    secureTextEntry={pinCode}
                    focusStickBlinkingDuration={500}
                    onTextChange={(text) => console.log(text)}
                    onFilled={(text) => isPin ==="" ? setPinHandle(text): confirmPinHandle(text) }
                    ref ={otpInputRef}
                    theme={{
                        containerStyle: OTP.container,
                        inputsContainerStyle: OTP.inputsContainer,
                        pinCodeContainerStyle: OTP.pinCodeContainer,
                        pinCodeTextStyle: OTP.pinCodeText,
                        focusStickStyle: OTP.focusStick,
                        focusedPinCodeContainerStyle: OTP.activePinCodeContainer
                    }}
                />
                <TouchableOpacity onPress={togglePin}>
                    <Text style={[text.mediumPlus, styles.titleText, { textAlign: 'center' }]}>Show PIN</Text>
                </TouchableOpacity>
                <View style={{ position:'absolute', bottom:20, width:'100%'}}>
                    <OrangeButton btnTitle={"Set Pin"} onPress={confirmPIN} disable={false} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
        marginTop: spacing.xxl,
        textAlign: 'left',
        color: '#171717',
        fontWeight: '700',
    },
    container: {
        paddingLeft: spacing.l,
        paddingRight: spacing.m
    },
    smallText: {
        width: '100%',
        fontFamily: 'OpenSans-Regular'
    },
})
const OTP = StyleSheet.create({
    container: {
        margin: 30
    },
    inputsContainer: {
        borderColor: '#FFAC13'
    },
    pinCodeContainer: {

    },
    pinCodeText: {

    },
    focusStick: {

    },
    activePinCodeContainer: {

    }
})