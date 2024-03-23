import { Image, Flex, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { ICombined, formatBossName, formatCount, getWomImgUrl } from "../util";

interface ICombinedCountTableProps {
  tableType: "Boss" | "Activity" | "Skill";
  combinedCounts: ICombined[];
}

export const CombinedCountTable = (props: ICombinedCountTableProps) => {
  return (
    <Flex gap={3} flexWrap="wrap" justify="center">
      {props.combinedCounts.map((combined) => (
        <Flex gap={3} border="1px solid white" borderRadius="15px" p={3} w="300px">
          <Stat key={combined.metric}>
            <StatLabel textTransform="capitalize">
              <Image src={getWomImgUrl(combined.metric)} />
              {formatBossName(combined.metric)}
            </StatLabel>
            <StatNumber> {formatCount(combined.playerData.reduce((sum, y) => sum + y.count, 0))}</StatNumber>
            {/* <StatHelpText>temp</StatHelpText> */}
          </Stat>
          <div>
            {combined.playerData.map((data) => (
              <div>
                {data.username}: {formatCount(data.count)}
              </div>
            ))}
          </div>
        </Flex>
      ))}
    </Flex>
  );
};
