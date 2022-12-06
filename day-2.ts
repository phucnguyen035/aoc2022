import { getInputFromFile } from "./helper.ts";

const rounds = await getInputFromFile(true);

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
    let roundPoints = points[desiredResult];

    switch (desiredResult) {
      case "draw":
        roundPoints += pointsByOpponentShape[opponentShape];
        break;
      case "win":
        roundPoints += pointsByOpponentShape[shapeToBeat[opponentShape]];
        break;
      case "loss":
        roundPoints += pointsByOpponentShape[shapeToLose[opponentShape]];
        break;
      default:
        break;
    }

    return (acc += roundPoints);
  }, 0);

  console.log("challenge 2: ", total);
})();
