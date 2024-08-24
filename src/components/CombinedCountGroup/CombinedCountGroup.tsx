import { Image, Flex, Text, VStack, Box } from "@chakra-ui/react";
import { formatCount, getWomImages } from "../../util";
import { IndividualMetricComparison } from "../IndividualMetricComparison";
import { ICombined } from "../../types";

interface ICombinedCountGroupProps {
  combinedCounts: ICombined[];
}

export const CombinedCountGroup = (props: ICombinedCountGroupProps) => {
  return (
    <Flex gap={3} flexWrap="wrap" justify="center">
      {props.combinedCounts.map((combined) => {
        const { backgroundImg, metricImg } = getWomImages(combined.metric.name);
        return (
          <VStack
            key={combined.metric.name}
            border="1px solid white"
            borderRadius="15px"
            p="1rem"
            w="320px"
            align="center"
            backgroundImage={backgroundImg}
            backgroundSize="cover"
          >
            <Flex justify="space-between" align="center" w="100%">
              <Box>
                {combined.metric.highlight ? (
                  combined.metric.highlight.isAlias ? (
                    <>
                      <Text>{combined.metric.name}</Text>
                      <Text as="span">({combined.metric.highlight.value})</Text>
                    </>
                  ) : (
                    combined.metric.highlight.value
                  )
                ) : (
                  <Text>{combined.metric.name}</Text>
                )}
                <Text fontSize="2xl" fontWeight="bold">
                  {formatCount(combined.total)}
                </Text>
              </Box>
              <Image src={metricImg} alt={combined.metric.name} boxSize="30px" objectFit="contain" />
            </Flex>
            <IndividualMetricComparison combined={combined} />
          </VStack>
        );
      })}
    </Flex>
  );
};
