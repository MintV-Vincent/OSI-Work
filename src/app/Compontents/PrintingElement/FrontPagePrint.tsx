import React from "react";
import "./style.css";
import Logo from "Images/LogoColor.svg";
import Image from "next/image";
import GetDate from "Functions/GetFunction/GetDate";
import GetQuote from "Functions/GetFunction/GetQuote";

interface PrintingProps {
  notes: string;
  parts: string;
  partNumber: string;
  customer: string;
  revision: string;
  sales: string;
  sold: string;
}

export const FrontPagePrint = React.forwardRef(
  (
    {
      notes,
      parts,
      customer,
      partNumber,
      revision,
      sales,
      sold,
    }: PrintingProps,
    ref: any
  ) => {
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
          <div className="sales-text">{sales}</div>
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
  }
);

export default FrontPagePrint;
