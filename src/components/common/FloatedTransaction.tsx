import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../app/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedElement } from "../navigations/Navigation";
import { HomeElement } from "../navigations/HomeNavigation";
import TrackMyOrder from "../screens/Parcel/TrackMyOrder";
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from "react";
import { HistoryElement } from "../navigations/HistoryNavigation";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FloatedTransaction = ({status, count} : {count: any, status: 'PICKING_UP' | 'PICKED_UP' | 'DELIVERED' | 'DELIVERY' | 'DROP_OFF'}) => {
    const navigationHome = useNavigation<NativeStackNavigationProp<HomeElement>>();
    const navigationHistory = useNavigation<NativeStackNavigationProp<HistoryElement>>();
    const navigationTrackMyOrder = () => {
        navigationHistory.navigate('Transaction')
        // navigationHome.reset({
        //     index:0,
        //     routes: [{name: 'ParcelNavigation',
        //         state:{
        //             routes:[
        //                 {
        //                     name:'Transaction'
        //                 }
        //             ]
        //         }
        //     }],
        // })
        
    }


    // Initialize Animated value for the border color
    const borderColorAnim = useRef(new Animated.Value(0)).current;

    // Interpolating the border color based on the animated value
    const borderColor = borderColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.mustard, colors.red], // From Red to Blue
    });

    // Start the animation when the component is mounted
    useEffect(() => {
        startAnimation();
    }, []);

    // Function to start the animation
    const startAnimation = () => {
        Animated.loop(
        Animated.sequence([
            Animated.timing(borderColorAnim, {
            toValue: 1,
            duration: 500, // 2 seconds
            useNativeDriver: false, // Border color animation doesn't support native driver
            }),
            Animated.timing(borderColorAnim, {
            toValue: 0,
            duration: 500, // 2 seconds
            useNativeDriver: false,
            }),
        ])
        ).start();
    };

    return(
        <Pressable style={styles?.statusContainer} onPress={navigationTrackMyOrder}>
            <Animated.View style={[styles?.status, {borderColor}]}>
            <LottieView source={require('../../app/assets/img/otw.json')} 
                autoPlay
                loop
                style={styles?.images}/>
            <View style={{width: '50%', alignSelf: 'center'}}>
                <Text>
                You have {count.length} active booking. Tap to view your booking list.
                </Text>
            </View>
          </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    barDivider: {
        flex: 1,
        maxWidth: '5%',
        height: 10,
        borderRadius: 50,
        // backgroundColor: '#FFAC13',
        alignSelf: 'center',
    },
    imageContainer: {
        flex: 1,
        height: '100%',
        position: 'relative'
    },
    grayScaledImage: {
        tintColor: 'black', 
        position: 'absolute', 
        opacity: .45
    },
    images: {
        // flex: 1,
        height: '100%',
        width: '30%',
        objectFit: 'contain',
        // tintColor: 'gray',
    },
    status: {
        height: '90%',
        minWidth: '90%',
        backgroundColor: colors.mustardOpacity,
        borderColor: colors.mustard,
        borderWidth: 3,
        borderRadius: 25,
        flexDirection: 'row',
        rowGap: 10,
        padding: 10
    },
    statusContainer: {
        height: windowHeight * .1,
        width: '100%',
        position: 'absolute',
        top: '85%',
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 10
    },
})

export default FloatedTransaction;