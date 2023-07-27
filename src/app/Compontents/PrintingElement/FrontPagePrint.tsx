import React from "react";
import "./styles.css";
import Logo from "Images/LogoColor.svg";
import Image from "next/image";
import GetDate from "Functions/GetFunction/GetDate";

interface PrintingProps {
  notes: string;
  parts: string;
  partNumber: string;
}

export const FrontPagePrint = React.forwardRef(
  ({ notes, parts, partNumber }: PrintingProps, ref: any) => {
    return (
      <div className="letter-head" ref={ref}>
        <div className="div">
          <Image
            className="w-auto h-20 p-2.5 m-5"
            src={Logo}
            priority={true}
            alt="PFC FLEX LOGO"
          />
          <div className="text-wrapper">Notes</div>
          <p className="p">Gerber Adjustment for new end</p>
          <div className="text-wrapper-2">Sincerely,</div>
          <div className="text-wrapper-3">Form # 102</div>
          <div className="text-wrapper-4">Page 1</div>
          <p className="NAME-GOES-HERE-NAME">
            NAME GOES HERE NAME GOES HERE
            <br />
            PFC FLEXIBLE CIRCUITS LIMITED
          </p>
          <div className="text-wrapper-5">$250</div>
          <div className="text-wrapper-6">NRE</div>
          <p className="text-wrapper-7">{notes}</p>
          <div className="text-wrapper-8">TERMS</div>
          <p className="QUOTATION-VALID-FOR">
            QUOTATION VALID FOR 90 DAYS
            <br />
            ALL PRICES ARE LISTED IN CDN FUNDS
            <br />
            NET 30.FOB PFC.
          </p>
          <div className="overlap">
            <div className="overlap-group">
              <div className="frame">
                <div className="text-wrapper-9">Sold To</div>
                <p className="EMPTY-TEXT-EMPTY">
                  EMPTY TEXT
                  <br />
                  EMPTY TEXT
                  <br />
                  EMPTY TEXT
                  <br />
                  EMPTY TEXT
                  <br />
                  Email:
                </p>
              </div>
              <div className="text-wrapper-10">From</div>
              <div className="text-wrapper-11">
                PFC Flexible Circuits Limited
              </div>
              <div className="text-wrapper-12">Email:</div>
              <div className="frame-2">
                <div className="text-wrapper-13">Build Site</div>
                <p className="PFC-flexible">
                  PFC Flexible Circuits
                  <br />
                  11 Canadian Road, Unit #7
                  <br />
                  Toronto, ON M1R5G1 CANADA
                </p>
              </div>
            </div>
            <div className="text-wrapper-14">EMPTY TEXT</div>
            <div className="text-wrapper-15">EMPTY TEXT</div>
          </div>
          <div className="frame-3">
            <div className="text-wrapper-16">Date</div>
            <div className="text-wrapper-17">{GetDate()}</div>
          </div>
          <div className="text-wrapper-18">Quotation Number</div>
          <div className="text-wrapper-19">EMPTY TEXT</div>
          <div className="frame-4">
            <div className="text-wrapper-20">Quantity</div>
            <div className="text-wrapper-21">EMPTY TEXT</div>
          </div>
          <div className="frame-5">
            <div className="text-wrapper-20">Unit Price</div>
            <div className="text-wrapper-22">EMPTY TEXT</div>
          </div>
          <div className="frame-6">
            <div className="text-wrapper-23">Part Number</div>
            <div className="text-wrapper-24">{partNumber}</div>
          </div>
          <h1 className="h-1">Quotation</h1>
          <div className="rectangle" />
          <div className="rectangle-2" />
        </div>
      </div>
    );
  }
);

export default FrontPagePrint;
