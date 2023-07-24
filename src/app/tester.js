import { Directus } from "@directus/sdk";

const directus = new Directus("http://localhost:8055/");

async function getGlobals() {
  const { data } = await directus.items("Global").readByQuery();
  return data;
}

export default async function HomePage() {
  const global = await getGlobals();
  return (
    <div>
      <h1>{global.title}</h1>
      <p>{global.description}</p>
    </div>
  );
}
