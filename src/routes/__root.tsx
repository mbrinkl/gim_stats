import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Container, Flex, Link, useToast, Text, Box } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, Link as RouterLink } from "@tanstack/react-router";
import { useEffect } from "react";
import { SearchParams, usernameSearchSchema } from "../types";
import { DEFAULT_USERNAMES } from "../config";
import { sortMethodSchema } from "../types";

const Layout = () => {
  const { error } = Route.useSearch();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      const toastId = "error-toast";
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          title: "Error.",
          description: "Error parsing usernames in url search query. Using default usernames.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [error, toast]);

  return (
    <Container
      maxW="container.xl"
      display="flex"
      minH="100dvh"
      p="1rem"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Outlet />
      <Flex direction="column" justify="flex-end" align="flex-end">
        <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
          Source <ExternalLinkIcon mx="2px" />
        </Link>
      </Flex>
    </Container>
  );
};

const NotFound = () => {
  return (
    <Box>
      <Text fontSize="xl">Page Not found</Text>
      <Link as={RouterLink} to="/">
        Back to Home
      </Link>
    </Box>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
  notFoundComponent: NotFound,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const usernameSearchResult = usernameSearchSchema.safeParse(search.usernames);

    let error: boolean | undefined;
    if (search.usernames && !usernameSearchResult.success) {
      error = true;
    }

    return {
      sort: sortMethodSchema.parse(search.sort),
      usernames: usernameSearchResult.data || DEFAULT_USERNAMES,
      error,
    };
  },
});
