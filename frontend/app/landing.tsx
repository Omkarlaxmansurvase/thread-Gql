// app/landing.tsx
import { VStack, Button, ButtonText, Text, Box } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <VStack
      flex={1}
      bg="$backgroundDark"
      justifyContent="center"
      alignItems="center"
      space="lg"
    >
       {/* Instagram Icon */}
      <Box>
        <Ionicons name="logo-instagram" size={56} color="#fff" />
      </Box>
      <Text size="2xl" fontWeight="$bold" color="$textPrimary">
        Threads
      </Text>

      <Button bg="$buttonPrimary" onPress={() => router.push("/register")}>
        <ButtonText color="$buttonText">
          Get Started
        </ButtonText>
      </Button>

      <Button
  bg="$buttonPrimary"
  opacity={0.9}
  onPress={() => router.push("/login")}
>
  <ButtonText color="$buttonText">
    I already have an account
  </ButtonText>
</Button>

    </VStack>
  );
}
