import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

export const Post: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [, deletePost] = useDeletePostMutation();
  const [{ data: postData, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
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
        <Box>Could not find that post :/</Box>
      </Layout>
    );

  return (
    <Layout>
      <Flex>
        <Heading flex={1} mb={4}>
          {postData.post.title}
        </Heading>
        {postData.post.creator.id === meData?.me?.id ? (
          <Link
            onClick={async () => {
              await deletePost({ id: postData.post!.id });
              router.push("/");
            }}
          >
            delete post
          </Link>
        ) : null}
      </Flex>
      {postData.post.text}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
