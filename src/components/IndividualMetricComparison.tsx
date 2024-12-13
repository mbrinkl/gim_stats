import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { formatCount } from "../util";
import { Combined } from "../types";

interface IndividualMetricComparisonProps {
  combined: Combined;
}

export const IndividualMetricComparison = (props: IndividualMetricComparisonProps) => {
  const sorted = props.combined.playerData.sort((a, b) => (b.level || 0) - (a.level || 0) || b.count - a.count);
  const widths = props.combined.playerData.some((data) => data.level != null)
    ? ["40%", "35%", "25%"]
    : ["65%", "35%", "0"];

  return (
    <TableContainer w="100%">
      <Table variant="striped" size="sm" __css={{ width: "full", tableLayout: "fixed" }}>
        <Tbody>
          {sorted.map((data) => (
            <Tr key={data.username}>
              <Td wordBreak="break-all" whiteSpace="normal" w={widths[0]}>
                {data.username}
              </Td>
              <Td isNumeric w={widths[1]}>
                {formatCount(data.count)}
              </Td>
              {data.level != null && (
                <Td isNumeric w={widths[2]}>
                  Lv{data.level}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
