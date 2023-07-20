/*
    MAPS - Are used to create rows for the table
    used any to add elements to rowMap 
*/
export interface rowMap {
  label: string;
  value: React.JSX.Element;
}

export interface rowMap2 {
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

export interface rowMapPrice extends dictionaryMap {
  custom: string;
  formula: string;
  price: number | string;
  supplier: string;
}

export interface supplierMap {
  value: string;
  label: string;
  arr: rowMapPrice[];
}

export interface processRowMap {
  material: string;
  id: number;
  amount: number;
  unitPrice: number;
  price: number;
  formula: string;
}

export interface materialRowMap extends processRowMap {
  supplier: string;
  custom: string | number;
}

export interface tabType {
  title: string;
  table: React.JSX.Element;
}
