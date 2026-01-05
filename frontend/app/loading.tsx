import { Center, Spinner } from "@gluestack-ui/themed";

export default function LoadingScreen() {
  return (
    <Center flex={1}>
      <Spinner size="large" />
    </Center>
  );
}
