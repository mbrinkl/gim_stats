import { Image, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { formatCount, getWomImgUrl } from "../util";
import { IndividualMetricComparison } from "./IndividualMetricComparison";
import { ICombined } from "../types";

interface ICombinedCountGroupProps {
  combinedCounts: ICombined[];
}

export const CombinedCountGroup = (props: ICombinedCountGroupProps) => {
  return (
    <Flex gap={3} flexWrap="wrap" justify="center">
      {props.combinedCounts.map((combined) => (
        <Flex key={combined.metric} gap={3} border="1px solid white" borderRadius="15px" p={3} w="320px" align="center">
          <Stat key={combined.metric}>
            <StatLabel textTransform="capitalize">
              <Image src={getWomImgUrl(combined.metric)} />
              {combined.metric}
            </StatLabel>
            <StatNumber> {formatCount(combined.playerData.reduce((sum, y) => sum + y.count, 0))}</StatNumber>
            {/* <StatHelpText>temp</StatHelpText> */}
          </Stat>
          <IndividualMetricComparison combined={combined} />
        </Flex>
      ))}
    </Flex>
  );
};
