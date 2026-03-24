import { useRef, useState } from "react";
import { Button } from "react-native-paper";
import CountDownTimer from "react-native-countdown-timer-hooks";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// import { colors, sizes, spacing, text } from "../constants/theme";
import { colors, sizes, spacing, text } from "../../app/constants/theme";
import { RootState } from "../../app/redux/store";
import { useSelector } from "react-redux";
import React from "react";
import { ResendOTPRequest } from "../../services/api_services";

export default function ResendComponent() {

    // Timer References
    const refTimer = useRef<any>();
    const [isActive, setIsActive] = useState(true);
    const register_number = useSelector((state:RootState) => state.registrationCounter.regNumber);
    const toggleButton = () => {
        setIsActive(!isActive);
    }

    const timerOnProgressFunc = (remainingTimeInSecs:any) => {
        console.log("On Progress tracker :", remainingTimeInSecs);
    };

    const timerCallbackFunc = (timerFlag:any) => {
        // console.log("Timer Callback :", timerFlag);
        // console.warn("Alert the user when timer runs out...");
        toggleButton();
    };

    const handleRestartTimer = async() => {
        refTimer.current.resetTimer();
        toggleButton();

        const data = await ResendOTPRequest({register_number:register_number})
        console.log("\n\n data here >>> ", data);
        console.log("\n\n register >>> ", register_number);
        
    }
    return (
        <>
            {
                !isActive&&
                <TouchableOpacity onPress={handleRestartTimer}><Text style={[styles.resend, text.normal]}> Resend</Text></TouchableOpacity>
            }
            <CountDownTimer
                ref={refTimer}
                timestamp={300}
                timerCallback={timerCallbackFunc}
                textStyle ={[styles.resendText, text.normal]}
            />
        </>
    )
}

const styles = StyleSheet.create({
    resend: {
        fontSize: sizes.Normal,
        fontWeight: '700',
        textAlign: 'auto',
        color: colors.mustard,
        textDecorationLine: 'underline',
        fontFamily: 'OpenSans-Regular'
    },
    resendText: {
        color:colors.mustard,
        paddingHorizontal:spacing.s
    }
})