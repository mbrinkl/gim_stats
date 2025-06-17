import { IconExternalLink } from "@tabler/icons-react";
import { Container, Flex, Text, Box, Anchor, Center } from "@mantine/core";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, Link as RouterLink } from "@tanstack/react-router";
import { SearchParams, usernameSearchSchema } from "../types";
import { DEFAULT_USERNAMES } from "../config";
import { sortMethodSchema } from "../types";
import { notifications } from "@mantine/notifications";

const Layout = () => {
  return (
    <Container
      size="lg"
      display="flex"
      style={{
        minHeight: "100dvh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      p="1rem"
    >
      <Outlet />
      <Flex direction="column" justify="flex-end" align="flex-end">
        <Anchor href="https://github.com/mbrinkl/gim_stats">
          <Center style={{ gap: "0.25rem" }}>
            Source <IconExternalLink />
          </Center>
        </Anchor>
      </Flex>
    </Container>
  );
};

const NotFound = () => {
  return (
    <Box>
      <Text size="xl">Page Not found</Text>
      <Anchor component={RouterLink} to="/">
        Back to Home
      </Anchor>
    </Box>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
  notFoundComponent: NotFound,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const usernameSearchResult = usernameSearchSchema.safeParse(search.usernames);

    if (search.usernames && !usernameSearchResult.success) {
      notifications.show({
        title: "Error",
        message: "Error parsing usernames in url search query. Using default usernames.",
        color: "red",
      });
    }

    return {
      sort: sortMethodSchema.parse(search.sort),
      usernames: usernameSearchResult.data || DEFAULT_USERNAMES,
    };
  },
});
