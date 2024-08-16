import { Box, Text } from "@chakra-ui/react";
import { formatCount } from "../util";
import { ICombined } from "../types";

interface IIndividualMetricComparisonProps {
  combined: ICombined;
}

export const IndividualMetricComparison = (props: IIndividualMetricComparisonProps) => {
  const sorted = props.combined.playerData.sort((a, b) => b.count - a.count);

  return (
    <Box>
      {sorted.map((data) => (
        <Text key={data.username}>
          {data.username}: {formatCount(data.count)} {data.level && <span>(Lv{data.level})</span>}
        </Text>
      ))}
    </Box>
  );
};
