import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Container, Flex, Link, useToast, Text } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { useEffect } from "react";
import { ISearchParams, usernameSearchSchema } from "../types";
import { SortMethod } from "../enums";
import { DEFAULT_USERNAMES } from "../config";

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
        <Text>
          Image assets from{" "}
          <Link href="https://github.com/wise-old-man/wise-old-man" isExternal>
            wise-old-man <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
  validateSearch: (search: Record<string, unknown>): ISearchParams => {
    const usernameSearchResult = usernameSearchSchema.safeParse(search.usernames);

    let error: boolean | undefined;
    if (search.usernames && !usernameSearchResult.success) {
      error = true;
    }

    return {
      sort: (search.sort as SortMethod) || SortMethod.DEFAULT,
      usernames: usernameSearchResult.data || DEFAULT_USERNAMES,
      error,
    };
  },
});
