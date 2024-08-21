import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Container, Link } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

const Layout = () => {
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
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal alignSelf="flex-end">
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </Container>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Layout,
});
