import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import DatePicker from 'react-native-date-picker';
import { colors, spacing, text } from "../../../app/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { setIsSchedule, setScheduleAt, setScheduleOrder} from "../../../app/redux/reducers/transactionOrder";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { color } from "@rneui/base";

export default function ScheduleBookingModal() {
    const navigation = useNavigation();
    const usedispatch = useDispatch<AppDispatch>();
    const today = new Date();
    const fiveDaysFromToday = new Date();
    const offset = 8; // UTC+8

    // const philippineTime = new Date(today.getTime() + offset * 60 * 60 * 1000);
    const [date, setDate] = useState(today);
    
    // Create a Date object for 5 days ahead
    fiveDaysFromToday.setDate(today.getDate() + 5);
    fiveDaysFromToday.setHours(23, 0, 0, 0); // Set to 11:00 PM

    // Limit the time to 5 AM to 11 PM
    const limitTime = (selectedDate: any) => {
        const restrictedDate = new Date(selectedDate);
        const hours = restrictedDate.getHours();

        // If selected time is before 5 AM, set to 5 AM
        if (hours < 5) {
            restrictedDate.setHours(5, 0, 0, 0);
        } 
        // If selected time is after 11 PM, set to 11 PM
        else if (hours >= 23) {
            restrictedDate.setHours(23, 0, 0, 0);
        }

        return restrictedDate;
    }

    const onSubmit = (date: any) => {
        console.log(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period = "AM";

        // Extract the day of the week
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: 'long' });
        // Extract month name and day number (e.g., "January 7")
        const monthAndDay = date.toLocaleDateString("en-US", { month: 'long', day: 'numeric' });
        // Format minutes to always be two digits
        
        // Format time parts
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const formattedHours = String(date.getHours()).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(date.getSeconds()).padStart(2, '0');

        if (hours >= 12) {
            period = "PM";
            if (hours > 12) hours -= 12; // Convert to 12-hour format
        } else if (hours === 0) {
            hours = 12; // Handle midnight case
        }

        // Combine formatted date and time
        const formattedTime = `${hours}:${formattedMinutes} ${period}`;
        const scheduleAt = `${year}-${month}-${day} ${formattedHours}:${minutes}:${formattedSeconds}`
        // Combine the date and the formatted time
        const formattedDateTime = `${dayOfWeek}, ${monthAndDay} at ${formattedTime}`;
        // Dispatch the action
        usedispatch(setScheduleAt(formattedDateTime));
        usedispatch(setScheduleOrder(scheduleAt))
        usedispatch(setIsSchedule(true))
        console.log(scheduleAt);
        
        navigation.goBack()
    }

    const statusNow = () => {   
        usedispatch(setScheduleAt(""));
        usedispatch(setIsSchedule(false))
        navigation.goBack() 
    }
    console.log(today);
    
    return (
        <View>
            <Modal
                onBackdropPress={() => navigation.goBack()}
                onBackButtonPress={() => navigation.goBack()}
                isVisible={true}
                swipeDirection="down"
                onSwipeComplete={() => navigation.goBack()}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <Text style={[styles.titleLabel, text.normal]}>Select delivery date and time</Text>
                    <View style={{ marginVertical: 20, alignItems: 'center' }}>
                        <DatePicker
                            maximumDate={fiveDaysFromToday}
                            minimumDate={today}
                            date={date}
                            theme="light"
                            dividerColor={colors.mustard}
                            onDateChange={(selectedDate) => setDate(limitTime(selectedDate))}
                            mode="datetime"
                        />
                    </View>

                    <View style={{ marginBottom: spacing.m, width: '100%', paddingHorizontal: spacing.l }}>
                        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 15, justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => {
                                statusNow()
                            }}>
                                <Text style={[text.normal, { fontWeight: '700' }]}>Now</Text>
                            </TouchableOpacity>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                    <Text style={[text.normal]}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { onSubmit(date) }} style={{ backgroundColor: colors.mustard, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, elevation: 5 }}>
                                    <Text style={[text.normal, { color: colors.white, fontWeight: '700' }]}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "#fff",
        paddingHorizontal: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: 200,
    },
    titleLabel: {
        fontWeight: '700',
        color: colors.black,
        margin: spacing.s,
        alignSelf: 'center',
        marginBottom: spacing.m
    },
});
