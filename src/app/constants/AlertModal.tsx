import { Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { colors, sizes, spacing, text } from './theme';
import LottieApprovedLogo from '../../components/templates/LottieApprovedLogo';

type Props = {
    modalVisibile: boolean | undefined;
    alertMessage: string;
    yesOnpress: () =>  void;
    noOnpress: () => void;
}

export const ConfirmAlertModal = ({ alertMessage,modalVisibile,yesOnpress,noOnpress }: Props) => {
    // const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibile}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <View style={{ alignSelf:'center',backgroundColor:colors.red, borderRadius:100, padding:spacing.s }}>
                                <Icon color={colors.white} type='ionicon' size={50} name='alert-outline' />
                            </View>
                        <View style={{alignSelf:'center', marginTop:spacing.m}}>
                            <View style={{ paddingTop:spacing.s, width:"70%" }}>
                                <Text style={[text.mediumPlus,{color:colors.grayText, fontWeight:'700', width:"100%", alignSelf:'center'}]}>Message!</Text>
                                <Text style={[text.normal,styles.modalText,{color:colors.grayText, marginTop:spacing.s, textAlign:'center', width:"auto" }]}>{alertMessage}</Text>
                            </View>
                        </View>

                        
                        <View style={{flexDirection:'row', gap:spacing.m, alignSelf:'center'}}>
                        <TouchableOpacity
                            onPress={yesOnpress}
                            style={[,{marginTop:spacing.s,paddingHorizontal:spacing.m,paddingVertical:spacing.s,borderRadius:sizes.radius, backgroundColor:colors.red,width:"40%"}]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.light}]}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={noOnpress}
                            style={[,{marginTop:spacing.s,paddingHorizontal:spacing.m,paddingVertical:spacing.s,borderRadius:sizes.radius, backgroundColor:colors.light, borderColor:colors.mustard, borderWidth:2, width:"40%"}]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.grayText}]}>No</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};



export const AlertModal = ({ alertMessage,modalVisibile,yesOnpress,noOnpress }: Props) => {
    // const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibile}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <View style={{ alignSelf:'center',backgroundColor:colors.red, borderRadius:100, padding:spacing.s }}>
                                <Icon color={colors.white} type='ionicon' size={50} name='alert-outline' />
                            </View>
                        <View style={{alignSelf:'center', marginTop:spacing.m}}>
                            <View style={{ paddingTop:spacing.s, width:"70%" }}>
                                <Text style={[text.mediumPlus,{color:colors.grayText, fontWeight:'700', width:"100%", alignSelf:'center'}]}>Message!</Text>
                                <Text style={[text.small,styles.modalText,{color:colors.grayText, marginTop:spacing.s, textAlign:'center', width:"auto" }]}>{alertMessage}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', gap:spacing.m, alignSelf:'center'}}>
                        {/* <TouchableOpacity
                            onPress={yesOnpress}
                            style={[,{marginTop:spacing.s,paddingHorizontal:spacing.m,paddingVertical:spacing.s,borderRadius:sizes.radius}]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.mustard}]}>Okay</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={yesOnpress}
                            style={[{
                                marginTop:spacing.s,
                                paddingHorizontal:spacing.m,
                                paddingVertical:spacing.s,
                                borderRadius:sizes.radius, 
                                width:"90%", 
                                backgroundColor:colors.red,
                                alignSelf:'center'
                                }]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.white}]}>Okay</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export const ConfirmModal = ({ alertMessage,modalVisibile,yesOnpress }: Props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibile}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <View style={{ alignSelf:'center',backgroundColor:colors.green, borderRadius:100, padding:spacing.s }}>
                                <Icon color={colors.white} type='ionicon' size={50} name='checkmark-outline' />
                            </View>
                        <View style={{alignSelf:'center', marginTop:spacing.m}}>
                            <View style={{ paddingTop:spacing.s, width:"70%" }}>
                                <Text style={[text.mediumPlus,{color:colors.grayText, fontWeight:'700', width:"100%", alignSelf:'center'}]}>Success!</Text>
                                <Text style={[text.small,styles.modalText,{color:colors.grayText, marginTop:spacing.s, textAlign:'center', width:"auto" }]}>{alertMessage}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', gap:spacing.m, alignSelf:'center'}}>
                        {/* <TouchableOpacity
                            onPress={yesOnpress}
                            style={[,{marginTop:spacing.s,paddingHorizontal:spacing.m,paddingVertical:spacing.s,borderRadius:sizes.radius}]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.mustard}]}>Okay</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={yesOnpress}
                            style={[{
                                marginTop:spacing.s,
                                paddingHorizontal:spacing.m,
                                paddingVertical:spacing.s,
                                borderRadius:sizes.radius, 
                                width:"90%", 
                                backgroundColor:colors.mustard,
                                alignSelf:'center'
                                }]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.white}]}>Confirm</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export const AlertModalSuccess = ({ alertMessage,modalVisibile,yesOnpress,noOnpress }: Props) => {
    // const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibile}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <View style={{ alignSelf:'center',backgroundColor:colors.mustard, borderRadius:100, padding:spacing.s }}>
                                {/* <Icon color={colors.white} type='ionicon' size={50} name='alert-outline' /> */}
                                <LottieApprovedLogo/>
                            </View>
                        <View style={{alignSelf:'center', marginTop:spacing.m}}>
                            <View style={{ paddingTop:spacing.s, width:"70%" }}>
                                <Text style={[text.mediumPlus,{color:colors.grayText, fontWeight:'700', width:"100%", alignSelf:'center'}]}>Success Thank you!</Text>
                                <Text style={[text.small,styles.modalText,{color:colors.grayText, marginTop:spacing.s, textAlign:'center', width:"auto" }]}>{alertMessage}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', gap:spacing.m, alignSelf:'center'}}>
                        {/* <TouchableOpacity
                            onPress={yesOnpress}
                            style={[,{marginTop:spacing.s,paddingHorizontal:spacing.m,paddingVertical:spacing.s,borderRadius:sizes.radius}]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.mustard}]}>Okay</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={yesOnpress}
                            style={[{
                                marginTop:spacing.s,
                                paddingHorizontal:spacing.m,
                                paddingVertical:spacing.s,
                                borderRadius:sizes.radius, 
                                width:"90%", 
                                backgroundColor:colors.mustard,
                                alignSelf:'center'
                                }]}>
                            <Text style={[text.medium,styles.textStyle,{color:colors.white}]}>Done</Text>
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
        width:"90%",
        paddingTop:spacing.l,
        paddingLeft:spacing.s,
        paddingRight:spacing.s,
        paddingVertical:spacing.m,
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

// export default AlertModal;