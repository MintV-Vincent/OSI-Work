import { Box, Button, Group, Modal } from "@mantine/core";
import React from "react";

interface WarningInterface {
  opened: boolean;
  close: () => void;
}

export default function WarningForm({ opened, close }: WarningInterface) {
  return (
    <Group position="center">
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
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
          <Button color="red" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              close();
            }}
          >
            Comfirm
          </Button>
        </div>
      </Modal>
    </Group>
  );
}
