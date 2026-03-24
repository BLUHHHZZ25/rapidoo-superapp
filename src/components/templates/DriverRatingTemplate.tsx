import { SafeAreaView, StyleSheet, View, useWindowDimensions, Text, ScrollView, ImageBackground, StatusBar } from "react-native";
import { Dimensions } from "react-native";
import React, { Children, PropsWithChildren, ReactNode } from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors, spacing } from "../../app/constants/theme";
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
}

const DriverRatingTemplate: React.FC<Props & childrenInter> = ({ children, onSubmit, submitName, submitEnable}: childrenInter & Props) => {


    return (
        <View style={styles.contentBackground}>
            {children}
            <View style={{ position: 'absolute', bottom:"15%", width: "100%", alignSelf:'center' }}>
                <OrangeButton btnTitle={submitName} onPress={onSubmit} disable={submitEnable} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentBackground: {
        height: wHeight,
        width: wWidth,
        marginTop: wHeight / 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
})



export default DriverRatingTemplate;