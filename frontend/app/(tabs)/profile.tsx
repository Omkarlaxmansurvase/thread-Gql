import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  ButtonText,
  Divider,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { useQuery, useMutation } from "@apollo/client/react";
import { ME_QUERY } from "@/graphql/auth";
import { GET_ALL_THREADS, DELETE_THREAD } from "@/graphql/threads";
import type { MeResponse } from "@/graphql/types";
import type { GetAllThreadsResponse } from "@/graphql/types";
import ThreadCard from "@/components/ThreadCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const { data: meData } = useQuery<MeResponse>(ME_QUERY);
  const { data: threadData } = useQuery<GetAllThreadsResponse>(GET_ALL_THREADS);

  const [deleteThread] = useMutation(DELETE_THREAD, {
    refetchQueries: [GET_ALL_THREADS],
  });

  const user = meData?.me;

  const myThreads =
    threadData?.getAllThreads.filter(
      (t) => t.author.id === user?.id
    ) ?? [];

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/landing");
  };

  if (!user) {
    return (
      <VStack flex={1} bg="$backgroundDark" justifyContent="center">
        <Text color="$textSecondary">Loading profile…</Text>
      </VStack>
    );
  }

  return (
    <VStack flex={1} bg="$backgroundDark" px="$6" pt="$8" space="lg">
      <Text size="xl" fontWeight="$bold" color="$textPrimary">
        Profile
      </Text>

      <HStack space="md" alignItems="center">
<Image
  source={require("@/assets/images/avatar.png")}
  style={{
    width: 72,
    height: 72,
    borderRadius: 36,
  }}
/>        <VStack>
          <Text color="$textPrimary" fontWeight="$bold" size="lg">
            {user.firstName}
          </Text>
          <Text color="$textSecondary">{user.email}</Text>
        </VStack>
      </HStack>

      <Text color="$textSecondary">
        Full Stack Developer. Love building apps 🚀
      </Text>

      <HStack space="xl">
        <VStack alignItems="center">
          <Text color="$textPrimary" fontWeight="$bold">
            {myThreads.length}
          </Text>
          <Text color="$textSecondary" size="sm">
            Posts
          </Text>
        </VStack>
      </HStack>

      <Divider bg="$borderDark" />

      {myThreads.map((t) => (
        <VStack key={t.id} space="xs">
          <ThreadCard
            thread={t}
          />
          <Button
            variant="outline"
            borderColor="$borderDark"
            onPress={() => deleteThread({ variables: { id: t.id } })}
          >
            <ButtonText color="$textPrimary">Delete</ButtonText>
          </Button>
        </VStack>
      ))}

      <Button bg="$buttonPrimary" onPress={logout}>
        <ButtonText color="$buttonText">Logout</ButtonText>
      </Button>
    </VStack>
  );
}
