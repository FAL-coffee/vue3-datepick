/**
 * @param {T[]} inputArray
 * @param {number} chunkSize
 * @returns {T[][]}
 * @description
 * Splits an array into chunks of a specified size.
 */
export const chunkArray = <T>(inputArray: T[], chunkSize: number): T[][] => {
  const results = []

  while (inputArray.length) {
    results.push(inputArray.splice(0, chunkSize))
  }

  return results
}

/**
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 * @description
 * Generates a sequence of numbers from start to end.
 */
export const range = (start: number, end: number) => {
  const results = []

  for (let i = start; i <= end; i++) {
    results.push(i)
  }
  return results
}
