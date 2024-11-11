import { useWindowDimensions } from "react-native"

export default function CustomPicker(props: any) {
    const deviceSize = useWindowDimensions();

    return (
        <select {...props} style={{
            marginTop: 5,
            marginBottom: 5,
            padding: 12,
            width: 300,
        }} />
    )
}