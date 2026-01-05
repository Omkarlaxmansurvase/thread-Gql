import {
  VStack,
  Textarea,
  TextareaInput,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_THREAD, GET_ALL_THREADS } from "@/graphql/threads";
import type {
  CreateThreadResponse,
  CreateThreadVariables,
} from "@/graphql/types";

export default function CreateThreadScreen() {
  const [content, setContent] = useState("");

  const [createThread, { loading }] = useMutation<
    CreateThreadResponse,
    CreateThreadVariables
  >(CREATE_THREAD, {
    refetchQueries: [GET_ALL_THREADS],
  });

  const submit = async () => {
    if (!content.trim()) return;

    await createThread({ variables: { content } });
    setContent("");
  };

  return (
    <VStack flex={1} bg="$backgroundDark" p="$6" space="md">
      <Textarea borderColor="$borderDark">
        <TextareaInput
          placeholder="Start a thread..."
          value={content}
          onChangeText={setContent}
          color="$textPrimary"
        />
      </Textarea>

      <Button bg="$buttonPrimary" onPress={submit} isDisabled={loading}>
        <ButtonText color="$buttonText">
          {loading ? "Posting…" : "Post"}
        </ButtonText>
      </Button>
    </VStack>
  );
}
