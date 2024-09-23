/**
 * The function `formatToNormalCase` converts a snake_case or camelCase string to "Normal Case" by
 * inserting spaces before capital letters and capitalizing the first letter.
 * @param {string} fieldName - fieldName: user_id
 * @returns The function `formatToNormalCase` takes a string in snake_case format, converts it to
 * camelCase, and then converts it to "Normal Case" by inserting spaces before capital letters and
 * capitalizing the first letter. The function returns the input string converted to "Normal Case".
 */
export function formatToNormalCase(fieldName: string): string {
  const camelCaseName = fieldName.replace(/_([a-z])/g, (g) =>
    g[1].toUpperCase()
  );

  const normalCaseName = camelCaseName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  return normalCaseName;
}