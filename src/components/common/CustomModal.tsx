import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { colors, moderateScale, text } from '../../app/constants/theme';

const CustomModal = ({ label, onChangeText, datas, value, placeholder  }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [borderColor, setBorderColor] = useState(colors.inputBorder);

    const handleSelect = (itemValue) => {
        onChangeText(itemValue);
        setModalVisible(false);
    };

    return (
        <View style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setModalVisible(true)}
                onPressIn={() => setBorderColor(colors.mustard)}  // Change border color when pressed
                onPressOut={() => setBorderColor('pink')}          // Reset border color when released
            >
                <Text style={styles.dropdownTextLabel}>{label ? label : label}</Text>
                {/* <Text style={styles.dropdownText}>{value ? value : value}</Text> */}
                <Text style={[styles.dropdownText, text.small]}>{value ? value : placeholder}</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.modalClose}
                        >
                            <Text style={styles.modalCloseText}>{label}</Text>
                        </TouchableOpacity>

                        {datas.map((item) => (
                            <TouchableOpacity
                                key={item.key}  // Make sure each item has a unique key
                                style={styles.modalItem}
                                onPress={() => handleSelect(item.value)}
                            >
                                <Text style={styles.modalItemText}>{item.value}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        height: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.inputBorder,
        borderRadius: 15,
        color:colors.black,
        paddingHorizontal: 20,
        justifyContent:'center',
        backgroundColor: colors.light,
    },
    dropdownTextLabel: {
        fontSize: moderateScale(11),
        fontFamily: "helvetica",
        position: 'absolute',
        backgroundColor: 'white',
        left: '4%',
        paddingHorizontal: 10,
        marginLeft:10,
        color:colors.black,
        fontWeight:'700',
        top: '-24%',
    },
    dropdownText: {
        color: 'rgba(0,0,0,0.38)'
        // color: colors.grayText
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // Dimmed background
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 15, // Increased border radius
        elevation: 5, // Add shadow on Android
        shadowColor: '#000', // Add shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalClose: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalCloseText: {
        fontSize: 18,
        color: '#333',
    },
    modalItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
        
    },
});

export default CustomModal;
