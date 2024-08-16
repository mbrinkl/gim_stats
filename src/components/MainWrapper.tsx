import { IconButton, Input, InputGroup, InputRightElement, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "./PlayerTotals";
import { ExternalLinkIcon, CloseIcon } from "@chakra-ui/icons";
import { IPlayerDetails } from "../types";
import { useState } from "react";

interface IMainWrapperProps {
  players: IPlayerDetails[];
}

export const MainWrapper = (props: IMainWrapperProps) => {
  const [searchedMetric, setSearchedMetric] = useState("");

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedMetric(e.target.value);
  };

  const onClearSearch = () => {
    setSearchedMetric("");
  };

  return (
    <VStack gap={5} padding={3}>
      <InputGroup size="md">
        <Input pr="4.5rem" placeholder="Search" onChange={onSearch} />
        {searchedMetric && (
          <InputRightElement width="4.5rem">
            <IconButton size="sm" h="1.75rem" aria-label="Clear search" icon={<CloseIcon />} onClick={onClearSearch} />
          </InputRightElement>
        )}
      </InputGroup>
      <PlayerTotals players={props.players} searchedMetric={searchedMetric} />
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};
