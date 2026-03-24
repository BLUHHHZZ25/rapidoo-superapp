import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { Image, View } from 'react-native';
import { colors } from '../../app/constants/theme';

export default function Lootie() {
    const animationRef = useRef<LottieView>(null);
    const loaderHeight = 300;
    const loaderWidth = 300;
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
                <Image source={require('../../app/assets/img/logoSmall.png')} style={{ resizeMode: 'cover', height: 50, width: 50, position: 'absolute', left: loaderHeight / 2 - 22, top: loaderHeight / 2 - 20, zIndex: 1 }} />
                <LottieView source={require('../../app/assets/data/rapidooLoader.json')} autoPlay  style={{ height: loaderHeight, width: loaderWidth }} />

            </View>
        </>
    );
}