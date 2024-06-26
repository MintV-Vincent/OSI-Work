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
import { materialFilmTotalAtom } from "Library/Atoms/TotalAtom";
import { exchangeRateAtom, quoteAtom } from "Library/Atoms/AtomStorage";
import { nreAtom } from "Library/Atoms/ServiceStorage";
import { servicesMap } from "Library/Types";

//const gus: string = "Gus Tarkas, ";
//const chris: string = "Chris Keirstead, ";
//const micheal: string = "Micheal Mordando, ";
//const deb: string = "Deb Dubberly, ";

/**
 *
 * @param value The string from text area
 * @returns Returns an array where a split happens at a newline in the textarea
 */
function splitArray(value: string): string[] {
  return value.split("\n");
}

/**
 *
 * @param value The string value of which sales person is selected on the front table
 * @returns Returns the email of the sales person
 */
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

/**
 *
 * @param value The string value of which sales person is selected on the front table
 * @returns Returns the job of the sales person
 
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
*/

/**
 *
 * @param arr
 * @param itemArray
 */
function addItem(arr: any[], itemArray: servicesMap[]) {
  for (let i: number = 0; i < itemArray.length; i++) {
    if (itemArray[i].price > 0) {
      arr.push(itemArray[i]);
    }
  }
}

export const FrontPagePrint = React.forwardRef((props: any, ref: any) => {
  const [notes] = useAtom(noteAtom);
  const [sales] = useAtom(salesAtom);
  const [partNumber] = useAtom(partsInputAtom);
  const [exchangeRate] = useAtom(exchangeRateAtom);
  const [revision] = useAtom(revAtom);
  const [sold] = useAtom(soldAtom);
  const [quality] = useAtom(qualityPrintAtom);
  const [selector] = useAtom(currencySelectorAtom);
  const [materialTotal] = useAtom(materialFilmTotalAtom);
  const [terms] = useAtom(termsAtom);
  const [quote] = useAtom(quoteAtom);
  const [finish] = useAtom(finishAtom);
  const [spec] = useAtom(specAtom);
  const [product] = useAtom(productAtom);
  const [nre] = useAtom(nreAtom);

  const cadSelect = terms.replace("CAD", selector);
  let final = cadSelect.replace("USD", selector);

  let nreArray: any[] = [];
  addItem(nreArray, nre);

  const fullTotal =
    selector === "CAD" ? materialTotal : materialTotal / Number(exchangeRate);

  return (
    <section id="page" ref={ref}>
      <div className="col-span-2 row-span-3 flex justify-between">
        <div></div>
        <label className="text-3xl font-bold my-auto mr-4">Quotation</label>
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
      <div className="col-span-2 row-span-1" />
      <div className="col-span-1 row-[span_7_/_span_7] grid grid-cols-6 sub-grid">
        <div className="col-span-1 row-[span_7_/_span_7] font-semibold">
          Sold To:
        </div>
        {splitArray(sold)?.map((row: string, index: number) => (
          <label className="col-span-5 row-span-1" key={row + index}>
            {row ? row : ""}
          </label>
        ))}
      </div>
      <div className="col-span-1 row-[span_7_/_span_7] grid grid-cols-4 sub-grid">
        <label className="col-span-1 row-span-4 font-semibold">
          Build Site:
        </label>
        <label className="col-span-3 row-span-1">sdfasdsadas</label>
        <label className="col-span-3 row-span-1">
          11 Canadian Road, Unit #7
        </label>
        <label className="col-span-3 row-span-1">Toronto, ON</label>
        <label className="col-span-3 row-span-1">CANADA</label>
        <div className="col-span-4 row-span-1" />
        <label className="col-span-1 row-span-2 font-semibold">
          Sales Contact:
        </label>
        <label className="col-span-3 row-span-1">a</label>
        <label className="col-span-3 row-span-1 underline"></label>
      </div>
      <div className="col-span-2 row-span-1" />
      <div className="col-span-2 row-span-6 grid grid-cols-6 sub-grid">
        <label className="col-span-1 break-words whitespace-pre-wrap font-semibold">
          Part Number:
        </label>
        <label className="col-span-5 break-words whitespace-pre-wrap">
          {partNumber} Rev: {revision}
        </label>
        <div className="col-span-6" />
        <label className="col-span-1 font-semibold">Quantity</label>
        {quality?.map((row: string, index: number) => (
          <label key={row + index}>{row}</label>
        ))}
        <div className="col-span-6" />
        <label className="col-span-1 font-semibold">Unit Price</label>
        {quality?.map((row: string, index: number) => (
          <label key={row + index} className="">
            $ {(fullTotal / Number(row)).toFixed(2)}
          </label>
        ))}
      </div>
      <div className="col-span-2 row-span-1" />
      <label className="col-span-2 font-semibold">
        Non-Recurring Engineering
      </label>
      <div className="col-span-2 row-span-5 grid grid-cols-6 sub-grid5 grid-flow-col">
        {nreArray?.map((row: any, index: number) => (
          <div
            key={row + index + "service"}
            className="col-span-2 row-span-1 flex"
          >
            <label className="flex basis-2/3">{row ? row.service : ""}</label>
            <label className="flex basis-1/3">$ {row ? row.price : ""}</label>
          </div>
        ))}
      </div>
      <div className="col-span-2 row-span-1" />
      <div className="flex col-span-2 row-span-3">
        <label className="flex basis-1/12 font-semibold">Notes:</label>
        <div className="flex basis-11/12 justify-between break-words whitespace-pre-wrap">
          {notes}
        </div>
      </div>

      <div className="col-span-2 row-span-1" />
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
      <div className="col-span-2 row-span-1" />
      <label className="font-bold col-span-2">TERMS</label>
      {splitArray(final)?.map((row: string, index: number) => (
        <label className="col-span-2 row-span-1" key={row + index}>
          {row ? row : ""}
        </label>
      ))}
      <div className="col-span-2" />
      <div className="col-span-2">
        <div className="h-0.5 w-full bg-black m-auto" />
        <div className="text-right">Form #102</div>
      </div>
    </section>
  );
});

export default FrontPagePrint;
