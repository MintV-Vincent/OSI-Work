import { Radio } from "@mantine/core";
import React, { useState } from "react";

export default function RadioUSD() {
  const [selector, setSelector] = useState("");
  return (
    <div className="flex flex-col">
      <label className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl text-primary">
        Total: ${(Number(100) / Number(20)).toFixed(2)}
      </label>
      <Radio.Group
        className="text-xl"
        value={selector}
        onChange={setSelector}
        name="sales"
      >
        <div className="flex justify-between">
          <Radio className={"py-6"} value="CAD" label={"CAD"} />
          <Radio className={"py-6"} value="USD" label={"USD"} />
        </div>
      </Radio.Group>
    </div>
  );
}
