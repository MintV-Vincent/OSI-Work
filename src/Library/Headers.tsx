export const frontHeader: string[] = ["PCB Fabrication", "", "Status"];
export const totalHeader: string[] = ["Process", "Cost CAD$", "Cost USD$"];
export const protoHeader: string[] = ["Layers", "Complex", "Notes", "Panel"];
export const processHeader: string[] = ["Material", "Amount", "Price "];
export const serviceHeader: string[] = [
  "Service",
  "Amount",
  "Unit Price",
  "Price ",
];

export const nreHeader: string[] = ["Service", "Amount", "Price "];

export function materialHeader(custom: string): string[] {
  return ["Supplier", "Material", custom, "Amount", "Price "];
}

export const materialsTitle: string = "Materials";
export const processFilmTitle: string = "Processes & Film";
export const service: string = "Quality Services";
export const nre: string = "NRE";

export const titles: string[] = [
  materialsTitle,
  processFilmTitle,
  service,
  nre,
];

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
