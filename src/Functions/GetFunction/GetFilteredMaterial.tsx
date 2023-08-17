import { createMaterialRow } from "Functions/Create/MapCreate";
import { materialRowMap } from "Library/Types";

export default function GetFilteredMaterial(
  material: string | null,
  list: materialRowMap[]
) {
  if (material === null) {
    return createMaterialRow(1);
  }
  return list.filter((c: materialRowMap) => c.item.value === material)[0];
}
