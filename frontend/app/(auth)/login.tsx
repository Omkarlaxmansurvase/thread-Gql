// app/(auth)/login.tsx
import {
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Text,
  Box,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@apollo/client/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import { LOGIN_MUTATION } from "@/graphql/auth";
import type { LoginResponse, LoginVariables } from "@/graphql/types";

/* ---------------- VALIDATION REGEX ---------------- */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [loginUser, { loading }] = useMutation<
    LoginResponse,
    LoginVariables
  >(LOGIN_MUTATION);

  const submit = async () => {
    if (loading) return;

    if (!email.trim()) {
      Toast.show({ type: "error", text1: "Email is required" });
      return;
    }

    if (!emailRegex.test(email)) {
      Toast.show({ type: "error", text1: "Invalid email address" });
      return;
    }

    if (!password) {
      Toast.show({ type: "error", text1: "Password is required" });
      return;
    }

    try {
      const res = await loginUser({
        variables: {
          email: email.toLowerCase(),
          password,
        },
      });

      const token = res.data?.login.token;
      if (!token) throw new Error("Invalid credentials");

      await AsyncStorage.setItem("token", token);

      Toast.show({
        type: "success",
        text1: "Login successful 🎉",
      });

      router.replace("/feed");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: err.message || "Invalid email or password",
      });

      setPassword("");
    }
  };

  return (
    <VStack
      flex={1}
      bg="$backgroundDark"
      alignItems="center"
      justifyContent="center"
      px="$4"
    >
      {/* CARD */}
      <VStack
        w="100%"
        maxWidth={360}
        bg="$backgroundDark"
        borderRadius="$xl"
        p="$6"
        space="lg"
      >
        {/* Instagram Icon */}
        <Box alignItems="center">
          <Ionicons name="logo-instagram" size={48} color="#fff" />
        </Box>

        <Text
          textAlign="center"
          size="lg"
          fontWeight="$bold"
          color="$textPrimary"
        >
          Login
        </Text>

        <Input borderColor="$borderDark">
          <InputField
            placeholder="Email"
            placeholderTextColor="#777"
            color="$textPrimary"
            value={email}
            onChangeText={(val) => setEmail(val.toLowerCase())}
            autoCapitalize="none"
            editable={!loading}
          />
        </Input>

        <Input borderColor="$borderDark">
          <InputField
            placeholder="Password"
            placeholderTextColor="#777"
            color="$textPrimary"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </Input>

        <Button bg="$buttonPrimary" onPress={submit} isDisabled={loading}>
          <ButtonText color="$buttonText">
            {loading ? "Logging in..." : "Login"}
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
