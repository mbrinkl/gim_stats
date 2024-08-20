import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Container, Flex, Link } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRoute, createRootRouteWithContext } from "@tanstack/react-router";

const Layout = () => {
  return (
    <Container maxW="container.xl" h="100dvh" p="1rem">
      <Flex direction="column" justify="space-between" h="100%">
        <Outlet />
        <Link href="https://github.com/mbrinkl/gim_stats" isExternal alignSelf="flex-end">
          Source <ExternalLinkIcon mx="2px" />
        </Link>
      </Flex>
    </Container>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
});
