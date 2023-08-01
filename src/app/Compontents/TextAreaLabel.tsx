import { Textarea } from "@mantine/core";
import React from "react";

const textClassName: string = "";
const labelClassName: string = "text-xl text-left";

interface TextInputLabelInterface {
  label: string;
  state: any;
  setState: any;
}

export default function TextInputLabel({
  label,
  state,
  setState,
}: TextInputLabelInterface) {
  return (
    <div className="w-1/5">
      <label className={labelClassName}>{label}</label>
      <Textarea
        className={textClassName}
        placeholder="Extra Notes"
        value={state}
        onChange={(e) => setState(e.currentTarget.value)}
        autosize
        minRows={3}
      />
    </div>
  );
}
