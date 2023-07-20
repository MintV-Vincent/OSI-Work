import {
  materialRowMap,
  rowMapPrice,
  rowMap,
  dictionaryMap,
  supplierMap,
  rowTotalMap,
  rowMap2,
} from "Interface/Types";
// These functions return the types of rows used for the tables. These are needed to create the tables

export function createRow(label: string, value: React.JSX.Element): rowMap {
  return { label, value };
}

export function createCheckRow(
  label: string,
  value: React.JSX.Element,
  value2: any
): rowMap2 {
  return { label, value, value2 };
}

export function createRowTotal(label: string, value: number): rowTotalMap {
  return { label, value };
}

export function createData(label: string, value: string): dictionaryMap {
  return { label, value };
}

export function createRowPrice(
  label: string, // name
  value: string, // name
  price: number,
  formula: string,
  custom: string = "",
  supplier: string = ""
): rowMapPrice {
  return { label, value, price, custom, supplier, formula };
}

export function createTemp(
  value: string,
  label: string,
  arr: any
): supplierMap {
  return { value, label, arr };
}

export function createMaterialRow(id: number): materialRowMap {
  const custom: string = "";
  const formula: string = "";
  const supplier: string = "";
  const material: string = "";
  const unitPrice: number = 0;
  const amount: number = 0;
  const price: number = 0;
  return {
    supplier,
    material,
    custom,
    amount,
    id,
    unitPrice,
    price,
    formula,
  };
}

export function createTable(rows: number): materialRowMap[] {
  let emptyTable: materialRowMap[] = [];
  for (let i: number = 0; i < rows; i++) {
    emptyTable.push(createMaterialRow(i));
  }
  return emptyTable;
}
