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
} from "Library/Atoms/FrontPageAtoms";

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

export const FrontPagePrint = React.forwardRef((props: any, ref: any) => {
  const [notes] = useAtom(noteAtom);
  const [sales] = useAtom(salesAtom);
  const [partNumber] = useAtom(partsInputAtom);
  const [revision] = useAtom(revAtom);
  const [customer] = useAtom(customerAtom);
  return (
    <div className="div-div" ref={ref}>
      <div className="div">
        <Image
          className="w-auto h-12 px-10 m-8 absolute left-200"
          src={Logo}
          priority={true}
          alt="PFC FLEX LOGO"
        />
        <div className="group">
          <div className="text-wrapper">Sold To</div>
          <div className="customer-partnumber">
            {customer}
            <br />
            {partNumber}
            <br />
            {revision}
            <br />
            {}
          </div>
        </div>
        <div className="group-2">
          <div className="text-wrapper-3">Build Site</div>
          <div className="PFC-flexible">
            PFC Flexible Circuits
            <br />
            11 Canadian Road, Unit #7
            <br />
            Toronto, ON M1R5G1
            <br />
            CANADA
          </div>
        </div>
        <div className="text-wrapper-2">PFC Flexible Circuits Limited</div>
        <div className="sales">Sales: </div>
        <div className="sales-text">{chooseSales(sales)}</div>
        <div className="group-3">
          <div className="date-getdate">{"Date: " + GetDate()}</div>
          <div className="quotation-number">
            {"Quotation Number: " + GetQuote()}
          </div>
        </div>
        <div className="group-4">
          <div className="text-wrapper-4">Quantity:</div>
          <div className="text-wrapper-5">EMPTY TEXT</div>
        </div>
        <div className="group-5">
          <div className="text-wrapper-6">Unit Price:</div>
          <div className="text-wrapper-5">EMPTY TEXT</div>
        </div>
        <div className="text-wrapper-7">{"Part Number: " + partNumber}</div>
        <h1 className="heading-quotation">Quotation</h1>
        <div className="text-wrapper-8">Form # 102</div>
        <div className="text-wrapper-9">Page 1</div>
        <p className="NAME-GOES-HERE-NAME">
          NAME GOES HERE NAME GOES HERE
          <br />
          PFC FLEXIBLE CIRCUITS LIMITED
        </p>
        <div className="group-6">
          <p className="p">Gerber Adjustment for new end</p>
          <div className="text-wrapper-10">$250</div>
        </div>
        <div className="text-wrapper-11">NRE</div>
        <div className="text-wrapper-12">Notes</div>
        <div className="notes">{notes}</div>
        <div className="text-wrapper-13">TERMS</div>
        <p className="QUOTATION-VALID-FOR">
          QUOTATION VALID FOR 90 DAYS
          <br />
          ALL PRICES ARE LISTED IN CDN FUNDS
          <br />
          NET 30.FOB PFC.
        </p>
        <div className="text-wrapper-14">Sincerely,</div>
        <div className="rectangle" />
        <div className="rectangle-2" />
      </div>
    </div>
  );
});

export default FrontPagePrint;
