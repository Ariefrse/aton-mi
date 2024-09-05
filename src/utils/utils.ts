import { GridValueFormatter } from "@mui/x-data-grid";

/**
 * The function `formatToNormalCase` converts a snake_case or camelCase string to "Normal Case" by
 * inserting spaces before capital letters and capitalizing the first letter.
 * @param {string} fieldName - fieldName: user_id
 * @returns The function `formatToNormalCase` takes a string in snake_case format, converts it to
 * camelCase, and then converts it to "Normal Case" by inserting spaces before capital letters and
 * capitalizing the first letter. The function returns the input string converted to "Normal Case".
 */
export function formatToNormalCase(fieldName: string): string {
  const camelCaseName = fieldName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

  const normalCaseName = camelCaseName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());

  return normalCaseName;
}


/**
 * The function `tableValueFormatter` formats grid values and sets background colors based on specific
 * conditions for different fields.
 * @param {GridValueFormatter} params - The `tableValueFormatter` function takes in a parameter
 * `params` of type `GridValueFormatter`. This parameter likely contains information about the value
 * being formatted, such as the value itself and the field it belongs to.
 * @returns The `tableValueFormatter` function returns an object with two properties: `value` and
 * `style`. The `value` property contains the formatted value based on the conditions specified in the
 * switch statement, and the `style` property contains an object with the `backgroundColor` property
 * set based on the conditions in the switch statement.
 */
export const tableValueFormatter = (params: GridValueFormatter) => {
  const value = params.value;
  let formattedValue = value;
  let backgroundColor = "";

  switch (params.field) {
    case "minBattAton":
    case "maxBattAton":
      if (value < 12.0) {
        backgroundColor = "rgba(29, 78, 216, 1)";
      }
      break;
    case "maxBattLant":
      if (value > 15.0) {
        backgroundColor = "rgba(29, 78, 216, 1)";
      }
      break;
    case "off_pos":
      formattedValue = value === "NG" ? "NG" : "OK";
      backgroundColor = value === "NG" ? "rgba(29, 78, 216, 1)" : ""; // Blue for NG
      break;
    case "msg6Count":
      if (value <= 0) {
        backgroundColor = "rgba(29, 78, 216, 1)"; // Blue for missing message
      }
      break;
    case "siteTx":
      formattedValue = value === "NG" ? "NG" : "OK";
      backgroundColor = value === "NG" ? "rgba(29, 78, 216, 1)" : ""; // Blue for NG
      break;
    default:
      break;
  }

  return {
    value: formattedValue,
    style: {
      backgroundColor,
    },
  };
};