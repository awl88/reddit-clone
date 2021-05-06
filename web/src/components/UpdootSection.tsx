import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Box } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={() => {
          vote({
            postId: post.id,
            value: 1,
          });
        }}
        aria-label="Updoot post"
        icon={<ChevronUpIcon fontSize="2xl" />}
      />
      <Box>{post.points}</Box>
      <IconButton
        onClick={() => {
          vote({
            postId: post.id,
            value: -1,
          });
        }}
        aria-label="Downdoot post"
        icon={<ChevronDownIcon fontSize="2xl" />}
      />
    </Flex>
  );
};
