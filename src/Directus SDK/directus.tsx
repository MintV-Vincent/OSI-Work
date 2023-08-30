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

export async function readDisplay(
  dataBase: any,
  limit: number | undefined = undefined
) {
  const result = await client.request(
    readItems(dataBase, {
      limit: limit,
      display: ["*"],
    })
  );
  return result;
}
