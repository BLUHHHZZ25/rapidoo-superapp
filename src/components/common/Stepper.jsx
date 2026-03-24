import { ScreenHeight } from "@rneui/themed/dist/config";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { colors } from "../../app/constants/theme";
//import ProressStep from "react-native-progress-steps";



export default function Stepper({StepActive}) {
    const buttonTextStyle = {
        color: '#393939',
        fontSize: 18,  // Adjust the font size for each step label
    };
    
    return(

        <View style={styles.container}>
            <ProgressSteps 
                activeStep={StepActive} 
                progressBarColor={colors.mustard} 
                borderWidth={6}
                activeStepIconColor={colors.violet_step} 
                activeStepNumColor="white" 
                activeStepNumSize={20}
                disabledStepNumColor={colors.mustard}
                completedStepNumColor="black"
                activeStepIconBorderColor={colors.violet_step} 
                completedProgressBarColor={colors.mustard} 
                completedCheckColor={colors.mustard} 
                completedStepIconColor={colors.mustard}
                disabledStepIconColor={colors.mustard}>
                <ProgressStep  removeBtnRow={true} nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                        {/* <Text>This is the content within step 1!</Text> */}
                    </View>
                </ProgressStep>
                <ProgressStep removeBtnRow={true} nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                    </View>
                </ProgressStep>
                <ProgressStep removeBtnRow={true} nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
        )
}


const styles = StyleSheet.create({
    container:{
        height:'auto'
    },
    stepperView: {
        flex:1,
        height: ScreenHeight,
    }
})