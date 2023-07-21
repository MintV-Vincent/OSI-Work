import fetchData from "Helper/fetchData";

export const getCoverCoat = async () => {
  const data = await fetchData(
    `
    query getData {
      Cover_Coat{
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

  return data.data.Cover_Coat;
};
