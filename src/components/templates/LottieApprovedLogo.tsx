import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { Image, View } from 'react-native';


export default function LottieApprovedLogo() {
    const animationRef = useRef<LottieView>(null);
    const loaderHeight = 150;
    const loaderWidth = 150;
    useEffect(() => {
        animationRef.current?.play();

        setTimeout(() => {
            animationRef.current?.pause();
        }, 300);

        // Or set a specific startFrame and endFrame with:
        animationRef.current?.play(30, 120);
    }, []);

    return (
        <>
            <View style={{alignSelf:'center'}}>
                <LottieView source={require('../../app/assets/data/Approved.json')} loop={false}  style={{ height: loaderHeight, width: loaderWidth }} autoPlay />
            </View>
        </>
    );
}