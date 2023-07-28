export const frontHeader: string[] = ["PCB Fabrication", "", "Status"];
export const totalHeader: string[] = [" ", "Process", "Cost", ""];
export const protoHeader: string[] = ["Layers", "Complex", "Notes", "Panel"];
export const processHeader: string[] = [
  "Material",
  "Amount",
  "Unit Price ($)",
  "Price ($)",
];

export function materialHeader(custom: string): string[] {
  return [
    "Supplier",
    "Material",
    custom,
    "Amount",
    "Unit Price ($)",
    "Price ($)",
  ];
}

export const materialsTitle = "Materials";
export const processFilmTitle = "Processes & Film";
export const service = "Quality Services";
export const nre = "NRE";

export const titles: string[] = [
  materialsTitle,
  processFilmTitle,
  service,
  nre,
];

const tooling = "SMT Lot Charge";
const standard = "Stencils (Standard)";
const fine = "Stencils (Fine Pitch)";
const wood = "Wood Die";
const milled = "Chem-Milled";
const maleFemale = "Male-Female";

export const assyTooling: string[] = [
  tooling,
  standard,
  fine,
  wood,
  milled,
  maleFemale,
];

const fai = "Regular FAI Report";
const class3 = "Class 3 documentation";
const tQ = "IQ-OQ-PQ ";
const pPAP = "PPAP";
const aS9102 = "AS9102";
const failure =
  "Failure Analysis Report (x-ray, cross-section & electrical verification)";

export const qualityServiceTitle: string[] = [
  fai,
  class3,
  tQ,
  pPAP,
  aS9102,
  failure,
];

const finish = "Finish";
const goldFinger = "Gold Finger";
const fill = "Via Fill";

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
