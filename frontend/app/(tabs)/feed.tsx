// app/(tabs)/feed.tsx
import { ScrollView, VStack, Text } from "@gluestack-ui/themed";
import { useQuery } from "@apollo/client/react";
import ThreadCard from "@/components/ThreadCard";
import { GET_ALL_THREADS } from "@/graphql/threads";

interface GetAllThreadsResponse {
  getAllThreads: {
    id: string;
    content: string;
    createdAt: string;
    author: {
      firstName: string;
    };
  }[];
}

export default function FeedScreen() {
  const { data, loading, error } =
    useQuery<GetAllThreadsResponse>(GET_ALL_THREADS);

  if (loading) {
    return (
      <VStack flex={1} bg="$backgroundDark" justifyContent="center" alignItems="center">
        <Text color="$textSecondary">Loading threads…</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack flex={1} bg="$backgroundDark" justifyContent="center" alignItems="center">
        <Text color="$textSecondary">Failed to load threads</Text>
      </VStack>
    );
  }

  return (
    <ScrollView bg="$backgroundDark">
      <VStack>
        {data?.getAllThreads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </VStack>
    </ScrollView>
  );
}
