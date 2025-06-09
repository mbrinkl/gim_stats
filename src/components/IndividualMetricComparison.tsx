import { Table } from "@mantine/core";
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
    <Table striped withRowBorders={false} stripedColor="gray">
      <Table.Tbody>
        {sorted.map((data) => (
          <Table.Tr key={data.username}>
            <Table.Td style={{ wordBreak: "break-all", whiteSpace: "normal" }} w={widths[0]}>
              {data.username}
            </Table.Td>
            <Table.Td w={widths[1]} style={{ textAlign: "right" }}>
              {formatCount(data.count)}
            </Table.Td>
            {data.level != null && <Table.Td w={widths[2]}>Lv{data.level}</Table.Td>}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
