/*
    MAPS - Are used to create rows for the table
    used any to add elements to rowMap 
*/
export interface rowMap {
  label: string;
  value: React.JSX.Element;
}

export interface checkTableMap {
  label: string;
  value: React.JSX.Element;
  value2: any;
}

export interface rowTotalMap {
  label: string;
  value: number;
}

//Label and Value is a must because of mantine select
export interface dictionaryMap {
  label: string;
  value: string;
}

export interface jsonMap {
  id: number;
  amount: number;
  material: string;
  formula: string;
  price: number | string;
  supplier: string;
}
export interface servicesMap {
  id: number;
  amount: number;
  formula: string;
  service: string;
  unitPrice: number;
  price: number;
}
export interface rowMapPrice extends dictionaryMap {
  //THE VALUE OF value: is the material + supplier + price.
  //This is to create a unique value for every materail even if they have same suppplier or name or price but not all 3.
  custom: string;
  formula: string;
  price: number;
  supplier: string;
}
export interface materialRowMap {
  item: rowMapPrice;
  id: number;
  amount: number;
  price: number;
  supplier: string;
}

export interface tabType {
  title: string;
  table: React.JSX.Element;
}

export type sType = [string, React.Dispatch<React.SetStateAction<string>>];
