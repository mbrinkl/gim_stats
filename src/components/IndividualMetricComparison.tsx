import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { formatCount } from "../util";
import { ICombined } from "../types";

interface IIndividualMetricComparisonProps {
  combined: ICombined;
}

export const IndividualMetricComparison = (props: IIndividualMetricComparisonProps) => {
  const sorted = props.combined.playerData.sort((a, b) => (b.level || 0) - (a.level || 0) || b.count - a.count);

  return (
    <TableContainer w="100%">
      <Table variant="striped" size="sm">
        <Tbody>
          {sorted.map((data) => (
            <Tr key={data.username}>
              <Td>{data.username}</Td>
              <Td isNumeric>{formatCount(data.count)}</Td>
              {data.level != null && <Td>Lv{data.level}</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
