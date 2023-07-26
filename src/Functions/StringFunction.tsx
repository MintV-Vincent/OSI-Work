export function upperCaseString(customer: string): string {
  const splitWord: string[] = customer.split(" ");

  for (let i: number = 0; i < splitWord.length; i++) {
    splitWord[i] = splitWord[i].charAt(0).toUpperCase() + splitWord[i].slice(1);
  }
  return splitWord.join(" ");
}
