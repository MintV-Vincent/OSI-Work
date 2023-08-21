import { dictionaryMap } from "Library/Types";

/**
 *
 * @param arr: dictionaryMap[] -> The array of the customer and codes
 * @param start: number = 0 -> The start of the sort index
 * @param end: number = arr.length - 1 -> The end of the sort index
 * @returns void
 */
function quickSort(
  arr: dictionaryMap[],
  start: number = 0,
  end: number = arr.length - 1
): void {
  if (start >= end) {
    return;
  }

  let index: number = partition(arr, start, end);

  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
}

/**
 *
 * @param arr: dictionaryMap[] -> The array of the customer and codes
 * @param start: number -> The start of the partition
 * @param end: number -> The end of the partition
 * @returns: number -> The index where the swap of the the parition takes place
 */
function partition(arr: dictionaryMap[], start: number, end: number): number {
  //Right shift check
  const pivotValue: dictionaryMap = arr[end];
  let pivotIndex: number = start;

  for (let i: number = start; i < end; i++) {
    if (arr[i].label < pivotValue.label) {
      swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  swap(arr, end, pivotIndex);
  return pivotIndex;
}

/**
 *
 * @param arr: dictionaryMap[] -> The array of the customer and codes
 * @param start The start partition
 * @param end The end partition
 */
function swap(arr: dictionaryMap[], start: number, end: number): void {
  let temp: dictionaryMap = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}

/**
 *
 * @param arr: dictionaryMap[] -> The array of customers and codes
 * @param item: dictionaryMap -> The added customer and code
 * @returns: number -> The index at which the new item should be added
 */
function binarySearch(arr: dictionaryMap[], item: dictionaryMap): number {
  //Binary Search algrorithm
  let start: number = 0;
  let end: number = arr.length - 1;
  while (start <= end) {
    const middle = (start + end) >>> 1;
    let pivot: string = arr[middle].label;
    if (item.label < pivot) {
      end = middle - 1;
    } else if (item.label > pivot) {
      start = middle + 1;
    } else {
      return -1;
    }
  }
  return start;
}

/**
 * This adds the item to the customer and codes array
 * @param arr: dictionaryMap[] -> The array of customers and codes
 * @param item: dictionaryMap -> The added customer and code
 * @returns 0 for success, -1 for fail
 */
export function addItem(arr: dictionaryMap[], item: dictionaryMap): number {
  let index = binarySearch(arr, item);
  if (index === -1) {
    return -1;
  }
  arr.splice(index, 0, item);
  return 0;
}

/**
 * Quick sort the data then set the data to the quick sort. Quick sort in place!
 * @param data: dictionaryMap[] -> The array of customers and codes
 * @param setData: Set the data, make sure the quick sort actually sorted the data in place.
 */
export default function SortArray(data: dictionaryMap[], setData: any): void {
  quickSort(data);
  setData(data);
}
