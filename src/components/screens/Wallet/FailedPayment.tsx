import { Dialog, Icon } from "@rneui/themed";
import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "../../navigations/Navigation";
import { colors, sizes, spacing, text } from "../../../app/constants/theme";


type RootStackParamList = {
    modalVisible: boolean;
    newTransaction: () => void;
    goBackHome: () => void;
  }
  // export const SuccessPayment: React.FC<SuccessPaymentProps> = ({modalVisible,newTransaction,goBackHome}) => {
export const FailedPayment = () => {
      const navigation = useNavigation<NativeStackNavigationProp<SharedElement>>();
    const animationRef = useRef<LottieView>(null);

    const WalletNavigation = () => {
        navigation.reset({
          index: 0,
          routes: [{
              name: 'HomeNavigation',
              state: {
                  routes: [{
                      name: 'Home',
                      state: {
                        routes:[{ name:'Wallet'}] 
                      }
                  }]
              }
          }],
      });
      }

    useEffect(() => {
        animationRef.current?.play();

        // Or set a specific startFrame and endFrame with:
        animationRef.current?.play(30, 120);
    }, []);

    return (
        // <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: "100%", height: 190}}>
                            <LottieView autoPlay loop={false} source={require('../../../app/assets/lotties/LottieFailedTopUp.json')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignSelf: 'center', paddingTop: spacing.s, width:"85%" }}>
                                <Text style={[text.mediumPlus, { height:50, color: colors.grayText, fontWeight: '700', textAlign:'center' }]}>Payment Failed.</Text>
                                <Text style={[text.normal, styles.modalText, { color: colors.grayText, textAlign:'center',marginTop:spacing.s }]}>Transaction failed. No funds were deducted from your wallet. Please check your payment method and try again.</Text>
                            </View>
                        </View>
                        <View style={{ alignSelf:'center', width:'100%'}}>
                            <TouchableOpacity
                                onPress={() => {
                                  
                                }}
                                style={[{marginTop: spacing.s, paddingHorizontal: spacing.m, paddingVertical: spacing.s, borderRadius: sizes.radius, backgroundColor:colors.mustard }]}>
                                <Text style={[text.medium, styles.textStyle, { color: colors.white, textAlign:'center',  }]}>New Transaction</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => WalletNavigation()}
                                style={[{ marginTop: spacing.s, paddingHorizontal: spacing.m, paddingVertical: spacing.s, borderRadius: sizes.radius, backgroundColor:colors.lighterGray }]}>
                                <Text style={[text.medium, { color: colors.grayText, textAlign:'center' }]}>Back to Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        // </View>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        position:'absolute',
        width:"100%",
        top:120,
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: "90%",
        paddingLeft: spacing.l,
        paddingRight: spacing.l,
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