import { Textarea } from "@mantine/core";
import { FrontTable } from "app/Compontents/Tables/FrontTable";

export default function Front() {
  return (
    <div className="mx-8">
      <div className="flex pt-10">
        <FrontTable />
      </div>
      <div className="flex pt-10">
        <label className="text-xl w-100%">Notes: </label>
      </div>
      <Textarea placeholder="Extra Notes" autosize minRows={3} />
      <div className="flex pt-10">
        <label className="text-xl w-100%">Part Attributes: </label>
      </div>
      <div className="pb-10">
        <Textarea placeholder="Part Attributes" autosize minRows={3} />
      </div>
    </div>
  );
}
