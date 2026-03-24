import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors,spacing, text, sizes, verticalScale,moderateScale,horizontalScale,shadow } from '../../app/constants/theme';


const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 70;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

type Props = {
  list: any,
  pressFun(): void
}

const VehicleComponent = () =>{

  return(
    <>
      
    </>
  )
}

const VehicleSelection = ({ list, pressFun }: Props) => { // use in home in discover items
  const [selectedVehicle, setSelectedVehicle] = useState('motorcycle');
  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      extraData={selectedVehicle}
      renderItem={({ item, index }) => {
        console.log("this is ID" + item.id)
        const backgroundColor = item.id === selectedVehicle ? colors.mustard : colors.grayTwo;
        const color = item.id === selectedVehicle ? 'white' : colors.grayText;
        return (

          item.id === 2 || item.id === 3 ?
            <View
              style={{
                marginLeft: spacing.s,
                marginRight: index === list.length - 1 ? spacing.l : 0,
              }}
            >
              <View style={{
                width: 'auto',
                height: CARD_HEIGHT,
                marginVertical: 10,
                borderRadius: sizes.radius,
                flexDirection: 'row',
                backgroundColor: backgroundColor,
                padding: spacing.s,
                elevation: 5
              }}>
                <Image source={item.image} style={styles.imageItem} />
                <View>
                  <Text style={{ fontWeight: '600', fontSize: sizes.h3, marginHorizontal: spacing.s, color: color }}>{item.name}</Text>
                  <Text style={{ fontWeight: '400', fontSize: sizes.body, marginHorizontal: spacing.s, color: color }}>{item.description}</Text>
                </View>
              </View>
            </View>

            :
            <TouchableOpacity
              style={{
                marginLeft: spacing.s,
                marginRight: index === list.length - 1 ? spacing.l : 0,
              }}
              onPress={() => { setSelectedVehicle(item.id) }}>

              <View style={{
                width: 'auto',
                height: CARD_HEIGHT,
                marginVertical: 10,
                borderRadius: sizes.radius,
                flexDirection: 'row',
                backgroundColor: backgroundColor,
                padding: spacing.s,
                elevation: 5
              }}>
                <Image source={item.image} style={styles.imageItem} />
                <View>
                  <Text style={{ fontWeight: '600', fontSize: sizes.h3, marginHorizontal: spacing.s, color: color }}>{item.name}</Text>
                  <Text style={{ fontWeight: '400', fontSize: sizes.body, marginHorizontal: spacing.s, color: color }}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>

        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: 'auto',
    height: CARD_HEIGHT,
    marginVertical: 10,
    borderRadius: sizes.radius,
    flexDirection: 'row',
    backgroundColor: colors.light,
    padding: spacing.s,
    elevation: 5
  },
  card1: {
    width: 'auto',
    height: CARD_HEIGHT,
    marginVertical: 10,
    borderRadius: sizes.radius,
    flexDirection: 'row',
    backgroundColor: colors.mustard,
    padding: spacing.s,
    elevation: 5
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
  imageItem: {
    height: 30,
    width: 30,
    margin: spacing.s,
    resizeMode: 'cover'
  }
});

export default VehicleSelection;