import { getInputFromFile } from "./helper.ts";

const input = await getInputFromFile();

const points = {
  win: 6,
  draw: 3,
  loss: 0,
} as const;

const pointsByOpponentShape = {
  A: 1,
  B: 2,
  C: 3,
} as const;

const rounds = input.split("\n");

(() => {
  const pointsByUserShape = {
    X: 1,
    Y: 2,
    Z: 3,
  } as const;

  const equal = {
    A: "X",
    B: "Y",
    C: "Z",
  } as const;

  const lose = {
    A: "Z",
    B: "X",
    C: "Y",
  } as const;

  const getResult = (
    userShape: "X" | "Y" | "Z",
    opponentShape: "A" | "B" | "C"
  ) => {
    if (userShape === equal[opponentShape]) {
      return "draw";
    }

    if (userShape === lose[opponentShape]) {
      return "loss";
    }

    return "win";
  };

  const total = rounds.reduce((acc, round) => {
    const [opponentShape, userShape] = round.split(" ") as [
      keyof typeof pointsByOpponentShape,
      keyof typeof pointsByUserShape
    ];

    const userPoints = pointsByUserShape[userShape];

    return (acc += userPoints + points[getResult(userShape, opponentShape)]);
  }, 0);

  console.log("challenge 1: ", total);
})();

(() => {
  const resultMap = {
    X: "loss",
    Y: "draw",
    Z: "win",
  } as const;

  const shapeToBeat = {
    A: "B",
    B: "C",
    C: "A",
  } as const;

  const shapeToLose = {
    A: "C",
    B: "A",
    C: "B",
  } as const;

  const total = rounds.reduce((acc, round) => {
    const [opponentShape, result] = round.split(" ") as [
      keyof typeof pointsByOpponentShape,
      keyof typeof resultMap
    ];

    const desiredResult = resultMap[result];
    const roundPoints = points[desiredResult];
    let actualPoints = 0;

    switch (desiredResult) {
      case "draw":
        actualPoints = roundPoints + pointsByOpponentShape[opponentShape];
        break;
      case "win":
        actualPoints =
          roundPoints + pointsByOpponentShape[shapeToBeat[opponentShape]];
        break;
      case "loss":
        actualPoints =
          roundPoints + pointsByOpponentShape[shapeToLose[opponentShape]];
        break;
      default:
        break;
    }

    return (acc += actualPoints);
  }, 0);

  console.log("challenge 2: ", total);
})();
