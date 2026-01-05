// app/(auth)/login.tsx
import {
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@apollo/client/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LOGIN_MUTATION } from "@/graphql/auth";
import type { LoginResponse, LoginVariables } from "@/graphql/types";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [loginUser, { loading }] = useMutation<
    LoginResponse,
    LoginVariables
  >(LOGIN_MUTATION);

  const submit = async () => {
    try {
      const res = await loginUser({
        variables: { email, password },
      });

      const token = res.data?.login.token;
      if (!token) {
        throw new Error("No token returned from login");
      }

      // 🔑 STORE JWT HERE
      await AsyncStorage.setItem("token", token);

      // Navigate only after token is saved
      router.replace("/feed");
    } catch (err: any) {
      console.error("Login error:", err.message);
    }
  };

  return (
    <VStack flex={1} bg="$backgroundDark" p="$6" space="md">
      <Text size="xl" fontWeight="$bold" color="$textPrimary">
        Login
      </Text>

      <Input borderColor="$borderDark" bg="$backgroundDark">
        <InputField
          placeholder="Email"
          placeholderTextColor="#666"
          color="$textPrimary"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </Input>

      <Input borderColor="$borderDark" bg="$backgroundDark">
        <InputField
          placeholder="Password"
          placeholderTextColor="#666"
          color="$textPrimary"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </Input>

      <Button bg="$buttonPrimary" onPress={submit} isDisabled={loading}>
        <ButtonText color="$buttonText">
          {loading ? "Logging in..." : "Login"}
        </ButtonText>
      </Button>
    </VStack>
  );
}
