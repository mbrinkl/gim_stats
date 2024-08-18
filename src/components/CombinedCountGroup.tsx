import { Image, Flex, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { combineCounts, formatCount, getWomImages } from "../util";
import { IndividualMetricComparison } from "./IndividualMetricComparison";
import { ICombined } from "../types";

interface ICombinedCountGroupProps {
  combinedCounts: ICombined[];
}

export const CombinedCountGroup = (props: ICombinedCountGroupProps) => {
  return (
    <Flex gap={3} flexWrap="wrap" justify="center">
      {props.combinedCounts.map((combined) => {
        const { backgroundImg, metricImg } = getWomImages(combined.metric.name);
        return (
          <Flex
            key={combined.metric.name}
            gap={3}
            border="1px solid white"
            borderRadius="15px"
            p={3}
            w="320px"
            align="center"
            backgroundImage={backgroundImg}
            backgroundSize="cover"
          >
            <Stat key={combined.metric.name}>
              <StatLabel>{combined.metric.name}</StatLabel>
              <StatNumber>{formatCount(combineCounts(combined))}</StatNumber>
              <StatHelpText mb={0} opacity={1}>
                <Image src={metricImg} />
              </StatHelpText>
            </Stat>
            <IndividualMetricComparison combined={combined} />
          </Flex>
        );
      })}
    </Flex>
  );
};
