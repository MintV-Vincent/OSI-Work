import React from "react";
import "./style.css";
import Logo from "Images/LogoColor.svg";
import Image from "next/image";
import GetDate from "Functions/GetFunction/GetDate";
import { useAtom } from "jotai";
import {
  currencySelectorAtom,
  customerAtom,
  finishAtom,
  layerAtom,
  noteAtom,
  partsAtom,
  partsInputAtom,
  productAtom,
  qualityPrintAtom,
  revAtom,
  salesAtom,
  soldAtom,
  specAtom,
  termsAtom,
} from "Library/Atoms/FrontPageAtoms";
import { fullTotalAtom, unitTotalAtom } from "Library/Atoms/TotalAtom";
import { quoteAtom, unitAtom } from "Library/Atoms/AtomStorage";

const gus: string = "Gus Tarkas, ";
const chris: string = "Chris Keirstead, ";
const micheal: string = "Micheal Mordando, ";
const deb: string = "Deb Dubberly, ";

function chooseEmail(value: string): string {
  switch (value) {
    case "gus":
      return "gtrakas@pfcflex.com";
    case "chris":
      return "ckeirstead@pfcflex.com";
    case "micheal":
      return "mmorando@pfcflex.com";
    case "deb":
      return "ddubberly@osielectronics.com";
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
    case "deb":
      return deb + "Area Sales Manager";
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
  const [quote] = useAtom(quoteAtom);
  const [finish] = useAtom(finishAtom);
  const [spec] = useAtom(specAtom);
  const [product] = useAtom(productAtom);

  const salesPerson: string = chooseSales(sales);

  return (
    <section id="page" ref={ref}>
      <div className="col-span-2 row-span-2 flex justify-between">
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
        <label className="flex basis-1/6 font-semibold">Date:</label>
        <label className="flex basis-5/6"> {GetDate()}</label>
      </div>
      <div className="col-span-1 flex">
        <label className="flex basis-1/4 font-semibold">Quotation #: </label>
        <label className="flex basis-3/4">{quote}</label>
      </div>
      <div className="col-span-1 row-span-6 flex">
        <div className="flex basis-1/6 font-semibold">Sold To:</div>
        <div className="flex basis-5/6 break-words whitespace-pre-wrap">
          {sold}
        </div>
      </div>
      <div className="col-span-1">
        <div className="col-span-2 flex">
          <label className="flex basis-1/4 font-semibold">Build Site:</label>
          <div className="flex basis-3/4 break-words whitespace-pre-wrap">
            PFC Flexible Circuits
            <br />
            11 Canadian Road, Unit #7
            <br />
            Toronto, ON M1R5G1
            <br />
            CANADA
          </div>
        </div>
        <div className="col-span-2 flex">
          <label className="flex basis-1/4 font-semibold">Sales Contact:</label>
          <div className="flex basis-3/4 break-words whitespace-pre-wrap">
            <div>
              <label>{chooseSales(sales)}</label>
              <br />
              <label className="underline">{chooseEmail(sales)}</label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-1" />
      <div className="col-span-2 row-span-5 grid grid-cols-2 gap-y-px">
        <div className="flex col-span-2">
          <label className="flex basis-1/5 break-words whitespace-pre-wrap font-semibold">
            Part Number:
          </label>
          <label className="flex basis-[30%] break-words whitespace-pre-wrap">
            {partNumber}
          </label>
        </div>
        <div className="flex col-span-2">
          <label className="flex basis-1/5 font-semibold">Quantity</label>
          <div className="flex basis-4/5 justify-between break-words whitespace-pre-wrap">
            {quality?.map((row: string, index: number) => (
              <label key={row + index} className="">
                {row}
              </label>
            ))}
          </div>
        </div>
        <div className="flex col-span-2">
          <label className="flex basis-1/5">Standard (6 weeks)</label>
          <div className="flex basis-4/5 justify-between break-words whitespace-pre-wrap">
            {quality?.map((row: string, index: number) => (
              <label key={row + index} className="">
                {(fullTotal / Number(row)).toFixed(2)}
              </label>
            ))}
          </div>
        </div>
        <div className="flex col-span-2">
          <label className="flex basis-1/5">Expedited (4 weeks)</label>
          <div className="flex basis-4/5 justify-between break-words whitespace-pre-wrap">
            {quality?.map((row: string, index: number) => (
              <label key={row + index} className="">
                {(fullTotal / Number(row)).toFixed(2)}
              </label>
            ))}
          </div>
        </div>
        <div className="flex col-span-2">
          <label className="flex basis-1/5">Fastest (2 weeks)</label>
          <div className="flex basis-4/5 justify-between break-words whitespace-pre-wrap">
            {quality?.map((row: string, index: number) => (
              <label key={row + index} className="">
                {(fullTotal / Number(row)).toFixed(2)}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2" />
      <label className="font-semibold">Non-Recurring Engineering</label>
      <div className="col-span-2 row-span-3"></div>
      <div className="flex col-span-2 row-span-3">
        <label className="flex basis-1/12 font-semibold">Notes:</label>
        <div className="flex basis-11/12 justify-between break-words whitespace-pre-wrap">
          {notes}
        </div>
      </div>

      <label className="font-semibold col-span-2">Part Attributes</label>
      <div className="col-span-2 flex">
        <label className="flex basis-1/6">Spec:</label>
        <label className="flex basis-5/6">{spec}</label>
      </div>
      <div className="col-span-2 flex">
        <label className="flex basis-1/6">Product Type:</label>
        <label className="flex basis-5/6">{product}</label>
      </div>
      <div className="col-span-2 flex">
        <label className="flex basis-1/6">Finish:</label>
        <label className="flex basis-5/6">{finish}</label>
      </div>
      <label className="font-bold col-span-2">TERMS</label>
      <div className="col-span-2 row-span-4 grid grid-cols-2 gap-y-2">
        <label className="col-span-2 break-words whitespace-pre-wrap">
          {terms}
        </label>
        <div className="col-span-2">
          <div className="h-0.5 w-full bg-black m-auto" />
          <div className="text-right">Form #102</div>
        </div>
      </div>
      {/* 
      <div className="col-span-2">
        <label className="">Part Attributes:</label>
        <label className=" break-words whitespace-pre-wrap">
          {partAttributes}
        </label>
      </div>
 */}
    </section>
  );
});

export default FrontPagePrint;
