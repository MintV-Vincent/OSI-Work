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
  termsAtom,
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
  const [terms] = useAtom(termsAtom);

  const salesPerson: string = chooseSales(sales);

  return (
    <section id="page" ref={ref}>
      <div className="col-span-2 flex justify-between">
        <div>
          <Image
            className="w-auto h-12"
            src={Logo}
            priority={true}
            alt="PFC FLEX LOGO"
          />
        </div>
        <label className="text-3xl font-bold my-auto">Quotation</label>
      </div>
      <div className="col-span-2 h-0.5 w-full bg-black m-auto" />
      <div className="col-span-1 flex">
        <label className="flex basis-1/4">Date: </label>
        <label className="flex basis-3/4">{GetDate()}</label>
      </div>
      <div className="col-span-1 flex">
        <label className="flex basis-1/4">Quotation #: </label>
        <label className="flex basis-3/4">{GetQuote()}</label>
      </div>
      <div className="col-span-1 flex">
        <div className="flex basis-1/4">Sold To:</div>
        <div className="flex basis-3/4 break-words whitespace-pre-wrap">
          {sold}
        </div>
      </div>

      <div className="col-span-1">
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="col-span-2 flex">
            <label className="flex basis-1/4">Build Site:</label>
            <div className="flex basis-3/4 break-words whitespace-pre-wrap">
              PFC Flexible Circuits
              <br />
              11 Canadian Road, Unit #7
              <br />
              Toronto, ON M1R5G1 CANADA
            </div>
          </div>
          <div className="col-span-2 flex">
            <label className="flex basis-1/4">Sales Contact:</label>
            <div className="flex basis-3/4 break-words whitespace-pre-wrap">
              <div>
                <label>{chooseSales(sales)}</label>
                <br />
                <label className="underline">{chooseEmail(sales)}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex">
        <label className="flex basis-1/4 break-words whitespace-pre-wrap">
          Part Number:
        </label>
        <label className="flex basis-3/4 break-words whitespace-pre-wrap">
          {partNumber}
        </label>
      </div>
      <div className="col-span-1 flex">
        <label className="flex basis-1/4">Revision:</label>
        <label className="flex basis-3/4">{revision}</label>
      </div>
      <div className="col-span-1 flex">
        <label className="flex basis-1/4">Quantity</label>
        <div className="flex basis-3/4 justify-between break-words whitespace-pre-wrap">
          {quality?.map((row: string, index: number) => (
            <label key={row + index} className="">
              {row}
            </label>
          ))}
        </div>
      </div>
      <div className="col-span-1" />
      <div className="col-span-1 flex">
        <label className="flex basis-1/4">Unit Price</label>
        <div className="flex basis-3/4 justify-between break-words whitespace-pre-wrap">
          {quality?.map((row: string, index: number) => (
            <label key={row + index} className="">
              {(fullTotal / Number(row)).toFixed(2)}
            </label>
          ))}
        </div>
      </div>
      <div className="col-span-1" />
      <div className="col-span-2">
        <label className="">Notes:</label>
        <label className=" break-words whitespace-pre-wrap">{notes}</label>
      </div>
      <div className="col-span-2">
        <label className="">Part Attributes:</label>
        <label className=" break-words whitespace-pre-wrap">
          {partAttributes}
        </label>
      </div>
      <div className="col-span-2">
        <div className="font-bold ">TERMS</div>
        <div className=" break-words whitespace-pre-wrap">{terms}</div>
      </div>
      <div className="col-span-2 h-0.5 w-full bg-black m-auto" />
      <div className="text-right" />
      <div className="text-right">Form #102</div>
    </section>
  );
});

export default FrontPagePrint;
