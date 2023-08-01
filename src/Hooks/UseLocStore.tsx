import { useEffect, useState } from "react";

const useLocStore: any = (
  text: string,
  data: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, setState] = useState(data);
  useEffect(() => {
    localStorage.setItem(text, state);
  }, [text, state]);

  return [state, setState];
};

export default useLocStore;
