import { Combined } from "./types";
import { formatCount, normalizeCount, sort } from "./util";

describe(normalizeCount.name, () => {
  it("should normalize -1 count to zero", () => {
    const result = normalizeCount(-1);
    expect(result).toBe(0);
  });

  it("should keep unchanged count for non-negative value", () => {
    const result = normalizeCount(1);
    expect(result).toBe(1);
  });
});

describe(formatCount.name, () => {
  it("should not format counts under formatting threshhold", () => {
    const result = formatCount(99999);
    expect(result).toBe("99999");
  });

  it.each([
    [100_000, "0.1M"],
    [1_000_000, "1.0M"],
    [1_500_000, "1.5M"],
    [1_000_000_000, "1000.0M"],
  ])("should format counts that match threshhold (%s -> %s)", (val, expectedResult) => {
    const result = formatCount(val);
    expect(result).toBe(expectedResult);
  });
});

describe(sort.name, () => {
  it("should not modify inout array", () => {
    const arr: Combined[] = [];
    const result = sort(arr, "alphabetical");
    expect(result).not.toBe(arr);
  });

  it("should return sort unchanged sorting on default", () => {
    const arr: Combined[] = [
      { metric: { name: "B", aliases: [] }, playerData: [], total: 100 },
      { metric: { name: "A", aliases: [] }, playerData: [], total: 100 },
    ];
    const result = sort(arr, "default");
    expect(result).toEqual(arr);
  });

  it("should alphabetically sort", () => {
    const arr: Combined[] = [
      { metric: { name: "B", aliases: [] }, playerData: [], total: 100 },
      { metric: { name: "A", aliases: [] }, playerData: [], total: 100 },
    ];
    const result = sort(arr, "alphabetical");
    expect(result[0].metric.name).toBe("A");
    expect(result[1].metric.name).toBe("B");
  });

  it("should sort by total", () => {
    const arr: Combined[] = [
      { metric: { name: "A", aliases: [] }, playerData: [], total: 50 },
      { metric: { name: "B", aliases: [] }, playerData: [], total: 100 },
    ];
    const result = sort(arr, "by_count");
    expect(result[0].total).toBe(100);
    expect(result[1].total).toBe(50);
  });
});
