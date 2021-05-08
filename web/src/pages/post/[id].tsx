import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, Divider, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../../components/Layout";
import { useDeletePostMutation, useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

export const Post: React.FC<{}> = ({}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: postData, fetching }] = useGetPostFromUrl();
  const [{ data: meData }] = useMeQuery();

  if (fetching)
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );

  if (!postData?.post)
    return (
      <Layout>
        <Box>Could not find that post :(</Box>
      </Layout>
    );

  const date = new Date(parseInt(postData.post.createdAt));

  return (
    <Layout>
      <Flex mb={4} alignItems="flex-end">
        <Heading bottom={0} flex={1}>
          {postData.post.title}
          <Box ml={2} fontWeight="light">
            <Text fontSize="sm">by {postData.post.creator.username}</Text>
            <Text fontSize="xs">{date.toDateString()}</Text>
          </Box>
        </Heading>
        {postData.post.creator.id === meData?.me?.id ? (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="right"
            mr={4}
          >
            <NextLink href="/">
              <Button
                size="xs"
                mb={2}
                colorScheme="blackAlpha"
                onClick={async () => {
                  await deletePost({ id: postData.post!.id });
                }}
              >
                delete post
              </Button>
            </NextLink>
            <NextLink
              href="/post/edit/[id]"
              as={`/post/edit/${postData.post!.id}`}
            >
              <Button size="xs" colorScheme="blackAlpha">
                update post
              </Button>
            </NextLink>
          </Flex>
        ) : null}
      </Flex>
      <Divider orientation="horizontal" />

      <Text m={4}>{postData.post.text}</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
