import { Button, Textarea } from "@mantine/core";
import FrontPagePrint from "app/Compontents/PrintingElement/FrontPagePrint";
import { FrontTable } from "app/Compontents/Tables/FrontTable";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { useState } from "react";
import { useInputState } from "@mantine/hooks";

const Front = () => {
  let componentRef: any = useRef();
  const [note, setNote] = useState("");
  const [part, setPart] = useState("");

  const [partNumberInput, setPartInput] = useInputState<string>("");

  return (
    <div className="mx-8">
      <div className="flex pt-10">
        <FrontTable
          partNumberInput={partNumberInput}
          setPartInput={setPartInput}
        />
      </div>
      <div className="flex pt-10">
        <label className="text-xl w-100%">Notes: </label>
      </div>
      <Textarea
        placeholder="Extra Notes"
        value={note}
        onChange={(e) => setNote(e.currentTarget.value)}
        autosize
        minRows={3}
      />
      <div className="flex pt-10">
        <label className="text-xl w-100%">Part Attributes: </label>
      </div>
      <div className="pb-10">
        <Textarea
          placeholder="Part Attributes"
          value={part}
          onChange={(e) => setPart(e.currentTarget.value)}
          autosize
          minRows={3}
        />
      </div>
      <div>
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef.current}
        />
        <div className="hidden">
          <FrontPagePrint
            notes={note}
            parts={part}
            ref={componentRef}
            partNumber={partNumberInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Front;
