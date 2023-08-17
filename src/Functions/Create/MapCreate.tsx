import {
  materialRowMap,
  rowMapPrice,
  rowMap,
  dictionaryMap,
  rowTotalMap,
  checkTableMap,
  servicesMap,
} from "Library/Types";
// These functions return the types of rows used for the tables. These are needed to create the tables

export function createRow(label: string, value: React.JSX.Element): rowMap {
  return { label, value };
}

export function createCheckRow(
  label: string,
  value: React.JSX.Element,
  value2: any
): checkTableMap {
  return { label, value, value2 };
}

export function createRowTotal(label: string, value: number): rowTotalMap {
  return { label, value };
}

export function createData(label: string, value: string): dictionaryMap {
  return { label, value };
}

export function createService(
  id: number,
  amount: number,
  formula: string,
  material: string,
  unitPrice: number,
  price: number = 0
): servicesMap {
  return { id, amount, formula, material, unitPrice, price };
}

export function createRowPrice(
  label: string = "", // name
  value: string = "", // name
  formula: string = "price * amount",
  custom: string = "",
  supplier: string = "",
  price: number = 0
): rowMapPrice {
  return { label, value, price, custom, supplier, formula };
}

export function createMaterialRow(id: number): materialRowMap {
  const item: rowMapPrice = createRowPrice();
  const amount: number = 0;
  const price: number = 0;
  const supplier: string = "";
  return {
    item,
    amount,
    price,
    supplier,
    id,
  };
}

export function createMaterialRowItem(
  id: number,
  item: rowMapPrice,
  supplier: string
): materialRowMap {
  const amount: number = 0;
  const price: number = 0;
  return {
    item,
    amount,
    price,
    supplier,
    id,
  };
}

export function createTable(rows: number): materialRowMap[] {
  let emptyTable: materialRowMap[] = [];
  for (let i: number = 0; i < rows; i++) {
    emptyTable.push(createMaterialRow(i));
  }
  return emptyTable;
}
