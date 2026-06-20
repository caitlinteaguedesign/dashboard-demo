export function roundDecimal(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
