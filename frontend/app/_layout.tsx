// app/_layout.tsx
import { Slot } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { threadsTheme } from "../theme/threadsTheme";
import { apolloClient } from "@/utils/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
    <GluestackUIProvider config={threadsTheme}>
      <Slot />
      <Toast />
    </GluestackUIProvider>
    </ApolloProvider>
  );
}
