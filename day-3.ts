import { getInputFromFile } from "./helper.ts";

const items = await getInputFromFile(true);

const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
const calculatePoints = (item: string): number => {
  return alphabetArray.includes(item)
    ? alphabetArray.indexOf(item) + 1
    : alphabetArray.indexOf(item.toLowerCase()) + 1 + 26;
};

const getItemTypeRecursion = (
  groups: string[],
  index: number,
  maxIndex: number,
  previousSet?: Set<string>
): string => {
  if (index === maxIndex) {
    return previousSet?.values().next().value;
  }

  const set = previousSet ?? new Set(groups[0].split(""));
  const value = groups[index].split("").filter((item) => set.has(item));
  const nextSet = new Set(value);

  return getItemTypeRecursion(groups, index + 1, maxIndex, nextSet);
};

(() => {
  const sum = items.reduce((acc, curr) => {
    const half = curr.length / 2;
    const groups = [curr.slice(0, half), curr.slice(half)];
    const item = getItemTypeRecursion(groups, 0, groups.length);
    const points = calculatePoints(item);

    return (acc += points);
  }, 0);

  console.log("challenge 1: ", sum);
})();

(() => {
  // Group items by every 3 items
  const grouped = items.reduce((acc, curr, index) => {
    if (index % 3 === 0) {
      acc.push([curr]);
    } else {
      acc.at(-1)?.push(curr);
    }

    return acc;
  }, [] as string[][]);

  const sum = grouped.reduce((acc, group) => {
    const itemType = getItemTypeRecursion(group, 0, group.length);
    const points = calculatePoints(itemType);

    return (acc += points);
  }, 0);

  console.log("challenge 2: ", sum);
})();
