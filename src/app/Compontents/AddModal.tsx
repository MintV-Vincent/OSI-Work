import { Modal, Group } from "@mantine/core";
import React from "react";

interface addModalInterface {
  title: string;
  form: React.JSX.Element;
  button: React.JSX.Element;
  status: any;
  handleClick: any;
}

export function AddModal({
  title,
  form,
  button,
  status,
  handleClick,
}: addModalInterface): React.JSX.Element {
  return (
    <Group position="center">
      <Modal
        opened={status}
        onClose={() => handleClick()}
        title={title}
        centered
      >
        {form}
      </Modal>
      {button}
    </Group>
  );
}
