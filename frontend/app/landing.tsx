// app/landing.tsx
import { VStack, Button, ButtonText, Text } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

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
      <Text size="2xl" fontWeight="$bold" color="$textPrimary">
        Threads
      </Text>

      <Button bg="$buttonPrimary" onPress={() => router.push("/register")}>
        <ButtonText color="$buttonText">
          Get Started
        </ButtonText>
      </Button>

      <Button variant="outline" borderColor="$borderDark" onPress={() => router.push("/login")}>
        <ButtonText color="$textPrimary">
          I already have an account
        </ButtonText>
      </Button>
    </VStack>
  );
}
