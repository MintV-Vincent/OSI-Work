import { dictionaryMap, rowMapPrice } from "Interface/Types";

interface selectLogic {
  supplier: dictionaryMap[];
  material: rowMapPrice[];
}

export function filterMaterials(materials: rowMapPrice[], supplier: string) {
  if (supplier === "") {
    return materials;
  } else {
    return materials.filter((c: rowMapPrice) => c.supplier === supplier);
  }
}

export default function SelectLogic(suppliers: rowMapPrice[][]): selectLogic {
  const materials: rowMapPrice[] = [];
  let uniqueSupplier: dictionaryMap[] = [];
  suppliers.forEach((element: rowMapPrice[]) => {
    if (element.length > 0) {
      uniqueSupplier.push({
        label: element[0].supplier,
        value: element[0].supplier,
      });
    }
    for (let i = 0; i < element.length; i++) {
      const { label, value, custom, formula, price, supplier } = element[i];
      materials.push({
        value: value + supplier + price,
        label: label,
        custom: custom,
        formula: formula,
        price: price,
        supplier: supplier,
      });
    }
  });

  return {
    supplier: uniqueSupplier,
    material: materials,
  };
}
