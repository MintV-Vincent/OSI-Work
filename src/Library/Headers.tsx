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

export const totalTitle: string[] = ["Material", " CAD ($)", " USD ($)"];
export const totalTitle2: string[] = ["Services", " CAD ($)", " USD ($)"];

export const valueTitle: string[] = [materialsTitle, processFilmTitle];
export const valueTitle2: string[] = [serviceTitle, nreTitle];

const tooling: string = "SMT Lot Charge";
const standard: string = "Stencils (Standard)";
const fine: string = "Stencils (Fine Pitch)";
const wood: string = "Wood Die";
const milled: string = "Chem-Milled";
const maleFemale: string = "Male-Female";

export const assyTooling: string[] = [
  tooling,
  standard,
  fine,
  wood,
  milled,
  maleFemale,
];

const fai: string = "Regular FAI Report";
const class3: string = "Class 3 documentation";
const tQ: string = "IQ-OQ-PQ ";
const pPAP: string = "PPAP";
const aS9102: string = "AS9102";
const failure: string =
  "Failure Analysis Report (x-ray, cross-section & electrical verification)";

export const qualityServiceTitle: string[] = [
  fai,
  class3,
  tQ,
  pPAP,
  aS9102,
  failure,
];

const finish: string = "Finish";
const goldFinger: string = "Gold Finger";
const fill: string = "Via Fill";

export const processTitle: string[] = [finish, goldFinger, fill];

const photo = "Photo Tools";
const elec = "Electrical Test";
const outline = "Outline Die";
const secondary = "Secondary Test Fixture";
const assySten = "Assyembly Stencils";
const assyPall = "Assembly Pallets";
const design = "Design Charge";
const prod = "Production Tooling";
const hasl = "Hasl";

export const NRETitle: string[] = [
  photo,
  elec,
  outline,
  secondary,
  assySten,
  assyPall,
  design,
  prod,
  hasl,
];

export const checkTableTitle: string[] = [
  tooling,
  standard,
  fine,
  wood,
  milled,
  maleFemale,
  fai,
  class3,
  tQ,
  pPAP,
  aS9102,
  failure,
  finish,
  goldFinger,
  fill,
];
