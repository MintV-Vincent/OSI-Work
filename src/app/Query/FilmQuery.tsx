import fetchData from "Helper/fetchData";

export const getFilm = async () => {
  const data = await fetchData(
    `
    query getData {
      Dry_Film_Wet_Process{
        Material,
        Price,
        Supplier,
        Formula,
        Section
      }
    }
    
    `,
    {
      variables: {},
    }
  );

  return data.data.Dry_Film_Wet_Process;
};
