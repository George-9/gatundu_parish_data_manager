import { View } from "react-native";

export function HorizontalSpacer(props: any) {
    return (
        <View style={{ width: props.width || 15 }} />
    )
}


export function VerticalSpacer(props: any) {
    return (
        <View style={{ height: props.height || 15 }} />
    )
}