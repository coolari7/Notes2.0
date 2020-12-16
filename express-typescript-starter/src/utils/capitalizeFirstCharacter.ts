// eslint-disable-next-line import/prefer-default-export
export function capitalizeFirstCharacter(str: string): string {
  const split = str.split("");
  split[0] = split[0].toUpperCase();
  return split.join("");
}
