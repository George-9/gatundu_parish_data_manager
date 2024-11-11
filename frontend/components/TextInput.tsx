import { TextInput } from "react-native-paper";
import { useWindowDimensions } from "react-native";
import React from "react";

export default function CustomTextInput(props: any): React.ReactElement {
    const deviceSize = useWindowDimensions();
    const n = 5;

    return (
        <TextInput
            {...props}
            mode="outlined"
            placeholderTextColor="blue"
            inputMode="text"
            // left={function () { return <Ionicons name="add" /> }}
            style={{
                width: 300,
                minWidth: 300,
                marginHorizontal: 5,
                marginVertical: 3
            }}
            outlineColor="blue"
        />
    )
}