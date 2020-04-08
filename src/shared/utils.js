export function flipURN(urn) {
  const colon = ':'
  const dash = '-'
  if (!urn.includes(colon)) {
    return urn
      .split(dash)
      .reduce(
        (acc, value, i, arr) =>
          acc + (i < arr.length - 1 ? colon : dash) + value
      )
  }
  return urn
}
