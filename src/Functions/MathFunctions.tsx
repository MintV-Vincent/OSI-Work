/**
 *
 * @param total number -> The total that is being passed into the function
 * @param dividor number -> Turn into a float and divid the total. This should be yeild, number of units or margin
 * @returns if dividor is not a number return total, else return total/dividor
 */
export function newTotal(total: number, dividor: number | ""): number {
  if (dividor === 0 || dividor === "") return total;
  return total / dividor;
}
