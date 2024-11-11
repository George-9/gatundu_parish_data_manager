import { Button, MD3LightTheme, Text } from "react-native-paper";

export default function CustomOutlinedButton(props: any) {
    return (

        <Button
            {...props}
            mode="elevated"
            theme={MD3LightTheme}
            style={{
                borderRadius: 3,
                paddingVertical: 4,
                backgroundColor: 'royalblue',
                marginVertical: 10,
                minWidth: 300,
                maxWidth: 400
            }}
        >
            <Text style={{ color: 'white' }}>{props.title}</Text>
        </Button>
    )
}