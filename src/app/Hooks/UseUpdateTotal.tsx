import { useEffect } from "react";

interface useTotal {
  setTotal: any;
  total: number;
}

const useUpdateTotal: any = ({ setTotal, total }: useTotal): number => {
  useEffect(() => {
    setTotal(total);
  }, [total]);

  return total;
};

export default useUpdateTotal;
