import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { getProxiedUrl } from "../util";

const fetchGroup = async (groupName: string): Promise<string[]> => {
  const url = "https://secure.runescape.com/m=hiscore_oldschool_ironman/group-ironman/view-group?name=" + groupName;
  const proxiedUrl = getProxiedUrl(url);
  const res = await fetch(proxiedUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch group data");
  }
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const usernames: string[] = [];

  const trElements = doc.querySelectorAll("tr.uc-scroll__table-row--type-player");

  trElements.forEach((tr) => {
    const firstTd = tr.querySelector("td")?.querySelector("a");
    if (firstTd?.textContent) {
      usernames.push(firstTd.textContent.trim().replace(/�/g, "_"));
    }
  });

  if (usernames.length === 0 || usernames.length > 5) {
    throw new Error("Failed to fetch group data");
  }

  return usernames;
};

export const useFetchGroupMutation = (onSuccess: (groupUsernames: string[]) => void) =>
  useMutation({
    mutationFn: fetchGroup,
    onSuccess,
    onError: () => {
      notifications.show({
        title: "Error.",
        message: "Unable to fetch usernames for group",
        color: "red",
      });
    },
  });
