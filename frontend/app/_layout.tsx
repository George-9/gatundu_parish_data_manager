import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="memberview"
        options={{
          headerShown: true,
          title: 'member view',
          presentation: 'containedModal',
          headerBackButtonMenuEnabled: true,
          animation: 'fade',
          animationDuration: 1800
        }}
      />

      <Stack.Screen
        name="searchresultview"
        options={{
          headerShown: true,
          title: 'search results',
          statusBarStyle: 'light',
          contentStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
          presentation: 'fullScreenModal',
          headerBackButtonMenuEnabled: true,
          animation: 'fade',
          animationDuration: 1800
        }}
      />

    </Stack>
  );
}
