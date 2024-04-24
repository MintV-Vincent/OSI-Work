import { materialAtom } from "Library/Atoms/AtomStorage";
import { rowMapPrice } from "Library/Types";
import { useAtom } from "jotai";

interface selectLogic {
  supplier: string[];
  material: rowMapPrice[];
}
/**
 *
 * @param materials All of the materials from database
 * @param supplier The supplier, this will be used to check every item for their supplier
 * @returns A filter list of materials based on the selected supplier
 */
export function filterMaterials(materials: rowMapPrice[], supplier: string) {
  if (supplier === "") {
    return materials;
  } else {
    return materials.filter((c: rowMapPrice) => c.supplier === supplier);
  }
}

/**
 *
 * @param suppliers Should be each supplier with every material that supplier provides PFCFlex
 * @returns Returns an array of 2 elements, First DictionaryMap[] used to create the supplier select.
 * The second will be every material used for the material select
 */
export default function SelectLogic(): selectLogic {
  const [suppliers] = useAtom(materialAtom);
  const materials: rowMapPrice[] = [];
  let uniqueSupplier: string[] = [];

  suppliers.forEach((element: rowMapPrice[]) => {
    for (let i = 0; i < element.length; i++) {
      const { label, value, custom, formula, price, supplier } = element[i];
      if (uniqueSupplier.includes(supplier)) {
      } else {
        uniqueSupplier.push(element[i].supplier);
      }
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
