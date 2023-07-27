import { Button, Textarea } from "@mantine/core";
import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";
import { FrontTable, customerAtom } from "app/Compontents/Tables/FrontTable";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { useState } from "react";
import { useInputState } from "@mantine/hooks";
import { useAtom } from "jotai";
import { IconPrinter } from "@tabler/icons-react";
//white-space: pre-wrap; TO MAK BREAK LINES

const textClassName: string = "pb-10 w-1/5";
const labelClassName: string = "text-xl w-1/5 text-left";

const Front = () => {
  let componentRef: any = useRef();
  const [note, setNote] = useState("");
  const [part, setPart] = useState("");
  const [from, setFrom] = useState("");
  const [sold, setSold] = useState("");
  const [partNumberInput, setPartInput] = useInputState<string>("");
  const [revisionInput, setRevisionInput] = useInputState<string>("");
  const [customer] = useAtom(customerAtom);
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
      <div className="flex pt-10 justify-between">
        <label className={labelClassName}>Notes: </label>
        <label className={labelClassName}>Part Attributes: </label>
        <label className={labelClassName}>From: </label>
        <label className={labelClassName}>Sold To: </label>
      </div>
      <div className="flex justify-between">
        <Textarea
          className={textClassName}
          placeholder="Extra Notes"
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Textarea
          className={textClassName}
          placeholder="Part Attributes"
          value={part}
          onChange={(e) => setPart(e.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Textarea
          className={textClassName}
          placeholder="Extra Notes"
          value={from}
          onChange={(e) => setFrom(e.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Textarea
          className={textClassName}
          placeholder="Part Attributes"
          value={sold}
          onChange={(e) => setSold(e.currentTarget.value)}
          autosize
          minRows={3}
        />
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
          />
        </div>
      </div>
    </div>
  );
};

export default Front;
