import fetchData from "Helper/fetchData";

export const getIsola = async () => {
  const data = await fetchData(
    `
    query getData {
      Isola{
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

  return data.data.Isola;
};

export const getArlon = async () => {
  const data = await fetchData(
    `
    query getData {
      Arlon{
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

  return data.data.Arlon;
};

export const getDupont = async () => {
  const data = await fetchData(
    `
    query getData {
      Dupont{
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

  return data.data.Dupont;
};

export const getPanasonic = async () => {
  const data = await fetchData(
    `
    query getData {
      Panasonic{
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

  return data.data.Panasonic;
};
