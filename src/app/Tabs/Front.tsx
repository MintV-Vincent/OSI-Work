import { Button, Radio, Textarea, TextInput } from "@mantine/core";
//import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";
import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";
import { FrontTable } from "app/Compontents/Tables/FrontTable";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { useState } from "react";
import { useInputState } from "@mantine/hooks";
import { useAtom } from "jotai";
import { IconPrinter } from "@tabler/icons-react";
import { customerAtom } from "Library/AtomStorage";
//white-space: pre-wrap; TO MAK BREAK LINES

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
      micheal + "Director of sales\nmmorando@pfcflex.com";
  }
  return "";
}

const textClassName: string = "";
const labelClassName: string = "text-xl text-left";

const Front = () => {
  let componentRef: any = useRef();
  const [note, setNote] = useState("");
  const [part, setPart] = useState("");
  const [sold, setSold] = useState("");
  const [partNumberInput, setPartInput] = useInputState<string>("");
  const [revisionInput, setRevisionInput] = useInputState<string>("");
  const [customer] = useAtom(customerAtom);
  const [sales, setSales] = useState("gus");
  return (
    <div className="mx-8">
      <div className="flex pt-10">
        <FrontTable
          partNumberInput={partNumberInput}
          setPartInput={setPartInput}
          revisionInput={revisionInput}
          setRevisionInput={setRevisionInput}
        />
      </div>
      <div className="flex py-10 justify-between">
        <Radio.Group
          className="text-xl"
          value={sales}
          onChange={setSales}
          name="sales"
          label="Select Sales Manager"
          size="md"
        >
          <Radio className={"py-0.5"} value="gus" label={gus} />
          <Radio className={"py-0.5"} value="chris" label={chris} />
          <Radio className={"py-0.5"} value="micheal" label={micheal} />
        </Radio.Group>
        <div className="w-1/5">
          <label className={labelClassName}>Notes: </label>
          <Textarea
            className={textClassName}
            placeholder="Extra Notes"
            value={note}
            onChange={(e) => setNote(e.currentTarget.value)}
            autosize
            minRows={3}
          />
        </div>
        <div className="w-1/5">
          <label className={labelClassName}>Part Attributes: </label>
          <Textarea
            className={textClassName}
            placeholder="Part Attributes"
            value={part}
            onChange={(e) => setPart(e.currentTarget.value)}
            autosize
            minRows={3}
          />
        </div>
        <div className="w-1/5">
          <label className={labelClassName}>Sold To: </label>
          <Textarea
            className={textClassName}
            placeholder="Enter Text"
            value={sold}
            onChange={(e) => setSold(e.currentTarget.value)}
            autosize
            minRows={3}
          />
        </div>
      </div>
      <div>
        <ReactToPrint
          trigger={() => <Button rightIcon={<IconPrinter />}>Print</Button>}
          content={() => componentRef.current}
        />
        <div className="hidden">
          <FrontPagePrint
            notes={note}
            parts={part}
            customer={customer}
            ref={componentRef}
            partNumber={partNumberInput}
            revision={revisionInput}
            sales={chooseSales(sales)}
            sold={sold}
          />
        </div>
      </div>
    </div>
  );
};

export default Front;
