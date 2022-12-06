import { getInputFromFile } from "./helper.ts";

const array = await getInputFromFile(true);
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

(() => {
  const sum = elves.sort((a, b) => b - a).at(0);

  console.log("challenge1: ", sum);
})();

(() => {
  const sum = elves
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);

  console.log("challenge2: ", sum);
})();
