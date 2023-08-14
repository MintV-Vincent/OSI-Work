import React from "react";
import "./style.css";
import Logo from "Images/LogoColor.svg";
import Image from "next/image";
import GetDate from "Functions/GetFunction/GetDate";
import GetQuote from "Functions/GetFunction/GetQuote";
import { useAtom } from "jotai";
import {
  currencySelectorAtom,
  customerAtom,
  noteAtom,
  partsAtom,
  partsInputAtom,
  qualityPrintAtom,
  revAtom,
  salesAtom,
  soldAtom,
} from "Library/Atoms/FrontPageAtoms";
import { fullTotalAtom, unitTotalAtom } from "Library/Atoms/TotalAtom";
import { unitAtom } from "Library/Atoms/AtomStorage";

const gus: string = "Gus Tarkas, ";
const chris: string = "Chris Keirstead, ";
const micheal: string = "Micheal Mordando, ";

function chooseEmail(value: string): string {
  switch (value) {
    case "gus":
      return "gtrakas@pfcflex.com";
    case "chris":
      return "ckeirstead@pfcflex.com";
    case "micheal":
      return "mmorando@pfcflex.com";
  }
  return "";
}

function chooseSales(value: string): string {
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
  const [quality] = useAtom(qualityPrintAtom);
  const [fullTotal] = useAtom(fullTotalAtom);
  const [partAttributes] = useAtom(partsAtom);
  const [selector] = useAtom(currencySelectorAtom);

  const salesPerson: string = chooseSales(sales);

  return (
    <section id="page" ref={ref}>
      <>
        <div className="col-span-2 row-span-2 m-auto">
          <Image
            className="w-auto h-12"
            src={Logo}
            priority={true}
            alt="PFC FLEX LOGO"
          />
        </div>
        <div className="col-span-5 row-span-2 m-auto" />
        <div className="col-span-2 row-span-2 m-auto text-3xl font-bold">
          Quotation
        </div>
      </>
      <div className="col-span-9 rectangle" />
      <>
        <label className="col-span-1">Date: </label>
        <label className="col-span-3">{GetDate()}</label>
        <div className="col-span-1" />
        <label className="col-span-1">Quotation #: </label>
        <label className="col-span-3">{GetQuote()}</label>
      </>
      <>
        <div className="col-span-1 row-span-6">Sold To:</div>
        <div className="col-span-3 row-span-6 break-words whitespace-pre-wrap">
          {sold}
        </div>
        <div className="col-span-1 row-span-6" />

        <div className="col-span-1 row-span-3 ">Build Site:</div>
        <div className="col-span-3 row-span-3 break-words whitespace-pre-wrap">
          PFC Flexible Circuits
          <br />
          11 Canadian Road, Unit #7
          <br />
          Toronto, ON M1R5G1 CANADA
        </div>
        <div className="col-span-4 row-span-1 " />

        <div className="col-span-1 row-span-2">Sales Contact:</div>
        <div className="col-span-3 row-span-2 break-words whitespace-pre-wrap">
          {chooseSales(sales)}
          <br />
          <div className="underline">{chooseEmail(sales)}</div>
        </div>
      </>
      <>
        <div className="col-span-1 break-words whitespace-pre-wrap">
          Part Number:
        </div>
        <div className="col-span-4 break-words whitespace-pre-wrap">
          {partNumber}
        </div>
        <div className="col-span-1">Revision:</div>
        <div className="col-span-3">{revision}</div>
      </>
      <>
        <div className="col-span-1">Quantity</div>
        <div className="grid grid-cols-10 col-span-8 break-words whitespace-pre-wrap">
          {quality?.map((row: string, index: number) => (
            <div key={row + index} className="col-span-1">
              {row}
            </div>
          ))}
        </div>
      </>
      <>
        <div className="col-span-1">Unit Price</div>
        <div className="grid grid-cols-10 col-span-8 break-words whitespace-pre-wrap">
          {quality?.map((row: string, index: number) => (
            <div key={row + index} className="col-span-1">
              {(fullTotal / Number(row)).toFixed(2)}
            </div>
          ))}
        </div>
      </>
      <>
        <div className="col-span-2 row-span-3">Notes:</div>
        <div className="col-span-7 row-span-3 break-words whitespace-pre-wrap">
          {notes}
        </div>
      </>
      <>
        <div className="col-span-2 row-span-3">Part Attributes:</div>
        <div className="col-span-7 row-span-3 break-words whitespace-pre-wrap">
          {partAttributes}
        </div>
      </>
      <>
        <div className="font-bold col-span-9 row-spawn-1">TERMS</div>
        <div className="col-span-3 row-span-3">
          QUOTATION VALID FOR 90 DAYS
          <br />
          ALL PRICES ARE LISTED IN {selector} FUNDS
          <br />
          NET 30.FOB PFC. (CANADA)
        </div>
      </>
      <div className="col-span-9 rectangle" />
      <div className="col-span-9 text-right">Form #102</div>
    </section>
  );
});

export default FrontPagePrint;
