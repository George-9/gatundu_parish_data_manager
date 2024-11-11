import { createDrawerNavigator, useDrawerStatus } from "@react-navigation/drawer";
import { useWindowDimensions, View } from "react-native";

export default function ResponsiveContainer(props: any) {
    const deviceSize = useWindowDimensions();
    const drawerStatus = useDrawerStatus();

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: getFlexDirection(),
                alignItems: 'center',
                marginVertical: 5,
                marginHorizontal: 5
            }}
            {...props}
        />
    )

    function getFlexDirection(): string {
        if (drawerStatus === 'open' && deviceSize.width <= 1200) {
            return 'column';
        }

        if (drawerStatus === 'closed' && deviceSize.width > 600) {
            return 'row';
        }

        if (drawerStatus === 'open' && deviceSize.width > 1200) {
            return 'row';
        }

        return 'column';
    }
}