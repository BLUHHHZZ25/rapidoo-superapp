import React from "react"
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native"
import LoaderKit from 'react-native-loader-kit'
import { colors, sizes, spacing, text } from "../../app/constants/theme"
import LottieView from "lottie-react-native"

type Props = {
    showComp: boolean,
    labelComp:string
}

export function LoaderComponents({ showComp,labelComp }: Props) {
    return (
        <View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showComp}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <LoaderKit
                                style={{ width: 100, height: 100 }}
                                name={'BallSpinFadeLoader'} // Optional: see list of animations below
                                color={colors.orange} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                            />
                            <View style={{marginTop:spacing.m}}>
                                <Text style={[text.normal,styles.modalText]}>{labelComp}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: sizes.radius,
        paddingHorizontal:35,
        paddingTop:28,
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
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        color:colors.grayText,
        textAlign: 'center',
    },
});