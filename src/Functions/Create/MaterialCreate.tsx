import { rowMapPrice, materialRowMap } from "Interface/Types";

export function onAmount(
  id: number,
  value: number | "",
  unitPrice: number,
  rowsAtom: materialRowMap[],
  useRowsAtom: any
): materialRowMap {
  // Function activates when text input of amount is changed. This will change the price and the amount of materials for rowsAtom

  // id: Number, the index of the row being changed
  // value: The amount being changed to for the material
  // price: The sub total of the materials cost in CAD dollars
  // rowsAtom: the data being changed
  // useRowsAtom: the set state functoin to change the data

  // Returns: material row map for the table with updated amount and price
  return useRowsAtom(
    rowsAtom.map((row: materialRowMap) => {
      if (row.id != id) {
        return row;
      }
      if (value === "") {
        return { ...row, amount: "", price: 0 };
      }
      return {
        ...row,
        amount: Number(value),
        price: Number(unitPrice * value),
      };
    })
  );
}

export function onSupplier(
  id: number,
  supplier: string,
  rowsAtom: materialRowMap[],
  useRowsAtom: any
): materialRowMap {
  // Function activates when select input of supplier is changed. This will change the supplier for rowsAtom

  // id: Number, the index of the row being changed
  // value: The amount being changed to for the supplier
  // rowsAtom: the data being changed
  // useRowsAtom: the set state functoin to change the data

  // Returns: material row map for the table with updated supplier
  return useRowsAtom(
    rowsAtom.map((row: materialRowMap) => {
      if (row.id != id) {
        return row;
      }
      if (supplier === row.supplier) {
        return row;
      }
      return {
        ...row,
        supplier: supplier,
        material: "",
        custom: "",
        unitPrice: 0,
        price: 0,
      };
    })
  );
}

export function onMaterial(
  id: number,
  material: string,
  customs: rowMapPrice[],
  rowsAtom: materialRowMap[],
  useRowsAtom: any
): materialRowMap {
  // Function activates when select input of material is changed. This will change the material and the code for rowsAtom

  // id: Number, the index of the row being changed
  // value: The material name
  // custom: The custom (code, thickness, model #) for the matching material
  // rowsAtom: the data being changed
  // useRowsAtom: the set state functoin to change the data

  // Returns: material row map for the table
  // Update base on the material being selected
  const filteredCustoms: rowMapPrice[] = customs.filter(
    (c: rowMapPrice) => c.value === material
  );
  const { value, label, custom, formula, price, supplier } = filteredCustoms[0];
  return useRowsAtom(
    rowsAtom.map((row: materialRowMap) => {
      if (row.id != id) {
        return row;
      }
      return {
        ...row,
        material: value,
        amount: 0,
        custom: custom,
        supplier: supplier,
        unitPrice: price,
        formula: formula,
      };
    })
  );
}
