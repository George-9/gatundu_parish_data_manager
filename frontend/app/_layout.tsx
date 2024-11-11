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
        name="MemberViewPage"
        options={{
          headerShown: true,
          title: 'member view',
          presentation: 'containedModal',
          headerBackButtonMenuEnabled: true,
          animation: 'fade',
          animationDuration: 1800
        }}
      />

    </Stack>
  );
}
