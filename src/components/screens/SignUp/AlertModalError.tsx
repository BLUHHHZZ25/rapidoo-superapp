import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { colors, sizes, spacing, text } from '../../../app/constants/theme';
import LottieApprovedLogo from '../../templates/LottieApprovedLogo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignUpElement } from '../../navigations/SignupNavigation';

export const AlertModalError = ({ route, params }: { route: any, params: any }) => {
    const navigation = useNavigation<NativeStackNavigationProp<SignUpElement>>();
    const [isMessage, setIsMessage] = useState("");
    const [isMessageTitle, setIsMessageTitle] = useState("");

    useEffect(() => {
        const { message } = route.params
        if (message) {
            if (message == "409") {
                // setIsMessage("Mobile Number Already Exist!")
                setIsMessageTitle("Number already registered")
                setIsMessage("Naka-register na ang mobile number na ito. Maglagay ng ibang phone number.")
            }
            else if (message == "400") {
                setIsMessageTitle("Warning")
                setIsMessage("Network Error, Please try again later")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignUp' }],
                });
            }
            else if (message == "401") {
                setIsMessageTitle("Warning")
                // setIsMessage("Wrong Credentials or you are aunthorize ")
                setIsMessage("Mali ang nailagay mong Email/Phone number o Password. Try again or i-reset ang iyong password.")
            }
            else if (message == "signup_required") {
                setIsMessageTitle("Warning")
                // setIsMessage("Please Fillup all the fields")
                setIsMessage("Incomplete form Siguraduhing kompleto ang details bago i-submit ang form")
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Send_OTP' }],
                    });
                }, 3000); // 3000ms = 3 seconds
            }
            else if (message == "empty") {
                setIsMessageTitle("Warning")
                setIsMessage("Please Fillup all the fields")
            }
            else if (message == "3002"){
                setIsMessageTitle("Warning")
                setIsMessage("Rider Already Added")
            }
            else if (message == "4001"){
                setIsMessageTitle("Warning")
                setIsMessage("This rider has an ongoing transaction")
            }
            else if (message == "4002"){
                setIsMessageTitle("Warning")
                setIsMessage("This rider is not active")
            }
            else if (message == "expired_token") {
                setIsMessageTitle("Warning")
                setIsMessage("Token is expired")
            }
            else if (message == "email_exist") {
                setIsMessageTitle("Email address already registered")
                setIsMessage("Mag sign in sa iyong account o mag-register gamit ang ibang email address")
            }
            else if (message == "wrong_otp") {
                setIsMessageTitle("Wrong OTP")
                setIsMessage("I-double check ang 6-digit code na ipinadala sa iyong mobile phone. ")
            }
            else if (message == "firstname") {
                setIsMessageTitle("")
                setIsMessage("Maglagay ng Firstname")
            }
            else if (message == "lastname") {
                setIsMessageTitle("")
                setIsMessage("Maglagay ng Lastname")
            }
            else if (message == "email") {
                setIsMessageTitle("")
                setIsMessage("Maglagay ng Email")
            }
            else if (message == "password") {
                setIsMessageTitle("")
                setIsMessage("Maglagay ng Password")
            }
            else if (message == "gender") {
                setIsMessageTitle("")
                setIsMessage("Maglagay ng Gender")
            }
            else if (message == "city") {
                setIsMessageTitle("")
                setIsMessage("Maglagay ng City")
            }
            else if (message == "unregister_number") {
                setIsMessageTitle("Phone number not exist")
                setIsMessage("Mali or hindi pa registered ang nailagay na mobile number")
            }
            else if (message == "already_registered") {
                setIsMessageTitle("Number already registered")
                setIsMessage("Naka-register na ang mobile number na ito. Maglagay ng ibang phone number")
            }
            else{
                setIsMessage(message)
            }
        }
    }, [route])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignSelf: 'center', backgroundColor: colors.red, borderRadius: 100, padding: spacing.s }}>
                            <Icon color={colors.white} type='ionicon' size={50} name='alert-outline' />
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: spacing.m }}>
                            <View style={{ paddingTop: spacing.s, width: "70%" }}>
                                <Text style={[text.mediumPlus, { color: colors.grayText, fontWeight: '700', width: "100%", alignSelf: 'center' }]}>{isMessageTitle}</Text>
                                <Text style={[text.small, styles.modalText, { color: colors.grayText, marginTop: spacing.s, textAlign: 'center', width: "auto" }]}>{isMessage}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', gap: spacing.m, alignSelf: 'center' }}>
                            {/* <TouchableOpacity
                            onPress={yesOnpress}
                            style={[,{marginTop:spacing.s,paddingHorizontal:spacing.m,paddingVertical:spacing.s,borderRadius:sizes.radius}]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.mustard}]}>Okay</Text>
                        </TouchableOpacity> */}
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={[{
                                    marginTop: spacing.s,
                                    paddingHorizontal: spacing.m,
                                    paddingVertical: spacing.s,
                                    borderRadius: sizes.radius,
                                    width: "90%",
                                    backgroundColor: colors.red,
                                    alignSelf: 'center'
                                }]}>
                                <Text style={[text.medium, styles.textStyle, { color: colors.white }]}>Try again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: "90%",
        paddingTop: spacing.l,
        paddingLeft: spacing.s,
        paddingRight: spacing.s,
        paddingVertical: spacing.m,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});