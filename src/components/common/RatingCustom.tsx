import { useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import { colors,spacing, text, sizes, verticalScale,moderateScale,horizontalScale,shadow } from '../../app/constants/theme';


export default function RatingCustom() {


	const [defaultRating, setdefaultRating] = useState(2);
	const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

	const imageFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
	const imageCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';



	const StarArrangement = () => {
		
		return (
			<>
				{
					maxRating.map((item, key) => {
						return (
							<TouchableOpacity
								activeOpacity={0.7}
								key={item}
								style={styles.starSpacing}
								onPress={() => { setdefaultRating(item) }}
							>
								<Image
									style={styles.imageSize}
									source={
										item <= defaultRating
											? { uri: imageFilled }
											: { uri: imageCorner }
									}
								/>
								<Text>{item}</Text>
							</TouchableOpacity>
						)
					})
				}
			</>
		)
	}

	return (
		<>
			<View style={{ flexDirection: 'row', justifyContent: 'center' }} >
				<StarArrangement />
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	imageSize: {
		width: 50,
		height: 50,

	},
	starSpacing: {
		flexDirection: 'row',
		padding: spacing.s,
		marginVertical:spacing.l

	}
})