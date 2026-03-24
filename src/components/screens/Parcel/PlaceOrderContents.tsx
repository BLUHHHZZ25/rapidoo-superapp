import { Divider, Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Button } from 'react-native';
import { colors, text, spacing, verticalScale, horizontalScale, sizes } from '../../../app/constants/theme';
import { TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { setSenderPayment, setSenderNotes } from '../../../app/redux/reducers/maplocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeElement } from '../../navigations/HomeNavigation';
import { SharedElement } from '../../navigations/Navigation';
import { ParcelElement } from '../../navigations/ParcelNavigation';
import { setCoupons } from '../../../app/redux/reducers/transactionOrder';

const fullWidth = Dimensions.get('screen').width
const fullHeight = Dimensions.get('screen').height

type Props = {
    pickupAddress: string,
    dropoffAddress: string,
    totalAmount: any
}

const PlaceOrderContents = ({ pickupAddress, dropoffAddress, totalAmount }: Props) => {
    const navigationParcel = useNavigation<NativeStackNavigationProp<ParcelElement>>();
    const coupons_data: any = useSelector((state: RootState) => state.transactionOrder.coupons);
    const transaction_id: any = useSelector((state: RootState) => state.transactionOrder.transaction_id);
    const rider_name = useSelector((state: RootState) => state.maplocation.rider_name);

    const [expanded, setExpanded] = useState(false);
    const [multipleDrop, setMultipleDrop] = useState<any>(null);
    const [checked, setChecked] = React.useState('first');
    const usedispatch = useDispatch<AppDispatch>();
    const MultipleName = useSelector(
        (state: RootState) => state.maplocation.multiplePayload,
    );
    // const [notes, setNotes] = useState<any>();
    const textLocations = ['text location 1', 'text location 2']
    const [notes, setNotes] = useState('');
    const maxLength = 150;
    const handleTextChange = (text: any) => {
        if (text.length <= maxLength) {
            setNotes(text);
            usedispatch(setSenderNotes(text));
        }
    };
    const clearText = () => {
        setNotes('');
        usedispatch(setSenderNotes(''));
    };

    const discardCoupon = () => {
        usedispatch(setCoupons(false))
        navigationParcel.reset({
            index: 0,
            routes: [{ name: 'Coupons' }],
          });
    }

    useEffect(() => {
        if (MultipleName) {
            const multi = JSON.parse(MultipleName);
            setMultipleDrop(multi);
            console.log(multi);
        }
    }, [MultipleName]);
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();

    // convert to percentage
    const convertToPercent = (decimal:any) => {
        const percentage = (decimal * 100).toFixed(0) + "%";
        return percentage
    }
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <Text style={[text.medium, styles.pickUpTitle]}>Review and Place your Order</Text>
                <View style={{ flexDirection: 'row', height: fullHeight * .05, position: 'relative' }}>
                    <View style={{
                        height: '50%',
                        width: 1,
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        borderColor: '#111',
                        position: 'absolute',
                        left: '10%',
                        bottom: 0,
                        transform: [{
                            translateX: -1,
                        }]
                    }}></View>
                    <View style={{ width: '20%', alignItems: 'center' }}>
                        <Icon name='ellipse' type='ionicon' color={colors.orange} size={18} />
                    </View>
                    <View style={{ width: '75%' }}>
                        <Text style={[text.smallPlus, styles.pickUpDescription]}>
                            {pickupAddress}
                        </Text>
                    </View>

                </View>
                {multipleDrop && multipleDrop.map((location: any, index: number) => index !== 0 && (
                    <View key={index} style={{ flexDirection: 'row', height: fullHeight * .05, position: 'relative' }}>
                        <View style={{
                            height: '100%',
                            width: 1,
                            borderStyle: 'dashed',
                            borderWidth: 1,
                            borderColor: '#111',
                            position: 'absolute',
                            left: '10%',
                            transform: [{ translateX: -1 }]
                        }}></View>
                        
                        <View style={{ width: '20%', alignItems: 'center' }}>
                            <Icon name='ellipse' type='ionicon' color={colors.green} size={18} />
                        </View>

                        <View style={{
                            ...text.smallPlus,
                            width: '75%',
                        }}>
                            <Text>
                                {location.multipleAddress}
                            </Text>
                        </View>
                    </View>
                ))}
                <View style={{ flexDirection: 'row', height: fullHeight * .05, position: 'relative' }}>
                    <View style={{
                        width: '20%',
                        // justifyContent: 'center',
                        alignItems: 'center'
                        // backgroundColor: '#111'
                    }}>
                        <Icon name='location' type='ionicon' color={colors.red} size={20} />
                    </View>
                    <View style={{
                        width: '75%',
                        // backgroundColor: '#222'
                    }}>
                        <Text style={[text.smallPlus, styles.pickUpDescription]}>
                            {multipleDrop && multipleDrop[0].multipleAddress}
                        </Text>
                    </View>
                </View>
                {/* <Divider style={styles.Divider} />
                <View style={{ padding: spacing.s, marginVertical: spacing.s, flexDirection: 'row' }}>
                    <Text style={[text.smallPlus, { fontWeight: '700', color: colors.black }]}>Vehicle Type: Motorcycle </Text>
                    <Text style={[text.smallPlus, { fontWeight: '500', color: colors.grayText }]}>(Pabili Service, Insulated Bag)</Text>
                </View> */}
                <Divider style={styles.Divider} />
                <View style={{ padding: spacing.s, marginVertical: spacing.s }}>
                    <TouchableOpacity
                        style={[styles.titleContainer, { paddingBottom: spacing.m }]}
                        onPress={() => setExpanded(!expanded)}>
                        <View>
                            <Image source={require('../../../app/assets/img/parcel.png')} style={{ height: verticalScale(25), aspectRatio: 1 / 1 }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginHorizontal: spacing.s }}>
                            <Text style={[text.smallPlus, { fontWeight: '700', color: colors.black }]}>Cash: Sender </Text>
                            {/* <Text style={[text.smallPlus, { fontWeight: '500', color: colors.grayText }]}>(6 Mangga St. SM Homes)</Text> */}
                        </View>
                        <View style={{ position: 'absolute', right: 0 }}>
                            <Icon type='ionicon' name={expanded ? 'chevron-up-outline' : 'chevron-forward-outline'} />
                        </View>
                    </TouchableOpacity>
                    {
                        expanded &&
                        <View>
                            <TouchableOpacity onPress={() => {
                                setChecked('first')
                                usedispatch(setSenderPayment("Pickup"));
                            }}
                                style={{ flexDirection: 'row', left: spacing.m }}>
                                <View style={{ top: 4 }}>
                                    <RadioButton
                                        value="first"
                                        status={checked === 'first' ? 'checked' : 'unchecked'}
                                        color={colors.mustard}
                                    />
                                </View>
                                <View style={{ marginHorizontal: spacing.m }}>
                                    <Text style={[text.smallPlus, { fontWeight: '700', color: colors.black }]}>Pickup</Text>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={[text.smallPlus, { color: colors.grayText, width: 250 }]}>{pickupAddress}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setChecked('second')
                                usedispatch(setSenderPayment("Dropoff"));
                            }}
                                style={{ flexDirection: 'row', left: spacing.m, marginTop: spacing.m, marginBottom: spacing.s }}>
                                <View style={{ top: 4 }}>
                                    <RadioButton
                                        value="second"
                                        status={checked === 'second' ? 'checked' : 'unchecked'}
                                        color={colors.mustard}
                                    />
                                </View>
                                <View style={{ marginHorizontal: spacing.m }}>
                                    <Text style={[text.smallPlus, { fontWeight: '700', color: colors.black }]}>Drop-off</Text>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={[text.smallPlus, { color: colors.grayText, width: 250 }]}>{dropoffAddress}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <Divider style={styles.Divider} />
                    <TouchableOpacity onPress={() =>{ 
                        coupons_data ?
                        navigationParcel.navigate("ConfirmationModal", {message:"Are you sure do you want to discard the coupon?", yesFunction:discardCoupon})
                        :
                        navigationHome.navigate('Coupons')
                        }} style={{  }}>
                        <View style={{paddingVertical: spacing.s, marginVertical: spacing.s, flexDirection: 'row'}}>
                            <View style={{ top: 0, marginRight: spacing.s }}>
                                <Image source={require('../../../app/assets/img/parcel1.png')} style={{ height: verticalScale(25), aspectRatio: 1 / 1 }} />
                            </View>
                            <Text style={[text.smallPlus, { fontWeight: '700', color: colors.black, marginHorizontal: spacing.s, alignSelf: 'center' }]}>Add Coupon </Text>
                            {
                                coupons_data ?
                                <View style={{flexDirection:'row', width:"40%"}}>
                                    <Text style={[text.smallPlus, { fontWeight: '700', color: colors.skyblue, marginHorizontal: spacing.s, alignSelf: 'center', backgroundColor:colors.skyblue_opacity, paddingHorizontal: 3, paddingVertical: 3     }]}>{coupons_data.data.coupon_code}</Text>
                                    <Text style={[text.smallPlus, { fontWeight: '800', color: colors.red, marginHorizontal: spacing.s, alignSelf: 'center', backgroundColor:colors.redOpacity, paddingVertical:2, paddingHorizontal:2 }]}> Disc {convertToPercent(coupons_data.data.discount)} </Text>
                                </View>
                                : null
                            }
                            <View style={{ top: 0, position: 'absolute', right: 0, marginTop: spacing.s }}>
                                <Icon type='ionicon' name='chevron-forward-outline' color={colors.black} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider style={styles.Divider} />
                    <Divider style={styles.Divider} />
                    <TouchableOpacity style={{ paddingVertical: spacing.s, marginVertical: spacing.s, flexDirection: 'row' }} onPress={() => { navigationHome.navigate("ChooseRider") }}>
                        <View style={{ top: 0, marginRight: spacing.s }}>
                            <Icon type='ionicon' name='people' color={colors.red} />
                        </View>
                        <Text style={[text.smallPlus, { fontWeight: '700', color: colors.black, marginHorizontal: spacing.s, alignSelf: 'center' }]}>{rider_name ? `Assigned to: ${rider_name}` : 'Favorite Rider'}</Text>
                        <View style={{ top: 0, position: 'absolute', right: 0, marginTop: spacing.s }}>
                            <Icon type='ionicon' name='chevron-forward-outline' color={colors.black} />
                        </View>
                    </TouchableOpacity>
                    <Divider style={styles.Divider} />
                    <View style={{ marginTop: spacing.m }}>
                        <Text style={[text.smallPlus, { fontWeight: '400', margin: spacing.s, color: colors.black }]}>Notes to Rapidoo Rider</Text>
                        <View>
                            <TextInput
                                multiline
                                editable
                                numberOfLines={3}
                                maxLength={maxLength}
                                onChangeText={handleTextChange}
                                value={notes}
                                placeholder='Add notes here...'
                                style={{ padding: 10, height: 100, backgroundColor: '#FFDB5880', borderRadius: sizes.radius, textAlignVertical: 'top' }}
                            />
                            <View style={styles.counterContainer}>
                                {notes.length > 0 && (
                                    <TouchableOpacity onPress={clearText} style={styles.clearButton}>
                                        <Icon name='delete' size={24} color='gray' />
                                    </TouchableOpacity>
                                )}
                                <Text style={styles.counter}>
                                    {notes.length}/{maxLength}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 5,
        padding: 10,
        height: "90%"
    },
    titleContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 10,
    },
    parcelHeader: {
        padding: spacing.s,
        width: "50%",
        alignSelf: 'center',
        borderRadius: 100,
        marginTop: spacing.l,
        backgroundColor: colors.mustard
    },
    pickUpform: {
        height: fullHeight * .4,
        marginVertical: spacing.s,
        borderRadius: sizes.radius
    },
    pickUpImage: {
        height: verticalScale(40),
        aspectRatio: 1 / 3,
        resizeMode: "stretch",

    },
    pickUpTitle: {
        fontWeight: '700',
        color: colors.black,
        marginBottom: spacing.s
    },
    pickUpDescription: {
        fontWeight: '500',
        marginBottom: spacing.s,
        color: colors.grayText,
        textAlignVertical: 'center'
    },
    Divider: {
        width: "120%",
        borderWidth: 0.1,
        alignSelf: 'center'
    },
    subDivider: {
        margin: spacing.s,
        width: "160%",
        left: -20,
        borderWidth: 0.1
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 20
    },
    counter: {
        alignSelf: 'flex-end',
        marginTop: 5,
        color: 'gray',
    },
    clearButton: {
        position: 'absolute',
        right: 0,
        padding: 10,
    },
});

export default PlaceOrderContents;
