import fetchData from "Helper/fetchData";

export const getStiffener = async () => {
  const data = await fetchData(
    `
    query getData {
      Stiffener{
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

  return data.data.Stiffener;
};
