import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "react-native";

const Avatar = () => {
    return(
        <View
            style={{
                height: 100,
                width: 100,
                backgroundColor: 'black',
                borderStyle: 'solid',
                borderWidth: 3,
                borderColor: 'white',
                borderRadius: 50,
                alignSelf: 'center',
                top: '-20%'
            }}
        >
            <View
                style={{
                    height: '25%',
                    width: '25%',
                    backgroundColor: 'white',
                    borderRadius: 50,
                    alignSelf: 'center',
                    bottom: '-75%',
                    right: '-40%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <FontAwesomeIcon  icon={faCamera}/>
            </View>
        </View>
    )
}

export default Avatar;