import React from "react";
import "./style.css";
import Logo from "Images/LogoColor.svg";
import Image from "next/image";
import GetDate from "Functions/GetFunction/GetDate";
import GetQuote from "Functions/GetFunction/GetQuote";
import { useAtom } from "jotai";
import {
  customerAtom,
  noteAtom,
  partsInputAtom,
  revAtom,
  salesAtom,
  soldAtom,
} from "Library/Atoms/FrontPageAtoms";
import { unitTotalAtom } from "Library/Atoms/TotalAtom";
import { unitAtom } from "Library/Atoms/AtomStorage";

const gus: string = "Gus Tarkas, ";
const chris: string = "Chris Keirstead, ";
const micheal: string = "Micheal Mordando, ";

function chooseSales(value: string): string {
  switch (value) {
    case "gus":
      return gus + "VP\ngtrakas@pfcflex.com";
    case "chris":
      return chris + "Sales Manager\nckeirstead@pfcflex.com";
    case "micheal":
      return micheal + "Director of sales\nmmorando@pfcflex.com";
  }
  return "";
}

function chooseSaleNoEmail(value: string): string {
  switch (value) {
    case "gus":
      return gus + "VP";
    case "chris":
      return chris + "Sales Manager";
    case "micheal":
      return micheal + "Director of sales";
  }
  return "";
}

export const FrontPagePrint = React.forwardRef((props: any, ref: any) => {
  const [notes] = useAtom(noteAtom);
  const [sales] = useAtom(salesAtom);
  const [partNumber] = useAtom(partsInputAtom);
  const [revision] = useAtom(revAtom);
  const [customer] = useAtom(customerAtom);
  const [unitTotal] = useAtom(unitTotalAtom);
  const [units] = useAtom(unitAtom);
  const [sold] = useAtom(soldAtom);

  const salesPerson: string = chooseSales(sales);

  return (
    <div className="div" ref={ref}>
      <div className="section_one">Hello</div>
    </div>
  );
});

export default FrontPagePrint;
