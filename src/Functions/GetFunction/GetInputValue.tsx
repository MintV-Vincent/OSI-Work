export function getValues(
  textInputArray: number[],
  active: string[]
): number[] {
  let activeArray: number[] = [];
  if (active.length > 0) {
    for (let i: number = 0; i < active.length; i++) {
      const element = active[i];
      activeArray.push(textInputArray[Number(element)]);
    }
  }
  return activeArray;
}
