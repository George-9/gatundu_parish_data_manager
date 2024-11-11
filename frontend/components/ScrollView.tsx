import { STYLES } from "@/styles/containers"
import { ScrollView, useWindowDimensions } from "react-native"

export default function CustomScrollView(props: any) {
    const deviceSize = useWindowDimensions();

    return (
        <ScrollView
            {...props}
            style={{ height: deviceSize.height - 150, paddingBottom: 20 }}
            overScrollMode="auto"
            contentContainerStyle={[
                STYLES.Containers.main, {
                    height: deviceSize.height - 40,
                    justifyContent: 'flex-start',
                }
            ]}
        />
    )
}