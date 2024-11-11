import { STYLES } from "@/styles/containers";
import { View } from "react-native";

export default function MainContainerView(props: any) {

    return (
        <View {...props}
            style={[STYLES.Containers.main, { padding: 50 }]}
        />
    )
}