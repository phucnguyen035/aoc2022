export async function getInputFromFile() {
  const file = await Deno.readFile("input.txt");
  return new TextDecoder().decode(file);
}
