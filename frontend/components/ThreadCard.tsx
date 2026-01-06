// components/ThreadCard.tsx
import { Box, Text, HStack, VStack, Pressable } from "@gluestack-ui/themed";
import { Image } from "react-native";
import { useRouter } from "expo-router";

interface Thread {
  id: string;
  content: string;
  createdAt: string;
  author: {
    firstName: string;
  };
}

export default function ThreadCard({ thread }: { thread: Thread }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(tabs)/thread/[id]",
          params: { id: thread.id },
        })
      }
    >
      <Box
        bg="$backgroundDark"
        borderBottomWidth={1}
        borderColor="$borderDark"
        px="$4"
        py="$3"
      >
        <HStack space="md" alignItems="flex-start">
          {/* Avatar */}
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
            }}
          />

          {/* Content */}
          <VStack flex={1} space="xs">
            {/* Author */}
            <Text color="$textPrimary" fontWeight="$bold" fontSize="$sm">
              {thread.author.firstName}
            </Text>

            {/* Thread text */}
            <Text color="$textSecondary" fontSize="$sm" numberOfLines={3}>
              {thread.content}
            </Text>

            {/* Time */}
            <Text color="$textSecondary" fontSize="$xs">
              {new Date(thread.createdAt).toLocaleString()}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
}
