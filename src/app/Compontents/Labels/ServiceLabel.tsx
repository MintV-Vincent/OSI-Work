import { panelAtom } from "Library/Atoms/AtomStorage";
import { useAtom } from "jotai";
import React from "react";

interface serviceLabelInterface {
  label: string;
}

export default function ServiceLabel({ label }: serviceLabelInterface) {
  const [panel] = useAtom(panelAtom);
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div></div>;
  }

  const re = /12\s*x\s*18/g;
  const re2 = /18\s*x\s*24/g;
  if ((panel === "1.5" && re.test(label)) || !re2.test(label)) {
    return <label>{label}</label>;
  } else if ((panel === "3" && re2.test(label)) || !re.test(label)) {
    return <label>{label}</label>;
  }
  return null;
}
