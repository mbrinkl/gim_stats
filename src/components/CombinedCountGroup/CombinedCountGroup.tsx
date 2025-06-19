import { Box, Flex, Image, Stack, Text } from "@mantine/core";
import { Combined } from "../../types";
import { formatCount, getWomImages } from "../../util";
import { IndividualMetricComparison } from "../IndividualMetricComparison";

interface CombinedCountGroupProps {
  combinedCounts: Combined[];
}

export const CombinedCountGroup = (props: CombinedCountGroupProps) => {
  const getTitle = (combined: Combined): React.JSX.Element => {
    if (!combined.metric.highlight) {
      return <Text>{combined.metric.name}</Text>;
    }
    if (combined.metric.highlight.isAlias) {
      return (
        <>
          <Text>{combined.metric.name}</Text>
          <Text component="span">({combined.metric.highlight.value})</Text>
        </>
      );
    }
    return combined.metric.highlight.value;
  };

  return (
    <Flex gap="0.5rem" wrap="wrap" justify="center" pt="sm">
      {props.combinedCounts.map((combined) => {
        const { backgroundImg, metricImg } = getWomImages(combined.metric.name);
        return (
          <Stack
            key={combined.metric.name}
            style={{
              border: "1px solid white",
              borderRadius: "15px",
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
            }}
            p="1rem"
            w="320px"
            align="center"
          >
            <Flex justify="space-between" align="center" w="100%">
              <Box>
                {getTitle(combined)}
                <Text size="xl" fw="bold">
                  {formatCount(combined.total)}
                </Text>
              </Box>
              <Image src={metricImg} alt={combined.metric.name} h={30} w={30} fit="contain" />
            </Flex>
            <IndividualMetricComparison combined={combined} />
          </Stack>
        );
      })}
    </Flex>
  );
};
