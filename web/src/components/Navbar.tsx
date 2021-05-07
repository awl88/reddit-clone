import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface navbarProps {}

export const Navbar: React.FC<navbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex color="white">
        <Box mr={4}>{data.me.username}</Box>
        <NextLink href="/create-post">
          <Link mr={4}>Create Post</Link>
        </NextLink>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tomato" p={4}>
      <NextLink href="/">
        <Heading cursor="pointer" fontSize="xl">
          fakeddit.
        </Heading>
      </NextLink>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
