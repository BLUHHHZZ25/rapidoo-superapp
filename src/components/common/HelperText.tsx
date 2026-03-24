import { useState } from "react"
import { Text } from "react-native"
import { colors, spacing, text } from "../../app/constants/theme"


type Props = {
    visibility: boolean,
    caption: string
}

export default function HelperText({visibility, caption}:Props) {
    const [visible, setVisible] = useState(visibility)

    return(
        <>
            {
                visibility&& <Text style={[text.small, {color:colors.red, marginTop:spacing.s, marginLeft:spacing.s}]}>{caption}</Text>
            }
        </>
    )
}