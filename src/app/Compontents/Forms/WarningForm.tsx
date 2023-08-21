import {
  Box,
  Button,
  LoadingOverlay,
  Modal,
  SegmentedControl,
} from "@mantine/core";
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

  return (
    <>
      <Box maw={400} pos="relative">
        <LoadingOverlay visible={status} overlayBlur={2} />
        {/* ...other content */}
      </Box>
      <SegmentedControl
        size="xs"
        color="blue"
        fullWidth
        value={technology}
        onChange={(e) => {
          setState(true);
          setTechnology(e);
        }}
        data={[
          { label: "A", value: "A" },
          { label: "B", value: "B" },
          { label: "C", value: "C" },
          { label: "D", value: "D" },
        ]}
      />
    </>
    //   size={"lg"}
    //   opened={status}
    //   onClose={() => {
    //     setTechnology(prevState);
    //     setState(false);
    //   }}
    //   centered
    //   closeOnEscape={false}
    //   title="Use Technology Template"
    // >
    //   <label className="py-10">
    //     Warning
    //     <br />
    //     This will fill out with standard template.
    //     <br />
    //     Do you wish to proceed.
    //   </label>
    //   <div className="flex justify-between pt-10">
    //     <Button
    //       color="red"
    //       onClick={(e) => {
    //         setTechnology(prevState);
    //         setState(false);
    //       }}
    //     >
    //       Cancel
    //     </Button>
    //     <Button
    //       onClick={(e) => {
    //         setState(false);
    //       }}
    //     >
    //       Comfirm
    //     </Button>
    //   </div>
    // </Modal>
  );
}
