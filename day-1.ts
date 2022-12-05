import { getInputFromFile } from "./helper.ts";

const input = await getInputFromFile();
const array = input.split("\n");
const elves = array.reduce(
  (acc, curr) => {
    if (curr === "") {
      acc.push(0);
    } else {
      acc[acc.length - 1] += parseInt(curr);
    }

    return acc;
  },
  [0]
);

const sum = elves
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);

console.log("sum: ", sum);
