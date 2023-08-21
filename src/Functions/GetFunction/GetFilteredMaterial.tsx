import { createMaterialRow } from "Functions/Create/MapCreate";
import { materialRowMap } from "Library/Types";

/**
 *
 * @param material: string | null -> The material that is selected. This should be the event of the mantine select
 * @param list: materialRowMap[] -> The material list from the database
 * @returns: Either it retures empty row or the value selected
 */
export default function GetFilteredMaterial(
  material: string | null,
  list: materialRowMap[]
) {
  if (material === null) {
    return createMaterialRow(1);
  }
  return list.filter((c: materialRowMap) => c.item.value === material)[0];
}
