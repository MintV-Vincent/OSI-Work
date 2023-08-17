import { Button, Modal, SegmentedControl } from "@mantine/core";
import { technologyAtom } from "Library/Atoms/FrontPageAtoms";
import { useAtom } from "jotai";
import React, { useState } from "react";

interface WarningInterface {
  opened: boolean;
  close: () => void;
}

export default function WarningForm() {
  const [technology, setTechnology] = useAtom(technologyAtom);
  const [prevState, setPrevState] = useState(technology);
  const [status, setState] = useState(false);
  const handleClick = () => {
    setState((prevStatus) => !prevStatus);
  };

  return (
    <>
      <SegmentedControl
        size="xs"
        color="blue"
        fullWidth
        value={technology}
        onChange={(e) => {
          handleClick();
          setPrevState(technology);
          setTechnology(e);
        }}
        data={["A", "B", "C", "D"]}
      />
      <Modal
        size={"lg"}
        opened={status}
        onClose={() => {
          setTechnology(prevState);
          handleClick();
        }}
        centered
        closeOnEscape={false}
        title="Use Technology Template"
      >
        <label className="py-10">
          Warning
          <br />
          This will fill out with standard template.
          <br />
          Do you wish to proceed.
        </label>
        <div className="flex justify-between pt-10">
          <Button
            color="red"
            onClick={(e) => {
              setTechnology(prevState);
              handleClick();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleClick();
            }}
          >
            Comfirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
