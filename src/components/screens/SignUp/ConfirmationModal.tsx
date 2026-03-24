import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { colors, sizes, spacing, text } from '../../../app/constants/theme';
import LottieApprovedLogo from '../../templates/LottieApprovedLogo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignUpElement } from '../../navigations/SignupNavigation';

export const ConfirmationModal = ({ route, params }: { route: any, params: any }) => {
    const navigation = useNavigation<NativeStackNavigationProp<SignUpElement>>();
    const [isMessage, setIsMessage] = useState("");

    const { yesFunction, message } = route.params

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignSelf: 'center', backgroundColor: colors.mustard, borderRadius: 100, padding: spacing.s }}>
                            <Icon color={colors.white} type='ionicon' size={50} name='alert-outline' />
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: spacing.m }}>
                            <View style={{ paddingTop: spacing.s, width: "70%" }}>
                                <Text style={[text.mediumPlus, { color: colors.grayText, fontWeight: '700', width: "100%", alignSelf: 'center' }]}>Confrimation !</Text>
                                <Text style={[text.normal, styles.modalText, { color: colors.grayText, marginTop: spacing.s, textAlign: 'center', width: "auto" }]}>{message}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', gap: spacing.m, alignSelf: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={[{
                                    marginTop: spacing.s,
                                    paddingHorizontal: spacing.m,
                                    paddingVertical: spacing.s,
                                    borderRadius: sizes.radius,
                                    width: "40%",
                                    // backgroundColor: colors.mustard,
                                    alignSelf: 'center'
                                }]}>
                                <Text style={[text.medium, styles.textStyle, { color: colors.mustard }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={yesFunction}
                                style={[
                                    { 
                                        marginTop: spacing.s, 
                                        paddingHorizontal: spacing.m, 
                                        paddingVertical: spacing.s, 
                                        borderRadius: sizes.radius, 
                                        width:"40%",
                                        backgroundColor:colors.mustard 
                                    }
                                    ]}>
                                <Text style={[text.medium, styles.textStyle, { color: colors.light }]}>Confirm</Text>
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