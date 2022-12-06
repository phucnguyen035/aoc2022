export async function getInputFromFile(): Promise<string>;
export async function getInputFromFile(split?: boolean): Promise<string[]>;

export async function getInputFromFile(split = false) {
  const file = await Deno.readFile("input.txt");
  const input = new TextDecoder().decode(file);

  return split ? input.split("\n") : input;
}
