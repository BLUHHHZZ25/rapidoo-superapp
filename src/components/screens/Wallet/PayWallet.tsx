import React, { useState } from "react";
import { Button, Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors, horizontalScale, sizes, spacing, text } from "../../../app/constants/theme";
import { Icon } from "@rneui/themed";
// import ConfirmModal from "./ConfirmModal";
// import { InputOrange, InputOrangeRequired } from "../../components/InputOrange";
import InputOrange from "../../common/InputOrange";
import { HelperText } from "react-native-paper";
import OrangeButton from "../../common/OrangeButton";

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;



type Props = {
    name: string;
    iconName: string;
    fromWSreen: string
}

const PayWallet: React.FC<Props> = ({ fromWSreen, name, iconName }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [showPass, setshowPass] = useState(false);
    const [withdrawal, setwithrawal] = useState("");

    const onChangeText = (textInput: string) => { setwithrawal(textInput) }

    const hasErrorsChar = (): boolean => {
        // Regular expression to match characters other than alphabets, numbers, and '@'
        const regex = /[^0-9@]/;
        return regex.test(withdrawal);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const togglePass = () => {
        setshowPass(!showPass);
    };
    console.log("value: " + withdrawal)

    return (
        <>
            <StatusBar />
            {/* <TouchableOpacity onPress={toggleModal}> */}
            <TouchableOpacity>
                <View style={[styles.walletOptionsDisable, styles.iconSpacing]}>
                    <Icon type="ionicon" name="qr-code-outline" color={colors.grayText} size={35} />
                </View>
                <Text style={[text.smallPlus, styles.cardTxt, styles.cardTxtStyle]}>Pay</Text>
            </TouchableOpacity>

            <Modal
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                isVisible={isModalVisible}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.center}>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.titleLabel, text.mediumPlus]}>Withdrawal Request</Text>
                            <View style={{ width:'100%' }}>
                                {/* <InputOrange Editable={true} onChange={() => { }} value={withdrawal} keyboardType={'numeric'} placeholder={""} /> */}
                                <View style={{width:'100%', alignItems:'center'}}>
                                    <InputOrange InputLabel={""} keyboardType={"default"} secureTextEntry={false} Editable={true} Value={withdrawal} onChangeText={() => { }} />
                                </View>
                                <HelperText type="error" visible={(withdrawal === "") ? hasErrorsChar() : hasErrorsChar()}>
                                    Invalid Amount!
                                </HelperText>
                            </View>
                            <View style={{ width: "100%", alignSelf: 'center', paddingHorizontal: spacing.xl, marginVertical: spacing.m }}>
                                <Text style={[styles.infoLabel, text.normal]}>Pakilagay ang amount na nais mong i-withdraw mula sa iyong Rapidoo Wallet.</Text>
                            </View>
                            <View style={{ marginVertical: spacing.m }}>
                                {/* <ConfirmModal name={""} iconName={""} contents={"Tiyakin ang halaga na nais mong kunin mula sa iyong Rapidoo Wallet. Kumpirmado ka na ba sa tamang halaga na iyong inilagay?"} modalStatusP={"requestWithdraw"} /> */}
                                <OrangeButton btnTitle={"Submit"} onPress={() => {}} disable={false}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default PayWallet;

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        backgroundColor: "white",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    walletOptions: {
        height: 53,
        width: 53,
        borderRadius: 10,
        elevation: 5,
        marginTop: spacing.m,
        marginBottom: spacing.s,
        backgroundColor: colors.gray
    },
    walletOptionsDisable: {
        height: 53,
        width: 53,
        borderRadius: 10,
        elevation: 5,
        marginTop: spacing.m,
        marginBottom: spacing.s,
        backgroundColor: colors.grayTwo
    },
    cardTxtStyle: {
        alignSelf: 'center',
        color: colors.grayText
    },
    modalContent: {
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingHorizontal: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: 200,
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    barIcon: {
        width: 60,
        height: 5,
        backgroundColor: "#000",
        borderRadius: 3,
    },
    text: {
        color: "#bbb",
        fontSize: 24,
        marginTop: 100,
    },
    navText: {
        fontWeight: '500',
        color: colors.black,
        marginHorizontal: spacing.m
    },
    btnContainer: {
        position: 'absolute',
        width: "100%"
    },
    borderStyle: {
        borderColor: colors.mustard,
        borderWidth: 1,
        height: 54,
        width: "90%",
        alignSelf: 'center',
        paddingHorizontal: spacing.m,
        fontSize: sizes.h3 - 2
    },
    inputLabel: {
        fontSize: sizes.h3,
        fontWeight: '400',
        color: colors.black,
        margin: spacing.s
    },
    titleLabel: {
        fontWeight: '700',
        color: colors.black,
        margin: spacing.s,
        alignSelf: 'center',
        marginVertical: spacing.m
    },
    infoLabel: {
        fontWeight: '400',
        color: colors.black,
        textAlign: 'center',
        alignSelf: 'center',
    },
    walletOptionsSelected: {
        height: 60,
        width: 60,
        borderRadius: 10,
        elevation: 5,
        marginTop: spacing.m,
        marginBottom: spacing.s,
        backgroundColor: colors.orange
    },
    iconSpacing: {
        justifyContent: 'center'
    },
    cardTxt: {

    },
});