import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { GlobalProvider } from "@ladle/react";
import { theme } from "../src/theme";

export const Provider: GlobalProvider = ({ children }) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;
