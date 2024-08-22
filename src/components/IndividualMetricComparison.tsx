import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { formatCount } from "../util";
import { ICombined } from "../types";

interface IIndividualMetricComparisonProps {
  combined: ICombined;
}

export const IndividualMetricComparison = (props: IIndividualMetricComparisonProps) => {
  const sorted = props.combined.playerData.sort((a, b) => b.count - a.count);

  return (
    <TableContainer w="100%">
      <Table variant="striped" size="sm">
        <Tbody>
          {sorted.map((data) => (
            <Tr key={data.username}>
              <Td>{data.username}</Td>
              <Td isNumeric>{formatCount(data.count)}</Td>
              {data.level && <Td>Lv{data.level}</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>

    // <Box>
    //   {sorted.map((data) => (
    //     <Flex key={data.username} justify="space-between" align="flex-end" gap={1}>
    //       <Text overflowWrap="anywhere">{data.username}:</Text>
    //       <Text align="right">
    //         {formatCount(data.count)} {data.level && <span>(Lv{data.level})</span>}
    //       </Text>
    //     </Flex>
    //   ))}
    // </Box>
  );
};
