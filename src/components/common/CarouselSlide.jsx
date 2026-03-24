import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function CarouselSlide({list}) { // automatic slide carousel used in Home screen 
    const width = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={list}
                scrollAnimationDuration={1000}
                renderItem={({item,index}) => (
                    <View>
                        <Image source={item.image} style={styles.ImageStyle} />
                    </View>
                )}
            />
        </View>
    );
}

export default CarouselSlide;

const styles = StyleSheet.create({
    ImageStyle:{
        width: windowWidth,
        height: windowHeight / 5,
        resizeMode: 'stretch',
    }
})