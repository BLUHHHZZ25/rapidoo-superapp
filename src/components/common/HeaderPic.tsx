import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AllImage from '../../app/assets/svg/AllImage';
import icons from '../../app/constants/icons';
import { PLACES } from '../../app/assets/data/data';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function HeaderPic() {
    const width = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Image source={require('../assets/img/beMerchant.png')} style={styles.ImageStyle} />
            </View>

        </View>
    );
}

export default HeaderPic;

const styles = StyleSheet.create({
    ImageStyle: {
        width: windowWidth,
        height: windowHeight / 4,
        resizeMode: 'stretch',
    
    }
})