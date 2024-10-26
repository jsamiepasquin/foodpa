import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { theme } from "../configs/theme";

import useAuthentication from "@/hooks/useAuthentication";
import { Provider } from "react-redux";
import {store} from '../store/store'
export default function RootLayout() {
  return (
    <Provider store={store}>
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="medical" options={{ headerShown: true }} />
        <Stack.Screen name="status_update" options={{ headerShown: true, title:"Update Status" }} />
      </Stack>
    </PaperProvider>
    </Provider>

  );
}
