import { DEFAULT_USERNAMES, MAX_NUM_USERNAMES, MIN_NUM_USERNAMES } from "../../config";
import { usernameSearchSchema } from "./UsernameSchema";

it("should succeed parsing default usernames", () => {
  const usernames: string[] = DEFAULT_USERNAMES;
  const result = usernameSearchSchema.safeParse(usernames);
  expect(result.success).toBeTruthy();
});

it("should succeed parsing min num unique usernames", () => {
  const usernames: string[] = Array.from(Array(MIN_NUM_USERNAMES), (_, index) => index.toString());
  const result = usernameSearchSchema.safeParse(usernames);
  expect(result.success).toBeTruthy();
});

it("should succeed parsing max num unique usernames", () => {
  const usernames: string[] = Array.from(Array(MAX_NUM_USERNAMES), (_, index) => index.toString());
  const result = usernameSearchSchema.safeParse(usernames);
  expect(result.success).toBeTruthy();
});

it("should fail parse on empty array", () => {
  const usernames: string[] = [];
  const result = usernameSearchSchema.safeParse(usernames);
  expect(result.success).toBeFalsy();
});

it.each([
  ["zezima", "zezima"],
  ["zez ima", "zez ima"],
  ["zez ima", "zez-ima"],
  ["zez ima", "zez_ima"],
])("should fail parse when duplicate values exist in array (%s, %s)", (v1, v2) => {
  const usernames: string[] = [v1, v2];
  const result = usernameSearchSchema.safeParse(usernames);
  expect(result.success).toBeFalsy();
});

it("should fail parse on short array", () => {
  const usernames: string[] = Array.from(Array(MIN_NUM_USERNAMES - 1), (_, index) => index.toString());
  const result = usernameSearchSchema.safeParse(usernames);
  expect(result.success).toBeFalsy();
});

it("should fail parse on long array", () => {
  const usernames: string[] = Array.from(Array(MAX_NUM_USERNAMES + 1), (_, index) => index.toString());
  const result = usernameSearchSchema.safeParse(usernames);
  expect(result.success).toBeFalsy();
});

it.each(["", "nameThatIsTooLong", " zezima", "zezima ", "_zezima", "zezima_", "-zezima", "zezima-"])(
  "should fail parse for invalid value (%s)",
  (v1) => {
    const usernames: string[] = [v1, DEFAULT_USERNAMES[0]];
    const result = usernameSearchSchema.safeParse(usernames);
    expect(result.success).toBeFalsy();
  },
);
