import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { colors, sizes, spacing } from '../../app/constants/theme';
import { Button, Checkbox } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import BackButton from '../common/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { markerPin } from '../../app/assets/img/images';

export default function UserLocation({header}: {header:string}) {
  const wWidth = Dimensions.get('window').width;
  const wHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        width: wWidth - 150,
        flexDirection: 'row',
        marginTop: spacing.l,
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 1,
        marginHorizontal: spacing.s,
      }}>
      <View style={{ alignSelf: 'center' }}>
        <Button mode="contained" style={styles.parcelHeader}>
          <Text style={{ fontSize: sizes.h3, fontWeight: '700' }}>
           {header}
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parcelHeader: {
    padding: spacing.s,
    borderRadius: 100,
    backgroundColor: colors.mustard,
  },
});
