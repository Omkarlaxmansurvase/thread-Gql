// app/(auth)/register.tsx
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
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import { REGISTER_MUTATION } from "@/graphql/auth";
import type {
  RegisterResponse,
  RegisterVariables,
} from "@/graphql/types";

/* ---------------- VALIDATION REGEX ---------------- */

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [registerUser, { loading }] = useMutation<
    RegisterResponse,
    RegisterVariables
  >(REGISTER_MUTATION);

  const submit = async () => {
    if (loading) return;

    if (!firstName.trim()) {
      Toast.show({ type: "error", text1: "First name is required" });
      return;
    }

    if (!nameRegex.test(firstName)) {
      Toast.show({
        type: "error",
        text1: "First name must contain only alphabets",
      });
      return;
    }

    if (lastName && !nameRegex.test(lastName)) {
      Toast.show({
        type: "error",
        text1: "Last name must contain only alphabets",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid email address",
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      Toast.show({
        type: "error",
        text1: "Weak password",
        text2: "Min 8 chars, 1 letter, 1 number & 1 special character required",
      });
      return;
    }

    try {
      await registerUser({
        variables: {
          firstName,
          lastName: lastName || null,
          email,
          password,
        },
      });

      Toast.show({
        type: "success",
        text1: "Account created successfully 🎉",
      });

      router.replace("/login");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: err.message || "Something went wrong",
      });
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
        space="lg"
        p="$6"
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
          Create an account
        </Text>

        {[
          {
            placeholder: "First Name",
            value: firstName,
            setter: setFirstName,
          },
          {
            placeholder: "Last Name (optional)",
            value: lastName,
            setter: setLastName,
          },
          {
            placeholder: "Email",
            value: email,
            setter: (val: string) => setEmail(val.toLowerCase()),
          },
          {
            placeholder: "Password",
            value: password,
            setter: setPassword,
            secure: true,
          },
        ].map((f, i) => (
          <Input key={i} borderColor="$borderDark">
            <InputField
              placeholder={f.placeholder}
              placeholderTextColor="#777"
              color="$textPrimary"
              value={f.value}
              onChangeText={f.setter}
              secureTextEntry={f.secure}
              editable={!loading}
            />
          </Input>
        ))}

        <Button bg="$buttonPrimary" onPress={submit} isDisabled={loading}>
          <ButtonText color="$buttonText">
            {loading ? "Creating..." : "Sign up"}
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}
