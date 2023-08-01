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

export interface jsonMap {
  id: number;
  material: string;
  formula: string;
  price: number | string;
  supplier: string;
}

export interface rowMapPrice extends dictionaryMap {
  custom: string;
  formula: string;
  price: number | string;
  supplier: string;
}
export interface materialRowMap {
  material: string;
  id: number;
  amount: number;
  unitPrice: number;
  price: number;
  formula: string;
  supplier: string;
  custom: string | number;
}

export interface tabType {
  title: string;
  table: React.JSX.Element;
}

export type sType = [string, React.Dispatch<React.SetStateAction<string>>];
