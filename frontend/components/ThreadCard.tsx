// components/ThreadCard.tsx
import { Box, Text, HStack, VStack } from "@gluestack-ui/themed";

interface Thread {
  id: string;
  content: string;
  createdAt: string;
  author: {
    firstName: string;
  };
}

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Box
      bg="$backgroundDark"
      borderBottomWidth={1}
      borderColor="$borderDark"
      px="$4"
      py="$3"
    >
      <HStack space="md" alignItems="flex-start">
        {/* Avatar */}
        <Box
          w={36}
          h={36}
          bg="$borderDark"
          rounded="$full"
        />

        {/* Content */}
        <VStack flex={1} space="xs">
          {/* Author */}
          <Text
            color="$textPrimary"
            fontWeight="$bold"
            fontSize="$sm"
          >
            {thread.author.firstName}
          </Text>

          {/* Thread text */}
          <Text
            color="$textSecondary"
            fontSize="$sm"
          >
            {thread.content}
          </Text>

          {/* Time */}
          <Text
            color="$textSecondary"
            fontSize="$xs"
          >
            {new Date(thread.createdAt).toLocaleString()}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
