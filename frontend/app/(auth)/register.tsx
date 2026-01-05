// app/(auth)/register.tsx
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
import { REGISTER_MUTATION } from "@/graphql/auth";
import type {
  RegisterResponse,
  RegisterVariables,
} from "@/graphql/types";

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
    try {
      await registerUser({
        variables: {
          firstName,
          lastName: lastName || null,
          email,
          password,
        },
      });

      // ✅ After successful registration → Login
      router.replace("/login");
    } catch (err: any) {
      console.error("Register error:", err.message);
    }
  };

  return (
    <VStack flex={1} bg="$backgroundDark" p="$6" space="md">
      <Text size="xl" fontWeight="$bold" color="$textPrimary">
        Register
      </Text>

      {[{
        placeholder: "First Name",
        value: firstName,
        setter: setFirstName,
      }, {
        placeholder: "Last Name (optional)",
        value: lastName,
        setter: setLastName,
      }, {
        placeholder: "Email",
        value: email,
        setter: setEmail,
      }, {
        placeholder: "Password",
        value: password,
        setter: setPassword,
        secure: true,
      }].map((f, i) => (
        <Input key={i} borderColor="$borderDark" bg="$backgroundDark">
          <InputField
            placeholder={f.placeholder}
            placeholderTextColor="#666"
            color="$textPrimary"
            value={f.value}
            onChangeText={f.setter}
            secureTextEntry={f.secure}
          />
        </Input>
      ))}

      <Button bg="$buttonPrimary" onPress={submit} isDisabled={loading}>
        <ButtonText color="$buttonText">
          {loading ? "Creating..." : "Create Account"}
        </ButtonText>
      </Button>
    </VStack>
  );
}
