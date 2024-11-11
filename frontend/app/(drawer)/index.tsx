
import { MembersReports } from '@/pages/membersReports';
import VolumesReportPage from '@/pages/volumesReports';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, MD3LightTheme, Text } from 'react-native-paper';

function Reports() {
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        {
            key: 'members',
            title: 'MEMBERS',
            icon: () => <Ionicons name='person-outline' size={20} />,
            focusedIcon: () => <Ionicons name='person-outline' size={20} />
        },
        {
            key: 'volumes',
            title: 'VOLUMES',
            icon: () => <Ionicons name='information-outline' size={20} />,
            focusedIcon: () => <Ionicons name='information-outline' size={20} />
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        members: MembersReports,
        volumes: VolumesReportPage,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            sceneAnimationEnabled={true}
            sceneAnimationType='opacity'
            theme={MD3LightTheme}
        />
    );
}

export default Reports;
