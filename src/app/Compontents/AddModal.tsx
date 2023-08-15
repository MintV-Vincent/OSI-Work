import { Modal, Group } from "@mantine/core";
import React from "react";

interface addModalInterface {
  title: string;
  form: React.JSX.Element;
  button: React.JSX.Element;
  status: boolean;
  handleClick: () => void;
}

export function AddModal({
  title,
  form,
  button,
  status,
  handleClick,
}: addModalInterface): React.JSX.Element {
  /**
   * Handle click is sent here so the form can use it and the modal.
   */
  return (
    <Group position="center">
      <Modal
        size="calc(45vw)"
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
