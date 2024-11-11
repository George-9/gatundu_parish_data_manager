
import MembersRegistry from '@/pages/memberRegistry';
import VolumesRegistryPage from '@/pages/volumesRegistry';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { BottomNavigation, MD3LightTheme } from 'react-native-paper';

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
            icon: () => <Ionicons name='people-outline' size={20} />,
            focusedIcon: () => <Ionicons name='people-outline' size={20} />
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        members: MembersRegistry,
        volumes: VolumesRegistryPage,
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