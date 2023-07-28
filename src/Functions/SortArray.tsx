import { dictionaryMap } from "Library/Types";

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

function swap(arr: dictionaryMap[], start: number, end: number): void {
  let temp: dictionaryMap = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}

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

export function addItem(arr: dictionaryMap[], item: dictionaryMap): number {
  let index = binarySearch(arr, item);
  if (index === -1) {
    return -1;
  }
  arr.splice(index, 0, item);
  return 0;
}

export default function SortArray(data: dictionaryMap[], setData: any): void {
  quickSort(data);
  setData(data);
}
