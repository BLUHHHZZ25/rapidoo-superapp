import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { children } from "@nozbe/watermelondb/decorators";
import BackHeader from "../common/BackHeader";
import OrangeButton from "../common/OrangeButton";
import { spacing } from "../../app/constants/theme";

type Params = {
    headerTitle: string,
    headerOnpress: () => void
    buttonTitle: string,
    buttonOnpress: () => void
}
interface Child {
    children: React.ReactNode
}

const ViewTemplate: React.FC<Params&Child> = ({headerTitle,headerOnpress, buttonOnpress,buttonTitle, children}:Child&Params) => {


    return(
        <>
        <BackHeader title={headerTitle} onPress={headerOnpress}/>
        {children}
        <View style={{marginBottom:spacing.m, position:'absolute', bottom:0, width:"100%"}}>
            <OrangeButton btnTitle={buttonTitle} onPress={buttonOnpress} disable={false}/>
        </View>
        </>
    )
}

export default ViewTemplate