import { createDirectus, readItems, rest } from "@directus/sdk";
import { jsonMap } from "Library/Types";

interface DatabaseInterface {
  dataBase: jsonMap[];
}

const client = createDirectus<DatabaseInterface>("http://localhost:8055").with(
  rest()
);

export async function readData(
  dataBase: any,
  limit: number | undefined = undefined
) {
  const result = await client.request(
    readItems(dataBase, {
      limit: limit,
      fields: ["*"],
    })
  );
  return result;
}

export async function readDisplay(dataBase: any) {
  const result = await client.request(
    readItems(dataBase, {
      fields: ["*.Process_id", "*.Service_id", "*.Assembly_id"],
    })
  );
  return result;
}
