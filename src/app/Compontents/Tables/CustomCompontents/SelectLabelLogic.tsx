import React, { useState } from "react";
import { rowMapPrice } from "Library/Types";

interface selectLogic {
  funct: React.Dispatch<any>;
}

export default function SelectLabelLogic(
  materials: rowMapPrice[]
): selectLogic {
  const [, dispatchSelects] = useState(materials[0].value);
  return { funct: dispatchSelects };
}
