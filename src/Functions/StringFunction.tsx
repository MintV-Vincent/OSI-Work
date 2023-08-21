/**
 *
 * @param customer: string -> The customer that is being added
 * @returns: string -> Returns the customer but upper cases after every space
 */
export function upperCaseString(customer: string): string {
  const splitWord: string[] = customer.split(" ");

  for (let i: number = 0; i < splitWord.length; i++) {
    splitWord[i] = splitWord[i].charAt(0).toUpperCase() + splitWord[i].slice(1);
  }
  return splitWord.join(" ");
}
