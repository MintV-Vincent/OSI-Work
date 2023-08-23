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

/**
 *
 * @param label The label of the table
 * @param value The JSX Element in the table
 * @returns: rowMap
 */
export function createRow(label: string, value: React.JSX.Element): rowMap {
  return { label, value };
}

/**
 *
 * @param label: string -> The label of the table as a total, which is a string.
 * @param value: number -> The value of the table as a number
 * @returns: rowTotalMap
 */
export function createRowTotal(label: string, value: number): rowTotalMap {
  return { label, value };
}

/**
 * This is used mostly for select mantine controlled states.
 * @param label: string -> The label of the table as a total, which is a string.
 * @param value: string -> The value
 * @returns: dictionaryMap
 */
export function createData(label: string, value: string): dictionaryMap {
  return { label, value };
}

/**
 *
 * @param id: number -> The id of the service, usually number of the row of the table
 * @param amount: number -> The amount of the services
 * @param formula: string -> The formula for the service
 * @param service: string -> The service or process of the table
 * @param unitPrice: number -> The unit price of the service or process
 * @param price: number -> The price calculated with the formula.
 * @returns: servicesMap
 */
export function createService(
  id: number,
  amount: number,
  formula: string,
  service: string,
  unitPrice: number,
  price: number = 0
): servicesMap {
  return { id, amount, formula, service, unitPrice, price };
}

/**
 * This needs label and value to be in a select.
 * @param label: string -> The material
 * @param value: string -> The material + The supplier + The price
 * @param formula: string -> The formula for the service
 * @param custom: string -> The code, thickness, etc. This is unused right now.
 * @param supplier: string -> The supplier as a string
 * @param price: number -> The unit price of the material
 * @returns: rowMapPrice
 */
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

/**
 *
 * @param id: number -> The row which is the number of the table row
 * @param item: rowMapPrice -> The data which is displayed on the material table. Stores the material selected
 * @param supplier: string -> Stores the supplier of the selected material
 * @param amount: number -> Stores the amount in the number input
 * @param price: number -> Calculates the price of the selected material
 * @returns: materialRowMap
 */
export function createMaterialRow(
  id: number,
  item: rowMapPrice = createRowPrice(),
  supplier: string = "",
  amount: number = 0,
  price: number = 0
): materialRowMap {
  return {
    item,
    amount,
    price,
    supplier,
    id,
  };
}

/**
 *
 * @param rows: number -> The number of empty rows created
 * @returns: materialRowMap[]
 */
export function createTable(rows: number): materialRowMap[] {
  let emptyTable: materialRowMap[] = [];
  for (let i: number = 0; i < rows; i++) {
    emptyTable.push(createMaterialRow(i));
  }
  return emptyTable;
}

/**
 * This creates the material table but with elements already inside
 * @param rows: number -> The number of empty rows created
 * @returns: materialRowMap[]
 */
export function createTemplate(jsonAtom: number): materialRowMap[] {
  let emptyTable: materialRowMap[] = [];
  for (let i: number = 0; i < jsonAtom; i++) {
    emptyTable.push(createMaterialRow(i));
  }
  return emptyTable;
}
