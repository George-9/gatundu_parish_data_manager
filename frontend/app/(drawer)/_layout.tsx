import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

export default function Layout() {
  const deviceSize = useWindowDimensions();

  return (
    <Drawer
      screenOptions={{
        'drawerContentStyle': { maxWidth: 200 },
        drawerContentContainerStyle: { maxWidth: 200 },
        'drawerType': deviceSize.width > 800
          ? 'permanent'
          : 'slide',
        'headerLeft': function () {
          return null;
        },
        'headerRight': function () {
          return (
            deviceSize.width > 800
              ? null
              : <DrawerToggleButton />
          )
        },
        drawerStyle: { 'maxWidth': 200 }
      }}>
      <Drawer.Screen name='index' options={{ title: 'reports' }} />
      <Drawer.Screen name='registry' />
      <Drawer.Screen name='uploads' />
    </Drawer>
  );
}
