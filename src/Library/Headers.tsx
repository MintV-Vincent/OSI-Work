export const frontHeader: string[] = ["PCB Fabrication", "", "Status"];
export const totalHeader: string[] = ["Process", "Cost CAD$", "Cost USD$"];
export const protoHeader: string[] = ["Layers", "Complex", "Notes", "Panel"];
export const materialHeader: string[] = [
  "Supplier",
  "Material",
  "Amount",
  "Unit Price",
  "Price ",
];

export function serviceHeader(custom: string): string[] {
  return [custom, "Amount", "Unit Price", "Price "];
}

export const materialsTitle: string = "Materials";
export const processFilmTitle: string = "Processes";
export const serviceTitle: string = "Services";
export const nreTitle: string = "NRE";
export const assemblyTitle: string = "Assembly";

export const totalTitle: string[] = ["Material", " CAD ($)", " USD ($)"];
export const totalTitle2: string[] = ["Services", " CAD ($)", " USD ($)"];

export const valueTitle: string[] = [materialsTitle, processFilmTitle];
export const valueTitle2: string[] = [serviceTitle, nreTitle];

export const assemblyHeader = [
  assemblyTitle,
  "Amount",
  "Unit Price",
  "CAD Price",
  "USD Price",
];

const finish: string = "Finish";
const goldFinger: string = "Gold Finger";
const fill: string = "Via Fill";

export const processTitle: string[] = [finish, goldFinger, fill];
