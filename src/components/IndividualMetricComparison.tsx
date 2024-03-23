import { Box, Text } from "@chakra-ui/react";
import { ICombined, formatCount } from "../util";

interface IIndividualMetricComparisonProps {
  combined: ICombined;
}

export const IndividualMetricComparison = (props: IIndividualMetricComparisonProps) => {
  const sorted = props.combined.playerData.sort((x) => x.count);

  return (
    <Box>
      {sorted.map((data) => (
        <Text>
          {data.username}: {formatCount(data.count)} {data.level && <span>(Lv{data.level})</span>}
        </Text>
      ))}
    </Box>
  );
};
